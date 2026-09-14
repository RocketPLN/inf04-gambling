#!/usr/bin/env python3
"""Scraper bazy pytań teoretycznych INF.04 z ee-informatyk.pl.

Pobiera strony /inf04/pytanie/<id> (poprawna odpowiedź oznaczona klasą
--ready--correct wprost w HTML) i zapisuje /tmp/opencode/teoria-baza.json.

Grafik NIE pobieramy (oszczędzamy CDN) — zapisujemy tylko zdalny URL
https://ee-informatyk.pl/src/img/quizy/inf04/*.jpg, a UI ładuje go
z fallbackiem gdy host zablokuje hotlink.

Uruchomienie:  python3 scripts/scrape-teoria.py [od] [do]
Przykład:      python3 scripts/scrape-teoria.py 1 631
"""
import json
import re
import sys
import urllib.request
from concurrent.futures import ThreadPoolExecutor

BASE = "https://ee-informatyk.pl"
OUT_JSON = "/tmp/opencode/teoria-baza.json"
WORKERS = 10
UA = {"User-Agent": "inf04-study-app/1.0 (nauka wlasna)"}


def fetch(url):
    req = urllib.request.Request(url, headers=UA)
    with urllib.request.urlopen(req, timeout=30) as r:
        return r.read().decode("utf-8", errors="replace")


def parse_question(qid, html):
    body = html.split("</head>")[-1]
    if "full_question_quiz--list--one" not in body:
        return None
    t = re.search(r"full_question_quiz--list--one'><h2>(.*?)</h2>", body, re.S)
    if not t:
        return None
    tresc = re.sub(r"<[^>]+>", "", t.group(1)).strip()
    after = body[t.end():]
    img = re.search(r"<img src='([^']+)'", after[:2000])
    img_src = img.group(1) if img else None
    if img_src and img_src.startswith("/"):
        img_src = BASE + img_src
    answers = re.findall(
        r"<div class='full_question_quiz--list--answers--ready(.*?)'><b>[A-D]\.</b>(.*?)</div>",
        after,
        re.S,
    )[:4]
    if len(answers) != 4:
        return None
    poprawna = None
    czyste = []
    for cls, txt in answers:
        if "--correct" in cls:
            poprawna = len(czyste)
        czyste.append(re.sub(r"<[^>]+>", "", txt).strip())
    if poprawna is None:
        return None
    q = {"id": qid, "tresc": tresc, "odpowiedzi": czyste, "poprawna": poprawna}
    if img_src:
        q["img"] = img_src
    return q


def one(qid):
    try:
        return parse_question(qid, fetch(f"{BASE}/inf04/pytanie/{qid}"))
    except Exception as e:  # noqa: BLE001 - scraper ma lecieć dalej
        print(f"id={qid} BŁĄD: {e}")
        return None


def main():
    start, end = (int(sys.argv[1]), int(sys.argv[2])) if len(sys.argv) > 2 else (1, 631)
    ids = list(range(start, end + 1))
    baza, errors = [], []
    with ThreadPoolExecutor(max_workers=WORKERS) as pool:
        for qid, q in zip(ids, pool.map(one, ids)):
            if q:
                baza.append(q)
            else:
                errors.append(qid)
    baza.sort(key=lambda q: q["id"])
    try:
        old = {q["id"]: q for q in json.load(open(OUT_JSON, encoding="utf-8"))}
    except (FileNotFoundError, json.JSONDecodeError):
        old = {}
    for q in baza:
        old[q["id"]] = q
    baza = [old[k] for k in sorted(old)]
    with open(OUT_JSON, "w", encoding="utf-8") as f:
        json.dump(baza, f, ensure_ascii=False, indent=1)
    print(f"KONIEC: pytań={len(baza)} błędów={len(errors)}")
    if errors:
        print("Błędne ID:", errors)


if __name__ == "__main__":
    main()
