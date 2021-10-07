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


def find_period_is_open():
    """
    return the period is opening id
    """
    from .models import Period
    qs = Period .objects.filter(is_close=False)
    if qs.exists():
        period = qs.first()
        return period
    return None
