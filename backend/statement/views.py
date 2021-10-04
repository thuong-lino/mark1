from rest_framework.generics import ListAPIView
from .models import Statement, Period
from .serializers import StatementSerializer
from rest_framework.permissions import IsAdminUser
# Create your views here.


class StatementView(ListAPIView):
    serializer_class = StatementSerializer
    queryset = Statement.objects.all()
    filterset_fields = ['period', "customer"]
    permission_classes = [IsAdminUser]
