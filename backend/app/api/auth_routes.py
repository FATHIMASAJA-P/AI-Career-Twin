from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from app.database.deps import get_db
from app.services.auth_service import authenticate_user
from app.core.auth import create_access_token

router = APIRouter()


@router.post("/login")
def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):
    user = authenticate_user(
        db,
        form_data.username,   # username contains the email
        form_data.password
    )

    if not user:
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    access_token = create_access_token(
        data={"sub": user.email}
    )

    return {
        "access_token": access_token,
        "token_type": "bearer"
    }
from app.schemas.user_schema import UserCreate
from app.services.user_service import (
    get_user_by_email,
    create_user,
)

@router.post("/register")
def register(
    user: UserCreate,
    db: Session = Depends(get_db),
):

    existing_user = get_user_by_email(db, user.email)

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="Email already registered"
        )

    create_user(
        db,
        user.name,
        user.email,
        user.password
    )

    return {
        "message": "User registered successfully"
    }