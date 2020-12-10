from django.shortcuts import render
from django.db.models import Q
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated,IsAuthenticatedOrReadOnly
from .permissions import *
from .models import *
from .serializers import *

# Create your views here.
def UserProfile(generics.ListCreateAPIView):