import graphene
import logging

from graphql_jwt.decorators import login_required, permission_required
from ..models import *
from .schema_types import *

# TODO It is much better to use Relay, if the DB is big



class Query(graphene.ObjectType):

    all_trees = graphene.List(
        TreeGrapheneType, 
        tree_ids =  graphene.List(of_type=graphene.ID)
    )

    def resolve_all_trees(root, info, tree_ids = None):
        """Returns list of tree  by given ids, if none is given then returns all

        :param root: _description_
        :type root: _type_
        :param info: _description_
        :type info: _type_
        :param tree_type_ids: _description_, defaults to None
        :type tree_type_ids: _type_, optional
        :return: _description_
        :rtype: _type_
        """
        
        if tree_ids:
            return Tree.objects.filter(id__in=tree_ids)
        return Tree.objects.all()
        
        


class CreateTreeMutation(graphene.Mutation):
    """Creates new tree  

    :param graphene: identifier, type_id, location, plantedOn
    :type graphene: _type_
    :return: _description_
    :rtype: TreeType
    """
    class Arguments:
        identifier = graphene.String(required=True)
        type_id = graphene.ID(required=True)
        location = graphene.String()
        planted_on = graphene.Date()
        

    tree = graphene.Field(TreeGrapheneType)

    @classmethod
    def mutate(cls, root, 
               info, identifier,
               type_id, 
               location=None,
               planted_on=None):
        

        ret = Tree.objects.create(identifier=identifier,
                                    type=type_id,
                                    location=location, 
                                    planted_on=planted_on)
            
        return CreateTreeMutation(ret)


class UpdateTreeMutation(graphene.Mutation):
    """Updates existing tree type 

    :param graphene: id, name, desc, lifespan, oxygen
    :type graphene: _type_
    :return: _description_
    :rtype: TreeType
    """
    class Arguments:
        id = graphene.ID(required=True)
        identifier = graphene.String()
        type_id = graphene.ID()
        location = graphene.String()
        planted_on = graphene.Date()

    tree = graphene.Field(TreeGrapheneType)

    @classmethod
    def mutate(cls, root, 
               info, id,
               identifier=None, 
               type_id=None,
               location=None, 
               planted_on=None):
        
        data = {
        }

        if identifier: 
            data["identifier"] = identifier
        if type_id:
            data['type'] = type_id
        if location:
            data['location'] = location
        if planted_on:
            data['planted_on'] = planted_on
        if data:
            return (UpdateTreeMutation(Tree.objects.update(id=id, **data)))
        
        return UpdateTreeMutation(Tree.objects.get_or_none(id=id))


class DeleteTreeMutation(graphene.Mutation):
    """Delete existing tree  by given list of ids

    :param graphene: id
    :type graphene: _type_
    :return: _description_
    :rtype: Tree
    """
    class Arguments:
        ids = graphene.List(graphene.ID, required=True)

    tree = graphene.Field(graphene.Boolean)

    @classmethod
    def mutate(cls, root, 
               info, ids):
        
        return DeleteTreeMutation(Tree.objects.delete(ids))




class Mutation(graphene.ObjectType):
    create_tree = CreateTreeMutation.Field()
    update_tree = UpdateTreeMutation.Field()
    delete_trees = DeleteTreeMutation.Field()

schema = graphene.Schema(query=Query, mutation=Mutation)