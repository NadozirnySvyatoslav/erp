import asyncio
from typing import Any, Optional

import httpx
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from app import crud
from app.api import deps
from app.models.user import User
import app.schemas.user

router = APIRouter()

@router.get("/{user_id}", status_code=200, response_model=app.schemas.user.User)
def fetch_user(
    *,
    user_id: int,
    db: Session = Depends(deps.get_db),
    current_user: User = Depends(deps.get_groups("admin").check),
) -> Any:
    """
    Fetch a single user by ID
    """
    result = crud.user.get(db=db, id=user_id)
    if not result:
        # the exception is raised, not returned - you will get a validation
        # error otherwise.
        raise HTTPException(
            status_code=404, detail=f"User with ID {user_id} not found"
        )

    return result


@router.get("/search/", status_code=200, response_model=app.schemas.user.UserSearchResults)
def search_users(
    *,
    keyword: str = Query(None),
    max_results: Optional[int] = 10,
    db: Session = Depends(deps.get_db),
    current_user: User = Depends(deps.get_groups("admin").check),
) -> dict:
    """
    Search for user based on name keyword
    """
    users = crud.user.get_multi(db=db, limit=max_results)
    if keyword is None:
        results=users
    else:
        results = filter(lambda user: keyword.lower() in user.name.lower(), users)

    return {"results": list(results)}


@router.post("/", status_code=201, response_model=app.schemas.user.User)
def create_user(
    *,
    user_in: app.schemas.user.UserCreate,
    db: Session = Depends(deps.get_db),
    current_user: User = Depends(deps.get_groups("admin").check),
) -> dict:
    """
    Create a new user in the database.
    """
    user = crud.user.create(db=db, obj_in=user_in)

    return user


@router.put("/{user_id}", status_code=201, response_model=app.schemas.user.User)
def update_user(
    *,
    user_id: int,
    user_in: app.schemas.user.UserUpdate,
    db: Session = Depends(deps.get_db),
    current_user: User = Depends(deps.get_groups("admin").check),
) -> dict:
    """
    Update user in the database.
    """
    user = crud.user.get(db, id=user_id)
    if not user:
        raise HTTPException(
            status_code=400, detail=f"User with ID: {user_id} not found."
        )
    updated_user = crud.user.update(db=db, db_obj=user, obj_in=user_in)
    return updated_user
