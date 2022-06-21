from notifications import views
from django.urls import path

urlpatterns = [
    path('', views.NotificationsAPIView.as_view(), name='notifications'),
    path('<int:id>', views.NotificationsAPIDetailView.as_view(), name="notification")

]