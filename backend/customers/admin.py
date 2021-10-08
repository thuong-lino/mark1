from django.contrib import admin
from .models import API_KEY, CustomerTransaction
# Register your models here.
admin.site.register(API_KEY)
admin.site.register(CustomerTransaction)
