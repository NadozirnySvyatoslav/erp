from fastapi import APIRouter

from app.api.api_v1.endpoints import users, auth, groups


api_router = APIRouter()
api_router.include_router(users.router, prefix="/admin/users", tags=["users"])
api_router.include_router(groups.router, prefix="/admin/groups", tags=["users"])
api_router.include_router(auth.router, prefix="/auth", tags=["auth"])
