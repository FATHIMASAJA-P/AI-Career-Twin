from app.services.ai_service import generate_career_analysis

profile = """
Education: B.Tech Information Technology
Experience: Fresher
Skills: Python, FastAPI, React
Career Goal: AI Engineer
"""

result = generate_career_analysis(profile)

print(result)