from django.test import TestCase
from mixer.backend.django import mixer
from django.utils import timezone
from ..models import *
# Create your tests here.


class TreeTest(TestCase):
    
    def setUp(self):
        self.tree1 = mixer.blend(Tree)
        self.tree2 = mixer.blend(Tree)
        self.tree3 = mixer.blend(Tree)
  


    def test_get_trees(self):
        """Checks get_or_none method
        """
        t = Tree.objects.get_or_none(id=self.tree1.id)
        self.assertEquals(t, self.tree1, f"The return value has to be {self.tree1}")
        t = Tree.objects.get_or_none(id=1000) #random big id which does not exist
        self.assertEquals(t, None, "Should return None")

    def test_create_tree(self):
        tree_type = mixer.blend(TreeType)
        tree = {"identifier" : "TEST-TREE-ID",
                "type" : tree_type.id,
                "location": "Forest1",
                "planted_on": timezone.now()}
        
        t = Tree.objects.create(**tree)
        self.assertIsInstance(t, Tree, f"{t} has to be TreeType, but it is {type(t)}")

    def test_update_tree(self):
        tree_type = mixer.blend(TreeType)

        tree = { "identifier" : "TEST-TREE-ID-2",
                "type" : tree_type,
                "location": "Forest1",
                "planted_on": timezone.now()}
        # CASE 1: tree type instance is passed
        Tree.objects.update(id=self.tree1.id, **tree)
        # Checks if identifier is updated
        self.assertEqual(tree['identifier'], 
                         Tree.objects.get(pk=self.tree1.id).identifier, 
                         f"{tree['identifier']} has to be equal {Tree.objects.get(pk=self.tree1.id)}")
        # Checks if tree type is updated
        self.assertEqual(tree_type.name,
                         Tree.objects.get(pk=self.tree1.id).type.name,
                         f"{tree_type.name} has to be equal {Tree.objects.get(pk=self.tree1.id).type.name}")
        

        # CASE 2:  instead of tree type , tree type id is passed:
        tree = { "identifier" : "TEST-TREE-ID-2",
                "type" : tree_type.id,
                "location": "Forest1",
                "planted_on": timezone.now()}
        Tree.objects.update(id=self.tree1.id, **tree)
         # Checks if identifier is updated
        self.assertEqual(tree['identifier'], 
                         Tree.objects.get(pk=self.tree1.id).identifier, 
                         f"{tree['identifier']} has to be equal {Tree.objects.get(pk=self.tree1.id)}")
        # Checks if tree type is updated
        self.assertEqual(tree_type.name,
                         Tree.objects.get(pk=self.tree1.id).type.name,
                         f"{tree_type.name} has to be equal {Tree.objects.get(pk=self.tree1.id).type.name}")
        


        # CASE 3:  UNKNOWN is passed for tree type
        tree = { "identifier" : "TEST-TREE-ID-2",
                "type" : 1234,
                "location": "Forest1",
                "planted_on": timezone.now()}
        Tree.objects.update(id=self.tree1.id, **tree)
         # Checks if identifier is updated
        self.assertEqual(tree['identifier'], 
                         Tree.objects.get(pk=self.tree1.id).identifier, 
                         f"{tree['identifier']} has to be equal {Tree.objects.get(pk=self.tree1.id)}")
        # Checks if tree type is updated
        self.assertEqual(tree_type.name,
                         Tree.objects.get(pk=self.tree1.id).type.name,
                         f"{tree_type.name} has to be equal {Tree.objects.get(pk=self.tree1.id).type.name}")
        


    def test_delete_tree(self):
        id = self.tree1.id
        Tree.objects.delete(ids=[id])
        t = Tree.objects.all().values_list('id', flat=True)
        # print(f"value list = {t}")
        self.assertNotIn(id, t, f" {id} should not be in the list")

