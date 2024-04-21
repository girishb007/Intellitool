from typing import List, Optional
from pydantic import BaseModel
from enum import Enum

class UserRole(str, Enum):
    student = 'student'
    teacher = 'teacher'
    admin = 'admin'

class CreateUser(BaseModel):
    id: int
    username: str
    password: str
    role: UserRole

class ApproveUser(BaseModel):
    id: Optional[int]
    username: Optional[str]
    field: Optional[str]
    description: Optional[str]