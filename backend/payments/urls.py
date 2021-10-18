from django.urls import path
from .views import PaymentView, CurrencyRatesView, UpdateRates
urlpatterns = [
    path('', PaymentView.as_view(), name='payments'),
    path('currency_rates/', CurrencyRatesView.as_view()),
    path('update_rates/', UpdateRates.as_view()),
]
