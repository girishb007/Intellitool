from fastapi import APIRouter, Response, Depends, status, File, UploadFile, Form
from schemas import lecture
from typing import List
from sqlalchemy.orm import Session, Query
from db.database import get_db
from models import LectureModel
from api import utils
import logging

log = logging.getLogger(__name__)

router = APIRouter()

# @router.get("/lectures")
# def get_lectures(
#     courseId: str = None,
#     db: Session = Depends(get_db)
# ):  
#     """
#     API endpoint to get all lectures.
#     Params:
#     """
#     query: Query = db.query(LectureModel)
#     if courseId is None:
#         return {"error": "pass courseId as the param"}
#     query = query.filter(LectureModel.courseId == courseId) 
#     lectures = query.all()
#     return lectures

# @router.post("/uploadLecture")
# def upload_lectures(
#     response: Response,
#     body: lecture.UploadLecture,
#     upload_file: UploadFile = File(...),
#     db: Session = Depends(get_db)
# ):
#     """
#     Upload the lecture into S3 (video/pdf)
#     Stores its metadata in postgres lecture table
#     """
#     try:
#         exists_lec = db.query(LectureModel).filter(LectureModel.id == body.id)
#         if exists_lec:
#             return f"Failed: Lecture with Id {body.id} already exists"
        
#         l = body.dict()
#         new_lecture = LectureModel(**l)
        
#         # TODO - check for the multiple upload_file (.pdf/.mp3) and save it in videoURL/pdfURL column
#         # Upload the files to the S3 and get the URL
#         url_link = utils.uploadFileToS3(upload_file.filename, 'intellitool-bucket', upload_file)

#         # TODO
#         # store the URL in videoURL/pdfURL column
#         new_lecture.videoURL = None
#         new_lecture.pdfURL = None

#         db.add(new_lecture)
#         db.commit()
#         db.refresh(new_lecture)
#     except Exception as e:
#         return f"Error: {e}"
#     return f"Success: Added Lecture {body.id}"


@router.post("/uploadLecture/")
async def upload_lectures(
    id: int = Form(...),
    name: str = Form(...),
    date: str = Form(...),
    courseId: str = Form(...),
    courseName: str = Form(...),
    video: UploadFile = File(None),
    pdf: UploadFile = File(None),
    image: UploadFile = File(None),
    db: Session = Depends(get_db)
):
    contents = "Lecture contents:\n"
    video_url = pdf_url = image_url = None  # Initialize URLs to None

    if video:
        video_url = await utils.upload_file_to_s3(video, 'your-s3-bucket-name', f"videos/{video.filename}")
        video_text = await utils.extract_text_from_video(video.file)
        contents += "Video transcripts:\n" + video_text
    
    if pdf:
        pdf_url = await utils.upload_file_to_s3(pdf, 'your-s3-bucket-name', f"pdfs/{pdf.filename}")
        pdf_text = await utils.extract_text_from_pdf(pdf.file)
        contents += "PDF texts:\n" + pdf_text
        
    if image:
        image_url = await utils.upload_file_to_s3(image, 'your-s3-bucket-name', f"images/{image.filename}")
        image_text = await utils.extract_text_from_image(image.file)
        contents += "Image texts:\n" + image_text
        
    # Create a new lecture record
    new_lecture = LectureModel(
        id=id,
        name=name,
        date=date,
        courseId=courseId,
        courseName=courseName,
        video_url=video_url,
        pdf_url=pdf_url,
        image_url=image_url,
        content=contents
    )
    db.add(new_lecture)
    db.commit()

    return {
        "message": "Lecture uploaded successfully",
        "video_url": video_url,
        "pdf_url": pdf_url,
        "image_url": image_url
    }