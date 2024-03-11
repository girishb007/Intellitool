from fastapi import APIRouter, Response, Depends, status
from schemas import professor
from typing import List
from sqlalchemy.orm import Session, Query
from db.database import get_db
from models import ProfessorModel, CourseModel

router = APIRouter()

@router.get("/professors")
def get_professors(
    field_type: str = None,
    prof_id: str = None,
    prof_name: str = None,
    db: Session = Depends(get_db)
):
    """
    API endpoint to get all professors.
    Params:
    """
    query: Query = db.query(ProfessorModel)
    if field_type is not None:
        query = query.filter(ProfessorModel.field == field_type)  # Filter by field_type if provided
    if prof_id is not None:
        query = query.filter(ProfessorModel.id == prof_id)  # Filter by prof_id if provided
    elif prof_name is not None:
        query = query.filter(ProfessorModel.name == prof_name)  # Filter by prof_name if provided
    professors = query.all()  # Execute the query to get all professors
    return professors

@router.post("/profAddCourse")
def prof_add_course(
    response: Response,
    body: List[professor.ProfAddCourse],
    professor: str = None,
    professor_id: str = None,
    db: Session = Depends(get_db)
):
    """
    API endpoint for professor to add Course.
    Params:
        professor : <professor name>
        OR
        professor_id : <professor_id>
    """
    if not professor and not professor_id:
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {"error": "Professor details doesn't exist"}
    
    if professor:
        prof_details = db.query(ProfessorModel).filter(ProfessorModel.name == professor).first()
        if prof_details:
            professor_id = prof_details.id
        else:
            response.status_code = status.HTTP_404_NOT_FOUND
            return {"error": "Professor not found"}

    resp = []
    for course in body:
        try:
             # Check if course ID already exists
            existing_course = db.query(CourseModel).filter(CourseModel.id == course.id).first()
            if existing_course:
                resp.append(f"Failed: Course with ID {course.id} already exists")
                continue  # Skip adding this course and move to the next one

            c = course.dict()
            c["professor_id"] = professor_id
            new_course = CourseModel(**c)
            db.add(new_course)
            db.commit()
            db.refresh(new_course)
            

            # Retrieve the ProfessorModel object and update its courses
            print("ENTERING THE BLOCK")
            professor_obj = db.query(ProfessorModel).get(professor_id)
            if professor_obj:
                if professor_obj.courses is None:
                    professor_obj.courses = []  # Initialize courses list if it's None
                print("New course -> ", new_course.id)
                professor_obj.courses.append(new_course.id)
                db.commit()  # Commit the changes to update the courses list
                print("ProfessorModel updated successfully")
            else:
                print("ProfessorModel not found")
                resp.append("Error: Professor not found")
                continue
            print("BLOCK END")
            resp.append("Success")
        except Exception as e:
            print("Error:", e)
            resp.append("Error")
    return resp



