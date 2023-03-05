#!/bin/sh
export DATABASE_URL='postgresql://postgres:password@127.0.0.1:5432/app'
export BACKEND_CORS_ORIGINS='["http://192.168.31.124","http://192.168.88.127"]'

# Heroku postgres addon
export SQLALCHEMY_DATABASE_URI=${DATABASE_URL}

export APP_MODULE=${APP_MODULE-app.main:app}
export HOST=${HOST:-0.0.0.0}
export PORT=${PORT:-8001}
export BACKEND_CORS_ORIGINS=${BACKEND_CORS_ORIGINS}


# run gunicorn
exec gunicorn --bind $HOST:$PORT "$APP_MODULE" -k uvicorn.workers.UvicornWorker