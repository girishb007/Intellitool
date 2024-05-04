from fastapi import APIRouter, Response, Depends, HTTPException
from schemas import user
from sqlalchemy.orm import Session, Query
from sqlalchemy.exc import IntegrityError
from db.database import get_db
from models import UserModel
import os
import boto3
from api.endpoints import student
from openai import OpenAI
from moviepy import editor as mp


OpenAI.api_key = 'sk-proj-Q3Em8tl42Ds1GkUPFI3nT3BlbkFJjeoEbGc0fTlSCTRp5KXk'
os.environ['OPENAI_API_KEY'] = 'sk-proj-Q3Em8tl42Ds1GkUPFI3nT3BlbkFJjeoEbGc0fTlSCTRp5KXk'
client = OpenAI()

router = APIRouter()

@router.get("/getSummaries")
def testConn():
    #return "Working"

    log.info("Getting the transcribed text")
    audio_file= open("/Users/spartan/Desktop/audiotestfile.mp3", "rb")
    transcript = client.audio.transcriptions.create(
    model="whisper-1", 
    file=audio_file
    )

    return transcript.text

@router.get("/videoToAudioConverter")
def convertVideo():
    # Insert Local Video File Path 
    clip = mp.VideoFileClip(r"/Users/spartan/Desktop/testvideofile.mov")
    
    # Insert Local Audio File Path
    clip.audio.write_audiofile(r"/Users/spartan/Desktop/convertedvideofile.mp3")

@router.get("/downloadfile")
def getFile():
    s3 = boto3.client('s3', aws_access_key_id="AKIA3FO4UZ66TYQMK6NB" , aws_secret_access_key="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")
    s3.download_file('intellitool-bucket', 'audiotestfile.mp3', 'download') 
 

@router.post("/uploadfile")



@router.get("/users")
def get_users(
    user_type: user.UserRole = None, 
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
    db: Session = Depends(get_db)
):
    """
    API endpoint to add a new user
    """
    # Check if a record with the same user name already exists
    existing_user = db.query(UserModel).filter(UserModel.username == body.username).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="User with the same username already exists")

    try:
        new_user = UserModel(**body.dict())
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
        # res = {"msg": "New " + body["role"] + " add"}
        # if body["role"] == "student":
        #     sid = student.add_student(body)
        #     res["SID"] = sid
        return new_user
    except IntegrityError:
        raise HTTPException(status_code=500, detail="Failed to add user due to database integrity error")
