from .test_setup import TestSetUp
from ..models import User


class Test_Auth(TestSetUp):

    def test_rand_user_cannot_login(self):
        res = self.client.post(self.login_url, self.random_user)
        self.assertEqual(res.status_code, 400)

    def test_user_cannot_login_with_no_data(self):
        res = self.client.post(self.login_url)
        self.assertEqual(res.status_code, 400)

    def test_user_can_login(self):
        User.objects.create_superuser(
            email="admin@admin.com", password="admin@admin.com")
        res = self.client.post(self.login_url, self.admin_user)
        self.assertEqual(res.status_code, 200)
