from sqlalchemy import Integer, String, Column, Boolean
from sqlalchemy.orm import relationship

from app.db.base_class import Base


class User(Base):
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(256), nullable=True)
    username = Column(String(256), nullable=True)
    description = Column(String, default=False)
    hashed_password = Column(String, nullable=False)
