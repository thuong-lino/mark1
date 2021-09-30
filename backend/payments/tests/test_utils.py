from model_bakery import baker
from .test_setup import TestSetup
from django.urls import reverse


class TestPaymentUtils(TestSetup):
    def test_is_paid(self):
        order = baker.make("orders.Order", weight=5, unit_price=1)
        payment = baker.make("payments.Payment", paid_amount=5, order=order)
        self.assertEqual(payment.is_paid, True)
