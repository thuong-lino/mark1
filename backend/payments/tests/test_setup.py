from rest_framework.test import APITestCase
from model_bakery import baker


class TestSetup(APITestCase):

    @classmethod
    def setUpTestData(cls):
        cls.admin = baker.make("users.User", is_staff=True)
        cls.create_payment_data = {
            "order": {
                "id": 1,
                "item": {
                    "name": "giay",
                    "unit": "doi"
                },
                "user": {
                    "email": "admin@admin.com",
                    "firstname": "admin",
                    "phone_number": "0794374992"
                },
                "customer": {
                    "firstname": "khachhang1",
                    "lastname": "kh1",
                    "phone_number": "0123",
                    "DOB": "2021-09-28",
                    "email": "khachang1@gmail.com",
                    "TIN": "123456789",
                    "address": "Quận 7",
                    "last_transaction": "2021-09-29T20:44:07.188787+07:00"
                },
                "date_sent": "2021-09-28 20:27:48",
                "quantity": 1,
                "weight": 1.0,
                "unit_price": 6.0,
                "currency": "USD"
            },
            "paid_amount": 4.0,
            "total_amount": 2.0,
            "updated_at": "2021-09-28 22:21:36"
        },
        cls.update_payment_data = {
            "order": 1,  # orderId
            "paid_amount": 1,
        }

    def tearDown(self):
        super().tearDown()
