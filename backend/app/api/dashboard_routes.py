from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.deps import get_db
from app.dependencies.auth_dependency import get_current_user
from app.models.user import User
from app.models.resume import Resume

router = APIRouter()


@router.get("/dashboard")
def dashboard(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    profile_completed = all([
        current_user.career_goal,
        current_user.education,
        current_user.experience,
        current_user.skills,
        current_user.github,
        current_user.linkedin,
    ])

    resume_uploaded = (
        db.query(Resume)
        .filter(Resume.user_id == current_user.id)
        .first()
        is not None
    )

    progress = 0

    if profile_completed:
        progress += 25

    if resume_uploaded:
        progress += 25

    # Placeholder values for now
    career_analysis_completed = False
    ats_completed = False

    if career_analysis_completed:
        progress += 25

    if ats_completed:
        progress += 25

    return {
        "profile_completed": profile_completed,
        "resume_uploaded": resume_uploaded,
        "career_analysis_completed": career_analysis_completed,
        "ats_completed": ats_completed,
        "progress": progress,
    }