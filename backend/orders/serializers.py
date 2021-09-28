from rest_framework import serializers
from .models import Order


class OrderSerializer(serializers.ModelSerializer):
    date_sent = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S")
    date_flight = serializers.DateTimeField(
        format="%Y-%m-%d %H:%M:%S", required=False)
    date_received = serializers.DateTimeField(
        format="%Y-%m-%d %H:%M:%S", required=False)

    class Meta:
        model = Order
        fields = "__all__"
