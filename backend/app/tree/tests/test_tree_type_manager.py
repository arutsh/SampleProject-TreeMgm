from django.test import TestCase
from mixer.backend.django import mixer
from ..models import *
# Create your tests here.


class TreeTypeTest(TestCase):
    
    def setUp(self):
        self.tree1 = mixer.blend(TreeType)
        self.tree2 = mixer.blend(TreeType)
        self.tree3 = mixer.blend(TreeType)

    def test_get_tree_types(self):
        """Checks get_or_none method
        """
        t = TreeType.objects.get_or_none(id=self.tree1.id)
        self.assertEquals(t, self.tree1, f"The return value has to be {self.tree1}")
        t = TreeType.objects.get_or_none(id=1000) #random big id which does not exist
        self.assertEquals(t, None, "Should return None")

    def test_create_tree_type(self):
        tree_type = { "name" : "TEST_TREE",
                        "oxygen" : 400,
                        "lifespan": 400}
        
        t = TreeType.objects.create(**tree_type)
        self.assertIsInstance(t, TreeType, f"{t} has to be TreeType, but it is {type(t)}")

    def test_update_tree_type(self):
        tree_type = { "name" : "TEST_TREE2",
                        "oxygen" : 400,
                        "lifespan": 400}
        
        TreeType.objects.update(id=self.tree1.id, **tree_type)
        self.assertEqual(tree_type['name'], 
                         TreeType.objects.get(pk=self.tree1.id).name, 
                         f"{tree_type['name']} has to be equal {TreeType.objects.get(pk=self.tree1.id)}")
       

    def test_delete_tree_types(self):
        id = self.tree1.id
        TreeType.objects.delete(ids=[id])
        t = TreeType.objects.all().values_list('id', flat=True)
        # print(f"value list = {t}")
        self.assertNotIn(id, t, f" {id} should not be in the list")

