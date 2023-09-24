from django.test import TestCase
from mixer.backend.django import mixer
from ..models import *
# Create your tests here.


class TreeTypeTest(TestCase):
    
    def setUp(self):
        self.tree1 = mixer.blend(TreeType)
        self.tree2 = mixer.blend(TreeType)

    def test_get_tree(self):
        """Checks get_or_none method
        """
        t = TreeType.objects.get_or_none(id=self.tree1.id)
        self.assertEquals(t, self.tree1, f"The return value has to be {self.tree1}")
        t = TreeType.objects.get_or_none(id=1000) #random big id which does not exist
        self.assertEquals(t, None, "Should return None")