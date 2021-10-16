from re import search
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
        fields = ['id', 'customer', 'item', 'unit', 'quantity', 'weight', 'currency',
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
        data['currency'] = 'USD'
        if type(data['weight']) == str:
            data['weight'] = Decimal(data['weight'])
        order = Order.objects.create(**data)
        try:

            return order
        except:
            return False


class MonthlyOrderSerializer(serializers.Serializer):
    day = serializers.DateField()
    total_order = serializers.IntegerField()


class OrderStatisticsSerializer(serializers.Serializer):
    orders_today = serializers.IntegerField()
    orders_yesterday = serializers.IntegerField()
    order_rate = serializers.DecimalField(max_digits=10, decimal_places=2)
    amount_today = serializers.DecimalField(max_digits=10, decimal_places=2)
    amount_yesterday = serializers.DecimalField(
        max_digits=10, decimal_places=2)
    amount_rate = serializers.DecimalField(max_digits=10, decimal_places=2)
    orders_in_month = serializers.IntegerField()
    orders_in_previous_month = serializers.IntegerField()
    order_month_rate = serializers.DecimalField(
        max_digits=10, decimal_places=2)
    monthly = MonthlyOrderSerializer(many=True)
