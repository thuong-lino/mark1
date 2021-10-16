from rest_framework import routers
from .views import OrderViewSet, OrderSeacrhView, OrderStatistics
from django.urls import path

router = routers.DefaultRouter()
router.register(r'', OrderViewSet, basename="order")
urlpatterns = [
    path('search/', OrderSeacrhView.as_view(), name='order_search'),
    path('statistics/', OrderStatistics.as_view(), name='order_statistics')
]

urlpatterns += router.urls
