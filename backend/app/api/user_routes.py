from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.deps import get_db
from app.schemas.user_schema import UserCreate
from app.services.user_service import create_user

router = APIRouter()


@router.post("/register")
def register_user(user: UserCreate, db: Session = Depends(get_db)):
    new_user = create_user(db, user)
    return {
        "message": "User registered successfully",
        "user": {
            "id": new_user.id,
            "name": new_user.name,
            "email": new_user.email,
            "career_goal": new_user.career_goal,
        },
    }