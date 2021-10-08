import requests
from customers.models import API_KEY


def calculate_total(unit_price, weight):
    return unit_price * weight


def rate_VND_USD():
    api_key = API_KEY.objects.all().first().api_key
    rate = requests.get(
        f"https://free.currconv.com/api/v7/convert?q=VND_USD&compact=ultra&apiKey={api_key}")
    if (rate.status_code == 200):
        rate = rate.json()["VND_USD"]
    else:
        raise Exception("Invalid API KEY")
    return rate
