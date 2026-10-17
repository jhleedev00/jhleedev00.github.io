"""Combine the supplied PDF's skills table and applications without browser export."""
from copy import copy
from io import BytesIO
from pathlib import Path

from pypdf import PdfReader, PdfWriter, Transformation
from pypdf.generic import RectangleObject
from reportlab.pdfgen import canvas

root = Path(__file__).resolve().parents[2]
source = root.parent / "이정훈 _ Embedded Systems & Hardware Control Engineer.pdf"
target = root / "output/pdf/이정훈_포트폴리오_기술역량_통합.pdf"
reader = PdfReader(source)
assert len(reader.pages) == 10, "Check the supplied PDF before changing page mapping"
writer = PdfWriter()

def merge_region(destination, original, bounds, dy=0):
    region = copy(original)
    region.cropbox = RectangleObject(bounds)
    destination.merge_transformed_page(region, Transformation().translate(0, dy))

for original_index in [0, 1, *range(3, 10)]:
    if original_index == 1:
        page = writer.add_blank_page(width=595, height=841)
        # Inspected page 2: eyebrow through bottom of technology table.
        merge_region(page, reader.pages[1], (0, 398, 595, 812), dy=1)
        # Inspected page 3: applications heading and all four complete cards.
        # Keep the original physical text size and leave a 12 pt section gap.
        merge_region(page, reader.pages[2], (0, 449, 595, 800), dy=-413)
    else:
        page = writer.add_page(reader.pages[original_index])
    # Remove browser-generated date/path/count strips; number the new 9-page PDF.
    overlay_bytes = BytesIO()
    overlay = canvas.Canvas(overlay_bytes, pagesize=(595, 841))
    overlay.setFillColorRGB(1, 1, 1)
    overlay.rect(0, 814, 595, 27, fill=1, stroke=0)
    overlay.rect(0, 0, 595, 24, fill=1, stroke=0)
    overlay.setFillColorRGB(0.35, 0.40, 0.48)
    overlay.setFont("Helvetica", 7)
    overlay.drawRightString(568, 12, f"{len(writer.pages)} / 9")
    overlay.save()
    overlay_bytes.seek(0)
    page.merge_page(PdfReader(overlay_bytes).pages[0])

target.parent.mkdir(parents=True, exist_ok=True)
writer.add_metadata({"/Title": "이정훈 | Embedded Systems & Hardware Control Engineer"})
with target.open("wb") as stream:
    writer.write(stream)
assert len(PdfReader(target).pages) == 9
print(target)
