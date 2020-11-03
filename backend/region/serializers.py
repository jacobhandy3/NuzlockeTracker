from rest_framework import serializers
from .models import Region

#serializer for model 'Region' for JSON conversion for the frontend
#class RegionSerializer(serializers.ModelSerializer):
    #class Meta:
        #define target model
        #model = Region
        #list fields
        #fields = ('source','name','version','location')
