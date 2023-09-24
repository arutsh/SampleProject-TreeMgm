from django.db import models
from basemodel.models import BaseModel
from . import *

class TreeType(BaseModel):
    """Dictonoary to store information about type of trees and some facts

    :param BaseModel: parent model for all classes within this project
    :type BaseModel: Abstract
    
    """
    name = models.CharField(max_length=50)
    description = models.CharField(max_length=1000, null=True, blank=True)
    lifespan = models.IntegerField(null=True, blank=True)
    # Approx Oxygen produced by muture tree per day in liters 
    oxygen=models.IntegerField(null=True, blank=True)

    objects = TreeTypeManager()

    def __str__(self) -> str:
        return self.name
