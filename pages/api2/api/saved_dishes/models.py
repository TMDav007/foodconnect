from django.db import models
from authentication.models import User
from dishes.models import Dishes

# Create your models here.

class Saved_Dishes(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user')
    dish = models.ForeignKey(Dishes, on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ('-created',)