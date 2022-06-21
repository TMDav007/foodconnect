from saved_dishes import views
from django.urls import path

urlpatterns = [
    path('', views.Saved_DishesAPIView.as_view(), name='saved-dishes'),
    path('<int:id>', views.Saved_DishesDetailAPIView.as_view(), name="saved-dish")
]