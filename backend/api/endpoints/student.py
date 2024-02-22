from fastapi import APIRouter

router = APIRouter()

@router.get("/students")
def get_students():
    """
    API endpoint to get all students.
    Params: 
    """
    