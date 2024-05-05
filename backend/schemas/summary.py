from typing import List
from pydantic import BaseModel, Field
from enum import Enum

class CreateSummary(BaseModel):
    id: int
    name: str
    content: str
    lectureNames: List[str] = Field(default=[])
    date: str
    courseId: str
    courseName: str