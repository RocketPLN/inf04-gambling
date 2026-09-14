#!/usr/bin/env python3
"""Konwertuje zasady oceniania CKE z XLSX na czytelny PDF (DejaVu Sans, polskie znaki).

CKE publikuje zasady do części zadań INF.04 jako arkusze Excela (kolumna A = kod
kryterium, kolumna B = treść). Przeglądarka nie pokaże XLSX w <iframe>, więc
generujemy z nich PDF-y, żeby viewer działał tak samo dla wszystkich wersji.

Użycie:
    pip install openpyxl fpdf2
    python3 scripts/xlsx_to_pdf.py public/pdfs/inf04-2022-czerwiec-z2-zasady.xlsx public/pdfs/inf04-2022-czerwiec-z2-zasady.pdf
    # albo bez argumentów: konwertuje wszystkie *-zasady.xlsx w public/pdfs/
"""
import re
import sys
from pathlib import Path

import openpyxl
from fpdf import FPDF

FONT_DIR = Path("/usr/share/fonts/dejavu-sans-fonts")
FONT_REG = FONT_DIR / "DejaVuSans.ttf"
FONT_BOLD = FONT_DIR / "DejaVuSans-Bold.ttf"
FONT_ITALIC = FONT_DIR / "DejaVuSans-Oblique.ttf"
FONT_BI = FONT_DIR / "DejaVuSans-BoldOblique.ttf"

SKIP_RE = re.compile(r"^(#REF!|#DIV/0!|#VALUE!|#NAME\?|#N/A)\s*$")


def read_criteria(path: Path):
    wb = openpyxl.load_workbook(path, data_only=True)
    ws = wb[wb.sheetnames[0]]
    header, rows = [], []
    for row in ws.iter_rows(values_only=True):
        a = str(row[0]).strip() if len(row) > 0 and row[0] is not None else ""
        b = str(row[1]).strip() if len(row) > 1 and row[1] is not None else ""
        if SKIP_RE.match(a) or SKIP_RE.match(b):
            continue
        if not a and not b:
            continue
        if re.fullmatch(r"R\.\d+(\.\d+)?", a):
            rows.append((a, b))
        elif a and b and len(header) < 8:
            header.append((a, b))
        elif b and not a and rows:
            rows[-1] = (rows[-1][0], rows[-1][1] + " " + b)
    # CKE zostawia w szablonie puste sekcje (np. R.5/R.6 bez treści) – wycinamy je
    # razem z kryteriami bez opisu.
    kept = []
    group, children = None, []
    def flush():
        kids = [c for c in children if c[1]]
        if group and kids:
            kept.append(group)
            kept.extend(kids)
    for code, text in rows:
        if re.fullmatch(r"R\.\d+", code):
            flush()
            group, children = (code, text), []
        else:
            children.append((code, text))
    flush()
    return header, kept


def convert(src: Path, dest: Path):
    header, rows = read_criteria(src)
    if not rows:
        raise SystemExit(f"brak kryteriów w {src}")

    pdf = FPDF(format="A4")
    pdf.set_auto_page_break(True, margin=15)
    pdf.add_font("DejaVu", "", str(FONT_REG))
    pdf.add_font("DejaVu", "B", str(FONT_BOLD))
    pdf.add_font("DejaVu", "I", str(FONT_ITALIC))
    pdf.add_font("DejaVu", "BI", str(FONT_BI))
    pdf.add_page()

    pdf.set_font("DejaVu", "B", 13)
    pdf.multi_cell(0, 7, "Zasady oceniania CKE (konwersja z XLSX)", new_x="LMARGIN", new_y="NEXT")
    pdf.set_font("DejaVu", "", 9)
    pdf.set_text_color(90, 90, 90)
    pdf.multi_cell(0, 5, f"Źródło: {src.name} — treść 1:1 z arkusza CKE, format PDF na potrzeby podglądu.", new_x="LMARGIN", new_y="NEXT")
    pdf.set_text_color(0, 0, 0)
    pdf.ln(2)
    for key, val in header:
        pdf.set_font("DejaVu", "", 9)
        pdf.multi_cell(0, 5, f"**{key}** {val}", markdown=True, new_x="LMARGIN", new_y="NEXT")
    pdf.ln(2)

    for code, text in rows:
        is_group = bool(re.fullmatch(r"R\.\d+", code))
        if is_group:
            pdf.set_font("DejaVu", "B", 10)
            pdf.set_fill_color(255, 255, 224)
            pdf.multi_cell(0, 6, f"{code} — {text}", fill=True, new_x="LMARGIN", new_y="NEXT")
        else:
            pdf.set_font("DejaVu", "", 9)
            pdf.multi_cell(0, 5, f"**{code}**  {text}", markdown=True, new_x="LMARGIN", new_y="NEXT")
        pdf.ln(1)

    dest.parent.mkdir(parents=True, exist_ok=True)
    pdf.output(str(dest))
    src.unlink()
    print(f"✓ {dest.name} ({len(rows)} kryteriów, usunięto {src.name})")


def main(argv):
    if len(argv) > 1:
        pairs = [(Path(argv[i]), Path(argv[i + 1])) for i in range(1, len(argv), 2)]
    else:
        pdfs = Path(__file__).resolve().parent.parent / "public" / "pdfs"
        pairs = [(p, p.with_suffix(".pdf")) for p in sorted(pdfs.glob("*-zasady.xlsx"))]
    if not pairs:
        print("brak plików *-zasady.xlsx")
        return
    for src, dest in pairs:
        convert(src, dest)


if __name__ == "__main__":
    main(sys.argv)
