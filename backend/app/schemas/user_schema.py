from pydantic import BaseModel, EmailStr


class UserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str
    career_goal: str

class UserProfileUpdate(BaseModel):
    education: str | None = None
    experience: str | None = None
    skills: str | None = None
    github: str | None = None
    linkedin: str | None = None



