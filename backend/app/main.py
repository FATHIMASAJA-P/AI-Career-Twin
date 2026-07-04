from fastapi import FastAPI

from app.database.base import Base
from app.database.database import engine

# Import all models here
from app.models.user import User

app = FastAPI()

# Create database tables
Base.metadata.create_all(bind=engine)

@app.get("/")
def home():
    return {
        "message": "Welcome to AI Career Twin 🚀"
    }