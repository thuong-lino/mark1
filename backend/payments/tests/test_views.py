from model_bakery import baker
from .test_setup import TestSetup
from django.urls import reverse


class TestPayments(TestSetup):
    def test_anon_cannot_get_payments_list(self):
        res = self.client.get(reverse('payments'))
        self.assertEqual(res.status_code, 403)

    def test_admin_can_get_payments_list(self):
        self.client.force_login(self.admin)
        res = self.client.get(reverse('payments'))
        self.assertEqual(res.status_code, 200)

    # def test_anon_cannot_update_payment(self):
    #     res = self.client.post(reverse('create_payment'))
    #     self.assertEqual(res.status_code, 403)

    def test_admin_can_update_payment(self):
        self.client.force_login(self.admin)
        data = {
            "order": self.order[0].pk,
            "paid_amount": 2,
            "add_paid": 2.00,
        }
        pass
