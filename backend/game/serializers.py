from rest_framework import serializers
from .models import Game

#serializer for model 'Game' for JSON conversion for the frontend
class GameSerializer(serializers.ModelSerializer):
    #dont allow users to be able to switch contributor to any other users
    contributor = serializers.HiddenField(default=serializers.CurrentUserDefault())
    class Meta:
        #define target model
        model = Game
        #list fields
        fields = ('id','contributor','name','region','locations','slug')
        #allows slug field to be a look up field in url
        extra_kwargs = {
            'url':{'view_name':'game-detail','lookup_field':'slug'}
        }
