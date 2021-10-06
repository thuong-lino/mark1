from model_bakery import baker
from common.utils.tests import TestCaseUtils
from datetime import datetime
from ..serializers import WriteOrderSerializer


class TestOrderSerializer(TestCaseUtils):
    def test_write_serializer(self):
        period = baker.make("statement.Period")
        customer = baker.make("customers.Customer")
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
