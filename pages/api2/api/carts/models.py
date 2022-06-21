from django.db import models
from authentication.models import User
from dishes.models import Dishes

# Create your models here.
class Carts(models.Model):
    owner = models.ForeignKey(to = User, on_delete=models.CASCADE, related_name ='owner')
    dish = models.ForeignKey(to = Dishes, on_delete=models.CASCADE)
    selected = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    ordered = models.BooleanField(default=False)

    class Meta:
        ordering = ('created_at',)