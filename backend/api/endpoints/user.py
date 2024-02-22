from fastapi import APIRouter, Response, Depends
from schemas import user
from sqlalchemy.orm import Session
from db.database import get_db
import models

router = APIRouter()

@router.get("/users")
def get_users(user_type: str):
    """
    API endpoint to get all users.
    Params: 
        user_type - student/professor/admin
    """
    pass

@router.post("/addUser")
async def add_user(
    body: user.CreateUser,
    response: Response,
    db: Session = Depends(get_db)
):
    new_user = body
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user
