from typing import Optional, Sequence
from pydantic import BaseModel, EmailStr


class UserBase(BaseModel):
    name: Optional[str]
    username: Optional[str]
    description: Optional[str]


# Properties to receive via API on creation
class UserCreate(UserBase):
    name: str
    password: str
    description: str

# Properties to receive via API on update
class UserUpdate(UserBase):
    ...


class UserInDBBase(UserBase):
    id: Optional[int] = None

    class Config:
        orm_mode = True


# Additional properties stored in DB but not returned by API
class UserInDB(UserInDBBase):
    hashed_password: str


# Additional properties to return via API
class User(UserInDBBase):
    ...

class UserSearchResults(BaseModel):
    results: Sequence[User]
