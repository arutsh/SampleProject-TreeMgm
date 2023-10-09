import graphene
import logging

from graphql_jwt.decorators import login_required, permission_required
from graphene_django import DjangoObjectType
from ..models import *
from .schema_types import *
# TODO It is much better to use Relay, if the DB is big




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


class UpdateTreeTypeMutation(graphene.Mutation):
    """Updates existing tree type 

    :param graphene: id, name, desc, lifespan, oxygen
    :type graphene: _type_
    :return: _description_
    :rtype: TreeType
    """
    class Arguments:
        id = graphene.ID(required=True)
        name = graphene.String()
        description = graphene.String()
        lifespan = graphene.Int()
        oxygen = graphene.Int()

    tree_type = graphene.Field(TreeTypeType)

    @classmethod
    def mutate(cls, root, 
               info, id,
               name=None, 
               description=None,
               lifespan=None, 
               oxygen=None):
        
        data = {
        }

        if name: 
            data["name"] = name
        if description:
            data['description'] = description
        if lifespan:
            data['lifespan'] = lifespan
        if oxygen:
            data['oxygen'] = oxygen
        if data:
            TreeType.objects.update(id=id, **data)
        
        return UpdateTreeTypeMutation(TreeType.objects.get(pk=id))


class DeleteTreeTypeMutation(graphene.Mutation):
    """Delete existing tree types by given list of ids

    :param graphene: id
    :type graphene: _type_
    :return: _description_
    :rtype: TreeType
    """
    class Arguments:
        ids = graphene.List(graphene.ID, required=True)

    tree_type = graphene.Field(graphene.Boolean)

    @classmethod
    def mutate(cls, root, 
               info, ids):
        
        return DeleteTreeTypeMutation(TreeType.objects.delete(ids))




class Mutation(graphene.ObjectType):
    create_tree_type = CreateTreeTypeMutation.Field()
    update_tree_type = UpdateTreeTypeMutation.Field()
    delete_tree_types = DeleteTreeTypeMutation.Field()

schema = graphene.Schema(query=Query, mutation=Mutation)