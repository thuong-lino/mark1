from payments.models import CurrencyRates
from decimal import Decimal


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
