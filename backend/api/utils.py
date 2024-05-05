import boto3
import logging
import os
from fastapi import HTTPException
from openai import OpenAI
from moviepy import editor as mp

# def uploadFileToS3(file_name, bucket, object_name=None):
#     if object_name is None:
#         object_name = os.path.basename(file_name)

#     s3 = boto3.client('s3', aws_access_key_id="AKIA3FO4UZ66TYQMK6NB" , aws_secret_access_key="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")
#     try:
#         response = s3.upload_file(file_name, bucket, object_name)
#     except Exception as e:
#         logging.error(e)
#         return False
#     return True
s3_client = boto3.client('s3', aws_access_key_id="AKIA3FO4UZ66TYQMK6NB" , aws_secret_access_key="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")


def uploadFileToS3(file, bucket_name, object_name=None):
    """Upload a file to an S3 bucket"""
    if object_name is None:
        object_name = file.filename
    try:
        resp = s3_client.upload_fileobj(file.file, bucket_name, object_name)
        return f"https://{bucket_name}.s3.amazonaws.com/{object_name}"
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
def convertVideoToMp3(file_name):
    try:
        clip = mp.VideoFileClip(file_name)
        clip.audio.write_audiofile("../../converted_video.mp3")
    except Exception as e:
        print(f"Caught exception while converting video tp Mp3: {e}")


def extractTextFromVideo(video):
    try:
        audio_file = open("converted_video.mp3", "rb")
        transcript = client.audio.transcriptions.create(
        model="whisper-1", 
        file=audio_file
        )
        print(transcript.text)   
    except Exception as e:
        print(f"Caught exception while extracting text from video: {e}")

def getTextFromImage(fileName):
    print("Getting text from Image")
    api_url = 'https://api.api-ninjas.com/v1/imagetotext'
    image_file_descriptor = open(fileName, 'rb')
    files = {'image': image_file_descriptor}
    r = requests.post(api_url, files=files, headers=headers)
    print(r.json())