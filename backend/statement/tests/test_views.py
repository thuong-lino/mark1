from .test_setup import TestSetup
from ..models import Statement
from customers.models import CustomerTransaction
from customers.serializers import CustomerTransactionSerializer
from orders.models import Order
from orders.serializers import WriteOrderSerializer
from django.urls import reverse


class TestView (TestSetup):
    def test_cong_don_transaction_debit_and_khach_hang_tra_tien(self):
        # self.client.force_login(self.admin)
        # url = '/api/orders/'
        # orders = Order.objects.all()
        # for o in orders:
        #     payload = WriteOrderSerializer(o).data
        #     res = self.client.post(
        #         url, payload, format='json')
        #     self.assertEqual(res.status_code, 201)
        # qs = Statement.objects.all()
        # self.assertEqual(1, len(qs))

        # url = reverse("add_transaction")
        # data = {
        #     "customer": self.customer,
        #     "amount": 1,
        # }
        # payload = CustomerTransactionSerializer(data).data
        # res = self.client.post(url, payload, format="json")
        # qs = Statement.objects.filter(
        #     customer=self.customer, period=self.period).first()

        # self.assertEqual(qs.transaction_credit, 1)
        # self.assertEqual(res.status_code, 201)
        pass
