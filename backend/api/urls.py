from django.urls import path, include
urlpatterns = [
    path('payments/', include('payments.urls')),
    path('customers/', include('customers.urls')),
    path('orders/', include("orders.urls")),
    path('statements/', include("statement.urls"))
]
