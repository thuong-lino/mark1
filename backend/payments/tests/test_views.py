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
        order = baker.make("orders.Order", weight=5, unit_price=1)
        data = {
            "order": order.pk,
            "paid_amount": 2,
        }
        res = self.client.patch(reverse('update_payment'), data, format='json')
        self.assertEqual(res.data['total_amount'], 3)
        self.assertEqual(res.status_code, 200)
