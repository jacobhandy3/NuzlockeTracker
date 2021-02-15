import os, sys
current_dir = os.path.dirname(os.path.join(os.getcwd(), __file__))
sys.path.append(os.path.normpath(os.path.join(current_dir, '..', '..')))

from django.core.exceptions import ValidationError
from django.shortcuts import render
from django.db.models import Q
from django.utils.text import slugify
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from datetime import datetime
from .models import *
from .serializers import *
from team.models import Team
from game.models import Game


# Create your views here.

class HistoryList(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = HistorySerializer
    #redefined method to only include user's history
    def get_queryset(self):
        user = self.request.user.id
        return History.objects.filter(author=user).order_by('start_date')

class HistoryDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated]
    #redefine lookup field to point to model's slug
    lookup_field = 'slug'
    serializer_class = HistorySerializer
    queryset = History.objects.all()

class HistoryCreate(generics.CreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = HistorySerializer
    queryset = History.objects.all()

    def create(self, request, *args, **kwargs):
        serializer = HistorySerializer(data=request.data,partial=True)
        #if ten history objects exist for the user, delete the earliest one
        if self.limit_ten(self.request.user) == True:
            #return message that their earliest run was deleted
            raise ValidationError('Earliest created run deleted. Only your last 10 runs are allowed.')
        #grab the value passed through the url that presents the pk of a game
        game_id = kwargs['game']

        #create the history parameters
        g = Game.objects.get(id=game_id)
        region = g.region
        start = Team.objects.filter(trainer=self.request.user).order_by('received','captured').values_list('received',flat=True)[0]
        title = str(request.user.username) + "'s Adventure in " + str(region) + " beginning on " + start.strftime('%m/%d/%Y')
        body = self.build_body(game_id,region)
        slug = slugify(title)

        #save the instance with created parameters
        serializer.is_valid(raise_exception=True)
        serializer.save(author=request.user,game=g,title=title,start_date=start,body=body,slug=slug)
        #delete the team entries as we dont need that information anymore
        self.del_team(game_id)
        #return CREATED status
        return Response(serializer.data,status=status.HTTP_201_CREATED)

    #check if 10 teams already exist
    def limit_ten(self, user_id):
        #if number of teams per user is 10
        if History.objects.filter(author=user_id).count()>=10:
            #delete the earliest created run
            ripObj = History.objects.filter(author=user_id).order_by('end_date')[0]
            ripObj.delete()
            #return true to represent that a deletion was made and the number of teams per user is 10
            return True
        #return false that no deletion was made
        return False

    #build the body of the history object to be created using Team objects
    def build_body(self,gameID,region):
        user_id = self.request.user.id
        #convert json array in game to represent locations to python list
        game_locations = list(Game.objects.get(id=gameID).locations)

        #raw SQL statement to get a special queryset where the teammate's name and nickname is included
        #but also all their statuses separated in rows with a corresponding datetime so a full history is accounted for
        teammates = Team.objects.raw(
        '''
        SELECT team.id, team.name, team.nickname, team.location, l.status, l.date_time
        FROM team_team team
        CROSS JOIN LATERAL (VALUES (captured, 'captured'),(received, 'received'),(missed,'missed'),(stored,'stored'),(deceased,'deceased')) AS l(date_time, status)
        WHERE team.trainer_id=%s AND team.origin_id=%s AND l.status IS NOT NULL AND l.date_time IS NOT NULL
        ORDER BY l.date_time
        ''',[user_id,gameID])

        #beginning of the body
        message = "Your journey in " + region + " began on " + teammates[0].date_time.strftime('%m/%d/%Y %H:%M:%S') + "."
        #for each object in queryset concerning every teammate's status associated with this game run
        for t in teammates:
            #if teammate was missed modify the default message to exclude a nickname
            if t.status == 'missed':
                message += " You " + str(t.status) + " a " + str(t.name)
            #if teammate died or was stored modify the default message to exclude the location
            elif t.status == 'deceased' or t.status == 'stored':
                if t.status == 'deceased': status = "lost "
                else: status = "stored "
                message += " You " + status + str(t.nickname) + " on " + t.date_time.strftime('%m/%d/%Y %H:%M:%S') + "."
                continue
            #this is the default message for captured and received
            else:
                message += " You " + str(t.status) + " a " + str(t.name) + ", which you call " + str(t.nickname) + ", "
            #add date in which status occurred and location it occurred
            message += " on " + str(t.date_time.strftime('%m/%d/%Y %H:%M:%S'))
            if game_locations[t.location] == 'Starter': message += " as your " + game_locations[t.location] + "."
            else: message += " at " + game_locations[t.location] + "."
        #return final message with ending statement on when their journey ended
        return message + " Your journey ended on " + datetime.now().strftime('%m/%d/%Y %H:%M:%S') + "."

    #delete the objects in Team database associated with the created run
    #takes self and game id for result filters
    def del_team(self, gameID):
        #get all objects with user id and game id filters and delete it
        Team.objects.filter(trainer=self.request.user).filter(origin=gameID).delete()