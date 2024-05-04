
from pydantic import BaseModel, Field
from typing import List

class ProfAddCourse(BaseModel):
    id: str
    name: str
    description: str = None
    term: str
    zoom: str
    assignments: List[str] = []

class ProfAddAssign(BaseModel):
    id: str
    name: str
    courseId: int
    courseName: str
    description: str
    posted: str
    deadline: str


