from rest_framework import serializers
from .models import Game

#serializer for model 'Version' for JSON conversion for the frontend
class GameSerializer(serializers.ModelSerializer):
    #dont allow users to be able to switch contributor to any other users
    contributor = serializers.HiddenField(default=serializers.CurrentUserDefault())
    class Meta:
        #define target model
        model = Game
        #list fields
        fields = ('contributor','name','region','locations','slug')
        extra_kwargs = {
            'url':{'view_name':'game-detail','lookup_field':'slug'}
        }
