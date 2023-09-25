from django.db import models
from django.utils import timezone
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
        """
        Overriding create function 
        it received tree type id and subsitutes with tree type object before createing
        in case there is no such id, it just does nothing and returns None
        """
        
        kwargs['planted_on'] = kwargs['planted_on'] or timezone.now()

        kwargs['type'] = TreeType.objects.get_or_none(id=kwargs['type'])

        if kwargs['type']:      
            return super(models.Manager, self).create(**kwargs)
    
    def delete(self, ids):
        
        # print(f"I am delete function and deleteing tree types with following ids {ids}")
        self.filter(id__in=ids).delete()


    def update(self, id, **kwargs):
        """Updates tree data for given id

        :return: updated Tree object
        :rtype: Tree
        """
        # Change type id with object
        if (kwargs['type'] and not isinstance(kwargs['type'], TreeType)):
            kwargs['type'] = TreeType.objects.get_or_none(id=kwargs['type'])
            #  in case type is not TreeType instance, neaither exists when simply remove from dict
            if not kwargs['type']:
                del kwargs['type']
        # print(f"kwargs  after del has values {kwargs}")
        self.filter(id=id).update(modified_on=timezone.now(), **kwargs)

        return self.get(id=id)


    
    


