from pathlib import Path

import pypdfium2 as pdfium
from PIL import Image, ImageDraw


ROOT = Path(__file__).resolve().parents[2]
PDF = ROOT / "output" / "pdf" / "portfolio-a4-preview.pdf"
OUT = ROOT / "tmp" / "pdfs" / "final-check"
OUT.mkdir(parents=True, exist_ok=True)

doc = pdfium.PdfDocument(PDF)
thumbs = []
for index, page in enumerate(doc):
    image = page.render(scale=1.2).to_pil().convert("RGB")
    image.save(OUT / f"page-{index + 1:02d}.png")
    image.thumbnail((320, 453))
    thumbs.append((index + 1, image.copy()))

gap, label_h, cell_w, cell_h, cols = 20, 24, 320, 477, 2
rows = (len(thumbs) + cols - 1) // cols
sheet = Image.new("RGB", (cols * cell_w + (cols + 1) * gap, rows * cell_h + (rows + 1) * gap), "#e4e7ec")
draw = ImageDraw.Draw(sheet)
for index, (page_no, image) in enumerate(thumbs):
    row, col = divmod(index, cols)
    x = gap + col * (cell_w + gap)
    y = gap + row * (cell_h + gap)
    draw.text((x, y), f"PAGE {page_no}", fill="#101828")
    sheet.paste(image, (x, y + label_h))

contact = OUT / "contact.png"
sheet.save(contact)
print(f"pages={len(doc)} contact={contact}")
