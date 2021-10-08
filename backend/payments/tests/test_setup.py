from rest_framework.test import APITestCase
from model_bakery import baker, seq


class TestSetup(APITestCase):

    @classmethod
    def setUpTestData(cls):
        cls.admin = baker.make("users.User", is_staff=True)
        cls.update_payment_data = {
            "order": 1,  # orderId
            "paid_amount": 1,
        }
        cls.order = baker.make(
            "orders.Order", weight=seq(1.00, increment_by=.50), unit_price=5, _quantity=10)

    def tearDown(self):
        super().tearDown()
