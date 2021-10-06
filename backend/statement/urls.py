from django.urls import path
from .views import StatementView, OpenPeriodView, ClosePeriodView, PeriodView
urlpatterns = [
    path('', StatementView.as_view(), name='statements'),
    path('open_period/', OpenPeriodView.as_view(), name="open_period"),
    path('close_period/', ClosePeriodView.as_view(), name="close_period"),
    path('periods/', PeriodView.as_view(), name='period')
]
