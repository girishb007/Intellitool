import os
from fastapi import APIRouter, Depends, File, UploadFile, Form
from sqlalchemy.orm import Session, Query
from db.database import get_db
from models import LectureModel
from api import utils
import logging
import boto3
from openai import OpenAI
from moviepy import editor as mp



log = logging.getLogger(__name__)
s3_client = boto3.client('s3', aws_access_key_id="AKIA3FO4UZ66TYQMK6NB" , aws_secret_access_key="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")
client = OpenAI

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
    video: UploadFile = File(None),
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

        video_url = await uploadFile(file_name=file_save_path, bucket='intellitool-bucket')
        
        video_text = await extractTextFromVideo(file_save_path)
        contents += "Video transcripts:\n" + video_text
    
    if pdf:
        file_save_path="./uploads/"+pdf.filename
        if os.path.exists("./uploads") == False:
            os.makedirs("./uploads")
        with open(file_save_path, "wb") as f:
            f.write(pdf.file.read())
        # pdf_url = await utils.uploadFileToS3(pdf, 'intellitool-bucket', f"pdfs/{pdf.filename}")
        pdf_url = await uploadFile(file_name=file_save_path, bucket='intellitool-bucket')
        pdf_text = await utils.extractTextFromPdf(pdf.file)
        contents += "PDF texts:\n" + pdf_text
        
    if image:
        file_save_path="./uploads/"+image.filename
        if os.path.exists("./uploads") == False:
            os.makedirs("./uploads")
        with open(file_save_path, "wb") as f:
            f.write(image.file.read())
        # image_url = await utils.uploadFileToS3(image, 'intellitool-bucket', f"images/{image.filename}")
        image_url = await uploadFile(file_name=file_save_path, bucket='intellitool-bucket')
        image_text = await utils.getTextFromImage(image.file)
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
    # db.add(new_lecture)
    # db.commit()

    return {
        "message": "Lecture uploaded successfully",
        "video_url": video_url,
        "pdf_url": pdf_url,
        "image_url": image_url,
        "content": video_text
    }

async def uploadFile(file_name, bucket):

    object_name = os.path.basename(file_name)

    noException = True

    s3 = boto3.client('s3', aws_access_key_id="AKIA3FO4UZ66TYQMK6NB" , aws_secret_access_key="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")
    try:
        response = s3.upload_file(file_name, bucket, object_name)
    except Exception as e:
        return f"https://s3.amazonaws.com/intellitool-bucket/.{file_name}"

async def extractTextFromVideo(file_name):
## Converting video to mp3 because whisper AI APIs has size restriction of upto 25MB on file sizes.
    try:
        clip = mp.VideoFileClip(file_name)
        clip.audio.write_audiofile("./converted_video.mp3")
    except Exception as e:
        print(f"Caught exception while converting video tp Mp3: {e}")
    try:
        client = OpenAI()
        audio_file = open("./converted_video.mp3", "rb")
        transcript = client.audio.transcriptions.create(
        model="whisper-1", 
        file=audio_file
        )
        return transcript.text 
    except Exception as e:
        print(f"Caught exception while extracting text from video: {e}")
        return ""