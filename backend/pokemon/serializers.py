from rest_framework import serializers
from .models import Pokemon

#serializer for model 'Pokemon' for JSON conversion for the frontend
#class PokemonSerializer(serializers.ModelSerializer):
    #class Meta:
        #define target model
        #model = Pokemon
        #list fields
        #fields = ('trainer','origin','name','nickname','status')
