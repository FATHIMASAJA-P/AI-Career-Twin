from openai import OpenAI
from app.config import OPENAI_API_KEY

client = OpenAI(api_key=OPENAI_API_KEY)


def generate_career_analysis(profile: str):

    prompt = f"""
    You are an expert AI Career Mentor.

    Analyze this user's profile:

    {profile}

    Give:

    1. Career Readiness Score (0-100)
    2. Strengths
    3. Missing Skills
    4. Learning Roadmap
    5. Suitable Job Roles
    """

    response = client.chat.completions.create(
        model="gpt-4.1-mini",
        messages=[
            {
                "role": "system",
                "content": "You are an expert career mentor."
            },
            {
                "role": "user",
                "content": prompt
            }
        ]
    )

    return response.choices[0].message.content