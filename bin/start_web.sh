python manage.py collectstatic --noinput
gunicorn wsgi -w $GUNICORN_WORKER_NUM -b [::]:${PORT:-5000} --access-logfile - --error-logfile - --access-logformat '[%(h)s] %({request_id}i)s %(u)s %(t)s "%(r)s" %(s)s %(D)s %(b)s "%(f)s" "%(a)s"' --max-requests=500 -k gthread --threads $GUNICORN_THREAD_NUM --keep-alive ${GUNICORN_KEEP_ALIVE:-0}