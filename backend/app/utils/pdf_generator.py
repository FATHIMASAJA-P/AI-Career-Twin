from reportlab.platypus import SimpleDocTemplate, Paragraph
from reportlab.lib.styles import getSampleStyleSheet
import os


def generate_pdf_report(
    filename,
    user_name,
    career_analysis,
    ats_score,
    job_match
):
    os.makedirs("reports", exist_ok=True)

    pdf_path = os.path.join("reports", filename)

    styles = getSampleStyleSheet()

    doc = SimpleDocTemplate(pdf_path)

    story = []

    story.append(Paragraph("<b>AI Career Twin Report</b>", styles["Title"]))

    story.append(Paragraph(f"<b>Name:</b> {user_name}", styles["Normal"]))

    story.append(Paragraph("<br/><b>Career Analysis</b>", styles["Heading2"]))
    story.append(Paragraph(career_analysis or "Not Generated", styles["BodyText"]))

    story.append(Paragraph("<br/><b>ATS Score</b>", styles["Heading2"]))
    story.append(Paragraph(str(ats_score or "Not Generated"), styles["BodyText"]))

    story.append(Paragraph("<br/><b>Job Match</b>", styles["Heading2"]))
    story.append(Paragraph(job_match or "Not Generated", styles["BodyText"]))

    doc.build(story)

    return pdf_path