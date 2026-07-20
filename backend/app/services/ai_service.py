from google import genai
from app.config import GEMINI_API_KEY

client = genai.Client(api_key=GEMINI_API_KEY)

def generate_career_analysis(profile: str):
    prompt = f"""
    You are an expert AI Career Mentor.

    Analyze this profile:

    {profile}

    Give:
    1. Career Readiness Score
    2. Strengths
    3. Missing Skills
    4. Learning Roadmap
    5. Recommended Job Roles
    """

    try:
        response = client.models.generate_content(
            model="gemini-3.1-flash-lite",
            contents=prompt,
        )
        return response.text

    except Exception as e:
        print("Gemini Error:", e)
        return None