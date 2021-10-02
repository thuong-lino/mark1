from .models import Period
from decimal import Decimal


def plus_transaction_debit(period_id: int, amount: Decimal):
    period = Period.objects.filter(id=period_id)
    if period.exists():
        period.transaction_debit += amount
        period.save()
        return True
    return None


def plus_transaction_credit(period_id: int, amount: Decimal):
    period = Period.objects.filter(id=period_id)
    if period.exists():
        period.transaction_credit += amount
        period.save()
        return True
    return None


def close_entries():
    pass
