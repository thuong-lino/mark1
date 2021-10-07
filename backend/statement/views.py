from rest_framework.generics import ListAPIView
from rest_framework import views, response, status
from .models import Statement, Period
from .serializers import PeriodSerializer, StatementSerializer
from rest_framework.permissions import IsAdminUser

from .utils import now, find_period_is_open
# Create your views here.


class StatementView(ListAPIView):
    serializer_class = StatementSerializer
    queryset = Statement.objects.all()
    filterset_fields = ['period', 'customer']
    permission_classes = [IsAdminUser]


class PeriodView(ListAPIView):
    serializer_class = PeriodSerializer
    queryset = Period.objects.all()


class OpenPeriodView(views.APIView):
    permission_classes = [IsAdminUser]

    def post(self, request, *args, **kwargs):
        qs = Period.objects.filter(is_close=False)  # filter period is open
        if not qs.exists():
            period = Period.objects.create(is_close=False)
            period.save()
            return response.Response({"msg": "Success"}, status=status.HTTP_201_CREATED)
        return response.Response({"error": "Vui lòng kết thúc một kỳ trước khi mở kỳ mới"}, status=status.HTTP_400_BAD_REQUEST)


class ClosePeriodView(views.APIView):
    permission_classes = [IsAdminUser]

    def post(self, request):
        period = find_period_is_open()  # filter period is open
        if period:
            statements = Statement.objects.filter(period=period)
            period.is_close = True
            period.close_date = now()
            period.save()
            new_period = Period(is_close=False)
            new_period.save()
            for statement in statements:
                new_debit = statement.close_debit
                new_credit = statement.close_credit
                customer = statement.customer
                new_statement = Statement(
                    period=new_period, open_debit=new_debit, open_credit=new_credit, customer=customer)
                new_statement.save()

            return response.Response({"msg": "Success"}, status=status.HTTP_201_CREATED)
        return response.Response({"error": "Không thực hiện được yêu cầu."}, status=status.HTTP_400_BAD_REQUEST)
