from decimal import Decimal
import datetime


def close_entries():
    pass


def current_year():
    return datetime.date.today().year


def current_month():
    return datetime.date.today().month


def now():
    return datetime.datetime.now()


def find_period_is_open() -> int:
    """
    return the period is opening id
    """
    from .models import Period
    print(Period.objects.all())
    period = Period .objects.filter(is_close=False).first()
    period_id = period.id
    return period
