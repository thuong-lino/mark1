from django.db import models


# Create your models here.
class Customer(models.Model):
    firstname = models.CharField(max_length=20)
    lastname = models.CharField(max_length=30)
    phone_number = models.CharField(max_length=12, default='')
    email = models.EmailField(max_length=100, unique=True, null=True)
    TIN = models.CharField(max_length=13, unique=True,
                           verbose_name="Mã số thuế")
    DOB = models.DateField(verbose_name="Ngày Sinh", null=True)
    address = models.CharField(max_length=255, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.phone_number}-{self.firstname}"
