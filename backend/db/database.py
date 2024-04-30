from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# user = os.environ["DB_USER"]
# password = os.environ["DB_PASS"]
# host = os.environ["DB_HOST"]
# port = os.environ["DB_PORT"]
# database = os.environ["DB_NAME"]

# SQLALCHEMY_DATABASE_URL = f"postgresql://{user}:{password}@{host}:{port}/{database}"

SQLALCHEMY_DATABASE_URL = 'postgresql://shwethabhandary:bun24@localhost/intellitool'

engine = create_engine(SQLALCHEMY_DATABASE_URL)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()