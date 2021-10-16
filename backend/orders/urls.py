from rest_framework import routers
from .views import OrderViewSet, OrderSeacrhView
from django.urls import path

router = routers.DefaultRouter()
router.register(r'', OrderViewSet, basename="order")
urlpatterns = [
    path('search/', OrderSeacrhView.as_view(), name='order_search')
]

urlpatterns += router.urls
