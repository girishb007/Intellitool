from fastapi import APIRouter

router = APIRouter()

@router.get("/professors")
def get_professors():
    """
    API endpoint to get all professors.
    Params: 
    """
    