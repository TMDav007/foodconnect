from django.db import models
from .validators import file_size
from authentication.models import User

# Create your models here.
class Category(models.Model):
    name=models.CharField(max_length=50)

    def __str__(self):
        return self.name

class Type(models.Model):
    name=models.CharField(max_length=50)

    def __str__(self):
        return self.name


class Dishes(models.Model):
    name = models.CharField(max_length=255)
    procedure = models.TextField()
    image = models.ImageField(upload_to='images/', null=True, max_length=255, blank=True)
    Ingredients=models.TextField(null=True, blank=True)
    price = models.IntegerField(default=0)
    video = models.FileField(upload_to='videos/%y', validators=[file_size], null=True, max_length=255, blank=True)
    nutritional_values = models.TextField(null=True, blank=True)
    category = models.ManyToManyField(Category, default="Local Dish")
    type = models.ManyToManyField(Type, default="normal")
    vendor = models.ForeignKey(to=User, on_delete=models.CASCADE, related_name="vendor")

    def __str__(self):
        return self.name