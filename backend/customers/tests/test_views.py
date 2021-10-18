from common.utils.tests import TestCaseUtils
from customers.models import Customer


class TestCustomersViews(TestCaseUtils):
    def test_nonadmin_cannot_add_transaction(self):
        customer = self.prepare_customers()[0]
        self.customer_add_orders(10, customer)
        payload = {
            "customer_id": customer.id,
            "amount": 5,
            "currency": "USD"
        }
        url = self.reverse("add_transaction")
        res = self.auth_client.post(url, payload, format='json')
        self.assertEqual(res.status_code, 403)

    def test_add_transactions(self):
        customer = self.prepare_customers()[0]
        print(customer)
        orders = self.customer_add_orders(10, customer)
        payload = {
            "customer_id": customer.id,
            "amount": 5,
            "currency": "USD"
        }
        url = self.reverse("add_transaction")
        res = self.admin_user.post(url, payload, format='json')
        import pdb
        pdb.set_trace()
        self.assertEqual(res.status_code, 201)
