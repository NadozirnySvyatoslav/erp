from sqlalchemy import Integer, String, Column, Boolean, ForeignKey
from sqlalchemy.orm import relationship

from app.db.base_class import Base


class Group(Base):
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(256), nullable=True)

class User_Group_Xref(Base):
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("user.id"), nullable=False)
    group_id = Column(Integer, ForeignKey("group.id"), nullable=False)
