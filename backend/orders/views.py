from decimal import Decimal
from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import Order
from payments.models import Payment
from statement.models import Statement
from .serializers import ReadOrderSerializer, WriteOrderSerializer
from payments.utils import recalculate_needed_paid, recalculate_transaction_debit
from statement.utils import find_period_is_open
a = """
                                  _
                               _ooOoo_
                              o8888888o
                              88" . "88
                              (| -_- |)
                              O\  =  /O
                           ____/`---'\____
                         .'  \\|     |//  `.
                        /  \\|||  :  |||//  \
                       /  _||||| -:- |||||_  \
                       |   | \\\  -  /'| |   |
                       | \_|  `\`---'//  |_/ |
                       \  .-\__ `-. -'__/-.  /
                     ___`. .'  /--.--\  `. .'___
                  ."" '<  `.___\_<|>_/___.' _> \"".
                 | | :  `- \`. ;`. _/; .'/ /  .' ; |
                 \  \ `-.   \_\_`. _.'_/_/  -' _.' /
       ===========`-.`___`-.__\ \___  /__.-'_.'_.-'================
                               `=--=-'           thuong stolen from internet
"""


class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()

    def get_serializer_class(self):
        if (self.request.method == "GET"):
            return ReadOrderSerializer
        return WriteOrderSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        order_id = serializer.data['id']
        needed_paid = serializer.data['total']
        customer = serializer.data['customer']
        amount = Decimal(serializer.data['total'])
        period = find_period_is_open()

        # add payment according to order
        Payment.objects.create(order_id=order_id, needed_paid=needed_paid)

        statement_qs = Statement.objects.filter(
            customer=customer, period=period)
        if not statement_qs.exists():
            statement = Statement.objects.create(
                customer_id=customer, period=period, transaction_debit=amount)
            statement.save()
        else:
            statement = statement_qs.first()
            statement.transaction_debit += amount
            statement.save()

        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(
            instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        customer_id = serializer.validated_data['customer'].id
        self.perform_update(serializer)
        # change payment value
        recalculate_needed_paid(instance)
        recalculate_transaction_debit(customer_id)

        if getattr(instance, '_prefetched_objects_cache', None):
            # If 'prefetch_related' has been applied to a queryset, we need to
            # forcibly invalidate the prefetch cache on the instance.
            instance._prefetched_objects_cache = {}

        return Response(serializer.data)
