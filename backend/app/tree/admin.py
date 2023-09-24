from django.contrib import admin
from .models import *

# Register your models here.

@admin.register(TreeType)
class TreeTypeAdmin(admin.ModelAdmin):
    list_display = ("created_on", "created_by", "name", "lifespan", "oxygen", "modified_on", "modified_by", "last_viewed_on", "last_viewed_by")
    # list_filter = ("created_on", "name", "description", "lifespan", "oxygen", "modified_on")
    search_fields = ["name"]


@admin.register(Tree)
class TreeAdmin(admin.ModelAdmin):
    list_display = ("created_on", "created_by", "identifier", "type", "location", "modified_on", "modified_by", "last_viewed_on", "last_viewed_by")
    # list_filter = ("created_on", "name", "description", "lifespan", "oxygen", "modified_on")
    search_fields = ["identifier"]
