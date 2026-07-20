from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.deps import get_db
from app.dependencies.auth_dependency import get_current_user
from app.models.user import User
from app.models.resume import Resume
from app.services.ai_service import generate_career_analysis

router = APIRouter()


@router.post("/career-analysis")
def career_analysis(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    # Get the latest uploaded resume of the logged-in user
    resume = (
        db.query(Resume)
        .filter(Resume.user_id == current_user.id)
        .order_by(Resume.id.desc())
        .first()
    )

    # If no resume is uploaded
    if resume:
        resume_text = resume.extracted_text
    else:
        resume_text = "No resume uploaded."

    # Create profile for Gemini
    profile = f"""
Name: {current_user.name}

Education: {current_user.education}

Experience: {current_user.experience}

Skills: {current_user.skills}

Career Goal: {current_user.career_goal}

GitHub: {current_user.github}

LinkedIn: {current_user.linkedin}

Resume Content:
--------------------------------------------------
{resume_text}
--------------------------------------------------
"""

    # Generate AI response
    result = generate_career_analysis(profile)

    return {
        "message": "Career analysis generated successfully",
        "analysis": result
    }