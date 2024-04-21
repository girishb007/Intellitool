from fastapi import APIRouter, Depends, Response, HTTPException
from models import StudentModel, CourseModel
from schemas import student
from typing import List
from db.database import get_db
from sqlalchemy.orm import Session, Query
import logging

log = logging.getLogger(__name__)
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

@router.post("/students/courseEnrollment")
def course_enroll(
    response: Response,
    body: student.enrollCourse,
    db: Session = Depends(get_db),
    student_id: int = None,
):
    res = []
    student = db.query(StudentModel).filter(StudentModel.id == student_id)
    
    if not student:
        raise HTTPException(status_code=404, detail="student_id NOT FOUND")
    student_obj = student.first()
    student_name = student_obj.name
    enrolled_courses = student_obj.enrolled_courses

    # Updating the student table
    try:
        for course in body.courses:
            crs = db.query(CourseModel).filter(CourseModel.name == course)
            if crs.first():
                c = crs.first()
                if not c:
                    res.append("Course {course} does not exists")
                    continue
                enrolled_students = c.students
                enrolled_students.append(student_name)
                course_dict = {
                    "id": c.id,
                    "name": c.name,
                    "description": c.description,
                    "term": c.term,
                    "students": enrolled_students,
                    "professor_id": c.professor_id,
                    "zoom": c.zoom,
                    "assignments": c.assignments,
                }
                crs.update(course_dict, synchronize_session=False)
                db.commit()
            else:
                res.append("course {course} NOT FOUND")
                continue
                
            if course in enrolled_courses:
                res.append("COURSE ALREADY ENROLLED")
                continue
            enrolled_courses.append(course)
            student_dict = {
                "id": student_obj.id,
                "name": student_obj.name,
                "term": student_obj.term,
                "enrolled_courses": enrolled_courses
            }
            student.update(student_dict, synchronize_session=False)
            db.commit()
            msg = "Course {course} added"
            log.info(msg)
            res.append(msg)
    except Exception as e:
            log.error("Error:", e)
            res.append("Error {e}")
    return res
        
@router.delete("/students/courseDrop")
def course_drop(
    response: Response,
    body: student.dropCourse,
    db: Session = Depends(get_db),
    student_id: int = None,
):
    res = []
    student = db.query(StudentModel).filter(StudentModel.id == student_id)
    
    if not student:
        raise HTTPException(status_code=404, detail="student_id NOT FOUND")
    student_obj = student.first()
    student_name = student_obj.name
    enrolled_courses = student_obj.enrolled_courses

    # Updating the course and student table
    try:
        for course in body.courses:
            crs = db.query(CourseModel).filter(CourseModel.name == course)
            if crs.first():
                c = crs.first()
                if not c:
                    res.append("Course {course} does not exists")
                    continue
                enrolled_students = c.students
                if student_name in enrolled_students:
                    enrolled_students.remove(student_name)
                else:
                    res.append("Student NOT FOUND in Course table")
                    continue
                course_dict = {
                    "id": c.id,
                    "name": c.name,
                    "description": c.description,
                    "term": c.term,
                    "students": enrolled_students,
                    "professor_id": c.professor_id,
                    "zoom": c.zoom,
                    "assignments": c.assignments,
                }
                crs.update(course_dict, synchronize_session=False)
                db.commit()
            else:
                res.append("course {course} NOT FOUND")
                continue
                
            if course not in enrolled_courses:
                res.append("COURSE DOESN'T EXIST")
                continue
            enrolled_courses.remove(course)
            student_dict = {
                "id": student_obj.id,
                "name": student_obj.name,
                "term": student_obj.term,
                "enrolled_courses": enrolled_courses
            }
            student.update(student_dict, synchronize_session=False)
            db.commit()
            msg = "Course {course} removed"
            log.info(msg)
            res.append(msg)
    except Exception as e:
            log.error("Error:", e)
            res.append("Error {e}")
    return res
        
