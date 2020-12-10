from django.shortcuts import render
from django.db.models import Q
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated,IsAuthenticatedOrReadOnly
from .permissions import *
from .models import *
from .serializers import *

# Create your views here.

#Lists all the available games not only including main series games, but user-defined as well
class GameList(generics.ListAPIView):
    #only authenticated users may see list of available games
    #so user-defined games are included
    permission_classes = [IsAuthenticatedOrReadOnly]
    serializer_class = GameSerializer
    #redefined method to exclude other user-defined games
    def get_queryset(self):
        user = self.request.user.id
        return Game.objects.filter(Q(contributor=1) | Q(contributor=user))

#Manage individual games for get, patch, and delete needs
#only allows owner for non-safe methods like patch and delete
class GameDetail(generics.RetrieveUpdateDestroyAPIView):
    #custom permission class that only allows non-safe API functionality for owners
    permission_classes = [IsOwnerOrReadOnly]
    serializer_class = GameSerializer
    #redefine lookup field to point to model's slug
    lookup_field = 'slug'
    #redefined method to only display user-defined games
    def get_queryset(self):
        user = self.request.user.id
        return Game.objects.filter(contributor=user)
    
#Creates custom games, separated from other views for planned creation web page
class GameCreate(generics.CreateAPIView):
    #custom permission class that only allows non-safe API functionality for owners
    permission_classes = [IsOwnerOrReadOnly]
    serializer_class = GameSerializer
    #returns new object
    queryset = Game.objects.all()
    