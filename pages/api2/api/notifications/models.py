from django.db import models
from authentication.models import User
from orders.models import Orders

# Create your models here.

class Notifications(models.Model):
    viewed = models.BooleanField(default=False)
    created_user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='created_user')
    received_by=models.ForeignKey(User, on_delete=models.CASCADE, related_name='received_by')
    detail = models.TextField(blank=True)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    order = models.ForeignKey(Orders, on_delete=models.CASCADE)

    class Meta:
        ordering = ('-created',)