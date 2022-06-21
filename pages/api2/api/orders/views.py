from django.shortcuts import render
from rest_framework.generics import GenericAPIView
from django.db.models.signals import pre_save, post_save
from django.dispatch import receiver
from rest_framework import response, status
from django.http import Http404
from .serializers import PostOrdersSerializer, GetOrdersSerializer
from rest_framework.permissions import IsAuthenticated
from orders.models import Orders
from authentication.models import User
from dishes.models import Dishes
from notifications.models import Notifications
from authentication.utils import get_User_Info
from dishes.serializers import GetDishSerializer

# Create your views here.

def post_user_notification(user, vendor, data):
    created_by = User.objects.get(id=user['user_id'])
    received_by = User.objects.get(email=vendor)
    order = Orders.objects.get(id=data.data['id'])
    Notifications.objects.create(created_user=created_by, received_by=received_by,detail="Your have an Order", order=order)
    


def post_vendor_notification(vendor, order):
    print(vendor)
    created_user = User.objects.get(id=vendor['user_id'])
    received_by = User.objects.get(email=order.user_id)
    order = Orders.objects.get(id=order.id)
    Notifications.objects.create(created_user=created_user, received_by=received_by, detail="Your order has been processed", order=order)


# Create your views here.
class UserOrdersAPI(GenericAPIView):
    serializer_class = PostOrdersSerializer
    permission_classes = (IsAuthenticated, )

    def get_object(self, id):
        try:
            return Dishes.objects.get(id=id)
        except Dishes.DoesNotExist:
            raise Http404

    def post(self, request):
        user = get_User_Info(request)
        #request.data._mutable = True
        request.data.user_id = user['user_id']
        #request.data._mutable = False
        dish_id = request.data['dish_id']
        self.get_object(dish_id)
        dish_instance = Dishes.objects.get(id=dish_id)
        vendor = User.objects.get(email=dish_instance.vendor)
        print(request.data ,user['user_id'], 'here')
        serializer = self.serializer_class(data=request.data)
        
        if serializer.is_valid():
            serializer.save()
            post_user_notification(user, vendor, serializer)
            responses = {
            'message': 'Order was successful',
            'data': serializer.data
            }
            return response.Response(responses, status=status.HTTP_201_CREATED)
        return response.Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def get(self, request):
        user = get_User_Info(request)
        orders = Orders.objects.filter(user_id=user['user_id'])
        serializer = GetOrdersSerializer(orders, many=True)

        if len(serializer.data) > 0:
            responses = {
                'message': 'your Order was successful',
                'data': serializer.data
            }
            return response.Response(responses, status=status.HTTP_200_OK)
        return response.Response({'error': 'Orders are not available'}, status=status.HTTP_404_NOT_FOUND)

class UserOrdersDetailAPIView(GenericAPIView):
    serializer_class = GetOrdersSerializer
    permission_classes = (IsAuthenticated,)
    
    def get_user_defined_object(self, id):
        try:
            user = get_User_Info(self.request)
            order = Orders.objects.filter(user_id=user['user_id']).get(id=id)
            return order
        except Orders.DoesNotExist:
            raise Http404

    def get(self, request, id, format=None):
        order = self.get_user_defined_object(id)
        serializer = GetOrdersSerializer(order)

        responses = {
            'message': 'Order request was successful',
            'data': serializer.data
        }

        return response.Response(responses, status=status.HTTP_200_OK)

    def delete(self, request, id, format=None):
        order = self.get_user_defined_object(id)
        if order.status == 'completed':
            order.delete()
            return response.Response({'message': "Order has been deleted"},status=status.HTTP_204_NO_CONTENT)
        return response.Response({'error': "Order not deleted"},status=status.HTTP_400_BAD_REQUEST)


class VendorOrdersAPIView(GenericAPIView):
    serializer_class = GetOrdersSerializer
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        vendor = get_User_Info(self.request)
        orders = Orders.objects.filter(dish_id__vendor=vendor['user_id'])
        serializer = GetOrdersSerializer(orders, many=True)
        if len(serializer.data) > 0:
            responses = {
                'message': 'Orders request successful',
                'data': serializer.data
            }
            return response.Response(responses, status=status.HTTP_200_OK)
        return response.Response({'detail': 'Orders are not available'}, status=status.HTTP_404_NOT_FOUND)


class VendorOrdersDetailAPIView(GenericAPIView):
    serializer_class = GetOrdersSerializer
    post_serializer_class = PostOrdersSerializer
    permission_classes = (IsAuthenticated,)

    def get_object(self, id):
        try:
            return Orders.objects.get(id=id)
        except Orders.DoesNotExist:
            raise Http404
    
    def get_user_defined_object(self, id):
        try:
            vendor = get_User_Info(self.request)
            order = Orders.objects.filter(dish_id__vendor=vendor['user_id']).get(id=id)
            return order, vendor
        except Orders.DoesNotExist:
            raise Http404

    def get(self, request, id, format=None):
        order, vendor = self.get_user_defined_object(id)
        serializer = GetOrdersSerializer(order)
        
        responses = {
            'message' : 'Order request successful',
            'data': serializer.data
        }
        return response.Response(responses, status=status.HTTP_200_OK)

    def put(self, request, id, format=None):
        order, vendor = self.get_user_defined_object(id)

        serializer = PostOrdersSerializer(data = request.data)

        if serializer.is_valid():
            serializer.save()
            post_vendor_notification(vendor, order)
            responses = {
            'message': 'Request successful',
            'data': serializer.data
        }
            return response.Response(responses, status=status.HTTP_200_OK)
        return response.Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@receiver(post_save, sender=Notifications)
def post_notification(sender, **kwargs):
    notify = kwargs['instance']
    notification_owner = notify.received_by
    received_by = User.objects.get(email=notification_owner)
    all_a_user_notifications = Notifications.objects.filter(received_by=received_by.id)
    not_viewed = len(all_a_user_notifications.filter(viewed=False))

    user = User.objects.get(email=notification_owner)
    user.notifications = not_viewed
    user.save()

    
