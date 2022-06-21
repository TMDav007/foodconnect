from rest_framework.serializers import ModelSerializer, PrimaryKeyRelatedField, IntegerField
from .models import Orders
from dishes.models import Dishes
from authentication.serializers import UserSerializer
from dishes.serializers import DishesSerializer

class PostOrdersSerializer(ModelSerializer):
    #dish_id = PrimaryKeyRelatedField(queryset=Dishes.objects.all(), pk_field=IntegerField)
    class Meta:
        model = Orders
        fields = '__all__'

class GetOrdersSerializer(ModelSerializer):
    user_id = UserSerializer(read_only=True)
    dish_id = DishesSerializer(many=True, read_only = True)
    class Meta:
        model = Orders
        fields = '__all__'