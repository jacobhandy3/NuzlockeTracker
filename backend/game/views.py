from django.db.models import Q
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated,IsAuthenticatedOrReadOnly
from .models import *
from .serializers import *

# Create your views here.

#Lists all the available games not only including main series games, but user-defined as well
class GameList(generics.ListAPIView):
    #restrict view access of user-defined games to logged in users
    #but allows view access of default games to anyone
    permission_classes = [IsAuthenticatedOrReadOnly]
    serializer_class = GameSerializer
    #redefined get queryset method to include default games and user games
    def get_queryset(self):
        user = self.request.user.id
        return Game.objects.filter(Q(contributor=1) | Q(contributor=user)).order_by('id')

#Uses slug field to grab a specific object and perform retrievals, updates, and deletions
class GameDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticatedOrReadOnly]
    serializer_class = GameSerializer
    #redefine lookup field to point to model's slug
    lookup_field = 'slug'
    queryset = Game.objects.all()
    
#Creates custom games, separated from other views for game creation web page
class GameCreate(generics.CreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = GameSerializer
    queryset = Game.objects.all()
    