# Intellitool - Your AI companion


## Introduction
Python FastAPI application deployable from the Docker image.

## Usage
Requires Python>=3.10.5
```
brew install python@3.10
python3.10 --version
python3.10 -m pip install --upgrade pip
alias python=python3.10
```


To run locally:
```
pip install -r requirements.txt
uvicorn main:app --reload
```

## DEBUG
Error during bringing up the application:
Make sure to have python>=3.10.5
```
brew uninstall python@3.11
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
import Postman file backend\postman\Intellitool.postman_collection.json

```
1. POST /intellitool/addUser
    {
    "id": 1,
    "username": "nimish",
    "password": "1234",
    "role": "student"      // student/professor
    }
2. POST /intellitool/admin/addProfessor
   params: role: student
   body:
    [
        {
            "username": "nimish",
            "id": 1     // Optional
        }
    ]

    params: role: teacher
    body:
        {
            "username": "Ken Youseffi",
            "id": 991,  // Optional
            "field": "Mechanical",  // Choose from the drop down
            "description": "",  // Optional
        }
3. GET /intellitool/users
4. GET /intellitool/professors
5. GET /intellitool/courses
6. POST /intellitool/profAddCourse?professor="Ken Youseffi"
    [
    {
        "id": 110,
        "name": "E10",
        "description": "E10 Labs",
        "term": "Spring 2024",
        "zoom": "sjsu.zoom.in/yken"
    },
    {
        "id": 111,
        "name": "Python",
        "description": "Python for beginners",
        "term": "Spring 2024",
        "zoom": "sjsu.zoom.in/yken"
    }
    ]
```