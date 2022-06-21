from rest_framework.serializers import ModelSerializer
from .models import Carts
from authentication.serializers import UserSerializer
from dishes.serializers import GetDishSerializer


class GetCartSerializer(ModelSerializer):
    owner =  UserSerializer(read_only=True)
    dish = GetDishSerializer(read_only=True)
    class Meta:
        model = Carts
        fields = '__all__'

class CartSerializer(ModelSerializer):
    class Meta:
        model = Carts
        fields = '__all__'