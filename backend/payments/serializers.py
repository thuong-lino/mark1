from rest_framework import serializers
from orders.serializers import OrderSerializer
from orders.models import Order
from .models import Payment
from .validators import validate_paid_amount


class PaymentSerializer(serializers.ModelSerializer):
    needed_paid = serializers.ReadOnlyField()
    order = OrderSerializer()
    updated_at = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S")

    class Meta:
        model = Payment
        fields = ['order', 'paid_amount', 'needed_paid', 'updated_at']
        ordering = ['updated_at']


class UpdatePaymentSerializer(serializers.ModelSerializer):
    add_paid_amount = serializers.DecimalField(decimal_places=2, max_digits=8)

    class Meta:
        model = Payment
        fields = ['order', 'add_paid']

    def validate(self, data):
        add_paid_amount = data['add_paid_amount']
        qs = Payment.objects.filter(
            order=data['order'])
        if qs.exists():
            total = qs.first().order.total
            validate_paid_amount(add_paid_amount, total)
        else:
            raise serializers.ValidationError({"msg": "Invalid Data"})
        return data
