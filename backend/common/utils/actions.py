from payments.models import CurrencyRates
from decimal import Decimal
import pytz
from datetime import datetime, timedelta
from django.conf import settings


def decimalize(amount: str):
    """Convert string to decimal"""
    if type(amount) == str:
        return Decimal(amount)
    return amount


def currency_to_USD(currency: str, amount: Decimal) -> Decimal:
    qs = CurrencyRates.objects.filter(currency=currency)
    amount = decimalize(amount)
    if qs.exists():
        rate = qs.first().rate
        result = amount / rate
        return result.quantize(Decimal(10) ** -3)
    raise Exception("Invalid Currency")


def now():
    utcnow = datetime.utcnow()
    local_tz = pytz.timezone(settings.TIME_ZONE)
    return local_tz.localize(utcnow)


def convert_string_to_localtime(stringDate):
    """
    string date must be "YYYY-MM-DD"
    """
    dt = datetime.strptime(stringDate, '%Y-%m-%d')
    local_tz = pytz.timezone(settings.TIME_ZONE)
    dt = local_tz.localize(dt)
    return dt
