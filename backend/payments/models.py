from django.db import models
from orders.models import Order
from customers.models import Customer
from decimal import Decimal
from django.core.exceptions import ValidationError
from django.utils.translation import gettext_lazy as _
from statement.models import Period

# Create your models here.


class Payment(models.Model):
    period = models.ForeignKey(Period, on_delete=models.CASCADE, blank=True)
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

    # def add_paid(self, amount: Decimal):
    #     if(amount > self.needed_paid):
    #         raise ValidationError(_("Số tiền không hợp lệ"))
    #     self.paid_amount += amount
    #     self.needed_paid -= self.paid_amount
    #     return self.needed_paid

    # def set_paid_full(self):
    #     self.is_paid = True

    def save(self, *args, **kwargs):
        self.needed_paid = self.order.total - Decimal(self.paid_amount)
        print(self.order.total, Decimal(self.paid_amount))
        if(self.needed_paid == 0):
            self.is_paid = True
        super().save(*args, **kwargs)

    def __str__(self) -> str:
        return f"{self.order_id} - {self.paid_amount} - {self.needed_paid} - {self.is_paid}"


class Transaction(models.Model):
    customer = models.ForeignKey(
        Customer, related_name='trans', on_delete=models.CASCADE)
    must_paid = models.DecimalField(
        max_digits=8, decimal_places=2, null=True, blank=True, default=0.00)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.customer} - Tong No:{self.must_paid}"
