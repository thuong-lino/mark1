from rest_framework import serializers
from rest_framework.relations import StringRelatedField
from .models import Customer, CustomerTransaction


class StringSerializer(serializers.StringRelatedField):
    def to_internal_value(self, data):
        return super().to_internal_value(data)


class CustomerSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(required=False)

    class Meta:
        model = Customer
        fields = ['firstname', 'lastname', 'phone_number', 'DOB',
                  'email', 'TIN', 'address', 'last_transaction']


class CustomerTransactionSerializer(serializers.ModelSerializer):
    amount = serializers.DecimalField(
        min_value=0, max_digits=15, decimal_places=2)
    customer_id = serializers.IntegerField()

    class Meta:
        model = CustomerTransaction
        fields = ['customer_id', 'amount', 'currency']


class HistorySerializer(serializers.ModelSerializer):
    created_at = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S")
    customer = StringSerializer()

    class Meta:
        model = CustomerTransaction
        fields = ['customer', 'amount', 'created_at']
