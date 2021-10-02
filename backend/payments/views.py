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


class UpdatePaymentView(APIView):
    serializer_class = UpdatePaymentSerializer

    def post(self, request, format=None):
        data = request.data
        action = data['action']
        pass

    def patch(self, request, format=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            order = serializer.data['order']
            #paid_amount = serializer.data['paid_amount']
            amount = Decimal(serializer.data['amount'])
            queryset = Payment.objects.filter(order=order)
            if not queryset.exists():
                return response.Response({"msg": "Payment Not Found"}, status=status.HTTP_400_BAD_REQUEST)
            payment = queryset.first()
            payment.paid_amount += amount
            payment.save(update_fields=['paid_amount'])
            # push to history
            push_payment_history(order, amount)
            return response.Response(PaymentSerializer(payment).data, status=status.HTTP_200_OK)

        return response.Response({"msg": "Invalid Data"}, status=status.HTTP_400_BAD_REQUEST)
