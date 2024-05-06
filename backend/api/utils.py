import boto3
import logging
import os
from fastapi import HTTPException
from openai import OpenAI
from moviepy import editor as mp


s3_client = boto3.client('s3', aws_access_key_id="AKIA3FO4UZ66TYQMK6NB" , aws_secret_access_key="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")


    
def convertVideoToMp3(file_name):
    try:
        clip = mp.VideoFileClip(file_name)
        clip.audio.write_audiofile("../../converted_video.mp3")
    except Exception as e:
        print(f"Caught exception while converting video tp Mp3: {e}")


def getTextFromImage(fileName):
    print("Getting text from Image")
    api_url = 'https://api.api-ninjas.com/v1/imagetotext'
    image_file_descriptor = open(fileName, 'rb')
    files = {'image': image_file_descriptor}
    r = requests.post(api_url, files=files, headers=headers)
    print(r.json())