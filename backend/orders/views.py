from rest_framework import viewsets, status, views
from rest_framework.response import Response
from .models import Order
from payments.models import Payment
from statement.models import Statement
from .serializers import ReadOrderSerializer, WriteOrderSerializer
from payments.utils import recalculate_needed_paid, recalculate_transaction_debit
from statement.utils import find_period_is_open
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
        query_set = Order.objects.filter(
            period=find_period_is_open()).order_by("-date_sent")
        period_id = self.request.query_params.get("period", None)
        if period_id != None and period_id != "null":
            query_set = Order.objects.filter(
                period_id=period_id).order_by("-date_sent")

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


class OrderStatusViewList(views.APIView):
    def post(self, request):
        """
        input : "1,2,3" string
        return order list with order has pk 1,2,3
        """
        data = request.data
        try:
            ids = [int(x) for x in data.split(',')]
        except:
            return Response({'errors': "Dữ liệu gửi không đúng định dạng"}, status=status.HTTP_400_BAD_REQUEST)
        try:
            list_order = Order.objects.filter(pk__in=ids)
            serializer = ReadOrderSerializer(list_order, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)
