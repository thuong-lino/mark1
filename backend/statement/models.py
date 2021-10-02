from django.db import models
from customers.models import Customer
import datetime


def current_year():
    return datetime.date.today().year


class Period(models.Model):
    year = models.IntegerField(default=current_year)
    open_date = models.DateField(auto_now_add=True)
    close_date = models.DateField(null=True, blank=True)
    is_close = models.BooleanField(default=False)
    customer = models.ForeignKey(
        Customer, related_name='+', on_delete=models.SET_NULL, null=True)
    open_debit = models.DecimalField(
        max_digits=8, decimal_places=2, blank=True, null=True, default=0.00)
    open_credit = models.DecimalField(
        max_digits=8, decimal_places=2, blank=True, null=True, default=0.00)

    in_debit = models.DecimalField(
        max_digits=8, decimal_places=2, blank=True, null=True, default=0.00)
    in_credit = models.DecimalField(
        max_digits=8, decimal_places=2, blank=True, null=True, default=0.00)

    close_debit = models.DecimalField(
        max_digits=8, decimal_places=2, blank=True, null=True, default=0.00)
    close_credit = models.DecimalField(
        max_digits=8, decimal_places=2, blank=True, null=True, default=0.00)
