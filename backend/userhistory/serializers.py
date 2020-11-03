from rest_framework import serializers
from .models import History

#serializer for model 'Rule' for JSON conversion for the frontend
#class HistorySerializer(serializers.ModelSerializer):
    #class Meta:
        #define target model
        #model = History
        #list fields
        #fields = ('author','title','start_date','end_date','version','body')
