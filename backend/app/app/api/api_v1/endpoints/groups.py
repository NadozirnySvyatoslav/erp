import asyncio
from typing import Any, Optional

import httpx
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from app import crud
from app.api import deps
from app.models.user import User
from app.models.group import Group
import app.schemas.group

router = APIRouter()

@router.get("/search/", status_code=200, response_model=app.schemas.group.GroupSearchResults)
def search_groups(
    *,
    keyword: str = Query(None),
    max_results: Optional[int] = 10,
    db: Session = Depends(deps.get_db),
    current_user: User = Depends(deps.get_current_user),
) -> dict:
    """
    Search for user groups based on name keyword
    """
    groups = crud.group.get_multi(db=db, limit=max_results)
    if keyword is None:
        results=groups
    else:
        results = filter(lambda group: keyword.lower() in group.name.lower(), groups)

    return {"results": list(results)}


