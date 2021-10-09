from django.db import IntegrityError
from rest_framework import serializers
from .models import Order
from users.models import User
from customers.models import Customer
from users.serializers import UserSerializer
from customers.serializers import CustomerSerializer
from statement.utils import find_period_is_open
from statement.models import Period
from common.utils.actions import currency_to_USD


class StringSerializer(serializers.StringRelatedField):
    def to_internal_value(self, value):
        return value


class ReadOrderSerializer(serializers.ModelSerializer):
    customer = StringSerializer()

    class Meta:
        model = Order
        fields = ['id', 'customer', 'item', 'unit', 'quantity', 'weight',
                  'unit_price', 'total', 'date_sent', 'date_flight', 'date_received']


class WriteOrderSerializer(serializers.ModelSerializer):
    user_id = serializers.IntegerField()
    customer_id = serializers.IntegerField()

    class Meta:
        model = Order
        fields = ['id', 'user_id', 'customer_id', 'item', 'unit', 'quantity',
                  'weight', 'unit_price', 'currency', 'date_sent', 'date_flight', "total"]

    def create(self, request):
        data = request.data
        data["period"] = find_period_is_open()
        currency = data['currency']
        data['unit_price'] = currency_to_USD(currency, data['unit_price'])
        try:
            order = Order.objects.create(**data)
            return order
        except:
            return False
