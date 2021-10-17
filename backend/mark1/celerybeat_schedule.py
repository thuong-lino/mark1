from celery.schedules import crontab  # pylint:disable=import-error,no-name-in-module


CELERYBEAT_SCHEDULE = {
    # Internal tasks
    "clearsessions": {"schedule": crontab(0, 0, day_of_month='1'), "task": "users.tasks.clearsessions"},
}
