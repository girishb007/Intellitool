import os
from fastapi import APIRouter, Depends, File, UploadFile, Form
from sqlalchemy.orm import Session, Query
from db.database import get_db
from models import LectureModel
from api import utils
import logging
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
async def upload_lectures(
    id: int = Form(...),
    name: str = Form(...),
    date: str = Form(...),
    courseId: int = Form(...),
    courseName: str = Form(...),
    video: UploadFile = File(...),
    pdf: UploadFile = File(None),
    image: UploadFile = File(None),
    db: Session = Depends(get_db)
):
    contents = "Lecture contents: \n"
    video_url = pdf_url = image_url = None  # Initialize URLs to None



    if video:
        file_save_path="./uploads/"+video.filename
        if os.path.exists("./uploads") == False:
            os.makedirs("./uploads")

        with open(file_save_path, "wb") as f:
            f.write(video.file.read())

        video_url = await utils.uploadFileToS3(file_name=video, bucket='intellitool-bucket', object_name=file_save_path)
        video_text = await utils.extractTextFromVideo(video.file)
        contents += "Video transcripts:\n" + video_text

        print(f"Contests is: {contents}")
    
    if pdf:
        pdf_url = await utils.uploadFileToS3(pdf, 'intellitool-bucket', f"pdfs/{pdf.filename}")
        pdf_text = await utils.extract_text_from_pdf(pdf.file)
        contents += "PDF texts:\n" + pdf_text
        
    if image:
        image_url = await utils.uploadFileToS3(image, 'intellitool-bucket', f"images/{image.filename}")
        image_text = await utils.extract_text_from_image(image.file)
        contents += "Image texts:\n" + image_text
        
    # Create a new lecture record
    new_lecture = LectureModel(
        id=id,
        name=name,
        date=date,
        courseId=courseId,
        courseName=courseName,
        videoURL=video_url,
        pdfURL=pdf_url,
        imageURL=image_url,
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


