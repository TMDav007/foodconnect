from orders import views
from django.urls import path

urlpatterns = [
    path('user-order/', views.UserOrdersAPI.as_view(), name='user-orders'),
    path('user-order/<int:id>', views.UserOrdersDetailAPIView.as_view(), name='user-order'),
    path('vendor-order/', views.VendorOrdersAPIView.as_view(), name='vendor-orders'),
    path('vendor-order/<int:id>', views.VendorOrdersDetailAPIView.as_view(), name='vendor-order'),
]