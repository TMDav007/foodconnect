from django.shortcuts import render
from rest_framework.generics import GenericAPIView
from rest_framework import response, status
from django.http import Http404
from rest_framework.permissions import IsAuthenticated

from notifications.models import Notifications
from .serializers import GetNotificationSerializer, PostNotificationSerializer
from authentication.utils import get_User_Info

# Create your views here.
class NotificationsAPIView(GenericAPIView):
    post_serializer_class = PostNotificationSerializer
    serializer_class = GetNotificationSerializer
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        user = get_User_Info(request)
        notifications = Notifications.objects.filter(received_by=user['user_id'])
        serializer = GetNotificationSerializer(notifications, many=True)

        if len(serializer.data) > 0:
            responses = {
                'message': 'your notification was successful',
                'data': serializer.data
            }
            return response.Response(responses, status=status.HTTP_200_OK)
        return response.Response({'error': 'Notification are not available'}, status=status.HTTP_404_NOT_FOUND)


class NotificationsAPIDetailView(GenericAPIView):
    serializer_class = GetNotificationSerializer
    permission_classes = (IsAuthenticated,)

    def get_user_defined_object(self,id):
        try:
            user = get_User_Info(self.request)
            notification = Notifications.objects.filter(received_by=user['user_id']).get(id=id)
            return notification

        except Notifications.DoesNotExist:
            raise Http404

    
    def get(self, request, id, format=None):
        notification = self.get_user_defined_object(id)
        notification.viewed = True
        notification.save()
        serializer = GetNotificationSerializer(notification)
        
        responses = {
            'message': 'Notification request was successful',
            'data': serializer.data
        }

        return response.Response(responses, status=status.HTTP_200_OK)

    def delete(self, request, id,format=None):
        notification = self.get_user_defined_object(id)
        notification.delete()
        return response.Response({'message': "Notification has been delete"},status=status.HTTP_204_NO_CONTENT)
