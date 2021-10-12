from rest_framework import routers
from .views import OrderViewSet, OrderStatusViewList
from django.urls import path

router = routers.DefaultRouter()
router.register(r'', OrderViewSet, basename="order")
urlpatterns = [
    path('order_status/', OrderStatusViewList.as_view(), name='order_status')
]

urlpatterns += router.urls
