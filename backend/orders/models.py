from django.db import models
from users.models import User
from customers.models import Customer
import datetime
from decimal import Decimal
from statement.models import Statement, Period


class Order(models.Model):
    period = models.ForeignKey(Period, on_delete=models.CASCADE)
    currency_choices = [("USD", "USD"), ("VND", "VND")]
    user = models.ForeignKey(User, related_name='order',
                             on_delete=models.CASCADE)
    customer = models.ForeignKey(
        Customer, related_name="order", on_delete=models.CASCADE)
    item = models.CharField(max_length=50, default="")
    unit = models.CharField(max_length=10, default="")
    quantity = models.IntegerField()
    weight = models.DecimalField(max_digits=5, decimal_places=2)
    unit_price = models.DecimalField(max_digits=8, decimal_places=2)
    total = models.DecimalField(
        max_digits=8, decimal_places=2, default=0, editable=False)
    currency = models.CharField(
        max_length=3, choices=currency_choices, default='USD')
    date_sent = models.DateField()
    date_flight = models.DateField(null=True, blank=True)
    date_received = models.DateField(null=True, blank=True)

    def save(self, *args, **kwargs):
        self.total = self.weight * self.unit_price
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.customer} - {self.item}"
