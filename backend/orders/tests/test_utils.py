from model_bakery import baker
from .test_setup import TestSetup
from ..utils import rate_VND_USD


class TestPaymentUtils(TestSetup):
    def test_VND_USD(self):
        rate = rate_VND_USD()
        self.assertEqual(type(rate), type(1e5))  # float fields
