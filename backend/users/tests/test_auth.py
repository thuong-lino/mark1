from .test_setup import TestSetUp


class Test_Auth(TestSetUp):

    def test_user_cannot_login(self):
        res = self.client.post(self.login_url, self.random_user)
        self.assertEqual(res.status_code, 400)

    def test_user_cannot_login_with_no_data(self):
        res = self.client.post(self.login_url)
        self.assertEqual(res.status_code, 400)
