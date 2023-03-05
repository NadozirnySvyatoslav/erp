#!/bin/sh

# Heroku postgres addon
export SQLALCHEMY_DATABASE_URI=${DATABASE_URL}

export APP_MODULE=${APP_MODULE-app.main:app}
export HOST=${HOST:-0.0.0.0}
export PORT=${PORT:-8001}
export BACKEND_CORS_ORIGINS=${BACKEND_CORS_ORIGINS}


# run gunicorn
exec gunicorn --bind $HOST:$PORT "$APP_MODULE" -k uvicorn.workers.UvicornWorker