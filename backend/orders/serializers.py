from rest_framework import serializers
from .models import Order
from users.serializers import UserSerializer
from customers.serializers import CustomerSerializer


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
    date_flight = serializers.DateTimeField(
        format="%Y-%m-%d %H:%M:%S", required=False)
    date_received = serializers.DateTimeField(
        format="%Y-%m-%d %H:%M:%S", required=False)

    class Meta:
        model = Order
        fields = "__all__"
