from rest_framework.test import APITestCase
from model_bakery import baker
from customers.models import API_KEY

api_key = API_KEY.objects.all().first().api_key


class TestSetup(APITestCase):

    @classmethod
    def setUpTestData(cls):
        cls.admin = baker.make("users.User", is_staff=True)
        api = API_KEY.objects.create(api_key=api_key, get_link="test")
        api.save()

    def tearDown(self):
        super().tearDown()
