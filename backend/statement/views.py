from rest_framework.generics import ListAPIView
from .models import Statement, Period
from .serializers import StatementSerializer
# Create your views here.


class StatementView(ListAPIView):
    serializer_class = StatementSerializer
    queryset = Statement.objects.all()
    filterset_fields = ['period']
