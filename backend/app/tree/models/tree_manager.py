from django.db import models

from django.core.exceptions import ObjectDoesNotExist
from . import *

class TreeManager(models.Manager):
    """Tree Manager
    CRUD for tree model
    """
    
    def get_or_none(self, **kwargs):
        """Try to get requestied item, if does not exist return None

        :return: item or None
        :rtype: Tree
        """
        return self.filter(**kwargs).first()
    
    
    def create(self, **kwargs):
        """Overriding create function just in case we have to do something with arguments before we create new record
        """

        return super(models.Manager, self).create(**kwargs)




    
    


