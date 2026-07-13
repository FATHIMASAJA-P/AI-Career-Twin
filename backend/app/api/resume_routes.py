from fastapi import APIRouter, UploadFile, File
from app.services.resume_service import extract_text_from_pdf
import shutil
import os

router = APIRouter()

UPLOAD_FOLDER = "uploads"

@router.post("/upload-resume")
async def upload_resume(file: UploadFile = File(...)):

    os.makedirs(UPLOAD_FOLDER, exist_ok=True)

    file_path = os.path.join(UPLOAD_FOLDER, file.filename)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    text = extract_text_from_pdf(file_path)

    return {
        "message": "Resume uploaded successfully",
        "filename": file.filename,
        "text": text
    }