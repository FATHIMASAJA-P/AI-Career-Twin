from fastapi import APIRouter, Depends
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session

from app.database.deps import get_db
from app.dependencies.auth_dependency import get_current_user
from app.models.user import User

from app.utils.pdf_generator import generate_pdf_report

router = APIRouter()


@router.get("/download-report")
def download_report(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):

    career_analysis = f"""
Career Goal:
{current_user.career_goal}

Education:
{current_user.education}

Experience:
{current_user.experience}

Skills:
{current_user.skills}

GitHub:
{current_user.github}

LinkedIn:
{current_user.linkedin}
"""

    ats_score = "Generate ATS Score to view your latest score."

    job_match = "Generate Job Match to view your latest analysis."

    pdf_path = generate_pdf_report(
        filename=f"{current_user.name}_AI_Report.pdf",
        user_name=current_user.name,
        career_analysis=career_analysis,
        ats_score=ats_score,
        job_match=job_match,
    )

    return FileResponse(
        path=pdf_path,
        filename=f"{current_user.name}_AI_Report.pdf",
        media_type="application/pdf",
    )