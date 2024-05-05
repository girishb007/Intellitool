from fastapi import APIRouter, File, UploadFile
import os
import boto3
from openai import OpenAI
from moviepy import editor as mp
import requests


OpenAI.api_key = 'sk-proj-Q3Em8tl42Ds1GkUPFI3nT3BlbkFJjeoEbGc0fTlSCTRp5KXk'
os.environ['OPENAI_API_KEY'] = 'sk-proj-Q3Em8tl42Ds1GkUPFI3nT3BlbkFJjeoEbGc0fTlSCTRp5KXk'
client = OpenAI()
headers = {'X-Api-Key': 'r4x5F8y97lo8UjOGQEBLgQ==R8XwEAYA0hAo1kAt'}
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

def convertVideo():
    clip = mp.VideoFileClip(r"/Users/spartan/Desktop/testvideofile.mov")
    clip.audio.write_audiofile(r"/Users/spartan/Desktop/convertedvideofile.mp3")

@router.get("/downloadfile")
def getFileFromS3():
    s3 = boto3.client('s3', aws_access_key_id="AKIA3FO4UZ66TYQMK6NB" , aws_secret_access_key="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")
    s3.download_file('intellitool-bucket', 'audiotestfile.mp3', 'download') 

def getTextFromImage(fileName):
    print("Getting text from Image")
    api_url = 'https://api.api-ninjas.com/v1/imagetotext'
    image_file_descriptor = open(fileName, 'rb')
    files = {'image': image_file_descriptor}
    r = requests.post(api_url, files=files, headers=headers)
    print(r.json())
 

def uploadFileToS3(file_name, bucket, object_name=None):
    if object_name is None:
        object_name = os.path.basename(file_name)

    noException = True

    s3 = boto3.client('s3', aws_access_key_id="AKIA3FO4UZ66TYQMK6NB" , aws_secret_access_key="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")
    try:
        response = s3.upload_file(file_name, bucket, object_name)
    except Exception as e:
        noException = False
    print(getTextFromImage(file_name))
    return noException

@router.post("/uploadFile")
async def uploadFile(upload_file:UploadFile =File(...)):

    if '.jpg' in upload_file.filename or '.jpeg' in upload_file.filename or '.png' in upload_file.filename or '.pdf' in upload_file.filename or '.mp3' in upload_file.filename or '.mp4' in upload_file.filename:
        file_save_path="./uploads/"+upload_file.filename
        if os.path.exists("./uploads") == False:
            os.makedirs("./uploads")

        with open(file_save_path, "wb") as f:
            f.write(upload_file.file.read())
 
        if uploadFileToS3(file_name=file_save_path, bucket='intellitool-bucket'):
            return "File uploaded to S3 server successfully"
        else:
            return "File couldn't be uploaded to S3. Please try again"
    else:
        return {"error": "File Type is not valid please upload only jpg,jpeg, png, pdf, mp3 and .mp4 only"}