from typing import Union

from fastapi import FastAPI
from api.api import router

from fastapi.middleware.cors import CORSMiddleware

from db.database import engine

import models

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

app.include_router(router, prefix="/intellitool")


# this creates the db table
models.Base.metadata.create_all(bind=engine)