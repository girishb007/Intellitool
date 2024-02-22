from fastapi import APIRouter, Response, Depends
from schemas import user
from sqlalchemy.orm import Session, Query
from db.database import get_db
from models import UserModel

router = APIRouter()

@router.get("/users")
def get_users(
    user_type: str = None, 
    db: Session = Depends(get_db)
):
    """
    API endpoint to get all users.
    Params: 
        user_type - student/professor/admin
    """
    query: Query = db.query(UserModel)  # Create a query object for UserModel
    if user_type is not None:
        query = query.filter(UserModel.role == user_type)  # Filter by user_type if provided
    users = query.all()  # Execute the query to get all users
    return users

@router.post("/addUser")
async def add_user(
    body: user.CreateUser,
    response: Response,
    db: Session = Depends(get_db)
):
    new_user = UserModel(**body.dict())
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user
