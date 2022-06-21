from rest_framework.serializers import ModelSerializer
from .models import Comments

class CommentsSerializer(ModelSerializer):

    class Meta:
        model = Comments
        #field = ('id', 'comment', 'user', 'dish', 'created_at',)
        fields = '__all__'

