from django.db import models
from authentication.models import User
from dishes.models import Dishes

# Create your models here.

class Orders(models.Model):
    STATUS = (
        ('pending', 'Pending'),
        ('completed', 'Completed')
    )

    user_id = models.ForeignKey(to = User, on_delete=models.CASCADE)
    dish_id = models.ManyToManyField(Dishes)
    order_date = models.DateTimeField(auto_now_add=True)
    total_price = models.IntegerField()
    status = models.CharField(max_length=11, choices=STATUS, default=('pending'))

    class Meta:
        ordering = ('-order_date',)