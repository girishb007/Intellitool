from fastapi import APIRouter, Response, Depends, status, File, UploadFile
from schemas import lecture
from typing import List
from sqlalchemy.orm import Session, Query
from db.database import get_db
from models import LectureModel
from api import utils
import logging

log = logging.getLogger(__name__)

router = APIRouter()

@router.get("/lectures")
def get_lectures(
    courseId: str = None,
    db: Session = Depends(get_db)
):  
    """
    API endpoint to get all lectures.
    Params:
    """
    query: Query = db.query(LectureModel)
    if courseId is None:
        return {"error": "pass courseId as the param"}
    query = query.filter(LectureModel.courseId == courseId) 
    lectures = query.all()
    return lectures

@router.post("/uploadLecture")
def upload_lectures(
    response: Response,
    body: lecture.UploadLecture,
    upload_file: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    try:
        exists_lec = db.query(LectureModel).filter(LectureModel.id == body.id)
        if exists_lec:
            return f"Failed: Lecture with Id {body.id} already exists"
        
        l = body.dict()
        new_lecture = LectureModel(**l)
        

        # Upload the files to the S3 and get the URL
        utils.uploadFileToS3(upload_file.filename, bucket='intellitool-bucket')

        # store the URL in videoURL/pdfURL column


        

        #############
        # Extract the textual data from the video or pdf



        # Store the textual data in lecture Table




        #############
        # From the textual data, fetch the summary


        # Store the summary in the summary table

        db.add(new_lecture)
        db.commit()
        db.refresh(new_lecture)
    except Exception as e:
        return f"Error: {e}"
    return f"Success: Added Lecture {body.id}"

    