from pydantic import BaseModel, Field
from typing import List

class AddProfessor(BaseModel):
    name: str
    description: str = None
    courses: List[str] = Field(default=[])
    field: str