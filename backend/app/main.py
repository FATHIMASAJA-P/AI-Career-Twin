from fastapi import FastAPI

from app.database.base import Base
from app.database.database import engine

# Import all models here
from app.models.user import User
from app.api.user_routes import router as user_router
from app.api.auth_routes import router as auth_router

from app.api.resume_routes import router as resume_router
from app.api.ai_routes import router as ai_router
app = FastAPI()

# Create database tables
Base.metadata.create_all(bind=engine)
app.include_router(user_router)
app.include_router(auth_router)
app.include_router(resume_router)
app.include_router(ai_router)


@app.get("/")
def home():
    return {
        "message": "Welcome to AI Career Twin 🚀"
    }