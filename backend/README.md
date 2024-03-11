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

Configure Database:
Install postgres and create "intellitool" database
```
CREATE DATABASE intellitool;
```
 

Few DB commands in psq:
```
\l  -> lists database
DROP database intellitool;
\c intellitool;     -> connect to the database
\d  OR  \dt         -> lists schemas
DELETE from <table name>;
```

## REST APIs
API documentation: http://localhost:8000/docs