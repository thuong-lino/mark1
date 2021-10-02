from django.contrib import admin
from payments.models import Payment, Transaction
from customers.models import Customer
from .models import Order, Item

admin.site.register(Payment)
admin.site.register(Customer)
admin.site.register(Order)
admin.site.register(Item)
admin.site.register(Transaction)
