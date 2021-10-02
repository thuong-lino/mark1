from django.db import models
from users.models import User
from customers.models import Customer
from .utils import calculate_total
from decimal import Decimal


class Item(models.Model):
    name = models.CharField(max_length=50, verbose_name="Loại hàng hóa")
    unit = models.CharField(max_length=10, verbose_name="Đơn vị tính")

    def __str__(self):
        return self.name


class Order(models.Model):
    currency_choices = [("USD", "USD"), ("VND", "VND")]
    user = models.ForeignKey(User, related_name='order',
                             on_delete=models.CASCADE)
    customer = models.ForeignKey(
        Customer, related_name="order", on_delete=models.CASCADE)
    item = models.ForeignKey(Item, related_name="order",
                             on_delete=models.CASCADE)
    quantity = models.IntegerField()
    weight = models.DecimalField(max_digits=5, decimal_places=2)
    unit_price = models.DecimalField(max_digits=8, decimal_places=2)
    total = models.DecimalField(
        max_digits=8, decimal_places=2, default=0, editable=False)
    currency = models.CharField(
        max_length=3, choices=currency_choices, default='USD')
    date_sent = models.DateTimeField()
    date_flight = models.DateTimeField(null=True, blank=True)
    date_received = models.DateTimeField(null=True, blank=True)

    def save(self, *args, **kwargs):
        self.total = self.weight * self.unit_price
        super().save(*args, **kwargs)
        from payments.models import Payment, Transaction

        qs_trans = Transaction.objects.filter(
            customer=self.customer)
        if not qs_trans.exists():
            trans = Transaction.objects.create(
                customer=self.customer, must_paid=self.total)
            trans.save()
        else:
            trans = qs_trans.first()
            trans.must_paid += self.total
            trans.save()

        payment = Payment.objects.filter(order=self.id).first()
        if not payment:
            p = Payment.objects.create(
                order_id=self.id, needed_paid=self.total)
            p.save()

    def __str__(self):
        return f"{self.customer} - {self.item}"
