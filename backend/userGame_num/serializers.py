from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import *

#serializer for model 'Rule' for JSON conversion for the frontend
class RunsSerializer(serializers.ModelSerializer):
    user_name = serializers.CharField(source='userID.username')
    user_join = serializers.DateTimeField(source='userID.date_joined')
    class Meta:
        #define target model
        model = gameNum
        #list fields
        fields = ('userID','completed_runs','user_name','user_join',)

class CUUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ('username','password')
        
    def create(self, validated_data):
        user = User.objects.create_user(
            username = validated_data['username'],
            password = validated_data['password']
        )