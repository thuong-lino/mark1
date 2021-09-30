from django.urls import path, include
from payments.views import PaymentView

urlpatterns = [
    path('payments/', PaymentView.as_view(), name='payments'),
    path('customers/', include('customers.urls')),
    path('orders/', include("orders.urls")),
]
