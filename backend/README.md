# Intellitool - Your AI companion


## Introduction
Python FastAPI application deployable from the Docker image.

## Usage
Requires Python>=3.10.5
To run locally:
```
pip install -r requirements.txt
uvicorn main:app --reload
```

Deploy through Docker:
```
docker compose up --build
docker run -p 8000:8000 intellitool-server
```

## REST APIs