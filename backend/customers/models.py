from django.db import models
from django.utils import timezone

# Create your models here.


class Customer(models.Model):
    firstname = models.CharField(max_length=20)
    lastname = models.CharField(max_length=30)
    phone_number = models.CharField(max_length=12, default='')
    email = models.EmailField(
        max_length=100, unique=True, null=True, blank=True)
    TIN = models.CharField(max_length=13, unique=True,
                           verbose_name="Mã số thuế")
    DOB = models.DateField(verbose_name="Ngày Sinh", null=True, blank=True)
    address = models.CharField(max_length=255, null=True, blank=True)
    makhachhang = models.CharField(max_length=5, default='131')
    last_transaction = models.DateTimeField(
        default=timezone.now, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.id} - {self.phone_number} - {self.firstname}"


class API_KEY(models.Model):
    get_link = models.CharField(max_length=255)
    api_key = models.CharField(max_length=124)
    title = models.CharField(max_length=20, default='')


class CustomerTransaction(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=8, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)
    currency = models.CharField(max_length=3, default="USD")
