from django.urls import path, include
from payments.views import PaymentView, UpdatePaymentView
from statement.views import StatementView
urlpatterns = [
    path('payments/', PaymentView.as_view(), name='payments'),
    path('payments/update/', UpdatePaymentView.as_view(), name='update_payment'),
    path('customers/', include('customers.urls')),
    path('orders/', include("orders.urls")),
    path('statements/', StatementView.as_view(), name="statements")
]
