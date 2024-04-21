
from pydantic import BaseModel, Field
from typing import List

class ProfAddCourse(BaseModel):
    id: str
    name: str
    description: str = None
    term: str
    zoom: str
    assignments: List[str] = []

