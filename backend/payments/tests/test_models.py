from .test_setup import TestSetup
from ..models import Payment


class TestModels(TestSetup):

    def test_add_full_paid(self):
        qs = Payment.objects.all()
        payment = qs.first()
        payment.add_paid(payment.order.total)
        self.assertEqual(payment.needed_paid, 0)

    def test_add_invalid_paid(self):
        qs = Payment.objects.all()
        payment = qs.first()
        payment.add_paid(payment.order.total+1)
        self.assertEqual(payment.needed_paid, 0)

    def test_set_paid_full(self):
        pass
