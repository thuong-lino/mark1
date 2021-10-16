from datetime import time, timedelta
from rest_framework import serializers, viewsets, status, views
from rest_framework.response import Response
from .models import Order
from payments.models import Payment
from statement.models import Statement
from .serializers import OrderStatisticsSerializer, ReadOrderSerializer, WriteOrderSerializer
from .utils import total_order_in_current_month, total_order_in_previous_month, orders_in_month, orders_today, orders_yesterday, order_totals_today, order_totals_yesterday
from payments.utils import recalculate_needed_paid, recalculate_transaction_debit
from statement.utils import find_period_is_open
from common.utils.actions import now
buddha = """
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
    pagination_class = None

    def get_queryset(self):
        query_set = Order.objects.all().order_by("-date_sent")
        # query_set = Order.objects.filter(
        #     period=find_period_is_open()).order_by("-date_sent")

        period_id = self.request.query_params.get("period")
        if period_id != "null" and period_id != None:
            query_set = Order.objects.filter(
                period_id=period_id).order_by("-date_sent")
        elif period_id == 'null':
            query_set = Order.objects.filter(
                period=find_period_is_open()).order_by("-date_sent")

        return query_set

    def get_serializer_class(self):
        if (self.request.method == "GET"):
            return ReadOrderSerializer
        if (self.request.method == "PATCH"):
            return ReadOrderSerializer
        return WriteOrderSerializer

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = ReadOrderSerializer(instance)
        return Response(serializer.data)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        if not serializer.is_valid():
            return Response({'msg': "Dữ liệu gửi không hợp lệ"}, status=status.HTTP_400_BAD_REQUEST)
        order = serializer.create(serializer.data)
        if not order:
            return Response({'msg': "Dữ liệu gửi không hợp lệ"}, status=status.HTTP_400_BAD_REQUEST)
        customer = order.customer
        amount = order.total
        period = order.period
        # add payment according to order
        Payment.objects.create(order=order, needed_paid=amount)

        statement_qs = Statement.objects.filter(
            customer=customer, period=period)
        if not statement_qs.exists():
            statement = Statement.objects.create(
                customer=customer, period=period, transaction_debit=amount)
            statement.save()
        else:
            statement = statement_qs.first()
            statement.transaction_debit += amount
            statement.save()

        serializer = ReadOrderSerializer(self.get_queryset(), many=True)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(
            instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        customer_id = instance.customer.id
        self.perform_update(serializer)
        # change payment value
        recalculate_needed_paid(instance)
        recalculate_transaction_debit(customer_id)

        if getattr(instance, '_prefetched_objects_cache', None):
            # If 'prefetch_related' has been applied to a queryset, we need to
            # forcibly invalidate the prefetch cache on the instance.
            instance._prefetched_objects_cache = {}

        return Response(serializer.data)


class OrderSeacrhView(views.APIView):
    def post(self, request):
        data = request.data
        try:
            order_id = data['order_id']
            obj = Order.objects.get(pk=order_id)
            return Response(status=status.HTTP_200_OK)
        except:
            return Response({'msg': "Không tìm thấy dữ liệu"}, status=status.HTTP_400_BAD_REQUEST)


class OrderStatistics(views.APIView):
    """
    {
        "orders_today": <int>,
        "orders_yesterday": <int>,
        "order_total_today": <decimal>,
        "order_total_yesterday": <decimal>,
        "orders_in_month": ,
        "orders_in_previous_month": ,
        "monthly" : {
            "day": <date>,
            "total_order" : <int>
        }
    }
    """

    def get(self, request):
        monthly = list(orders_in_month())
        data = {
            "orders_today": orders_today(),
            "orders_yesterday": orders_yesterday(),
            "orders_in_month": total_order_in_current_month(),
            "orders_in_previous_month": total_order_in_previous_month()
        }
        data.update(order_totals_today())
        data.update(order_totals_yesterday())
        data.update({"monthly": monthly})
        serializer = OrderStatisticsSerializer(data)
        return Response(data=serializer.data, status=status.HTTP_200_OK)
