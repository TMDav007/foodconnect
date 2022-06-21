from django.shortcuts import render

# Create your views here.
from django.shortcuts import render
from rest_framework.generics import GenericAPIView
from rest_framework import response, status
from django.http import Http404
from .serializers import Saved_DishesSerializer, Get_Saved_DishesSerializer
from rest_framework.permissions import IsAuthenticated
from authentication.models import User
from dishes.models import Dishes
from .models import Saved_Dishes
from authentication.utils import get_User_Info

# Create your views here.
class Saved_DishesAPIView(GenericAPIView):
    serializer_class = Saved_DishesSerializer
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        user = get_User_Info(request)
        request.data._mutable = True
        request.data['user'] = user['user_id']
        request.data._mutable = False
        user_saves = User.objects.get(id=user['user_id'])
        all_user_saved_dishes = Saved_Dishes.objects.filter(user=user['user_id'])
        dishes_exist = Saved_Dishes.objects.filter(dish=request.data['dish'])

        if len(dishes_exist) < 1:
            serializer = self.serializer_class(data=request.data)
            if serializer.is_valid():
                serializer.save()
                user_saves.saved_dishes = len(all_user_saved_dishes)
                user_saves.save()
                responses = {
                'message': 'Dish has been saved successfully',
                'data': serializer.data
                }
                return response.Response(responses, status=status.HTTP_201_CREATED)
            return response.Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return response.Response({'error': 'this dish is saved'}, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request):
        user = get_User_Info(request)
        all_user_saved_dishes = Saved_Dishes.objects.filter(user=user['user_id'])
        serializer = Saved_DishesSerializer(all_user_saved_dishes, many=True)
        if len(serializer.data) > 0:
            responses = {
                'message': 'your saved dishes request was successful',
                'data': serializer.data
            }
            return response.Response(responses, status=status.HTTP_200_OK)

class Saved_DishesDetailAPIView(GenericAPIView):
    serializer_class = Saved_DishesSerializer
    permission_classes = (IsAuthenticated,) 

    def get_user_defined_object(self, id):
        try:
            user = get_User_Info(self.request)
            saved_dish = Saved_Dishes.objects.filter(user_id=user['user_id']).get(id=id)
            return saved_dish
        except Saved_Dishes.DoesNotExist:
            raise Http404

    def get(self, request, id, format=None):
        saved_dish = self.get_user_defined_object(id)
        serializer = Get_Saved_DishesSerializer(saved_dish)

        responses = {
            'message': 'Saved dishes request was successful',
            'data': serializer.data
        }

        return response.Response(responses, status=status.HTTP_200_OK)

    def delete(self, request, id, format=None):
        user = get_User_Info(request)
        user_saves = User.objects.get(id=user['user_id'])
        all_user_saved_dishes =    Saved_Dishes.objects.filter(user=user['user_id'])
        saved_dish = self.get_user_defined_object(id)
        saved_dish.delete()
        all_user_saved_dishes = Saved_Dishes.objects.filter(user=user['user_id'])
        user_saves.saved_dishes = len  (all_user_saved_dishes)
        user_saves.save()
        
        return response.Response({'message': "The dish has been deleted"},status=status.HTTP_204_NO_CONTENT)