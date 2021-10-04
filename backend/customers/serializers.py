from rest_framework import serializers
from .models import Customer, CustomerTransaction


class CustomerSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(required=False)

    class Meta:
        model = Customer
        fields = ['firstname', 'lastname', 'phone_number', 'DOB',
                  'email', 'TIN', 'address', 'last_transaction']


class CustomerTransactionSerializer(serializers.ModelSerializer):
    amount = serializers.DecimalField(
        min_value=0, max_digits=8, decimal_places=2)

    class Meta:
        model = CustomerTransaction
        fields = ['customer', 'amount']


class HistorySerializer(serializers.ModelSerializer):
    created_at = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S")

    class Meta:
        model = CustomerTransaction
        fields = ['amount', 'created_at']
