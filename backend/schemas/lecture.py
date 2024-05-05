from pydantic import BaseModel, Field
from typing import List

class UploadLecture(BaseModel):
    id: str
    name: str
    date: str = None
    courseId: int
    courseName: str = None
    content: str = None
    videoURL: str = None
    pdfURL: str = None
