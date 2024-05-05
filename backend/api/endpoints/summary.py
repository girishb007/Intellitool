import logging
from fastapi import APIRouter, File, UploadFile
import os
import boto3
from openai import OpenAI
from moviepy import editor as mp


OpenAI.api_key = 'sk-proj-Q3Em8tl42Ds1GkUPFI3nT3BlbkFJjeoEbGc0fTlSCTRp5KXk'
os.environ['OPENAI_API_KEY'] = 'sk-proj-Q3Em8tl42Ds1GkUPFI3nT3BlbkFJjeoEbGc0fTlSCTRp5KXk'
client = OpenAI()

router = APIRouter()

@router.get("/getSummaries")
def testConn():
    #return "Working"

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
def getFileFromS3():
    s3 = boto3.client('s3', aws_access_key_id="AKIA3FO4UZ66TYQMK6NB" , aws_secret_access_key="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")
    s3.download_file('intellitool-bucket', 'audiotestfile.mp3', 'download') 
 

def uploadFileToS3(file_name, bucket, object_name=None):
    if object_name is None:
        object_name = os.path.basename(file_name)

    s3 = boto3.client('s3', aws_access_key_id="AKIA3FO4UZ66TYQMK6NB" , aws_secret_access_key="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")
    try:
        response = s3.upload_file(file_name, bucket, object_name)
    except Exception as e:
        logging.error(e)
        return False
    return True

@router.post("/uploadFile")
async def upload_image(upload_file:UploadFile =File(...)):

    if '.jpg' in upload_file.filename or '.jpeg' in upload_file.filename or '.png' in upload_file.filename or '.pdf' in upload_file.filename or '.mp3' in upload_file.filename or '.mp4' in upload_file.filename:
        file_save_path="./uploads/"+upload_file.filename
        if os.path.exists("./uploads") == False:
            os.makedirs("./uploads")

        with open(file_save_path, "wb") as f:
            f.write(upload_file.file.read())

        uploadFileToS3(file_name=file_save_path, bucket='intellitool-bucket')

        if os.path.exists(file_save_path):
            return {"File save path":file_save_path,"message": "File saved successfully"}
        else:
            return {"error":"File Not saved !!!"}
    else:
        return {"error": "File Type is not valid please upload only jpg,jpeg, png, pdf, mp3 and .mp4 only"}