from rest_framework import serializers
from .models import Order
from users.serializers import UserSerializer
from customers.serializers import CustomerSerializer
from statement.utils import find_period_is_open
from statement.models import Period


class StringSerializer(serializers.StringRelatedField):
    def to_internal_value(self, value):
        return value


class ReadOrderSerializer(serializers.ModelSerializer):
    user = StringSerializer()
    customer = CustomerSerializer()
    date_sent = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S")
    date_flight = serializers.DateTimeField(
        format="%Y-%m-%d %H:%M:%S", required=False)
    date_received = serializers.DateTimeField(
        format="%Y-%m-%d %H:%M:%S", required=False)

    class Meta:
        model = Order
        fields = "__all__"


class WriteOrderSerializer(serializers.ModelSerializer):
    date_sent = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S")
    # date_flight = serializers.DateTimeField(
    #     format="%Y-%m-%d %H:%M:%S", required=False)
    # date_received = serializers.DateTimeField(
    #     format="%Y-%m-%d %H:%M:%S", required=False)
    period = serializers.PrimaryKeyRelatedField(
        default=find_period_is_open, queryset=Period.objects.all())

    class Meta:
        model = Order
        fields = ['id', 'user', 'customer', 'item', 'unit', 'quantity',
                  'weight', 'unit_price', 'currency', 'date_sent', 'date_flight', "period", "total"]
