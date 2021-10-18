from celery.schedules import crontab  # pylint:disable=import-error,no-name-in-module


CELERYBEAT_SCHEDULE = {
    # Internal tasks
    "clearsessions": {"schedule": crontab(hour=1, minute=0), "task": "users.tasks.clearsessions"},
}
