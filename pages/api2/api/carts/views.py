from django.shortcuts import render
from rest_framework.generics import GenericAPIView
from rest_framework import response, status
from django.http import Http404
from .serializers import GetCartSerializer, CartSerializer
from rest_framework.permissions import IsAuthenticated
from authentication.models import User
from dishes.models import Dishes
from .models import Carts
from authentication.utils import get_User_Info


# Create your views here.
class CartAPIView(GenericAPIView):
    post_serializer_class = CartSerializer
    get_serializer_class = GetCartSerializer
    permission_classes = (IsAuthenticated,)

    def get_object(self, id):
        try:
            return Carts.objects.get(id=id)
        except Dishes.DoesNotExist:
            raise Http404

    def post(self, request):
        user = get_User_Info(request)
        request.data._mutable = True
        request.data['owner'] = user['user_id']
        request.data._mutable = False
        user_cart = User.objects.get(id=user['user_id'])
        all_user_carts = Carts.objects.filter(owner=user['user_id'], selected=False, ordered=False)
        cart_exist = Carts.objects.filter(dish=request.data['dish'])
        if len(cart_exist) < 1:
            serializer = self.post_serializer_class(data=request.data)
            if serializer.is_valid():
                serializer.save()
                user_cart.carts = len(all_user_carts)
                user_cart.save()
                responses = {
                'message': 'Dish has been added to the cart successfully',
                'data': serializer.data
                }
                return response.Response(responses, status=status.HTTP_201_CREATED)
            return response.Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return response.Response({'error': 'Dish already added your cart'}, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request):
        user = get_User_Info(request)
        all_user_cart_items = Carts.objects.filter(owner=user['user_id'])
        valid_user_cart_items = all_user_cart_items.filter(selected=False, ordered=False)
        serializer = GetCartSerializer(valid_user_cart_items, many=True)
        if len(serializer.data) > 0:
            responses = {
                'message': 'your Order was successful',
                'data': serializer.data
            }
            return response.Response(responses, status=status.HTTP_200_OK)

class CartDetailAPIView(GenericAPIView):
    serializer_class = GetCartSerializer
    permission_classes = (IsAuthenticated,)

    def get_user_defined_object(self, id):
        try:
            user = get_User_Info(self.request)
            cart = Carts.objects.filter(owner=user['user_id']).get(id=id)
            return cart
        except Carts.DoesNotExist:
            raise Http404

    def get(self, request, id, format=None):
        cart = self.get_user_defined_object(id)
        #cart.selected = True
        #cart.ordered = True
        serializer = GetCartSerializer(cart)

        responses = {
            'message': 'Cart request was successful',
            'data': serializer.data
        }

        return response.Response(responses, status=status.HTTP_200_OK)

    def delete(self, request, id, format=None):
        cart = self.get_user_defined_object(id)
        cart.delete()
        user = get_User_Info(self.request)
        user_cart = User.objects.get(id=user['user_id'])
        all_user_carts = Carts.objects.filter(owner=user['user_id'], selected=False, ordered=False)
        user_cart.carts = len(all_user_carts)
        user_cart.save()
        
        return response.Response({'message': "Cart has been deleted"},status=status.HTTP_204_NO_CONTENT)