from django.db import models
from orders.models import Order
from decimal import Decimal

# Create your models here.


class Payment(models.Model):
    order = models.ForeignKey(
        Order, related_name='payment', on_delete=models.CASCADE)
    paid_amount = models.DecimalField(
        default=0, max_digits=8, decimal_places=2)
    is_paid = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        if(self.paid_amount == self.order.total):
            self.is_paid = True
        super().save(*args, **kwargs)

    @property
    def total_amount(self):
        return self.order.total - Decimal(self.paid_amount)
