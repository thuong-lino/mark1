from django.core.management.base import BaseCommand
from customers.models import API_KEY
from ...models import CurrencyRates
import requests
from decimal import Decimal


class Command(BaseCommand):
    def handle(self, *args, **kwargs):
        api = API_KEY.objects.filter(title="update_rates").first()
        api_key = api.api_key
        api_link = api.get_link + api_key
        rate = requests.get(api_link)
        if (rate.status_code == 200):
            rates = rate.json()["rates"]
            TWOPLACES = Decimal(10) ** -2
            for currency, rate in rates.items():
                CurrencyRates.objects.update_or_create(
                    currency=currency, rate=Decimal(rate).quantize(TWOPLACES))
            self.stdout.write(self.style.SUCCESS("Updated Currency Rates"))
        else:
            self.stdout.write(self.style.ERROR("Invalid API KEY"))
