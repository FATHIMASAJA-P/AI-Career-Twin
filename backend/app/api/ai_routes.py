from fastapi import APIRouter

from app.services.ai_service import generate_career_analysis
from fastapi import Depends
from app.dependencies.auth_dependency import get_current_user
from app.models.user import User
router = APIRouter()


@router.post("/career-analysis")
def career_analysis(
    current_user: User = Depends(get_current_user)
):

    profile = f"""
Name: {current_user.name}

Education: {current_user.education}

Experience: {current_user.experience}

Skills: {current_user.skills}

Career Goal: {current_user.career_goal}
"""

    result = generate_career_analysis(profile)

    return {
        "analysis": result
    }