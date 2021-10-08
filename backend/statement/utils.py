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
