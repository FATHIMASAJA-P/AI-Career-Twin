from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database.base import Base
from app.database.database import engine

# Import all models here
from app.models.user import User
from app.api.user_routes import router as user_router
from app.api.auth_routes import router as auth_router
from app.api.resume_routes import router as resume_router
from app.api.ai_routes import router as ai_router
from app.api.job_match_routes import router as job_match_router
from app.api import ats_routes
from app.api.dashboard_routes import router as dashboard_router
from app.api.report_routes import router as report_router
app = FastAPI()

# -------------------- CORS --------------------
origins = [
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# ----------------------------------------------

# Create database tables
Base.metadata.create_all(bind=engine)

# Include routers
app.include_router(user_router)
app.include_router(auth_router)
app.include_router(resume_router)
app.include_router(ai_router)
app.include_router(job_match_router)
app.include_router(ats_routes.router)
app.include_router(dashboard_router)
app.include_router(report_router)


@app.get("/")
def home():
    return {
        "message": "Welcome to AI Career Twin 🚀"
    }