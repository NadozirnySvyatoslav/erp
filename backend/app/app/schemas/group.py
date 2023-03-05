from typing import Optional, Sequence
from pydantic import BaseModel


class GroupBase(BaseModel):
    name: Optional[str]

# Properties to receive via API on creation
class GroupCreate(GroupBase):
    name: str

# Properties to receive via API on update
class GroupUpdate(GroupBase):
    ...


class GroupInDBBase(GroupBase):
    id: Optional[int] = None

    class Config:
        orm_mode = True

# Additional properties to return via API
class Group(GroupInDBBase):
    ...

class GroupSearchResults(BaseModel):
    results: Sequence[Group]
