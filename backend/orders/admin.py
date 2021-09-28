from django.contrib import admin
from payments.models import Payment
from customers.models import Customer
from .models import Order, Item

admin.site.register(Payment)
admin.site.register(Customer)
admin.site.register(Order)
admin.site.register(Item)
