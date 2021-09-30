from rest_framework import serializers
from .models import Order, Item
from users.serializers import UserSerializer
from customers.serializers import CustomerSerializer


class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = ['name', 'unit']


class OrderSerializer(serializers.ModelSerializer):
    item = ItemSerializer()
    user = UserSerializer()
    customer = CustomerSerializer()
    date_sent = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S")
    date_flight = serializers.DateTimeField(
        format="%Y-%m-%d %H:%M:%S", required=False)
    date_received = serializers.DateTimeField(
        format="%Y-%m-%d %H:%M:%S", required=False)

    class Meta:
        model = Order
        fields = "__all__"
