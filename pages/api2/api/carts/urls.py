from carts import views
from django.urls import path

urlpatterns = [
    path('', views.CartAPIView.as_view(), name='carts'),
    path('<int:id>', views.CartDetailAPIView.as_view(), name="cart")
]