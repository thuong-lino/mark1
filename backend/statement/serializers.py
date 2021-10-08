from .models import Statement, Period
from rest_framework import serializers


class StatementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Statement
        fields = "__all__"


class PeriodSerializer(serializers.ModelSerializer):
    class Meta:
        model = Period
        fields = ['open_date', 'close_date', 'is_close']
