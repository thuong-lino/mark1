from rest_framework import status, response
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView, ListCreateAPIView
from .serializers import PaymentSerializer, UpdatePaymentSerializer
from .models import Payment


class PaymentView(ListCreateAPIView):
    serializer_class = PaymentSerializer
    queryset = Payment.objects.all()


"""
data = {
            "order": order.pk,
            "paid_amount": 2,
        }
update paid_amount
"""


class UpdatePaymentView(APIView):
    serializer_class = UpdatePaymentSerializer

    def patch(self, request, format=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            order = serializer.data['order']
            paid_amount = serializer.data['paid_amount']
            queryset = Payment.objects.filter(order=order)
            if not queryset.exists():
                return response.Response({"msg": "Payment Not Found"}, status=status.HTTP_400_BAD_REQUEST)
            payment = queryset.first()
            payment.paid_amount = paid_amount
            payment.save(update_fields=['paid_amount'])
            return response.Response(PaymentSerializer(payment).data, status=status.HTTP_200_OK)

        return response.Response({"msg": "Invalid Data"}, status=status.HTTP_400_BAD_REQUEST)
