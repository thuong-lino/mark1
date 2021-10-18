from celery.schedules import crontab  # pylint:disable=import-error,no-name-in-module


CELERYBEAT_SCHEDULE = {
    # Internal tasks
    "clearsessions": {"schedule": crontab(hour=1, minute=0), "task": "users.tasks.clearsessions"},
    "update_rates": {"schedule": crontab(hour=0, minute='*/15'), "task": "users.tasks.update_rates"},
}
