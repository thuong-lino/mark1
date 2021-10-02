from rest_framework import viewsets, views, status
from rest_framework.response import Response
from .serializers import CustomerSerializer, CustomerTransactionSerializer
from .models import Customer
from rest_framework.permissions import IsAdminUser


class CustomerViewSet(viewsets.ModelViewSet):
    serializer_class = CustomerSerializer
    queryset = Customer.objects.all().order_by('-last_transaction')
    permission_classes = [IsAdminUser]
    pagination_class = None


class AddTransactionView(views.APIView):
    def post(self, request):
        serializer = CustomerTransactionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
