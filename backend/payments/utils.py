from orders.models import Order
from .models import Payment
from decimal import Decimal
from statement.models import Statement


def recalculate_needed_paid(order: Order):
    payment = Payment.objects.get(order_id=order.id)
    payment.needed_paid = order.weight * order.unit_price
    payment.save()


def get_customer_debit(customer_id) -> Decimal:
    total = 0
    qs = Payment.objects.all()
    for q in qs:
        if(q.get_customer_id() == customer_id):
            total += q.needed_paid
    return total


def recalculate_transaction_debit(customer_id: int):
    transaction = Statement.objects.get(customer_id=customer_id)
    total = get_customer_debit(customer_id)
    transaction.transaction_debit = total
    transaction.save()
