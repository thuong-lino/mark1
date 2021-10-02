from django.db import models
from orders.models import Order
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

    def add_paid(self, amount: Decimal):
        if(amount > self.needed_paid):
            raise ValidationError(_("Số tiền không hợp lệ"))
        self.paid_amount += amount
        self.needed_paid -= self.paid_amount
        return self.needed_paid

    def set_paid_full(self):
        self.is_paid = True

    def save(self, *args, **kwargs):
        self.needed_paid = self.order.total - Decimal(self.paid_amount)
        if(self.needed_paid == 0):
            self.is_paid = True
        super().save(*args, **kwargs)

    def __str__(self) -> str:
        return f"{self.order_id} - {self.paid_amount} - {self.needed_paid} - {self.is_paid}"


class HistoryPayment(models.Model):
    action_choices = [
        ("ghi_no", "KH gửi"),
        ("ghi_co", "KH trả")
    ]
    payment = models.ForeignKey(
        Payment, on_delete=models.CASCADE, related_name="history")
    action = models.CharField(max_length=10, choices=action_choices)
    phatsinh_no = models.DecimalField(
        max_digits=8, decimal_places=2, null=True, blank=True)
    phatsinh_co = models.DecimalField(
        max_digits=8, decimal_places=2, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
