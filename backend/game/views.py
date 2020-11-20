from django.shortcuts import render
from django.db.models import Q
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated,IsAuthenticatedOrReadOnly
from .permissions import *
from .models import *
from .serializers import *

# Create your views here.
class GameList(generics.ListAPIView):
    permission_classes = [IsAuthenticatedOrReadOnly]
    serializer_class = GameSerializer

    def get_queryset(self):
        user = self.request.user
        return Game.objects.filter(Q(contributor=1) | Q(contributor=user))

class GameDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsOwnerOrReadOnly]
    serializer_class = GameSerializer
    lookup_field = 'slug'

    def get_queryset(self):
        user = self.request.user
        return Game.objects.filter(contributor=user)
    
class GameCreate(generics.CreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = GameSerializer
    queryset = Game.objects.all()
    