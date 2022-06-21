from django.contrib import admin
from . import models

# Register your models here.

@admin.register(models.Comments)
class AuthorAdmin(admin.ModelAdmin):
    list_display = ('id', 'comment')