from django.core import management

from mark1 import celery_app


@celery_app.task
def update_rates():
    management.call_command('update_rates')
