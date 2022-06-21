from django.shortcuts import render
from rest_framework.generics import GenericAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework import response, status
from django.http import Http404
from .models import Dishes
from .serializers import DishesSerializer, GetDishSerializer
from authentication.utils import get_User_Info


# Create your views here.
class DishesAPIView(GenericAPIView):
    serializer_class = DishesSerializer
    permission_classes = [IsAuthenticated, ]

    def post(self, request):
        if not self.request.user.is_staff:
            return response.Response({'error': 'User not authorized'}, status=status.HTTP_403_FORBIDDEN)
        print('print')
        user = get_User_Info(request)
        print(user)
        request.data['vendor'] = user['user_id']
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            responses = {
                'message': 'Request successful',
                'data': serializer.data
            }
            return response.Response(responses, status=status.HTTP_201_CREATED)
        return response.Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request):
        if not request.user.is_staff:
            return response.Response({'error': 'User not authorized'}, status=status.HTTP_403_FORBIDDEN)
        user = get_User_Info(request)
        dishes = Dishes.objects.filter(vendor=user['user_id'])
        serializer = DishesSerializer(dishes, many=True)
        if len(serializer.data) > 0:
            responses = {
                'message': 'Request successful',
                'data': serializer.data
            }
            return response.Response(responses, status=status.HTTP_200_OK)
        
        return response.Response({'error': 'Dishes are not available'}, status=status.HTTP_404_NOT_FOUND)      

class DishesDetailAPIView(GenericAPIView):
    serializer_class = GetDishSerializer
    permission_classes = (IsAuthenticated, )

    def get_object(self, id):
        try:
            return Dishes.objects.get(id=id)
        except Dishes.DoesNotExist:
            raise Http404
    
    def get_user_defined_object(self, id):
        try:
            user = get_User_Info(self.request)
            return Dishes.objects.filter(vendor=user['user_id']).get(id=id)
        except Dishes.DoesNotExist:
            raise Http404

    def get(self, request, id, format=None):
        dish = self.get_object(id)
        serializer = DishesSerializer(dish)
        print(serializer.data)
        responses = {
                'message': 'Request successful',
                'data': serializer.data
            }
        return response.Response(responses, status=status.HTTP_200_OK)


    def put(self, request, id,format=None):
        if not self.request.user.is_staff:
            return response.Response({'detail': 'User not authorized'}, status=status.HTTP_403_FORBIDDEN)
        self.get_object(id)
        dish = self.get_user_defined_object(id)
        serializer = GetDishSerializer(dish, data=request.data)
        if serializer.is_valid():
            serializer.save()
            responses = {
                'message': 'Request successful',
                'data': serializer.data
            }
            return response.Response(responses, status=status.HTTP_200_OK)
        return response.Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id, format=None):
        self.get_object(id)
        dish = self.get_user_defined_object(id)
        dish.delete()
        return response.Response({'message': "Dish has been deleted"},status=status.HTTP_204_NO_CONTENT)

class AllDishesDetailAPIView(GenericAPIView):
    permission_classes = (IsAuthenticated, )
    serializer_class = DishesSerializer

    def get(self, request):
        all_dishes = Dishes.objects.all()
        serializer = DishesSerializer(all_dishes, many=True)
        if len(serializer.data) > 0:
            responses = {
                'message': 'Request successful',
                'data': serializer.data
            }
            return response.Response(responses, status=status.HTTP_200_OK)

        return response.Response({'detail': 'Dishes are not available'}, status=status.HTTP_404_NOT_FOUND)