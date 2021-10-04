from django.db import models
from customers.models import Customer
import datetime
from decimal import Decimal


def current_year():
    return datetime.date.today().year


class Period(models.Model):
    year = models.IntegerField(default=current_year)
    open_date = models.DateField(auto_now_add=True)
    close_date = models.DateField(null=True, blank=True)
    is_close = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.year}"


class Statement(models.Model):
    period = models.ForeignKey(
        Period, related_name="stament", on_delete=models.CASCADE)
    customer = models.ForeignKey(
        Customer, related_name='+', on_delete=models.SET_NULL, null=True)
    open_debit = models.DecimalField(
        max_digits=8, decimal_places=2, blank=True, null=True, default=Decimal("0.00"))
    open_credit = models.DecimalField(
        max_digits=8, decimal_places=2, blank=True, null=True, default=Decimal("0.00"))

    transaction_debit = models.DecimalField(
        max_digits=8, decimal_places=2, blank=True, null=True, default=Decimal("0.00"))
    transaction_credit = models.DecimalField(
        max_digits=8, decimal_places=2, blank=True, null=True, default=Decimal("0.00"))

    close_debit = models.DecimalField(
        max_digits=8, decimal_places=2, blank=True, null=True, default=Decimal("0.00"))
    close_credit = models.DecimalField(
        max_digits=8, decimal_places=2, blank=True, null=True, default=Decimal("0.00"))

    def __str__(self):
        return f"{self.period} - {self.customer}"

    def save(self, *args, **kwargs):
        if (self.transaction_debit > self.transaction_credit):
            self.close_credit = 0
            self.close_debit = self.transaction_debit - self.transaction_credit
        elif (self.transaction_debit == self.transaction_credit):
            pass
        else:
            self.close_debit = 0
            self.close_credit = self.transaction_credit - self.transaction_debit
        super().save(*args, **kwargs)
