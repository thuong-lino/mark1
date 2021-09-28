from django.urls import path
from payments.views import PaymentView
urlpatterns = [
    path('payments/', PaymentView.as_view())
]
