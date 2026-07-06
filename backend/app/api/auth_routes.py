from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.deps import get_db
from app.schemas.auth_schema import LoginRequest
from app.services.auth_service import authenticate_user
from app.core.auth import create_access_token

router = APIRouter()


@router.post("/login")
def login(login_data: LoginRequest, db: Session = Depends(get_db)):
    user = authenticate_user(
        db,
        login_data.email,
        login_data.password
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