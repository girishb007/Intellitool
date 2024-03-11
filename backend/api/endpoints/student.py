from fastapi import APIRouter, Depends
from models import StudentModel
from db.database import get_db
from sqlalchemy.orm import Session, Query

router = APIRouter()

def add_students():
    pass

def filter_course_students(students, course):
    res = []
    for student in students:
        if course in student["enrolled_courses"]:
            res.append(student)
    return res

@router.get("/students")
def get_students(
    db: Session = Depends(get_db),
    term: str = None,
    enrolled_course = None,
    student_id = None,
):
    """
    API endpoint to get all students.
    Params: 
    """
    """
    API endpoint to get student details.
    Params: 
        term - fall 2023/spring 2024/summer 2024
        enrolled_course
    """
    query: Query = db.query(StudentModel)
    if student_id is not None:
        query = query.filter(StudentModel.id == student_id)
        return query.all()
    
    if term is not None and enrolled_course is not None:
        query = query.filter(StudentModel.term == term)
        students = query.all()
        return filter_course_students(students, enrolled_course)

    if term:
        query = query.filter(StudentModel.term == term)
    if enrolled_course:
        query = query.filter(StudentModel.enrolled_course == enrolled_course)
    students = query.all()  # Execute the query to get all students
    return students

    
