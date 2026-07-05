from fastapi import FastAPI

from app.database.base import Base
from app.database.database import engine

# Import all models here
from app.models.user import User
from app.api.user_routes import router as user_router

app = FastAPI()

# Create database tables
Base.metadata.create_all(bind=engine)
app.include_router(user_router)


@app.get("/")
def home():
    return {
        "message": "Welcome to AI Career Twin 🚀"
    }