import boto3
import logging
import os

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