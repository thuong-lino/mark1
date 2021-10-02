from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import Order
from .serializers import ReadOrderSerializer, WriteOrderSerializer
from payments.models import Payment


class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()

    def get_serializer_class(self):
        if (self.request.method == "GET"):
            return ReadOrderSerializer
        return WriteOrderSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        order_id = serializer.data['id']
        needed_paid = serializer.data['total']
        # add payment according to order
        payment = Payment.objects.filter(order=order_id).first()
        if not payment:
            p = Payment.objects.create(
                order_id=order_id, needed_paid=needed_paid)
            p.save()
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
