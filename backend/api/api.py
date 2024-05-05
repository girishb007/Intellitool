from fastapi import APIRouter, Response, Request, Query

from pydantic import BaseModel
from typing import List, Optional
from api.endpoints import user, professor, admin, course, summary, student

router = APIRouter()

# Add routes here
router.include_router(user.router)
router.include_router(student.router)
router.include_router(professor.router)
router.include_router(admin.router)
router.include_router(course.router)
router.include_router(summary.router)

