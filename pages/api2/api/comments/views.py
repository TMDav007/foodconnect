from django.shortcuts import render
from rest_framework.generics import GenericAPIView
from rest_framework import response, status, permissions, filters
from django.http import Http404
from .serializers import CommentsSerializer
from rest_framework.permissions import IsAuthenticated
from .models import Comments
from authentication.utils import get_User_Info

# Create your views here.


class CommentsAPIView(GenericAPIView):
    serializer_class = CommentsSerializer
    permission_classes = [IsAuthenticated, ]

    def post(self, request, dish_id):
        user = get_User_Info(request)
        request.data._mutable = True
        request.data['user'] = user['user_id']
        request.data['dish'] = dish_id
        request.data._mutable = False
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            serializer.save()
            responses = {
            'message': 'Your comment was successful',
            'data' : serializer.data
        }
            return response.Response(responses, status=status.HTTP_201_CREATED)
        
        return response.Response({'detail': 'Comments are not available'}, status=status.HTTP_404_NOT_FOUND)
    
    def get(self, request, dish_id):
        comments = Comments.objects.filter(dish=dish_id)
        serializer = CommentsSerializer(comments, many=True)
        if len(serializer.data) > 0:
            responses = {
                'message': 'Comments Request successful',
                'data': serializer.data
            }
            return response.Response(responses, status=status.HTTP_200_OK)
        return response.Response({'error': 'Comment not found'}, status=status.HTTP_404_NOT_FOUND)

class CommentsDetailAPIView(GenericAPIView):
    serializer_class = CommentsSerializer
    permission_classes = (IsAuthenticated,)

    def get_object(self, id):
        try:
            return Comments.objects.get(id=id)
        except Comments.DoesNotExist:
            raise Http404

    def get_user_defined_object(self, dish_id, ids):
        try:
            user_info = get_User_Info(self.request)
            comments = Comments.objects.filter(dish=dish_id)
            comment = comments.filter(user=user_info['user_id']).get(id=ids)
            return comment
        except Comments.DoesNotExist:
            raise Http404

    def get(self, request, id, dish_id, format=None):
        comment = self.get_object(id)
        serializer = CommentsSerializer(comment)
        
        responses = {
            'message' : 'Comment request is successful',
            'data': serializer.data
        }

        return response.Response(responses, status=status.HTTP_200_OK)

    def put(self, request, id, dish_id, format=None):
        self.get_object(id)
        comment = self.get_user_defined_object(dish_id, id)
        user = get_User_Info(request)
        request.data._mutable = True
        request.data['user'] = user['user_id']
        request.data['dish'] = dish_id
        request.data._mutable = False
        serializer = CommentsSerializer(comment, data = request.data)
        if serializer.is_valid():
            serializer.save()
            responses = {
                'message': 'Request successful',
                'data': serializer.data
            }
            return response.Response(responses, status=status.HTTP_200_OK)
        return response.Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id,dish_id, format=None):
        self.get_object(id)
        comment=self.get_user_defined_object(dish_id,id)
        comment.delete()
        return response.Response({'message': "Comment has been deleted"},status=status.HTTP_204_NO_CONTENT)

