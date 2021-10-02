from rest_framework import serializers
from .models import Customer, CustomerTransaction


class CustomerSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(required=False)

    class Meta:
        model = Customer
        fields = ['firstname', 'lastname', 'phone_number', 'DOB',
                  'email', 'TIN', 'address', 'last_transaction']


class CustomerTransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomerTransaction
        fields = ['customer', 'amount']
