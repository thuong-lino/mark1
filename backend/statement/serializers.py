from .models import Statement
from rest_framework import serializers


class StatementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Statement
        fields = "__all__"
