from django.db.models import Q
from django.db.models.aggregates import Count, Sum
from .models import Order
from decimal import Decimal
from datetime import timedelta
from common.utils.actions import now


def orders_today() -> int:
    """
    return total of orders today
    """
    begin = now().replace(hour=0, minute=0, second=0)
    qs = Order.objects.filter(date_sent__gte=begin)
    return qs.count()


def orders_yesterday() -> int:
    """
    return total of orders yesterday
    """
    begin = now().replace(hour=0, minute=0, second=0) - timedelta(1)
    end = now().replace(hour=0, minute=0, second=0)
    criterion1 = Q(date_sent__gte=begin)
    criterion2 = Q(date_sent__lt=end)
    qs = Order.objects.filter(criterion1, criterion2)
    return qs.count()


def order_totals_today() -> dict:
    """
    return daily order total value
    """
    begin = now().replace(hour=0, minute=0, second=0)
    qs = Order.objects.filter(date_sent__gte=begin)
    data = qs.aggregate(amount_today=Sum('total'))
    if (data['amount_today'] == None):  # have not order yet
        data['amount_today'] = Decimal('0.00')
    return data


def order_totals_yesterday() -> dict:
    begin = now().replace(hour=0, minute=0, second=0) - timedelta(1)
    end = now().replace(hour=0, minute=0, second=0)
    criterion1 = Q(date_sent__gte=begin)
    criterion2 = Q(date_sent__lt=end)
    qs = Order.objects.filter(criterion1, criterion2)
    return qs.aggregate(amount_yesterday=Sum('total'))


def total_order_in_current_month():
    dt = now()
    first_day_in_month = dt.replace(day=1)
    qs = Order.objects.filter(date_sent__gte=first_day_in_month)
    return qs.count()


def total_order_in_previous_month():
    dt = now()
    end_day_in_previous_month = dt.replace(day=1) - timedelta(days=1)
    first_day_in_previous_month = end_day_in_previous_month.replace(day=1)
    criterion1 = Q(date_sent__gte=first_day_in_previous_month)
    criterion2 = Q(date_sent__lt=end_day_in_previous_month)
    qs = Order.objects.filter(criterion1, criterion2)
    return qs.count()


def orders_in_month():
    dt = now()
    first_day_in_month = dt.replace(day=1)
    qs = Order.objects.extra(select={'day': 'date( date_sent )'}).values(
        'day').order_by('day').annotate(total_order=Count('date_sent')).filter(date_sent__gte=first_day_in_month)
    return qs
