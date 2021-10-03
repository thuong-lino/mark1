from rest_framework.test import APITestCase
from model_bakery import baker, seq
from customers.models import API_KEY


class TestSetup(APITestCase):

    @classmethod
    def setUpTestData(cls):
        cls.admin = baker.make("users.User", is_staff=True)
        cls.period = baker.make("statement.Period")
        cls.customer = baker.make("customers.Customer")

    def tearDown(self):
        super().tearDown()
