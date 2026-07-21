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


def generate_job_match(resume_text: str, job_description: str):
    prompt = f"""
You are an ATS Resume Reviewer and AI Career Mentor.

Compare the following resume with the job description.

Resume:
------------------------
{resume_text}
------------------------

Job Description:
------------------------
{job_description}
------------------------

Provide the response in this format:

1. Match Score (out of 100)

2. Matching Skills

3. Missing Skills

4. Resume Improvements

5. Interview Preparation Tips

6. Learning Recommendations

7. Final Verdict (Should the candidate apply? Explain why.)
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

import json

def generate_ats_score(resume_text: str):
    prompt = f"""
You are an ATS Resume Reviewer.

Analyze the resume and return ONLY valid JSON.

Format:

{{
    "ats_score": 0,
    "strengths": [],
    "missing_keywords": [],
    "resume_improvements": [],
    "final_verdict": ""
}}

Resume:
------------------------
{resume_text}
------------------------
"""

    try:
        response = client.models.generate_content(
            model="gemini-3.1-flash-lite",
            contents=prompt,
        )

        text = response.text.strip()

        # Remove markdown if Gemini wraps JSON in ```json
        if text.startswith("```json"):
            text = text.replace("```json", "").replace("```", "").strip()

        return json.loads(text)

    except Exception as e:
        print("Gemini Error:", e)
        return {
            "ats_score": 0,
            "strengths": [],
            "missing_keywords": [],
            "resume_improvements": [],
            "final_verdict": "Unable to generate ATS score."
        }