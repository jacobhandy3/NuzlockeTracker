from django.shortcuts import render
from django.db.models import Q
from django.contrib.auth.models import User
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import AccessToken
from .models import *
from .serializers import *

# Create your views here.
class UserDetail(generics.RetrieveAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = RunsSerializer
    def get_object(self):
        return gameNum.objects.get(Q(userID_id=self.request.user))