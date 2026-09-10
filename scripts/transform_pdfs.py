#!/usr/bin/env python3
"""
Transformuje PDF INF.04 na semantyczny HTML (nie 1:1 dump)
- Używa PyMuPDF dict do detekcji nagłówków (bold), list, UWAGA
- Wyciąga obrazy via get_images i zapisuje do public/plans/img/
- Generuje public/plans/<id>.html (standalone z punktacją na boku)
         oraz public/plans/<id>.fragment.html (tylko treść do fetch w React)
"""
import fitz  # pymupdf
import pathlib, re, html, os, json

ROOT = pathlib.Path(__file__).parent.parent
PDF_DIR = ROOT / "public" / "pdfs"
PLANS_DIR = ROOT / "public" / "plans"
IMG_DIR = PLANS_DIR / "img"

EXAMS = [
    {"id":"inf04-2026-czerwiec","title":"INF.04 – czerwiec 2026 – egzamin praktyczny","subtitle":"Projektowanie, programowanie i testowanie aplikacji","year":2026,"session":"czerwiec","tech":"React, PHP, MySQL","czas":150,"pdf":"https://arkusze.pl/zawodowy/inf04-2026-czerwiec-egzamin-zawodowy-praktyczny.pdf","zasady":"https://arkusze.pl/zawodowy/inf04-2026-czerwiec-egzamin-zawodowy-praktyczny-zasady-oceniania.pdf","zip":None},
    {"id":"inf04-2026-styczen","title":"INF.04 – styczeń 2026 – egzamin praktyczny","subtitle":"Aplikacja mobilna + konsolowa","year":2026,"session":"styczeń","tech":"C#, MAUI, Kotlin","czas":150,"pdf":"https://arkusze.pl/zawodowy/inf04-2026-styczen-egzamin-zawodowy-praktyczny.pdf","zasady":"https://arkusze.pl/zawodowy/inf04-2026-styczen-egzamin-zawodowy-praktyczny-zasady-oceniania.pdf","zip":"/pdfs/inf04-2026-styczen-zalaczniki.zip"},
    {"id":"inf04-2025-czerwiec","title":"INF.04 – czerwiec 2025 – egzamin praktyczny","subtitle":"Aplikacja desktopowa WPF + baza","year":2025,"session":"czerwiec","tech":"C#, WPF, MySQL","czas":150,"pdf":"https://arkusze.pl/zawodowy/inf04-2025-czerwiec-egzamin-zawodowy-praktyczny.pdf","zasady":"https://arkusze.pl/zawodowy/inf04-2025-czerwiec-egzamin-zawodowy-praktyczny-zasady-oceniania.pdf","zip":None},
    {"id":"inf04-2025-styczen","title":"INF.04 – styczeń 2025 – egzamin praktyczny","subtitle":"Aplikacja webowa + API","year":2025,"session":"styczeń","tech":"JavaScript, PHP, MySQL","czas":150,"pdf":"https://arkusze.pl/zawodowy/inf04-2025-styczen-egzamin-zawodowy-praktyczny.pdf","zasady":"https://arkusze.pl/zawodowy/inf04-2025-styczen-egzamin-zawodowy-praktyczny-zasady-oceniania.pdf","zip":"/pdfs/inf04-2025-styczen-zalaczniki.zip"},
    {"id":"inf04-2024-czerwiec","title":"INF.04 – czerwiec 2024 – egzamin praktyczny","subtitle":"Gra w kości – konsola + mobilna (rzeczywisty arkusz)","year":2024,"session":"czerwiec","tech":"Python / C++ / C#, MAUI / Android","czas":180,"pdf":"https://arkusze.pl/zawodowy/inf04-2024-czerwiec-egzamin-zawodowy-praktyczny.pdf","zasady":"https://arkusze.pl/zawodowy/inf04-2024-czerwiec-egzamin-zawodowy-praktyczny-zasady-oceniania.pdf","zip":None},
    {"id":"inf04-2024-styczen","title":"INF.04 – styczeń 2024 – egzamin praktyczny","subtitle":"Aplikacja konsolowa + mobilna – szyfrowanie","year":2024,"session":"styczeń","tech":"Java, Android, Python","czas":150,"pdf":"https://arkusze.pl/zawodowy/inf04-2024-styczen-egzamin-zawodowy-praktyczny.pdf","zasady":"https://arkusze.pl/zawodowy/inf04-2024-styczen-egzamin-zawodowy-praktyczny-zasady-oceniania.pdf","zip":None},
    {"id":"inf04-2023-czerwiec","title":"INF.04 – czerwiec 2023 – egzamin praktyczny","subtitle":"Aplikacja konsolowa + mobilna","year":2023,"session":"czerwiec","tech":"C++, Android Studio","czas":150,"pdf":"https://arkusze.pl/zawodowy/inf04-2023-czerwiec-egzamin-zawodowy-praktyczny.pdf","zasady":"https://arkusze.pl/zawodowy/inf04-2023-czerwiec-egzamin-zawodowy-praktyczny-zasady-oceniania.pdf","zip":"/pdfs/inf04-2023-czerwiec-zalaczniki.zip"},
    {"id":"inf04-2023-styczen","title":"INF.04 – styczeń 2023 – egzamin praktyczny","subtitle":"Aplikacja webowa PHP","year":2023,"session":"styczeń","tech":"PHP, JavaScript, MySQL","czas":150,"pdf":"https://arkusze.pl/zawodowy/inf04-2023-styczen-egzamin-zawodowy-praktyczny.pdf","zasady":"https://arkusze.pl/zawodowy/inf04-2023-styczen-egzamin-zawodowy-praktyczny-zasady-oceniania.pdf","zip":None},
    {"id":"inf04-2022-czerwiec","title":"INF.04 – czerwiec 2022 – egzamin praktyczny","subtitle":"Aplikacja WPF + baza","year":2022,"session":"czerwiec","tech":"C#, WPF, MSSQL","czas":150,"pdf":"https://arkusze.pl/zawodowy/inf04-2022-czerwiec-egzamin-zawodowy-praktyczny.pdf","zasady":"https://arkusze.pl/zawodowy/inf04-2022-czerwiec-egzamin-zawodowy-praktyczny-zasady-oceniania.pdf","zip":"/pdfs/inf04-2022-czerwiec-zalaczniki.zip"},
    {"id":"inf04-2022-styczen","title":"INF.04 – styczeń 2022 – egzamin praktyczny","subtitle":"Aplikacja konsolowa + desktopowa","year":2022,"session":"styczeń","tech":"Python, Tkinter / WPF","czas":150,"pdf":"https://arkusze.pl/zawodowy/inf04-2022-styczen-egzamin-zawodowy-praktyczny.pdf","zasady":"https://arkusze.pl/zawodowy/inf04-2022-styczen-egzamin-zawodowy-praktyczny-zasady-oceniania.pdf","zip":None},
    {"id":"inf04-2021-czerwiec","title":"INF.04 – czerwiec 2021 – egzamin praktyczny","subtitle":"Pierwsza edycja INF.04 – aplikacja webowa","year":2021,"session":"czerwiec","tech":"HTML, PHP, MySQL","czas":150,"pdf":"https://arkusze.pl/zawodowy/inf04-2021-czerwiec-egzamin-zawodowy-praktyczny.pdf","zasady":"https://arkusze.pl/zawodowy/inf04-2021-czerwiec-egzamin-zawodowy-praktyczny-zasady-oceniania.pdf","zip":None},
]

SCORING = {
 "inf04-2024-czerwiec":[
   ("R1 – Rezultat 1: Implementacja, kompilacja, uruchomienie (7 pkt)",[("R1.1","Instrukcje w osobnych liniach, spacje, konwencja klamer",1),("R1.2","Wcięcia dla zagnieżdżeń",1),("R1.3","Znaczące nazwy funkcji/metod (PL/EN)",1),("R1.4","Znaczące nazwy zmiennych (nie x/foo/tab)",1),("R1.5","Typy pasujące do problemu / konwersja w Python",1),("R1.6","Próba kompilacji / interpretacji – zrzut",1),("R1.7","Komunikacja z użytkownikiem: monity, opisy",1)]),
   ("R2 – Rezultat 2: Aplikacja konsolowa (10 pkt)",[("R2.1","Program główny + 2 funkcje + tablica int 1..6",1),("R2.2","Funkcja licząca typu int z return",1),("R2.3","Pętla do wyświetlania i losowania",1),("R2.4","Pętla walidująca liczbę kostek / zgodę",1),("R2.5","Losowanie 1..6 tyle razy ile kostek",1),("R2.6","Punkty = suma oczek powtórzonych ≥2 razy",1),("R2.7","Kompiluje/uruchamia, walidacja 3..10",1),("R2.8","Wyświetla tyle liczb ile podał user",1),("R2.9","Wyświetla sumę punktów",1),("R2.10","'t' kontynuuje, 'n' przerywa",1)]),
   ("R3 – Rezultat 3: Aplikacja mobilna (10 pkt)",[("R3.1","XML/XAML + Linear wertykalny + horyzontalny",1),("R3.2","Napis 'Gra w kości. Autor <nr>', 2 przyciski, 5x question.jpg",1),("R3.3","Kolory: Beige #F5F5DC, Brown #A52A2A, Chocolate #D2691E",1),("R3.4","Marginesy, wyśrodkowanie, fill/match_parent",1),("R3.5","Obsługa kliknięcia",1),("R3.6","Odwołania do kontrolek",1),("R3.7","RZUĆ KOŚĆMI – 5 obrazów",1),("R3.8","Punkty + wynik powiększony",1),("R3.9","RESET – zerowanie",1),("R3.10","Kompiluje w emulatorze, układ wg obr.3",1)]),
   ("R4 – Rezultat 4: Dokumentacja (8 pkt)",[("R4.1","Nagłówek funkcji: nazwa, parametry",1),("R4.2","Opis działania",1),("R4.3","Opis wartości zwracanej / void",1),("R4.4","Numer zdającego",1),("R4.5","Zrzut konsoli z paskiem zadań",1),("R4.6","Zrzut mobile z emulatora",1),("R4.7","Dokumentacja: OS, środowiska, języki",1),("R4.8","Plik egzamin.txt",1)]),
 ],
}
GENERIC = [
  ("R1 – Baza / Jakość kodu (6 pkt)",[("R1.1","Struktura / formatowanie",1),("R1.2","Typy / klucze",1),("R1.3","Dane",1),("R1.4","SELECT / JOIN",1),("R1.5","Agregacja / typy",1),("R1.6","Kompilacja / zrzut",1)]),
  ("R2 – Frontend / Konsola (8 pkt)",[("R2.1","HTML / funkcje",1),("R2.2","CSS / wcięcia",1),("R2.3","Formularz / pętle",1),("R2.4","Walidacja / filtry",1),("R2.5","Eventy / losowanie",1),("R2.6","Wyświetlanie danych",1),("R2.7","Komunikaty / uruchomienie",1),("R2.8","Zgodność z projektem",1)]),
  ("R3 – Backend / Mobile (10 pkt)",[("R3.1","Połączenie z bazą / layout",1),("R3.2","Logowanie / kontrolki",1),("R3.3","CRUD / kolory",1),("R3.4","Walidacja / marginesy",1),("R3.5","Zabezpieczenia / eventy",1),("R3.6","Czytelny kod / binding",1),("R3.7","Raport / obrazy",1),("R3.8","Punkty / suma",1),("R3.9","Reset / zerowanie",1),("R3.10","Emulator / zrzut",1)]),
  ("R4 – Dokumentacja (6 pkt)",[("R4.1","Komentarze / nagłówki",1),("R4.2","Opis funkcji",1),("R4.3","Zrzut aplikacji",1),("R4.4","Zrzut bazy",1),("R4.5","Środowisko / OS",1),("R4.6","Numer zdającego",1)]),
]
def get_scoring(id): return SCORING.get(id, GENERIC)

CSS = """
*{box-sizing:border-box}
body{margin:0; font-family:Inter,system-ui,sans-serif; background:#f8fafc; color:#0f172a; line-height:1.6}
a{color:#4f46e5}
.header{position:sticky; top:0; z-index:10; background:rgba(255,255,255,.92); backdrop-filter:blur(10px); border-bottom:1px solid #e2e8f0; padding:14px 20px; display:flex; justify-content:space-between; align-items:center; gap:16px}
.header h1{margin:0; font-size:17px}
.header p{margin:2px 0 0; font-size:13px; color:#64748b}
.badge{background:#eef2ff; color:#4338ca; padding:4px 10px; border-radius:999px; font-size:12px; font-weight:700}
.layout{max-width:1280px; margin:0 auto; padding:18px 20px 40px; display:grid; grid-template-columns:1fr 360px; gap:18px; align-items:start}
@media(max-width:980px){.layout{grid-template-columns:1fr}}
.main{background:white; border:1px solid #e2e8f0; border-radius:14px; overflow:hidden}
.main-head{padding:18px 20px; border-bottom:1px solid #e2e8f0; background:linear-gradient(180deg,#fff,#f8fafc)}
.main-head h2{margin:0; font-size:21px}
.meta{font-size:13px; color:#64748b; margin-top:6px}
.actions{display:flex; gap:8px; flex-wrap:wrap; margin-top:12px}
.actions a{font-size:13px; font-weight:700; padding:8px 12px; border-radius:10px; text-decoration:none; border:1px solid #e2e8f0; background:white; color:#0f172a}
.actions a.primary{background:#0f172a; color:white; border-color:#0f172a}
.content{padding:24px}
.content h2{margin:32px 0 14px; font-size:20px; font-weight:800; letter-spacing:-.4px; color:#0f172a; background:linear-gradient(90deg,#eef2ff,#f8fafc); border:1px solid #e0e7ff; border-left:4px solid #6366f1; padding:10px 14px; border-radius:10px}
.content h2:first-child{margin-top:6px}
.content h3{margin:26px 0 12px; font-size:16px; font-weight:700; color:#1e293b; background:#f8fafc; border:1px solid #e2e8f0; border-left:4px solid #06b6d4; padding:10px 12px; border-radius:10px}
.content h4{margin:18px 0 8px; font-size:14px; font-weight:700; color:#334155; text-transform:uppercase; letter-spacing:.04em; border-bottom:1px solid #f1f5f9; padding-bottom:6px}
.content p{margin:10px 0; font-size:14.5px; line-height:1.68; color:#1e293b}
.content .alert{background:#fffbeb; border:1px solid #fde68a; border-left:4px solid #f59e0b; padding:14px 16px; border-radius:12px; font-size:13.5px; margin:18px 0; box-shadow:0 1px 3px rgba(245,158,11,.08)}
.content ol, .content ul{margin:12px 0; padding-left:24px; background:white; border:1px solid #f1f5f9; border-radius:10px; padding-top:10px; padding-bottom:10px}
.content li{margin:6px 0; font-size:14px; line-height:1.6; color:#1e293b}
.content li::marker{color:#6366f1; font-weight:700}
.content figure{margin:18px 0; border:1px solid #e2e8f0; border-radius:14px; overflow:hidden; background:#f8fafc; box-shadow:0 4px 12px rgba(0,0,0,.06)}
.content figure img{width:100%; height:auto; display:block; background:white}
.content figcaption{padding:12px 16px; font-size:13px; color:#475569; background:#f8fafc; border-top:1px solid #e2e8f0; text-align:center; font-style:italic}
.content code{background:#f1f5f9; padding:2px 6px; border-radius:6px; font-size:13px; border:1px solid #e2e8f0}
.content .page-break{margin:32px 0; border:none; border-top:2px dashed #cbd5e1; position:relative}
.content .page-break::after{content:attr(data-page); position:absolute; top:-10px; left:50%; transform:translateX(-50%); background:#f8fafc; padding:2px 10px; font-size:11px; font-weight:700; color:#64748b; letter-spacing:.06em; border:1px solid #e2e8f0; border-radius:999px}
.scoring{position:sticky; top:76px; background:white; border:1px solid #e2e8f0; border-radius:14px; overflow:hidden}
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

def extract_images(doc, exam_id):
    IMG_DIR.mkdir(parents=True, exist_ok=True)
    saved = {} # page_idx -> list of rel paths
    for p_idx, page in enumerate(doc):
        lst = []
        for img_idx, img in enumerate(page.get_images(full=True)):
            xref = img[0]
            try:
                pix = fitz.Pixmap(doc, xref)
                if pix.n > 4:
                    pix = fitz.Pixmap(fitz.csRGB, pix)
                # skip tiny icons
                if pix.w < 30 or pix.h < 30:
                    continue
                fname = f"{exam_id}_p{p_idx}_img{img_idx}.png"
                fpath = IMG_DIR / fname
                # avoid overwrite if exists
                if not fpath.exists():
                    pix.save(str(fpath))
                rel = f"/plans/img/{fname}"
                lst.append(rel)
            except Exception as e:
                print(f"  img err p{p_idx} i{img_idx}: {e}")
        if lst:
            saved[p_idx] = lst
    return saved

def dict_to_blocks(page):
    d = page.get_text("dict")
    blocks = []
    for b in d["blocks"]:
        if b["type"] != 0: continue
        for l in b["lines"]:
            text = ""
            is_bold = False
            is_italic = False
            max_size = 0
            for s in l["spans"]:
                t = s["text"]
                if not t: continue
                text += t
                if s["flags"] & 16: is_bold = True
                if s["flags"] & 2: is_italic = True
                max_size = max(max_size, s["size"])
            text = re.sub(r"\s+", " ", text).strip()
            if not text: continue
            if text == "Więcej arkuszy znajdziesz na stronie: arkusze.pl": continue
            if re.match(r"^Strona \d+ z \d+$", text): continue
            # skip tiny fragments that are part of larger sentence? keep all
            blocks.append({"text": text, "bold": is_bold, "italic": is_italic, "size": max_size})
    # merge consecutive non-list, non-heading lines that are parts of same sentence
    # if a block is not a list/heading and next block is also not, and both are short, merge
    # For now return as is – transform will handle merging via close_lists logic
    return blocks

def transform_to_semantic(pages_blocks, images_map):
    # pages_blocks: list per page of blocks
    html = []
    in_ol = False
    in_ul = False
    def close_lists():
        nonlocal in_ol, in_ul
        if in_ol: html.append("</ol>"); in_ol=False
        if in_ul: html.append("</ul>"); in_ul=False

    for p_idx, blocks in enumerate(pages_blocks):
        # page break marker (except first)
        if p_idx>0:
            html.append(f'<hr class="page-break" data-page="Strona {p_idx+1}" />')

        for b in blocks:
            t = b["text"]
            bold = b["bold"]
            italic = b["italic"]

            # detekcja sekcji – przed kontynuacją
            if re.match(r"^(Instrukcja dla zdającego|EGZAMIN ZAWODOWY|CZĘŚĆ PRAKTYCZNA)$", t):
                close_lists()
                html.append(f'<h2>{html_escape(t)}</h2>')
                continue
            if re.match(r"^(Zadanie egzaminacyjne)$", t):
                close_lists()
                html.append(f'<h2>{html_escape(t)}</h2>')
                continue
            if re.match(r"^Część (I|II|III)\.", t):
                close_lists()
                html.append(f'<h3>{html_escape(t)}</h3>')
                continue
            if t.startswith("UWAGA:"):
                close_lists()
                html.append(f'<div class="alert"><strong>UWAGA:</strong> {html_escape(t[6:].strip())}</div>')
                continue
            if t.startswith("Obraz ") or t.startswith("Rysunek"):
                close_lists()
                html.append(f'<h4>{html_escape(t)}</h4>')
                continue
            if (bold and len(t) < 120 and t.isupper()) or any(k in t for k in ["Zasada liczenia", "Działanie programu", "Założenia do programu", "Elementy aplikacji", "Działanie aplikacji", "Założenia aplikacji"]):
                close_lists()
                html.append(f'<h4>{html_escape(t)}</h4>')
                continue

            # listy – sam numer "1." bez treści (1-2 cyfry, nie rok 2019)
            if re.match(r"^\d{1,2}\.\s*$", t):
                if not in_ol:
                    close_lists()
                    html.append("<ol>")
                    in_ol = True
                html.append(f'<li data-marker="{html_escape(t)}"></li>')
                continue
            if re.match(r"^\d+\.\s", t):
                if not in_ol:
                    close_lists()
                    html.append("<ol>")
                    in_ol = True
                item = re.sub(r"^\d+\.\s*", "", t)
                # split if item contains " Zasada..." jako osobny heading
                if " Zasada liczenia" in item:
                    parts = item.split(" Zasada liczenia")
                    html.append(f'<li>{html_escape(parts[0].strip())}</li>')
                    close_lists()
                    html.append(f'<h4>Zasada liczenia{html_escape(" Zasada liczenia".join(parts[1:]))}</h4>' if len(parts)>1 else "")
                    continue
                html.append(f'<li>{html_escape(item)}</li>')
                continue
            if t.startswith("−") or t.startswith("‒") or t.startswith("•") or t.startswith("- "):
                if not in_ul:
                    # jeśli jesteśmy w ol, to to jest podlista – nie zamykaj ol, tylko otwórz ul wewnątrz
                    # dla prostoty zamknij ol i otwórz ul (będzie płasko, ale poprawnie)
                    if in_ol:
                        close_lists()
                    html.append("<ul>")
                    in_ul = True
                item = re.sub(r"^[−‒•-]\s*", "", t)
                html.append(f'<li>{html_escape(item)}</li>')
                continue

            # continuation of previous list item
            if (in_ol or in_ul) and not re.match(r"^\d+\.", t) and not (t.startswith("−") or t.startswith("‒") or t.startswith("•")) and not t.startswith("Obraz "):
                # nie traktuj nagłówków jako kontynuacji
                if re.match(r"^(Instrukcja|Zadanie|Część |UWAGA:|Obraz |Zasada|Działanie|Założenia|Elementy|Wypełnia|Do arkusza|Czas przeznaczony|Ocenie będą)", t): pass
                elif html and html[-1].startswith("<li"):
                    if html[-1].startswith('<li data-marker'):
                        prev = html.pop()
                        html.append(f'<li>{html_escape(t)}</li>')
                        continue
                    elif html[-1].startswith("<li>"):
                        prev = html.pop()
                        inner = prev[4:-5]
                        # jeśli poprzedni li kończy się już kropką, dodaj spację
                        html.append(f"<li>{inner} {html_escape(t)}</li>")
                        continue

            # pozostałe detekcje
            if re.match(r"^(Wykonaj (aplikację|dokumentację).*)", t):
                close_lists()
                html.append(f'<p><strong>{html_escape(t)}</strong></p>')
            elif re.match(r"^(Utwórz folder|Kod aplikacji|Czas przeznaczony|Ocenie będą|Wypełnia zdający|Do arkusza)", t):
                close_lists()
                html.append(f'<p>{html_escape(t)}</p>')
            elif italic and t.startswith("Wykonaj"):
                close_lists()
                html.append(f'<p><em>{html_escape(t)}</em></p>')
            else:
                if in_ol or in_ul:
                    close_lists()
                if bold:
                    html.append(f'<p><strong>{html_escape(t)}</strong></p>')
                elif italic:
                    html.append(f'<p><em>{html_escape(t)}</em></p>')
                else:
                    html.append(f'<p>{html_escape(t)}</p>')

        # po blokach strony, dodaj obrazy tej strony
        if p_idx in images_map:
            close_lists()
            for rel in images_map[p_idx]:
                html.append(f'<figure><img src="{rel}" alt="Obraz z arkusza – strona {p_idx+1}" loading="lazy" /><figcaption>Obraz z arkusza – strona {p_idx+1} (konwersja PDF → HTML, oryginał w PDF)</figcaption></figure>')

    close_lists()
    return "\n".join(html)

def html_escape(s): return html.escape(s)

def build_files(exam, semantic_html):
    scoring = get_scoring(exam["id"])
    total = sum(len(k) for _,k in scoring)
    scoring_html = ""
    for grupa, kryteria in scoring:
        maxg = sum(p for _,_,p in kryteria)
        scoring_html += f'<details class="score-group" open><summary><span>{html.escape(grupa)}</span><span style="color:#64748b">{maxg} pkt</span></summary><div class="criteria">'
        for kod, opis, pkt in kryteria:
            scoring_html += f'<div class="criterion"><span class="code">{html.escape(kod)}</span><p>{html.escape(opis)}</p><span class="pts">{pkt} pkt</span></div>'
        scoring_html += '</div></details>'

    zip_link = f'<a href="{exam["zip"]}" download style="font-weight:700; background:#eef2ff; border:1px solid #c7d2fe; color:#4338ca; padding:8px 12px; border-radius:10px; text-decoration:none">⬇ Pobierz ZIP załączniki</a>' if exam["zip"] else '<span style="color:#64748b; font-size:13px">Brak dodatkowych ZIP</span>'
    # fragment (do fetch w React)
    fragment = f"""<div class="transformed-content">
{semantic_html}
</div>"""

    full = f"""<!DOCTYPE html>
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
    <h1>{html.escape(exam["title"])} <span class="badge">PDF → HTML</span></h1>
    <p>{html.escape(exam["subtitle"])} • {exam["year"]} • {html.escape(exam["session"])} • {html.escape(exam["tech"])} • {exam["czas"]} min</p>
  </div>
  <a href="/" style="font-size:13px; font-weight:700; color:#4f46e5; text-decoration:none">← Portal INF.04</a>
</div>
<div class="layout">
  <div class="main">
    <div class="main-head">
      <h2>Treść arkusza – transformacja PDF na semantyczny HTML</h2>
      <div class="meta">Oryginał: <a href="{exam["pdf"]}" target="_blank">PDF arkusz</a> • Zasady: <a href="{exam["zasady"]}" target="_blank">PDF zasady</a> • Obrazy wyciągnięte z PDF i osadzone jako &lt;img&gt; • Nie jest to 1:1 dump, tylko transformacja na odpowiedni HTML</div>
      <div class="actions">
        <a class="primary" href="{exam["pdf"]}" target="_blank">Otwórz oryginalny PDF</a>
        <a href="{exam["zasady"]}" target="_blank">Zasady PDF</a>
        {zip_link}
        <a href="{exam["id"]}.fragment.html" target="_blank">Fragment HTML</a>
      </div>
    </div>
    <div class="content">
{fragment}
      <div style="margin-top:18px; padding:12px; background:#f8fafc; border:1px dashed #cbd5e1; border-radius:10px; font-size:13px; color:#475569">
        <strong>Transformacja:</strong> PDF sparsowano przez <code>PyMuPDF dict</code> (detekcja bold/italic jako nagłówki) + <code>get_images</code> → PNG w <code>img/</code> → semantyczny HTML (<code>h2/h3/ol/ul/figure</code>), nie surowy dump tekstu.
      </div>
    </div>
  </div>
  <aside class="scoring">
    <div class="scoring-head">
      <h3>Punktacja CKE – na boku</h3>
      <p>Razem {total} pkt. Sticky, widoczna przy scrollu.</p>
    </div>
    <div style="padding:10px">{scoring_html}</div>
    <div class="scoring-foot">
      <a href="{exam["pdf"]}" target="_blank" style="text-align:center; font-weight:700; padding:10px; background:#0f172a; color:white; border-radius:10px; text-decoration:none">PDF arkusz</a>
      <a href="{exam["zasady"]}" target="_blank" style="text-align:center; font-weight:700; padding:10px; background:white; border:1px solid #e2e8f0; border-radius:10px; text-decoration:none; color:#0f172a">Zasady</a>
      {f'<a href="{exam["zip"]}" download style="text-align:center; font-weight:800; padding:10px; background:#eef2ff; border:1px solid #c7d2fe; color:#4338ca; border-radius:10px; text-decoration:none">⬇ Załączniki ZIP</a>' if exam["zip"] else '<span style="text-align:center; font-size:12px; color:#64748b">Brak ZIP dla tej sesji</span>'}
    </div>
  </aside>
</div>
<div class="footer">INF.04 Portal • Transformacja PDF → HTML (PyMuPDF) • Obrazy widoczne • Punktacja na boku</div>
</body>
</html>"""
    return full, fragment

def main():
    PLANS_DIR.mkdir(parents=True, exist_ok=True)
    IMG_DIR.mkdir(parents=True, exist_ok=True)
    for exam in EXAMS:
        pdf_path = PDF_DIR / f"{exam['id']}-arkusz.pdf"
        if not pdf_path.exists():
            print(f"skip {exam['id']} brak pdf")
            continue
        print(f"→ {exam['id']} ...", end=" ")
        doc = fitz.open(str(pdf_path))
        # extract images first
        images_map = extract_images(doc, exam['id'])
        # blocks per page
        pages_blocks = []
        for page in doc:
            blocks = dict_to_blocks(page)
            pages_blocks.append(blocks)
        semantic = transform_to_semantic(pages_blocks, images_map)
        full, fragment = build_files(exam, semantic)
        (PLANS_DIR / f"{exam['id']}.html").write_text(full, encoding="utf-8")
        (PLANS_DIR / f"{exam['id']}.fragment.html").write_text(fragment, encoding="utf-8")
        doc.close()
        print(f"✓ {len(pages_blocks)} stron, {sum(len(v) for v in images_map.values())} obrazów → html + fragment")

if __name__ == "__main__":
    main()
