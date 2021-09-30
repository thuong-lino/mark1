from rest_framework.views import APIView
from rest_framework.generics import ListAPIView, ListCreateAPIView
from .serializers import PaymentSerializer
from .models import Payment


class PaymentView(ListCreateAPIView):
    serializer_class = PaymentSerializer
    queryset = Payment.objects.all()


class UpdatePaymentView(APIView):
    def patch(self, request):
        pass
