from rest_framework.serializers import ModelSerializer
from .models import Saved_Dishes
from authentication.serializers import UserSerializer
from dishes.serializers import GetDishSerializer

class Saved_DishesSerializer(ModelSerializer):
    class Meta:
        model = Saved_Dishes
        fields = '__all__'

class Get_Saved_DishesSerializer(ModelSerializer):
    user = UserSerializer(read_only=True)
    dish = GetDishSerializer(read_only=True)
    class Meta:
        model = Saved_Dishes
        fields = '__all__'