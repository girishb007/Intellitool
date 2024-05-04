from fastapi import APIRouter, Response, Depends, status
from schemas import course
from typing import List
from sqlalchemy.orm import Session, Query
from db.database import get_db
from models import ProfessorModel, CourseModel, AssignmentModel
import logging

log = logging.getLogger(__name__)

router = APIRouter()

@router.get("/courses")
def get_courses(
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

@router.get("/course")
def get_course(
    course_id: str = None,
    db: Session = Depends(get_db)
):  
    """
    API endpoint to get all courses.
    Params:
    """
    query: Query = db.query(CourseModel)
    if course_id is not None:
        query = query.filter(CourseModel.id == course_id)  # Filter by prof_id if provided
    course = query.all()  # Execute the query to get all courses
    return course

@router.get("/course/assignments")
def get_assignments(
    courseName: str = None,
    db: Session = Depends(get_db)
):
    print("Start")
    if not courseName:
        return {"error": "Send course name as the params"}
    query: Query = db.query(AssignmentModel)
    query = query.filter(AssignmentModel.courseName == courseName)
    assignments = query.all()
    return assignments

@router.post("/course/addAssignments")
def add_assignments(
    response: Response,
    body: List[course.ProfAddAssign],
    # professor: str = None,
    db: Session = Depends(get_db),
):
    try:
        resp = []
        for assign in body:
            exist_assign = db.query(AssignmentModel).filter(AssignmentModel.id == assign.id).first()
            if exist_assign:
                resp.append(f"Failed: Assignment with Id {assign.id} already exists")
                continue
                
            a = assign.dict()
            new_assign = AssignmentModel(**a)
            db.add(new_assign)
            db.commit()
            db.refresh(new_assign)

            resp.append(f"Success: Added assignment {assign.id}")
    except Exception as e:
        print("Error:", e)
        resp.append(e)
    return resp
