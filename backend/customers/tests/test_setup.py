from rest_framework.test import APITestCase
from model_bakery import baker, seq


class TestSetup(APITestCase):
    def testSetupTestData(cls):
        cls.admin = baker.maker("users.User", is_staff=True)
