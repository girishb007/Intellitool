import boto3
import os
from openai import OpenAI
from moviepy import editor as mp
import PyPDF2
import pytesseract
from PIL import Image


s3_client = boto3.client('s3', aws_access_key_id="AKIA3FO4UZ66TYQMK6NB" , aws_secret_access_key="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")
client = OpenAI

async def uploadFileToS3(file_name, bucket):
  
    object_name = os.path.basename(file_name)

    noException = True

    s3 = boto3.client('s3', aws_access_key_id="AKIA3FO4UZ66TYQMK6NB" , aws_secret_access_key="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")
    try:
        response = s3.upload_file(file_name, bucket, object_name)
        print(f"Got this repsonse from S3: {response} ")
    except Exception as e:
        print(f"Caught exception while uploading file to S3: {e}" )
    return f"https://s3.amazonaws.com/intellitool-bucket/{file_name}"
   
async def extractTextFromVideo(file_name):
## Converting video to mp3 because whisper AI APIs has size restriction of upto 25MB on file sizes.
    try:
        clip = mp.VideoFileClip(file_name)
        clip.audio.write_audiofile("../converted_video.mp3")
    except Exception as e:
        print(f"Caught exception while converting video tp Mp3: {e}")
    try:
        audio_file = open("converted_video.mp3", "rb")
        transcript = client.audio.transcriptions.create(
        model="whisper-1", 
        file=audio_file
        )
        return transcript.text 
    except Exception as e:
        print(f"Caught exception while extracting text from video: {e}")
        return ""


async def getTextFromImage(fileName):
    print("Getting text from Image")
    api_url = 'https://api.api-ninjas.com/v1/imagetotext'
    image_file_descriptor = open(fileName, 'rb')
    files = {'image': image_file_descriptor}
    r = requests.post(api_url, files=files, headers=headers)
    print(r.json())
    
async def extractTextFromPdf(filename):
    pdf_reader = PyPDF2.PdfReader(filename)
    num_pages = len(pdf_reader.pages)
    text = ''
    for page_num in range(num_pages):
        page = pdf_reader.pages[page_num]
        text += page.extract_text()
    return text

async def extractTextFromImage(filename):
    textract = boto3.client('textract')
    response = textract.detect_document_text(Document={'Bytes': filename})
    print(response)
    extracted_text = ''
    for item in response['Blocks']:
        if item['BlockType'] == 'LINE':
            extracted_text += item['Text'] + '\n'
    return extracted_text
    
    # image = Image.open(filename)
    # text = pytesseract.image_to_string(image)
    # return text