from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.deps import get_db
from app.dependencies.auth_dependency import get_current_user
from app.models.user import User
from app.models.resume import Resume
from app.services.ai_service import generate_ats_score

router = APIRouter()


@router.post("/ats-score")
def ats_score(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    resume = (
        db.query(Resume)
        .filter(Resume.user_id == current_user.id)
        .order_by(Resume.id.desc())
        .first()
    )

    if not resume:
        return {"message": "No resume uploaded"}

    result = generate_ats_score(resume.extracted_text)

    return {
        "message": "ATS Score Generated",
        "analysis": result
    }