from django.db import models
from authentication.models import User
from dishes.models import Dishes


# Create your models here.


class Comments(models.Model):
    comment = models.TextField()
    user = models.ForeignKey(to = User, on_delete=models.CASCADE)
    dish = models.ForeignKey(to = Dishes, on_delete=models.PROTECT)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ('-created_at',)