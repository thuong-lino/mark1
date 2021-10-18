from .base import *  # noqa


DEBUG = True

HOST = "http://localhost:8000"

SECRET_KEY = "secret"

STATIC_ROOT = base_dir_join("staticfiles")
STATIC_URL = "/static/"

MEDIA_ROOT = base_dir_join("mediafiles")
MEDIA_URL = "/media/"

DEFAULT_FILE_STORAGE = "django.core.files.storage.FileSystemStorage"
STATICFILES_STORAGE = "django.contrib.staticfiles.storage.StaticFilesStorage"

AUTH_PASSWORD_VALIDATORS = []  # allow easy passwords only on local

INSTALLED_APPS += ['django_extensions', ]
# Celery
CELERY_BROKER_URL = 'redis://localhost:6379'
CELERY_TASK_ALWAYS_EAGER = True
CELERY_TASK_EAGER_PROPAGATES = True

# Email settings for mailhog
EMAIL_BACKEND = "django.core.mail.backends.smtp.EmailBackend"
EMAIL_HOST = '0.0.0.0'
EMAIL_PORT = 1025

# Logging
LOGGING = {
    "version": 1,
    "disable_existing_loggers": False,
    "formatters": {"standard": {"format": "%(levelname)-8s [%(asctime)s] %(name)s: %(message)s"}, },
    "handlers": {
        "console": {"level": "DEBUG", "class": "logging.StreamHandler", "formatter": "standard", },
    },
    "loggers": {
        "django": {"handlers": ["console"], "level": "INFO"},
        "celery": {"handlers": ["console"], "level": "INFO"},
    },
}

JS_REVERSE_JS_MINIFY = False
