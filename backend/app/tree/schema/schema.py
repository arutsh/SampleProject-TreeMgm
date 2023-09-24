import graphene
import logging

from graphql_jwt.decorators import login_required, permission_required
from graphene_django import DjangoObjectType
from ..models import *

# TODO It is much better to use Relay, if the DB is big


class TreeTypeType(DjangoObjectType):
    class Meta:
        model = TreeType
        fields = "__all__"

class Query(graphene.ObjectType):
   

    all_tree_types = graphene.List(
        TreeTypeType, 
        tree_type_ids =  graphene.List(of_type=graphene.ID)
    )

    def resolve_all_tree_types(root, info, tree_type_ids = None):
        """Returns list of tree types by given ids, if none is given then returns all

        :param root: _description_
        :type root: _type_
        :param info: _description_
        :type info: _type_
        :param tree_type_ids: _description_, defaults to None
        :type tree_type_ids: _type_, optional
        :return: _description_
        :rtype: _type_
        """
        
        if tree_type_ids:
            return TreeType.objects.filter(id__in=tree_type_ids)
        return TreeType.objects.all()
        
        


class CreateTreeTypeMutation(graphene.Mutation):
    """Creates new tree type 

    :param graphene: name, desc, lifespan, oxygen
    :type graphene: _type_
    :return: _description_
    :rtype: TreeType
    """
    class Arguments:
        name = graphene.String(required=True)
        description = graphene.String()
        lifespan = graphene.Int()
        oxygen = graphene.Int()

    tree_type = graphene.Field(TreeTypeType)

    @classmethod
    def mutate(cls, root, 
               info, name, 
               description=None,
               lifespan=None, 
               oxygen=None):
        
        ret = TreeType.objects.create(name=name,
                                      description=description,
                                      lifespan=lifespan, 
                                      oxygen=oxygen)
        
        return CreateTreeTypeMutation(ret)


class Mutation(graphene.ObjectType):
    create_tree_type = CreateTreeTypeMutation.Field()

schema = graphene.Schema(query=Query, mutation=Mutation)