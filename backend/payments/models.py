from django.db import models
from orders.models import Order
# Create your models here.


class Payment(models.Model):
    order = models.ForeignKey(
        Order, related_name='payment', on_delete=models.CASCADE)
    paid_amount = models.FloatField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    @property
    def total_amount(self):
        return self.order.total - self.paid_amount
