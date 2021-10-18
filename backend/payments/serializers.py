from rest_framework import serializers
from orders.serializers import ReadOrderSerializer
from orders.models import Order
from .models import Payment
from .validators import validate_paid_amount


class PaymentSerializer(serializers.ModelSerializer):
    needed_paid = serializers.ReadOnlyField()
    order = ReadOrderSerializer()
    updated_at = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S")

    class Meta:
        model = Payment
        fields = ['order', 'paid_amount', 'needed_paid', 'updated_at']
        ordering = ['updated_at']


class UpdatePaymentSerializer(serializers.ModelSerializer):
    amount = serializers.DecimalField(decimal_places=2, max_digits=8)

    class Meta:
        model = Payment
        fields = ['order', 'amount']

    def validate(self, data):
        amount = data['amount']
        qs = Payment.objects.filter(
            order=data['order'])
        if qs.exists():
            total = qs.first().order.total
            validate_paid_amount(amount, total)
        else:
            raise serializers.ValidationError({"msg": "Invalid Data"})
        return data


class CurrencyRatesSerializer(serializers.Serializer):
    VND = serializers.DecimalField(max_digits=10, decimal_places=2)
    GBP = serializers.DecimalField(max_digits=10, decimal_places=2)
    EUR = serializers.DecimalField(max_digits=10, decimal_places=2)
