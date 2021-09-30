from rest_framework.test import APITestCase
from model_bakery import baker
from orders.serializers import OrderSerializer


class TestSetup(APITestCase):

    @classmethod
    def setUpTestData(cls):
        cls.admin = baker.make("users.User", is_staff=True)
        cls.update_payment_data = {
            "order": 1,  # orderId
            "paid_amount": 1,
        }

    def tearDown(self):
        super().tearDown()
