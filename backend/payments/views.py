from rest_framework import status, response
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView
from .serializers import PaymentSerializer, CurrencyRatesSerializer
from .models import Payment, CurrencyRates
from django.core.management import call_command


class PaymentView(ListAPIView):
    serializer_class = PaymentSerializer
    queryset = Payment.objects.all().order_by('-created_at')
    filterset_fields = ['paid_amount']


class CurrencyRatesView(APIView):
    def get(self, request):
        VND = CurrencyRates.objects.filter(currency='VND').first().rate
        EUR = CurrencyRates.objects.filter(currency='EUR').first().rate
        GBP = CurrencyRates.objects.filter(currency='GBP').first().rate
        data = {
            "VND": VND,
            "EUR": EUR,
            "GBP": GBP,
        }
        serializer = CurrencyRatesSerializer(data)
        return response.Response(serializer.data, status=status.HTTP_200_OK)


class UpdateRates(APIView):
    def post(self, request):
        call_command('update_rates')
        return response.Response(status=status.HTTP_200_OK)
