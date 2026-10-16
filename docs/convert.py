import markdown
from fpdf import FPDF, HTMLMixin

class PDF(FPDF, HTMLMixin):
    pass

# Read the markdown file
with open("tennis_project_explanation.md", "r", encoding="utf-8") as f:
    text = f.read()

# Convert markdown to HTML
html = markdown.markdown(text, extensions=['tables'])

# Ensure unicode characters render properly
# fpdf2 natively supports UTF-8, but might need a unicode font for complex characters (Hindi/Hinglish in roman letters is just ascii/latin, so standard fonts should work)
pdf = PDF()
pdf.add_page()
pdf.set_font("helvetica", size=12)

# Write HTML to PDF
try:
    pdf.write_html(html)
    pdf.output("tennis_project_explanation.pdf")
    print("PDF generated successfully.")
except Exception as e:
    print(f"Error generating PDF: {e}")
