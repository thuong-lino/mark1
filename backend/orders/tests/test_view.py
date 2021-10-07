from model_bakery import baker
from .test_setup import TestSetup
from common.utils.tests import TestCaseUtils
from datetime import datetime
from statement.models import Period


class TestOrder(TestCaseUtils):
    def test_add_new_order(self):
        customer = baker.make("customers.Customer")
        period = baker.make("statement.Period", is_close=False)
        order_data = {
            "customer": customer.id,
            "user": self.user.id,
            "item": "test_item",
            "unit": "unit",
            "quantity": 1,
            "weight": 1,
            "unit_price": 5,
            "currency": 'USD',
            "date_sent": datetime.now(),
            "period": period.id
        }
        url = '/api/orders/'
        res = self.auth_client.post(url, order_data, format='json')
        self.assertEqual(res.status_code, 201)

    def test_add_new_order_without_period(self):
        customer = baker.make("customers.Customer")
        period = baker.make("statement.Period", is_close=False)
        order_data = {
            "customer": customer.id,
            "user": self.user.id,
            "item": "test_item",
            "unit": "unit",
            "quantity": 1,
            "weight": 1,
            "unit_price": 5,
            "currency": 'USD',
            "date_sent": datetime.now(),
        }
        url = '/api/orders/'

        res = self.auth_client.post(url, order_data, format='json')
        self.assertEqual(res.status_code, 201)
