from fastapi import APIRouter, Response, Depends
from schemas import user
from sqlalchemy.orm import Session, Query
from db.database import get_db
from models import ProfessorModel

router = APIRouter()

@router.get("/professors")
def get_professors(
    field_type: str = None, 
    db: Session = Depends(get_db)
):
    """
    API endpoint to get all professors.
    Params:
    """
    query: Query = db.query(ProfessorModel)
    if field_type is not None:
        query = query.filter(ProfessorModel.field == field_type)  # Filter by field_type if provided
    professors = query.all()  # Execute the query to get all professors
    return professors

