from rest_framework import serializers


def validate_paid_amount(amount, total):
    if amount < 0 or amount > total:
        raise serializers.ValidationError(
            {"paid_amount": "Số tiền trả không hợp lệ"})
