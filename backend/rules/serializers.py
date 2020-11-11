from rest_framework import serializers
from .models import Rule

#serializer for model 'Rule' for JSON conversion for the frontend
class RuleSerializer(serializers.ModelSerializer):
    class Meta:
        #define target model
        model = Rule
        #list fields
        fields = ('author','title','body','date_added','slug')
        extra_kwargs = {
            'url':{'view_name':'rule-detail','lookup_field':'slug'}
        }
