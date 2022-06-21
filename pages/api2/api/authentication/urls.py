from django.urls import path
from .views import RegisterAPIView, VerifyEmail, UserDetailAPIView, LoginAPIView, StaffRegisterAPIView

urlpatterns = [
    path('register/', RegisterAPIView.as_view(), name='register'),
    path('email-verify/', VerifyEmail.as_view(), name='email-verify'),
    path('login/', LoginAPIView.as_view(), name='login'),
    path('user/<int:id>', UserDetailAPIView.as_view(), name='user'),
    path('vendor', StaffRegisterAPIView.as_view(), name='vendor')
]