from rest_framework.serializers import ModelSerializer
from .models import Notifications
from authentication.serializers import UserSerializer


class PostNotificationSerializer(ModelSerializer):
    class Meta:
        model = Notifications
        fields = '__all__'

class GetNotificationSerializer(ModelSerializer):
    created_user = UserSerializer(read_only=True)
    received_by = UserSerializer(read_only=True)

    class Meta:
        model = Notifications
        fields = '__all__'