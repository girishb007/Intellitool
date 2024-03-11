from fastapi import APIRouter, Response, Depends, status
from schemas import professor
from sqlalchemy.orm import Session, Query
from sqlalchemy.exc import IntegrityError
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
    # Check if a record with the same professor name already exists
    existing_professor = db.query(ProfessorModel).filter(ProfessorModel.name == body.name).first()
    if existing_professor:
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {"error": "Professor with the same name already exists"}

    try:
        new_user = ProfessorModel(**body.dict())
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
        return new_user
    except IntegrityError:
        response.status_code = status.HTTP_500_INTERNAL_SERVER_ERROR
        return {"error": "Failed to add professor due to database integrity error"}


