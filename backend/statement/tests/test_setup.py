from rest_framework.test import APITestCase
from model_bakery import baker, seq
from customers.models import API_KEY


class TestSetup(APITestCase):

    @classmethod
    def setUpTestData(cls):
        cls.admin = baker.make("users.User", is_staff=True)
        cls.period = baker.make("statement.Period")
        cls.customer = baker.make("customers.Customer")
        baker.make("orders.Order", customer=cls.customer, weight=seq(0,1,1), unit_price=1,
                   period=cls.period, item="giay", unit="doi", _quantity=5)

    def tearDown(self):
        super().tearDown()
