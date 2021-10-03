from .test_setup import TestSetup
from ..models import Statement
from orders.models import Order
from orders.serializers import WriteOrderSerializer
from model_bakery import baker, seq


class TestView (TestSetup):
    def test_cong_don_transaction_debit(self):
        self.client.force_login(self.admin)
        baker.make("orders.Order", customer=self.customer, weight=seq(
            0), unit_price=1, period=self.period, item="giay", unit="doi")
        url = '/api/orders/'
        orders = Order.objects.all()
        for o in orders:
            print(o.total)
            payload = WriteOrderSerializer(o).data
            res = self.client.post(
                url, payload, format='json')
            self.assertEqual(res.status_code, 201)
        qs = Statement.objects.all()
        print(len(orders))
        print(qs.first().transaction_debit)
        self.assertEqual(1, len(qs))
