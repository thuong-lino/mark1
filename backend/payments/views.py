from rest_framework import status, response, viewsets
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from .serializers import PaymentSerializer, UpdatePaymentSerializer
from .models import Payment
from decimal import Decimal
from .utils import push_payment_history


class PaymentView(ListAPIView):
    serializer_class = PaymentSerializer
    queryset = Payment.objects.all()
    filterset_fields = ['paid_amount']


"""
data = {
            "order": order.pk,
            "paid_amount": 2,
        }
update paid_amount
"""
