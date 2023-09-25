from graphene_django import DjangoObjectType
from ..models import *

class TreeTypeType(DjangoObjectType):
    class Meta:
        model = TreeType
        fields = "__all__"



class TreeGrapheneType(DjangoObjectType):
    class Meta:
        model = Tree
        fields = "__all__"