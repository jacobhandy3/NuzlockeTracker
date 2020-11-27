from django.http.response import Http404
from django.db.models import Q
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from .permissions import *
from .models import *
from .serializers import *

# Create your views here.

#Lists all mandatory rules and user-defined rules
#Allows creation of rules as well
class RuleList(generics.ListCreateAPIView):
    #define permissions
    permission_classes = (IsAuthenticatedOrReadOnly,IsOwnerOrReadOnly)
    #define serializer_class with custom serializer
    serializer_class = RuleSerializer
    #redefine get_queryset method
    def get_queryset(self):
        #retrieve the user info
        user = self.request.user
        #return filtered objects WHERE author_id=1 OR author_id=user's id
        return Rule.objects.filter(Q(author=1) | Q(author=user))

#Allows GET, PUT, and DELETE of specific rules for authenticated users
class RuleDetail(generics.RetrieveUpdateDestroyAPIView):
    #define permissions
    permission_classes = (IsAuthenticatedOrReadOnly,IsOwnerOrReadOnly)
    #define serializer_class with custom serializer
    serializer_class = RuleSerializer

    lookup_field = 'slug'
    #redefine get_queryset method
    def get_queryset(self):
        #retrieve the user info
        user = self.request.user
        #return filtered objects WHERE author_id=users's id
        return Rule.objects.filter(author=user)