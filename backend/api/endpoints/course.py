from fastapi import APIRouter, Response, Depends, status
from schemas import course
from typing import List
from sqlalchemy.orm import Session, Query
from db.database import get_db
from models import ProfessorModel, CourseModel
import logging

log = logging.getLogger(__name__)

router = APIRouter()

@router.get("/courses")
def get_course(
    prof_id: str = None,
    db: Session = Depends(get_db)
):  
    """
    API endpoint to get all courses.
    Params:
    """
    query: Query = db.query(CourseModel)
    if prof_id is not None:
        query = query.filter(CourseModel.professor_id == prof_id)  # Filter by prof_id if provided
    courses = query.all()  # Execute the query to get all courses
    return courses
