from fastapi import APIRouter, Response, Depends
from schemas import professor
from sqlalchemy.orm import Session, Query
from db.database import get_db
from models import ProfessorModel

router = APIRouter()


@router.post("/admin/addProfessor")
async def add_professor(
    body: professor.AddProfessor,
    response: Response,
    db: Session = Depends(get_db)
):
    """
    Admin API endpoint to add Professor
    Params: 
    """
    new_user = ProfessorModel(**body.dict())
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user
