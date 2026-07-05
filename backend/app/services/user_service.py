from sqlalchemy.orm import Session
from app.core.security import hash_password
from app.models.user import User
from app.schemas.user_schema import UserCreate


def create_user(db: Session, user: UserCreate):
    new_user = User(
        name=user.name,
        email=user.email,
        password=hash_password(user.password),
        career_goal=user.career_goal,
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user