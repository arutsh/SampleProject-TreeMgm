from django.db import models
from basemodel.models import BaseModel
from . import *

class Tree(BaseModel):
    """Tree module to inventory all the tree that are used in the report

    :param BaseModel: Basemodel which is abstract parent model for all the classes, 
    :type BaseModel: abstract
    
    """
    # each tree in inventory has unique tag / identifier
    identifier = models.CharField(max_length=50)
    type = models.ForeignKey(TreeType, on_delete=models.CASCADE)
    # TODO location can be more specific, defined in seperate model
    #  or geo location... something can be discussed with user
    location = models.CharField(max_length=100)
    # approximate planted date if unknown
    planted_on = models.DateField()

    objects = TreeManager()


    def __str__(self) -> str:
        return self.identifier



    
    


