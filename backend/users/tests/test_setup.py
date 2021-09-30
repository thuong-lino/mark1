from rest_framework.test import APITestCase
from django.urls import reverse
from ..models import User


class TestSetUp(APITestCase):
    def setUp(self):
        self.login_url = '/rest-auth/login/'
        self.register_url = '/rest-auth/registration/'
        self.admin_user = {
            "username": "",
            "email": "admin@admin.com",
            "password": "admin@admin.com",
        }
        self.random_user = {
            "email": "random@admin.com",
            "password": "random@admin.com"
        }
        return super().setUp()

    def tearDown(self):
        return super().tearDown()
