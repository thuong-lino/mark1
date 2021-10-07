from django.test import Client, TestCase
from django.urls import reverse

from model_bakery import baker, seq


class TestCaseUtils(TestCase):
    def setUp(self):
        self._user_password = "123456"
        self.user = baker.prepare("users.User", email="user@email.com")
        self.user.set_password(self._user_password)
        self.user.save()

        self.auth_client = Client()
        self.auth_client.login(email=self.user.email,
                               password=self._user_password)

        self.admin = baker.prepare(
            "users.User", email="admin@email.com", is_staff=True)
        self.admin.set_password(self._user_password)
        self.admin.save()

        self.admin_user = Client()
        self.admin_user.login(email=self.admin.email,
                              password=self._user_password)

    def reverse(self, name, *args, **kwargs):
        """ Reverse a url, convenience to avoid having to import reverse in tests """
        return reverse(name, args=args, kwargs=kwargs)

    def assertResponse200(self, response):
        """ Given response has status_code 200 OK"""
        self.assertEqual(response.status_code, 200)

    def assertResponse201(self, response):
        """ Given response has status_code 201 CREATED"""
        self.assertEqual(response.status_code, 201)

    def assertResponse301(self, response):
        """ Given response has status_code 301 MOVED PERMANENTLY"""
        self.assertEqual(response.status_code, 301)

    def assertResponse302(self, response):
        """ Given response has status_code 302 FOUND"""
        self.assertEqual(response.status_code, 302)

    def assertResponse400(self, response):
        """ Given response has status_code 400 BAD REQUEST"""
        self.assertEqual(response.status_code, 400)

    def assertResponse401(self, response):
        """ Given response has status_code 401 UNAUTHORIZED"""
        self.assertEqual(response.status_code, 401)

    def assertResponse403(self, response):
        """ Given response has status_code 403 FORBIDDEN"""
        self.assertEqual(response.status_code, 403)

    def assertResponse404(self, response):
        """ Given response has status_code 404 NOT FOUND"""
        self.assertEqual(response.status_code, 404)

    def prepare_customers(self, quantity=1):
        customers = baker.make("customers.Customer",
                               phone_number=seq("0123xxx", 1), firstname=seq("khach_hang_", 1), _quantity=quantity)
        return customers

    def customer_add_orders(self, quantity, customer):
        period = baker.make("statement.Period")
        orders = baker.make(
            "orders.Order", weight=seq(1.00, increment_by=.50), unit_price=5,
            _quantity=quantity, period=period, customer=customer)
        return orders

    def prepare_all(self, order_quantity=10, *args, **kwargs):

        self.prepare_orders(order_quantity)


class TestGetRequiresAuthenticatedUser:
    def test_get_requires_authenticated_user(self):
        response = self.client.get(self.view_url)
        self.assertResponse403(response)


class TestAuthGetRequestSuccess:
    def test_auth_get_success(self):
        response = self.auth_client.get(self.view_url)
        self.assertResponse200(response)
