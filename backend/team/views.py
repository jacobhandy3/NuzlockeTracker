from django.shortcuts import render
from django.db.models import Q
from rest_framework import generics,status
from rest_framework.response import Response
from rest_framework.mixins import CreateModelMixin
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from .models import *
from .serializers import *

# Create your views here.

class TeamList(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = TeamSerializer
    def get_queryset(self):
        return Team.objects.filter(origin=self.kwargs['origin']).order_by('location')

class TeamDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = TeamSerializer
    queryset = Team.objects.all()

class TeamCreate(generics.CreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = TeamSerializer
    queryset = Team.objects.all()