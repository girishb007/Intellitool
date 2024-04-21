from fastapi import APIRouter, Response, Depends, status, HTTPException
from typing import List
from schemas import professor
from schemas import user as user_schema
from sqlalchemy.orm import Session, Query
from sqlalchemy.exc import IntegrityError
from db.database import get_db
from models import ProfessorModel, UserModel, StudentModel
from api.endpoints import user
import random
import logging

log = logging.getLogger(__name__)

router = APIRouter()


# @router.post("/admin/addProfessor")
# async def add_professor(
#     body: professor.AddProfessor,
#     response: Response,
#     db: Session = Depends(get_db)
# ):
#     """
#     Admin API endpoint to add Professor
#     Params: 
#     """
#     # Check if a record with the same professor name already exists
#     existing_professor = db.query(ProfessorModel).filter(ProfessorModel.name == body.name).first()
#     if existing_professor:
#         response.status_code = status.HTTP_400_BAD_REQUEST
#         return {"error": "Professor with the same name already exists"}

#     try:
#         prof_col = ProfessorModel(**body.dict())
#         prof_id = int("99" + str(random.randint(1, 1000)))
#         prof_col.id = prof_id
#         db.add(prof_col)
#         db.commit()
#         db.refresh(prof_col)
        
#         # user_prof = UserModel()
#         # user_prof.role = "teacher"
#         # user_prof.id = prof_id
#         # user
#         # prof_id = 
#         return prof_col
#     except IntegrityError:
#         response.status_code = status.HTTP_500_INTERNAL_SERVER_ERROR
#         return {"error": "Failed to add professor due to database integrity error"}

@router.post("/admin/approveUser")
async def approve(
    response: Response,
    body: List[user_schema.ApproveUser],
    role: str = None,
    term: str = "2024",
    db: Session = Depends(get_db),
):
    """_summary_

    Args:
        body (dict, optional): _description_. Defaults to {}.
        db (Session, optional): _description_. Defaults to Depends(get_db).
        role (str, optional): _description_. Defaults to None.

    student -> body: [
        {
            "username": "",
            "id": 
        }
    ]
    
    professor -> body: [
        {
            "username": "",
            "id": ,
            "field": "Mechanical",
            "description": "",
        }
    ]
    
    
    Raises:
        HTTPException: _description_
    """
    if not role:
        raise HTTPException(status_code=400, detail="Mention role: student/teacher")
        
    try:
        if role == "student":
            log.info("body: {body}")
            for stu in body:
                print(stu.username)
                if stu.username:
                    user_details = db.query(UserModel).filter(UserModel.username == stu.username).first()
                elif stu.id:
                    user_details = db.query(UserModel).filter(UserModel.id == stu.id).first()
                else:
                    raise HTTPException(status_code=400, detail="Mention id/username")
                if not user_details:
                    raise HTTPException(status_code=400, detail="No user found with the given id/username")
                

                new_stu = StudentModel()
                new_stu.id = user_details.id
                new_stu.name = user_details.username
                new_stu.term = term
                new_stu.enrolled_courses = []
                db.add(new_stu)
                db.commit()
                db.refresh(new_stu)
                log.info("user added username: {username}")
                    
        elif role == "teacher":
            for prof in body:
                if prof.username:
                    user_details = db.query(UserModel).filter(UserModel.username == prof.username).first()
                elif prof.id:
                    user_details = db.query(UserModel).filter(UserModel.id == prof.id).first()
                else:
                    raise HTTPException(status_code=400, detail="Mention id/username")
                if not user_details:
                    raise HTTPException(status_code=400, detail="No user found with the given id/username")
                

                new_prof = ProfessorModel()
                new_prof.id = user_details.id
                new_prof.name = user_details.username
                if prof.field:
                    new_prof.field = prof.get("field")
                else:
                    new_prof.field = "Computer Science"
                if prof.description:
                    new_prof.description = prof.get("description")
                else:
                    new_prof.description = ""
                db.add(new_prof)
                db.commit()
                db.refresh(new_prof)
        return "Approved successfully"
    except IntegrityError:
        response.status_code = status.HTTP_500_INTERNAL_SERVER_ERROR
        return {"error": "Failed to approve user due to database integrity error"}

