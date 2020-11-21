from rest_framework import serializers
from .models import Team

#serializer for model 'Team' for JSON conversion for the frontend
#class TeamSerializer(serializers.ModelSerializer):
    #class Meta:
        #define target model
        #model = Team
        #list fields
        #fields = ('trainer','origin','name','nickname','status')
