from rest_framework import serializers
from .models import Payment
from orders.serializers import OrderSerializer


class PaymentSerializer(serializers.ModelSerializer):
    total_amount = serializers.ReadOnlyField()
    order = OrderSerializer()
    updated_at = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S")

    class Meta:
        model = Payment
        fields = ['order', 'paid_amount', 'total_amount', 'updated_at']
        ordering = ['updated_at']
