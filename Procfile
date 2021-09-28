web: gunicorn mark1.wsgi --chdir backend --limit-request-line 8188 --log-file -
worker: REMAP_SIGTERM=SIGQUIT celery --workdir backend --app=mark1 worker --loglevel=info
beat: REMAP_SIGTERM=SIGQUIT celery --workdir backend --app=mark1 beat -S redbeat.RedBeatScheduler --loglevel=info
