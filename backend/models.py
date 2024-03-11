from db.database import Base
from sqlalchemy import Column, Integer, String, TIMESTAMP, Boolean, text, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy import Enum, JSON
import enum

# utility class
class UserRole(enum.Enum):
    student = 'student'
    teacher = 'teacher'
    admin = 'admin'

# schema for the Database tables
# class Post(Base):
#     __tablename__ = "posts"

#     id = Column(Integer,primary_key=True,nullable=False)
#     title = Column(String,nullable=False)
#     content = Column(String,nullable=False)
#     published = Column(Boolean, server_default='TRUE')
#     created_at = Column(TIMESTAMP(timezone=True), server_default=text('now()'))

class UserModel(Base):
    __tablename__ = "user"

    id = Column(Integer,primary_key=True,nullable=False)
    username = Column(String,nullable=False)
    password = Column(String,nullable=False)
    role = Column(Enum(UserRole), default=UserRole.student)

class StudentModel(Base):
    __tablename__ = "student"

    id = Column(Integer,primary_key=True,nullable=False)
    name = Column(String,nullable=False)
    description = Column(String,nullable=True)
    term = Column(String,nullable=False)
    enrolled_courses = Column(JSON, nullable=False, default=[])  # Using JSON datatype for storing lists

class ProfessorModel(Base):
    __tablename__ = "professor"

    id = Column(Integer,primary_key=True,nullable=False)
    name = Column(String,nullable=False)
    description = Column(String,nullable=True)
    field = Column(String,nullable=True)
    courses = Column(JSON, nullable=False, default=[])  # Using JSON datatype for storing lists
    # courses = relationship("CourseModel", cascade="all, delete-orphan")  # Define cascade behavior

class CourseModel(Base):
    __tablename__ = "course"

    id = Column(Integer,primary_key=True,nullable=False)
    name = Column(String,nullable=False)
    description = Column(String,nullable=True)
    term = Column(String,nullable=False)
    students = Column(JSON, nullable=False, default=[])  # Using JSON datatype for storing lists
    professor_id = Column(Integer, nullable=False)
    # professor_id = Column(Integer, ForeignKey('professor.id'), nullable=False)  # Foreign key to Professor table
    # professor = relationship("ProfessorModel")
    zoom = Column(String,nullable=False)
    assignments = Column(JSON, nullable=False, default=[])  # Using JSON datatype for storing lists




    