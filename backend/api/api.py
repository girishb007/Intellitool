from fastapi import APIRouter, Response, Request, Query

from pydantic import BaseModel
from typing import List, Optional
from api.endpoints import user, student, professor

router = APIRouter()

# Add routes here
router.include_router(user.router)
router.include_router(student.router)
router.include_router(professor.router)
