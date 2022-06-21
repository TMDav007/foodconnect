from rest_framework.serializers import ModelSerializer
from dishes.models import Dishes, Category, Type
from authentication.serializers import UserSerializer

class TypeSerializer(ModelSerializer):
    class Meta:
        model = Type
        fields = "__all__"

class CategorySerializer(ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"

class DishesSerializer(ModelSerializer):

    class Meta:
        model = Dishes
        fields = ('id', 'name', 'category',
        'price','image', 'procedure', 'type','vendor')

class GetDishSerializer(ModelSerializer):
    vendor = UserSerializer(read_only=True)
    type = TypeSerializer(many=True, read_only = True)
    category = CategorySerializer(many=True,read_only=True)
    class Meta:
        model = Dishes
        fields = '__all__'
