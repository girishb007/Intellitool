from typing import Union

from fastapi import FastAPI
from api.api import router

from db.database import engine

import models

app = FastAPI()

app.include_router(router, prefix="/intellitool")

# this creates the db table
models.Base.metadata.create_all(bind=engine)