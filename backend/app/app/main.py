import time
from pathlib import Path

from fastapi import FastAPI, APIRouter, Request, Depends
from fastapi.templating import Jinja2Templates
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware

from app import crud
from app.api import deps
from app.api.api_v1.api import api_router
from app.core.config import settings

BASE_PATH = Path(__file__).resolve().parent

root_router = APIRouter()
app = FastAPI(title="ЗСУ API", openapi_url=f"{settings.API_V1_STR}/openapi.json")

# Set all CORS enabled origins
if settings.BACKEND_CORS_ORIGINS:
    app.add_middleware(
        CORSMiddleware,
        allow_origins=[str(origin) for origin in settings.BACKEND_CORS_ORIGINS],
        allow_origin_regex=settings.BACKEND_CORS_ORIGIN_REGEX,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )


@app.middleware("http")
async def add_process_time_header(request: Request, call_next):
    start_time = time.time()
    response = await call_next(request)
    process_time = time.time() - start_time
    response.headers["X-Process-Time"] = str(process_time)
    return response


app.include_router(api_router, prefix=settings.API_V1_STR)
app.include_router(root_router)


if __name__ == "__main__":
    # Use this for debugging purposes only
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8001, log_level="debug")
