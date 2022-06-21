from .views import DishesAPIView, DishesDetailAPIView, AllDishesDetailAPIView

from django.urls import path

urlpatterns = [
    path('', DishesAPIView.as_view(), name="dishes"),
    path('<int:id>', DishesDetailAPIView.as_view(), name="dish"),
    path('all', AllDishesDetailAPIView.as_view(), name="all_dishes")
]