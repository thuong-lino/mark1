from django.conf import settings
from rest_framework import serializers
from rest_framework.fields import DateTimeField
from .models import Order

from statement.utils import find_period_is_open
from decimal import Decimal
from common.utils.actions import currency_to_USD


class StringSerializer(serializers.StringRelatedField):
    def to_internal_value(self, value):
        return value


class ReadOrderSerializer(serializers.ModelSerializer):
    customer = StringSerializer()
    date_sent = DateTimeField(format='%Y-%m-%d')

    class Meta:
        model = Order
        fields = ['id', 'customer', 'item', 'unit', 'quantity', 'weight',
                  'unit_price', 'total', 'date_sent', 'date_flight', 'date_received', 'address', 'phone']


class WriteOrderSerializer(serializers.ModelSerializer):
    user_id = serializers.IntegerField()
    customer_id = serializers.IntegerField()

    class Meta:
        model = Order
        fields = ['id', 'user_id', 'customer_id', 'item', 'unit', 'quantity',
                  'weight', 'unit_price', 'currency', "total", 'address', 'phone']

    def create(self, data):
        data["period"] = find_period_is_open()
        currency = data['currency']
        data['unit_price'] = currency_to_USD(currency, data['unit_price'])
        if type(data['weight']) == str:
            data['weight'] = Decimal(data['weight'])
        order = Order.objects.create(**data)
        try:

            return order
        except:
            return False
