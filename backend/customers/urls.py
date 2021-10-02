from rest_framework.routers import DefaultRouter
from .views import CustomerViewSet, AddTransactionView
from django.urls import path

router = DefaultRouter()
router.register(r'', CustomerViewSet, basename='customer')
urlpatterns = [
    path("add_transaction/", AddTransactionView.as_view(), name='add_transaction')
]
urlpatterns += router.urls
