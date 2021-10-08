from model_bakery import baker
from .test_setup import TestSetup
from django.urls import reverse


class TestPaymentUtils(TestSetup):

    def test_paid_amount_cannot_gt_total(self):
        pass
