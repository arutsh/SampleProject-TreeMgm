from django.db import models

from django.core.exceptions import ObjectDoesNotExist
from . import *

class TreeTypeManager(models.Manager):
    """Tree Type Manager
    CRUD for tree type model
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
    
    def delete(self, ids):
        
        # print(f"I am delete function and deleteing tree types with following ids {ids}")
        self.filter(id__in=ids).delete()

    def update(self, id, **kwargs):
        """Updates tree type data for given id

        :return: None
        :rtype: None
        """
        self.filter(id=id).update(**kwargs)
        
        
        

    
    
    


