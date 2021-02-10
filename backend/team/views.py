from django.shortcuts import render
from django.db.models import Q
from rest_framework import generics,status
from rest_framework.response import Response
from rest_framework.mixins import CreateModelMixin
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from .models import *
from .serializers import *

# Create your views here.

class TeamListCreate(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = TeamSerializer
    def get_queryset(self):
        return Team.objects.filter(origin=self.kwargs['origin']).order_by('location')
    def create(self, request, *args, **kwargs):
        g = Game.objects.get(id=self.kwargs['origin'])
        serializer = TeamSerializer(data=request.data,partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save(trainer=request.user,origin=g)
        return Response(serializer.data,status=status.HTTP_201_CREATED)

class TeamDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = TeamSerializer
    def get_object(self):
        return Team.objects.get(Q(pk=self.kwargs['pk']))
    def partial_update(self, request, *args, **kwargs):
        kwargs['partial'] = True
        return self.update(request, *args, **kwargs)

class TeamDeleteAll(generics.DestroyAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = TeamSerializer
    #recreates destroy method to delete all Team objects with the user's id and the associated game
    def destroy(self, request, *args, **kwargs):
        #get the current game id passed in url
        g = Game.objects.get(id=self.kwargs['origin'])
        #create a query set with specified paramters
        instance = Team.objects.filter(trainer=request.user,origin=g)
        #delete all objects returned from the query set
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)