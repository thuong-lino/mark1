from rest_framework import viewsets, views, status
from rest_framework.response import Response
from .serializers import CustomerSerializer, CustomerTransactionSerializer
from .models import Customer
from statement.models import Statement, Period
from rest_framework.permissions import IsAdminUser
from decimal import Decimal


class CustomerViewSet(viewsets.ModelViewSet):
    serializer_class = CustomerSerializer
    queryset = Customer.objects.all().order_by('-last_transaction')
    permission_classes = [IsAdminUser]
    pagination_class = None


class AddTransactionView(views.APIView):
    permission_classes = [IsAdminUser]

    def post(self, request):
        serializer = CustomerTransactionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            customer = serializer.data['customer']
            amount = serializer.data["amount"]
            peridod_qs = Period.objects.filter(is_close=False)
            if peridod_qs.exists():
                period = peridod_qs.first()
                statement = Statement.objects.filter(
                    period_id=period, customer_id=customer).first()
                statement.transaction_credit += Decimal(amount)
                statement.save()

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
