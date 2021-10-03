from django.db import models
from orders.models import Order
from customers.models import Customer
from decimal import Decimal
from django.core.exceptions import ValidationError
from django.utils.translation import gettext_lazy as _


# Create your models here.


class Payment(models.Model):
    order = models.ForeignKey(
        Order, related_name='payment', on_delete=models.CASCADE)
    paid_amount = models.DecimalField(
        default=0, max_digits=8, decimal_places=2)
    is_paid = models.BooleanField(default=False)
    # Liabilities
    needed_paid = models.DecimalField(
        default=0, max_digits=8, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        self.needed_paid = self.order.total - Decimal(self.paid_amount)
        if(self.needed_paid == 0):
            self.is_paid = True
        super().save(*args, **kwargs)

    def __str__(self) -> str:
        return f"{self.order_id} - {self.paid_amount} - {self.needed_paid} - {self.is_paid}"
