from rest_framework import serializers
from .models import userRuns

#serializer for model 'Rule' for JSON conversion for the frontend
class RunsSerializer(serializers.ModelSerializer):
    class Meta:
        #define target model
        model = userRuns
        #list fields
        fields = ('completed_runs','user_id')

