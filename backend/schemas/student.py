
from pydantic import BaseModel, Field
from typing import List

class enrollCourse(BaseModel):
    courses: List[str] = Field(default=[])

class dropCourse(BaseModel):
    courses: List[str] = Field(default=[])


