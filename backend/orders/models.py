from django.db import models
from django.db.models.fields import CharField
from users.models import User
from customers.models import Customer
from statement.models import Period
from rest_framework.reverse import reverse


class Order(models.Model):
    period = models.ForeignKey(Period, on_delete=models.CASCADE)
    user = models.ForeignKey(User, related_name='order',
                             on_delete=models.CASCADE)
    customer = models.ForeignKey(
        Customer, related_name="order", on_delete=models.CASCADE)
    item = models.CharField(max_length=50, default="")
    unit = models.CharField(max_length=10, default="")
    quantity = models.IntegerField()
    weight = models.DecimalField(max_digits=6, decimal_places=2)
    unit_price = models.DecimalField(max_digits=8, decimal_places=2)
    address = models.CharField(max_length=256, blank=True, default="")
    phone = models.CharField(max_length=20, blank=True, default="")
    total = models.DecimalField(
        max_digits=8, decimal_places=2, default=0, editable=False)
    currency = models.CharField(max_length=3, default='USD')
    date_sent = models.DateTimeField(auto_now_add=True)
    date_flight = models.DateField(null=True, blank=True)
    date_received = models.DateField(null=True, blank=True)

    def save(self, *args, **kwargs):
        self.total = self.weight * self.unit_price
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.customer} - {self.item}"

    def get_absolute_url(self):
        return reverse("order-detail", kwargs={"pk": self.pk})
