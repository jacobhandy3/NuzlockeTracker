from django.shortcuts import render
from django.db.models import Q
from django.contrib.auth.models import User
from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import AccessToken
from .models import *
from .serializers import *

# Create your views here.
class UserDetail(generics.RetrieveAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = RunsSerializer
    def get_object(self):
        return gameNum.objects.get(Q(userID_id=self.request.user))

class UserCreate(generics.CreateAPIView):
    serializer_class = CUUserSerializer
    def create(self, request, *args, **kwargs):
        serializer = CUUserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_404_NOT_FOUND)

class RunsUpdate(generics.UpdateAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = RunsSerializer
    def get_object(self):
        return gameNum.objects.get(Q(userID_id=self.request.user))
    def partial_update(self, request, *args, **kwargs):
        instance = self.get_object()
        runNum = instance.completed_runs
        serializer = self.get_serializer(instance,data=request.data,partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save(completed_runs=(runNum+self.kwargs['num']))
        return Response(status=status.HTTP_202_ACCEPTED)