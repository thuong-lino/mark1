from django.db.models.aggregates import Count
from rest_framework import serializers, viewsets, views, status
from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from .serializers import CustomerSerializer, CustomerTransactionSerializer, HistorySerializer, CustomerListSerializer
from .models import Customer, CustomerTransaction
from statement.models import Statement, Period
from rest_framework.permissions import IsAdminUser
from common.utils import actions


class CustomerViewSet(viewsets.ModelViewSet):
    serializer_class = CustomerSerializer
    queryset = Customer.objects.all().order_by('-last_transaction')
    pagination_class = None

    def list(self, request, *args, **kwargs):
        qs = Customer.objects.annotate(total_order=Count(
            'order')).order_by('-id')
        serializer = CustomerListSerializer(qs, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class AddTransactionView(views.APIView):

    def post(self, request):
        serializer = CustomerTransactionSerializer(data=request.data)
        if serializer.is_valid():
            amount = serializer.validated_data["amount"]
            currency = serializer.validated_data['currency']
            base_amount = actions.currency_to_USD(currency, amount)
            serializer.validated_data['amount'] = base_amount
            serializer.save()
            customer_id = serializer.data['customer_id']
            #base_amount = amount
            peridod_qs = Period.objects.filter(is_close=False)
            if peridod_qs.exists():
                period = peridod_qs.first()
                statement = Statement.objects.filter(
                    period_id=period, customer_id=customer_id).first()
                statement.transaction_credit += base_amount
                statement.save()

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class HistoryView(ListAPIView):
    serializer_class = HistorySerializer
    queryset = CustomerTransaction.objects.all().order_by('-created_at')[:50]
    pagination_class = None
