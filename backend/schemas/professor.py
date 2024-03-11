from pydantic import BaseModel, Field
from typing import List

class AddProfessor(BaseModel):
    name: str
    description: str = None
    courses: List[int] = Field(default=[])
    field: str

class ProfAddCourse(BaseModel):
    id: str
    name: str
    description: str = None
    term: str
    zoom: str
    assignments: List[str] = []
