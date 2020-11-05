from django.shortcuts import render
from rest_framework.views import APIView
from .models import *
from rest_framework.response import Response
from .serializers import *

# Create your views here.

#class RuleList(APIView):
    #create serializer object

    #get method: get mandatory rules + custom rules of user
        #create a list of dicts mapping field to data of each object in model

        #return list as param in Response() to convert data usable by the frontend

    #post method: create a new rule
        #create serializer with parsed data from request

        #verify serializer has all the required fields
            #check data is new or exisiting in DB and create it
            #return serializer data as param in Response() to convert data usable by the frontend


#class RuleDetail(APIView):
    #method: find and return the Rule by pk

    #get method: get specific rule wtih pk
        #grab the specific object by pk

        #create a serializer object with param specific rule

        #return serializer data as param in Response to convert data usable by the frontend

    #put method: update an exisiting custom rule
        #grab the specific object by pk

        #create a serializer object with param specfic rule and request data

        #verify serializer has all the required fields
            #check data is new or exisits in DB and update it
            #return serializer data as param in Response() to convert data usable by the frontend
    
    #delete method: delete an existing custom rule
        #grab the specific object by pk
        #delete the object
        #return HTTP 204 as param in Response() to alert frontend of completion