from rest_framework import viewsets
from .serializers import CustomerSerializer
from .models import Customer
from rest_framework.permissions import IsAdminUser


class CustomerViewSet(viewsets.ModelViewSet):
    serializer_class = CustomerSerializer
    queryset = Customer.objects.all().order_by('-last_transaction')
    permission_classes = [IsAdminUser]
    pagination_class = None
