from django.db import models

from django.contrib.auth.models import AbstractUser

from .user_manager import UserManager


class User(AbstractUser):
    email = models.EmailField(blank=False, max_length=254, verbose_name="email address", unique=True)
    USERNAME_FIELD = "email"
    EMAIL_FIELD = "email"
    REQUIRED_FIELDS = []
    objects = UserManager()
    def __str__(self):
        return self.email