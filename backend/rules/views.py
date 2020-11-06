from django.http.response import Http404
from django.shortcuts import render
from rest_framework.views import APIView
from .models import *
from rest_framework.response import Response
from rest_framework import status
from .serializers import *

# Create your views here.

class RuleList(APIView):
    #get method: get mandatory rules + custom rules of user
    def get(self,request,format=None):
        #create an instance of all objects in model 'Rule'
        rules = Rule.objects.all()
        #create serializer object with instance of all model objects
        serializeObj = RuleSerializer(rules,many=True)
        #return serializer as param in Response() to convert data usable by the frontend
        return Response(serializeObj.data)

    #post method: create a new rule
    def post(self,request,format=None):
        #create serializer with parsed data from request
        serializeObj = RuleSerializer(data=request.data)
        #verify serializer has all the required fields
        if serializeObj.is_valid():
            #check data is new or exisiting in DB and create it
            serializeObj.save()
            #return serializer data as param in Response() to convert data usable by the frontend
            return Response(serializeObj.data,status=status.HTTP_201_CREATED)
        #return serializer errors and HTTP 400
        return Response(serializeObj.errors,status=status.HTTP_400_BAD_REQUEST)

class RuleDetail(APIView):
    #method: find and return the Rule by pk
    def get_obj(self,pk,fk):
        try:
            return Rule.objects.get(pk=pk,author=fk)
        except Rule.DoesNotExist:
            raise Http404

    #get method: get specific rule wtih pk
    def get(self,request,pk,fk,format=None):
        #grab the specific object by pk
        target_rule = self.get_obj(pk,fk)
        #create a serializer object with param specific rule
        serializeObj = RuleSerializer(target_rule)
        #return serializer data as param in Response to convert data usable by the frontend
        return Response(serializeObj.data)

    #put method: update an exisiting custom rule
    def put(self,request,pk,fk,format=None):
        #grab the specific object by pk
        target_rule = self.get_obj(pk,fk)
        #create a serializer object with param specfic rule and request data
        serializeObj = RuleSerializer(target_rule,request.data)
        #verify serializer has all the required fields
        if serializeObj.is_valid():
            #check data is new or exisits in DB and update it
            serializeObj.save()
            #return serializer data as param in Response() to convert data usable by the frontend
            return Response(serializeObj.data)
        #return serializer errors and HTTP 400
        return Response(serializeObj.errors,status=status.HTTP_400_BAD_REQUEST)

    #delete method: delete an existing custom rule
    def delete(self,request,pk,fk,format=None):
        #grab the specific object by pk
        target_rule = self.get_obj(pk,fk)
        #delete the object
        target_rule.delete()
        #return HTTP 204 as param in Response() to alert frontend of completion
        return Response(status=status.HTTP_204_NO_CONTENT)