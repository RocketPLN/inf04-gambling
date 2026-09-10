#!/usr/bin/env python3
"""
Przerabia PDF arkusze INF.04 na HTML z punktacją na boku.
- Czyta public/pdfs/*-arkusz.pdf przez PyPDF2 i generuje public/plans/*.html
- Każdy HTML ma: lewa kolumna = treść PDF (tekst), prawa = punktacja CKE (sticky)
"""
import os, re, html, pathlib
import PyPDF2

ROOT = pathlib.Path(__file__).parent.parent
PDF_DIR = ROOT / "public" / "pdfs"
PLANS_DIR = ROOT / "public" / "plans"

# scoring dane – musi być zsynchronizowane z src/data/exams.js
EXAMS = [
    {"id":"inf04-2026-czerwiec","title":"INF.04 – czerwiec 2026 – egzamin praktyczny","subtitle":"Projektowanie, programowanie i testowanie aplikacji","year":2026,"session":"czerwiec","tech":"React, PHP, MySQL","czas":150,"pdf":"https://arkusze.pl/zawodowy/inf04-2026-czerwiec-egzamin-zawodowy-praktyczny.pdf","zasady":"https://arkusze.pl/zawodowy/inf04-2026-czerwiec-egzamin-zawodowy-praktyczny-zasady-oceniania.pdf","zip":None},
    {"id":"inf04-2026-styczen","title":"INF.04 – styczeń 2026 – egzamin praktyczny","subtitle":"Aplikacja mobilna + konsolowa","year":2026,"session":"styczeń","tech":"C#, MAUI, Kotlin","czas":150,"pdf":"https://arkusze.pl/zawodowy/inf04-2026-styczen-egzamin-zawodowy-praktyczny.pdf","zasady":"https://arkusze.pl/zawodowy/inf04-2026-styczen-egzamin-zawodowy-praktyczny-zasady-oceniania.pdf","zip":"https://arkusze.pl/zawodowy/inf04-2026-styczen-egzamin-zawodowy-praktyczny-zalaczniki.zip"},
    {"id":"inf04-2025-czerwiec","title":"INF.04 – czerwiec 2025 – egzamin praktyczny","subtitle":"Aplikacja desktopowa WPF + baza","year":2025,"session":"czerwiec","tech":"C#, WPF, MySQL","czas":150,"pdf":"https://arkusze.pl/zawodowy/inf04-2025-czerwiec-egzamin-zawodowy-praktyczny.pdf","zasady":"https://arkusze.pl/zawodowy/inf04-2025-czerwiec-egzamin-zawodowy-praktyczny-zasady-oceniania.pdf","zip":None},
    {"id":"inf04-2025-styczen","title":"INF.04 – styczeń 2025 – egzamin praktyczny","subtitle":"Aplikacja webowa + API","year":2025,"session":"styczeń","tech":"JavaScript, PHP, MySQL","czas":150,"pdf":"https://arkusze.pl/zawodowy/inf04-2025-styczen-egzamin-zawodowy-praktyczny.pdf","zasady":"https://arkusze.pl/zawodowy/inf04-2025-styczen-egzamin-zawodowy-praktyczny-zasady-oceniania.pdf","zip":"https://arkusze.pl/zawodowy/inf04-2025-styczen-egzamin-zawodowy-praktyczny-zalaczniki.zip"},
    {"id":"inf04-2024-czerwiec","title":"INF.04 – czerwiec 2024 – egzamin praktyczny","subtitle":"Gra w kości – konsola + mobilna (rzeczywisty arkusz)","year":2024,"session":"czerwiec","tech":"Python / C++ / C#, MAUI / Android","czas":180,"pdf":"https://arkusze.pl/zawodowy/inf04-2024-czerwiec-egzamin-zawodowy-praktyczny.pdf","zasady":"https://arkusze.pl/zawodowy/inf04-2024-czerwiec-egzamin-zawodowy-praktyczny-zasady-oceniania.pdf","zip":None},
    {"id":"inf04-2024-styczen","title":"INF.04 – styczeń 2024 – egzamin praktyczny","subtitle":"Aplikacja konsolowa + mobilna – szyfrowanie","year":2024,"session":"styczeń","tech":"Java, Android, Python","czas":150,"pdf":"https://arkusze.pl/zawodowy/inf04-2024-styczen-egzamin-zawodowy-praktyczny.pdf","zasady":"https://arkusze.pl/zawodowy/inf04-2024-styczen-egzamin-zawodowy-praktyczny-zasady-oceniania.pdf","zip":None},
    {"id":"inf04-2023-czerwiec","title":"INF.04 – czerwiec 2023 – egzamin praktyczny","subtitle":"Aplikacja konsolowa + mobilna","year":2023,"session":"czerwiec","tech":"C++, Android Studio","czas":150,"pdf":"https://arkusze.pl/zawodowy/inf04-2023-czerwiec-egzamin-zawodowy-praktyczny.pdf","zasady":"https://arkusze.pl/zawodowy/inf04-2023-czerwiec-egzamin-zawodowy-praktyczny-zasady-oceniania.pdf","zip":"https://arkusze.pl/zawodowy/inf04-2023-czerwiec-egzamin-zawodowy-praktyczny-zalaczniki.zip"},
    {"id":"inf04-2023-styczen","title":"INF.04 – styczeń 2023 – egzamin praktyczny","subtitle":"Aplikacja webowa PHP","year":2023,"session":"styczeń","tech":"PHP, JavaScript, MySQL","czas":150,"pdf":"https://arkusze.pl/zawodowy/inf04-2023-styczen-egzamin-zawodowy-praktyczny.pdf","zasady":"https://arkusze.pl/zawodowy/inf04-2023-styczen-egzamin-zawodowy-praktyczny-zasady-oceniania.pdf","zip":None},
    {"id":"inf04-2022-czerwiec","title":"INF.04 – czerwiec 2022 – egzamin praktyczny","subtitle":"Aplikacja WPF + baza","year":2022,"session":"czerwiec","tech":"C#, WPF, MSSQL","czas":150,"pdf":"https://arkusze.pl/zawodowy/inf04-2022-czerwiec-egzamin-zawodowy-praktyczny.pdf","zasady":"https://arkusze.pl/zawodowy/inf04-2022-czerwiec-egzamin-zawodowy-praktyczny-zasady-oceniania.pdf","zip":"https://arkusze.pl/zawodowy/inf04-2022-czerwiec-egzamin-zawodowy-praktyczny-zalaczniki.zip"},
    {"id":"inf04-2022-styczen","title":"INF.04 – styczeń 2022 – egzamin praktyczny","subtitle":"Aplikacja konsolowa + desktopowa","year":2022,"session":"styczeń","tech":"Python, Tkinter / WPF","czas":150,"pdf":"https://arkusze.pl/zawodowy/inf04-2022-styczen-egzamin-zawodowy-praktyczny.pdf","zasady":"https://arkusze.pl/zawodowy/inf04-2022-styczen-egzamin-zawodowy-praktyczny-zasady-oceniania.pdf","zip":None},
    {"id":"inf04-2021-czerwiec","title":"INF.04 – czerwiec 2021 – egzamin praktyczny","subtitle":"Pierwsza edycja INF.04 – aplikacja webowa","year":2021,"session":"czerwiec","tech":"HTML, PHP, MySQL","czas":150,"pdf":"https://arkusze.pl/zawodowy/inf04-2021-czerwiec-egzamin-zawodowy-praktyczny.pdf","zasady":"https://arkusze.pl/zawodowy/inf04-2021-czerwiec-egzamin-zawodowy-praktyczny-zasady-oceniania.pdf","zip":None},
]

# scoring per exam – skrót, pełne kryteria jak w exams.js
SCORING = {
 "inf04-2024-czerwiec":[
   ("R1 – Rezultat 1: Implementacja, kompilacja, uruchomienie (7 pkt)",[
     ("R1.1","Instrukcje w osobnych liniach, spacje, konwencja klamer",1),
     ("R1.2","Wcięcia dla zagnieżdżeń",1),
     ("R1.3","Znaczące nazwy funkcji/metod (PL/EN)",1),
     ("R1.4","Znaczące nazwy zmiennych (nie x/foo/tab)",1),
     ("R1.5","Typy pasujące do problemu / konwersja w Python",1),
     ("R1.6","Próba kompilacji / interpretacji – zrzut",1),
     ("R1.7","Komunikacja z użytkownikiem: monity, opisy",1),
   ]),
   ("R2 – Rezultat 2: Aplikacja konsolowa (10 pkt)",[
     ("R2.1","Program główny + 2 funkcje + tablica int 1..6",1),
     ("R2.2","Funkcja licząca typu int z return",1),
     ("R2.3","Pętla do wyświetlania i losowania",1),
     ("R2.4","Pętla walidująca liczbę kostek / zgodę",1),
     ("R2.5","Losowanie 1..6 tyle razy ile kostek",1),
     ("R2.6","Punkty = suma oczek powtórzonych ≥2 razy",1),
     ("R2.7","Kompiluje/uruchamia, walidacja 3..10",1),
     ("R2.8","Wyświetla tyle liczb ile podał user",1),
     ("R2.9","Wyświetla sumę punktów",1),
     ("R2.10","'t' kontynuuje, 'n' przerywa",1),
   ]),
   ("R3 – Rezultat 3: Aplikacja mobilna (10 pkt)",[
     ("R3.1","XML/XAML + Linear wertykalny + horyzontalny",1),
     ("R3.2","Napis 'Gra w kości. Autor <nr>', 2 przyciski, 5x question.jpg",1),
     ("R3.3","Kolory: Beige #F5F5DC, Brown #A52A2A, Chocolate #D2691E",1),
     ("R3.4","Marginesy, wyśrodkowanie, fill/match_parent",1),
     ("R3.5","Obsługa kliknięcia",1),
     ("R3.6","Odwołania do kontrolek",1),
     ("R3.7","RZUĆ KOŚĆMI – 5 obrazów",1),
     ("R3.8","Punkty + wynik powiększony",1),
     ("R3.9","RESET – zerowanie",1),
     ("R3.10","Kompiluje w emulatorze, układ wg obr.3",1),
   ]),
   ("R4 – Rezultat 4: Dokumentacja (8 pkt)",[
     ("R4.1","Nagłówek funkcji: nazwa, parametry",1),
     ("R4.2","Opis działania",1),
     ("R4.3","Opis wartości zwracanej / void",1),
     ("R4.4","Numer zdającego",1),
     ("R4.5","Zrzut konsoli z paskiem zadań",1),
     ("R4.6","Zrzut mobile z emulatora",1),
     ("R4.7","Dokumentacja: OS, środowiska, języki",1),
     ("R4.8","Plik egzamin.txt",1),
   ]),
 ],
}

# dla pozostałych – generyczny 30 pkt
GENERIC = [
  ("R1 – Baza / Jakość kodu (6-7 pkt)",[("R1.1","Struktura / formatowanie",1),("R1.2","Typy / klucze",1),("R1.3","Dane",1),("R1.4","SELECT / JOIN",1),("R1.5","Agregacja / typy",1),("R1.6","Kompilacja / zrzut",1)]),
  ("R2 – Frontend / Konsola (8-10 pkt)",[("R2.1","HTML / funkcje",1),("R2.2","CSS / wcięcia",1),("R2.3","Formularz / pętle",1),("R2.4","Walidacja / filtry",1),("R2.5","Eventy / losowanie",1),("R2.6","Wyświetlanie danych",1),("R2.7","Komunikaty / uruchomienie",1),("R2.8","Zgodność z projektem",1)]),
  ("R3 – Backend / Mobile (10 pkt)",[("R3.1","Połączenie z bazą / layout",1),("R3.2","Logowanie / kontrolki",1),("R3.3","CRUD / kolory",1),("R3.4","Walidacja / marginesy",1),("R3.5","Zabezpieczenia / eventy",1),("R3.6","Czytelny kod / binding",1),("R3.7","Raport / obrazy",1),("R3.8","Punkty / suma",1),("R3.9","Reset / zerowanie",1),("R3.10","Emulator / zrzut",1)]),
  ("R4 – Dokumentacja (6-8 pkt)",[("R4.1","Komentarze / nagłówki",1),("R4.2","Opis funkcji",1),("R4.3","Zrzut aplikacji",1),("R4.4","Zrzut bazy",1),("R4.5","Środowisko / OS",1),("R4.6","Numer zdającego",1)]),
]

def get_scoring(id):
    return SCORING.get(id, GENERIC)

def extract_pdf_text(pdf_path):
    try:
        r = PyPDF2.PdfReader(str(pdf_path))
        pages = []
        for i, p in enumerate(r.pages):
            try:
                t = p.extract_text() or ""
                # cleanup
                t = t.replace("\x00","")
                # usuń "Więcej arkuszy znajdziesz na stronie: arkusze.pl" powtarzane
                t = re.sub(r"Więcej arkuszy znajdziesz na stronie: arkusze\.pl", "", t)
                pages.append(t.strip())
            except Exception as e:
                pages.append(f"[Błąd odczytu strony {i+1}: {e}]")
        return pages
    except Exception as e:
        return [f"[Nie udało się odczytać PDF: {e}]"]

def text_to_html_paragraphs(text):
    # zamień tekst na paragrafy HTML zachowując strukturę
    # podziel na linie, wykryj nagłówki
    lines = text.split("\n")
    out = []
    buf = []
    def flush():
        nonlocal buf
        if not buf:
            return
        para = " ".join(buf).strip()
        if not para:
            buf=[]
            return
        # detekcja nagłówka
        is_header = len(para) < 120 and (para.isupper() or re.match(r"^(Część|Zadanie|Uwaga|Obraz|Instrukcja|Wykonaj|Działanie|Zasada)", para))
        if is_header:
            out.append(f'<h3 class="pdf-h">{html.escape(para)}</h3>')
        else:
            out.append(f'<p>{html.escape(para)}</p>')
        buf=[]
    for line in lines:
        s = line.strip()
        if not s:
            flush()
        elif re.match(r"^\d+[\.\)]\s", s) or s.startswith("•") or s.startswith("-"):
            flush()
            out.append(f'<p class="pdf-li">{html.escape(s)}</p>')
        else:
            buf.append(s)
            if len(" ".join(buf)) > 500:
                flush()
    flush()
    return "\n".join(out)

CSS = """
*{box-sizing:border-box}
body{margin:0; font-family:Inter,system-ui,sans-serif; background:#f8fafc; color:#0f172a}
.header{position:sticky; top:0; z-index:10; background:rgba(255,255,255,.9); backdrop-filter:blur(10px); border-bottom:1px solid #e2e8f0; padding:14px 20px; display:flex; justify-content:space-between; align-items:center; gap:16px}
.header h1{margin:0; font-size:18px}
.header p{margin:2px 0 0; font-size:13px; color:#64748b}
.badge{background:#eef2ff; color:#4338ca; padding:4px 10px; border-radius:999px; font-size:12px; font-weight:700}
.layout{max-width:1280px; margin:0 auto; padding:18px 20px 40px; display:grid; grid-template-columns:1fr 360px; gap:18px; align-items:start}
@media(max-width:980px){.layout{grid-template-columns:1fr}}
.pdf-card{background:white; border:1px solid #e2e8f0; border-radius:14px; overflow:hidden}
.pdf-card-head{padding:16px 18px; border-bottom:1px solid #e2e8f0; background:linear-gradient(180deg,#fff,#f8fafc)}
.pdf-card-head h2{margin:0; font-size:20px}
.pdf-meta{font-size:13px; color:#64748b; margin-top:4px}
.pdf-actions{display:flex; gap:8px; flex-wrap:wrap; margin-top:10px}
.pdf-actions a{font-size:13px; font-weight:700; padding:8px 12px; border-radius:10px; text-decoration:none; border:1px solid #e2e8f0; background:white; color:#0f172a}
.pdf-actions a.primary{background:#0f172a; color:white; border-color:#0f172a}
.pdf-pages{padding:18px 20px}
.pdf-page{border:1px solid #e2e8f0; border-radius:12px; padding:16px 18px; margin-bottom:16px; background:#fff; box-shadow:0 1px 2px rgba(0,0,0,.04)}
.pdf-page-head{font-size:12px; font-weight:700; color:#6366f1; letter-spacing:.06em; text-transform:uppercase; margin-bottom:10px; display:flex; justify-content:space-between}
.pdf-page p{margin:6px 0; font-size:14px; line-height:1.6; color:#1e293b}
.pdf-page .pdf-h{margin:12px 0 6px; font-size:15px; color:#0f172a; border-left:4px solid #6366f1; padding-left:10px}
.pdf-page .pdf-li{margin-left:12px; padding-left:8px; border-left:2px solid #e2e8f0}
.scoring{position:sticky; top:74px; background:white; border:1px solid #e2e8f0; border-radius:14px; overflow:hidden}
.scoring-head{padding:16px; border-bottom:1px solid #e2e8f0}
.scoring-head h3{margin:0; font-size:16px}
.scoring-head p{margin:4px 0 0; font-size:13px; color:#64748b}
.score-group{border:1px solid #e2e8f0; border-radius:12px; margin-bottom:10px; overflow:hidden}
.score-group summary{list-style:none; display:flex; justify-content:space-between; align-items:center; padding:11px 12px; cursor:pointer; font-weight:700; font-size:13px; background:#f8fafc}
.score-group[open] summary{background:#eef2ff}
.criteria{padding:8px 10px; display:flex; flex-direction:column; gap:8px}
.criterion{display:flex; gap:10px; align-items:flex-start; padding:10px; border-radius:10px; border:1px solid #f1f5f9}
.criterion .code{font-family:monospace; font-size:11px; font-weight:700; color:#4338ca; background:#eef2ff; padding:2px 6px; border-radius:6px}
.criterion p{margin:0; font-size:13px; line-height:1.45}
.pts{font-size:12px; font-weight:700; color:#059669; background:#ecfdf5; padding:3px 8px; border-radius:999px; border:1px solid #a7f3d0; white-space:nowrap}
.scoring-foot{padding:12px; background:#f8fafc; border-top:1px solid #e2e8f0; display:flex; flex-direction:column; gap:8px}
.footer{text-align:center; padding:20px; font-size:13px; color:#64748b}
"""

def build_html(exam, pages):
    scoring = get_scoring(exam["id"])
    total_max = sum(len(k) for _,k in scoring)
    # build pages html
    pages_html = ""
    for idx, txt in enumerate(pages):
        if not txt:
            continue
        inner = text_to_html_paragraphs(txt) or f"<p><em>(pusta strona)</em></p>"
        pages_html += f'''
        <div class="pdf-page">
          <div class="pdf-page-head"><span>Strona {idx+1} / {len(pages)}</span><span style="color:#94a3b8">konwersja PDF → HTML</span></div>
          {inner}
        </div>
        '''
    zip_link = f'<a href="{exam["zip"]}" target="_blank">ZIP załączniki</a>' if exam["zip"] else ""
    scoring_html = ""
    for grupa, kryteria in scoring:
        maxg = sum(p for _,_,p in kryteria)
        scoring_html += f'<details class="score-group" open><summary><span>{html.escape(grupa)}</span><span style="color:#64748b">{maxg} pkt</span></summary><div class="criteria">'
        for kod, opis, pkt in kryteria:
            scoring_html += f'<div class="criterion"><span class="code">{html.escape(kod)}</span><p>{html.escape(opis)}</p><span class="pts">{pkt} pkt</span></div>'
        scoring_html += '</div></details>'

    html_out = f'''<!DOCTYPE html>
<html lang="pl">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{html.escape(exam["title"])} – HTML</title>
<style>{CSS}</style>
</head>
<body>
<div class="header">
  <div>
    <h1>{html.escape(exam["title"])} <span class="badge">HTML z PDF</span></h1>
    <p>{html.escape(exam["subtitle"])} • {exam["year"]} • {html.escape(exam["session"])} • {html.escape(exam["tech"])} • {exam["czas"]} min</p>
  </div>
  <a href="/" style="font-size:13px; font-weight:700; color:#4338ca; text-decoration:none">← Portal INF.04</a>
</div>
<div class="layout">
  <div class="pdf-card">
    <div class="pdf-card-head">
      <h2>Treść arkusza – przerobiona z PDF na HTML</h2>
      <div class="pdf-meta">Oryginał: <a href="{exam["pdf"]}" target="_blank">PDF arkusz</a> • Zasady: <a href="{exam["zasady"]}" target="_blank">PDF zasady oceniania</a> • Wygenerowano automatycznie (PyPDF2) – zachowano tekst, podział na strony</div>
      <div class="pdf-actions">
        <a class="primary" href="{exam["pdf"]}" target="_blank">Otwórz oryginalny PDF</a>
        <a href="{exam["zasady"]}" target="_blank">Zasady oceniania PDF</a>
        {zip_link}
      </div>
    </div>
    <div class="pdf-pages">
      {pages_html}
      <div style="margin-top:12px; padding:12px; background:#f8fafc; border:1px dashed #cbd5e1; border-radius:10px; font-size:13px; color:#475569">
        <strong>Uwaga:</strong> Grafiki, schematy i zrzuty z PDF nie są odtwarzane w konwersji tekstowej. Zobacz oryginalny PDF dla obrazów (np. Obraz 1 – konsola, Obraz 3 – mobile). Tekst został 1:1 przepisany z PDF.
      </div>
    </div>
  </div>
  <aside class="scoring">
    <div class="scoring-head">
      <h3>Punktacja CKE – na boku</h3>
      <p>Każdy punkt = 1 kryterium. Razem {total_max} pkt. Zaznacz w portalu React (localStorage).</p>
      <div style="margin-top:10px; height:8px; background:#f1f5f9; border-radius:999px; overflow:hidden"><div style="width:0%; height:100%; background:linear-gradient(90deg,#6366f1,#06b6d4)"></div></div>
    </div>
    <div style="padding:10px">
      {scoring_html}
    </div>
    <div class="scoring-foot">
      <a href="{exam["pdf"]}" target="_blank" style="text-align:center; font-weight:700; padding:10px; background:#0f172a; color:white; border-radius:10px; text-decoration:none">PDF arkusz</a>
      <a href="{exam["zasady"]}" target="_blank" style="text-align:center; font-weight:700; padding:10px; background:white; border:1px solid #e2e8f0; border-radius:10px; text-decoration:none; color:#0f172a">Zasady oceniania</a>
    </div>
  </aside>
</div>
<div class="footer">INF.04 Portal • PDF → HTML (PyPDF2) • Punktacja CKE na boku • wygenerowano automatycznie</div>
</body>
</html>'''
    return html_out

def main():
    PLANS_DIR.mkdir(parents=True, exist_ok=True)
    for exam in EXAMS:
        pdf_path = PDF_DIR / f"{exam['id']}-arkusz.pdf"
        if not pdf_path.exists():
            print(f"⚠️  brak {pdf_path}")
            continue
        print(f"→ {exam['id']} ({pdf_path.stat().st_size/1024:.0f} KB) ...", end=" ")
        pages = extract_pdf_text(pdf_path)
        out = build_html(exam, pages)
        out_path = PLANS_DIR / f"{exam['id']}.html"
        out_path.write_text(out, encoding="utf-8")
        print(f"✓ {len(pages)} stron → {out_path} ({len(out)/1024:.0f} KB)")

if __name__ == "__main__":
    main()
