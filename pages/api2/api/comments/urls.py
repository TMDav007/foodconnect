from .views import CommentsAPIView, CommentsDetailAPIView
from django.urls import path

urlpatterns = [
    path('<int:dish_id>', CommentsAPIView.as_view(), name="comments"),
    path('<int:dish_id>/<int:id>', CommentsDetailAPIView.as_view(), name="comment")
]