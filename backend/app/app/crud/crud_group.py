from typing import Any, Dict, Optional, Union

from sqlalchemy.orm import Session
from app.db.session import SessionLocal

from app.crud.base import CRUDBase
from app.models.group import Group
from app.schemas.group import GroupCreate, GroupUpdate
from app.core.security import get_password_hash


class CRUDGroup(CRUDBase[Group, GroupCreate, GroupUpdate]):
    def get_by_name(self, db: Session, *, name: str) -> Optional[Group]:
        return db.query(Group).filter(Group.name == name).first()

    def create(self, db: Session, *, obj_in: GroupCreate) -> Group:
        create_data = obj_in.dict()
        create_data.pop("password")
        db_obj = Group(**create_data)
        db.add(db_obj)
        db.commit()

        return db_obj

    def update(
        self, db: Session, *, db_obj: Group, obj_in: Union[GroupUpdate, Dict[str, Any]]
    ) -> Group:
        if isinstance(obj_in, dict):
            update_data = obj_in
        else:
            update_data = obj_in.dict(exclude_unset=True)

        return super().update(db, db_obj=db_obj, obj_in=update_data)


group = CRUDGroup(Group)
