from rest_framework import serializers
from .models import History

#serializer for model 'Rule' for JSON conversion for the frontend
class HistorySerializer(serializers.ModelSerializer):
    #dont allow users to be able to switch author to any other users
    author = serializers.HiddenField(default=serializers.CurrentUserDefault())
    class Meta:
        #define target model
        model = History
        #list fields
        fields = ('author','game','title','start_date','end_date','body','slug')
        extra_kwargs = {
            'url':{'view_name':'history-detail','lookup_field':'slug'}
        }
