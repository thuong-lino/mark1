from .models import Statement, Period
from rest_framework import serializers


class StatementSerializer(serializers.ModelSerializer):
    customer = serializers.StringRelatedField()
    period = serializers.StringRelatedField()

    class Meta:
        model = Statement
        fields = "__all__"


class PeriodSerializer(serializers.ModelSerializer):
    class Meta:
        model = Period
        fields = ['id', 'open_date', 'close_date', 'is_close']
