#!/usr/bin/env python3
"""Buduje src/data/theory.js z surowej bazy (/tmp/opencode/teoria-baza.json).

Klasyfikuje pytania do 8 kategorii koła fortuny heurystyką słów kluczowych,
drukuje rozkład i pytania bez dopasowania.
Uruchomienie:  python3 scripts/build-teoria.py
"""
import json
import re
from collections import Counter

SRC = "/tmp/opencode/teoria-baza.json"
DST = "src/data/theory.ts"

# Grafiki mirrorujemy 1:1 na naszym R2 (klon question<N>.jpg z repo
# Marmo77/egzamin-programista, MIT) — UI nie zależy od hotlinku ee-informatyk.
R2_BASE = "https://pub-bf64d570b3ab4d7b8df0c4ffe64d014e.r2.dev"
EE_IMG = "https://ee-informatyk.pl/src/img/quizy/inf04/"


def mirror_img(url):
    if url.startswith(EE_IMG):
        return R2_BASE + "/" + url[len(EE_IMG):]
    return url

# Kolejność = priorytet (pierwsze trafienie wygrywa).
RULES = [
    ("bhp", ["wypadek przy pracy", "wypadku", "natężenie dźwięku", "db", "bhp",
             "ergonom", "zagrożen", "ochrony zbiorowej", "ochrona zbiorowa",
             "prawa autorskie", "niezbywalne", "majątkowe", "osobiste",
             "rodo", "danych osobowych", "creative commons", "niejawne",
             "stanowisku pracy", "pierwsza pomoc", "p.poż", "przeciwpożarowa"]),
    ("sql", ["sql", "baza danych", "bazodan", "nosql", "relacyjn", "orm",
             "tabela", "rekord", "klucz główny", "klucz obcy", "zapytanie",
             "select", "normalizac", "encja", "atrybut", "relacja"]),
    ("testy", ["testów", "testy", "testu", "testowanie", "testowania",
               "asercj", "assert", "arrange", "selenium", "postman", "jira",
               "tdd", "debug", "przypadek testowy", "scenariusz testowy",
               "plan testów", "błędu w kodzie", "błąd w kodzie", "walidacja kodu",
               "dokumentacja test", "dokumentacja wdrożen", "instrukcj",
               "optymalizacji kodu", "optymalizacj", "refaktoryz",
               "jakości kodu", "wydajności aplikacji", "obciążeniowe",
               "użyteczności", "prototypu interfejsu"]),
    ("mobile", ["mobiln", "android", "ios", "swift", "kotlin", "google play",
                "app store", "sklepie", "emulator", "genymotion", "xcode",
                "layout", "widżet", "aktywności", "activity", "responsive"]),
    ("web", ["http", "html", "css", "javascript", "react", "angular",
             "jquery", "ciastecz", "cookie", "sesj", "xss", "api", "rest",
             "json", "xml", "node.js", "django", "asp.net", "e-commerce",
             "sklep internetowy", "websocket", "local storage", "spa",
             "single page", "framework", "bootstrap", "przeglądark",
             "serwer", "hosting", "domena", "url", "frontend", "backend",
             "fullstack", "webowa", "webowej", "witryn", "portal"]),
    ("oop", ["klasa", "obiekt", "dziedzicz", "polimorfizm", "enkapsulacja",
             "hermetyzacja", "interfejs", "abstrakcyjn", "konstruktor",
             "wirtualn", "getter", "setter", "delegat", "dry", "solid",
             "kiss", "yagni", "wzorzec", "mvc", "obserwator", "iterator",
             "szablon", "refleksja", "indexer", "przeciąż", "przesłonię",
             "statyczn", "prywatne pole", "publiczne", "protected",
             "agregacj", "kompozycj", "uml", "diagram klas", "c#"]),
    ("algo", ["algorytm", "sortowan", "dijkstr", "kruskal", "stos", "kolejka",
              "fifo", "lifo", "złożoność", "rekurencj", "rekursj", "drzewo",
              "graf", "quicksort", "bąbelkow", "wstawianie", "wybieranie",
              "binarn", "heksadecymal", "szesnastkow", "ósemkow", "systemów liczb",
              "schemat blokowy", "pseudokod", "iteracj", "wartownik",
              "przeszukiwanie", "wyszukiwanie", "kopiec", "hash", "szyfr",
              "szyfrowanie", "minimalne drzewo", "najkrótsz"]),
]
FALLBACK = "cpp"  # języki/kod ogólny: typy, pętle, operatory, kompilatory...


def kat(q):
    hay = (q["tresc"] + " " + " ".join(q["odpowiedzi"])).lower()
    for cid, words in RULES:
        if any(w in hay for w in words):
            return cid
    return FALLBACK


def main():
    baza = json.load(open(SRC, encoding="utf-8"))
    out = []
    for q in baza:
        out.append({
            "id": f"ee-{q['id']}",
            "kat": kat(q),
            "tresc": q["tresc"],
            "odpowiedzi": q["odpowiedzi"],
            "poprawna": q["poprawna"],
            **({"img": mirror_img(q["img"])} if q.get("img") else {}),
        })
    print("ROZKŁAD:", dict(Counter(o["kat"] for o in out)))
    print("RAZEM:", len(out))

    with open("src/data/theory.ts", encoding="utf-8") as f:
        old = f.read()
    before, sep, after = old.partition("export const THEORY_QUESTIONS = ")
    tail = ""
    if sep:
        # wszystko po bloku pytań (do pierwszego "];" + reszta pliku, np. THEORY_SOURCES)
        m = re.search(r"\];\s*", after)
        if m:
            tail = after[m.end():]
    body = "export const THEORY_QUESTIONS = "
    body += json.dumps(out, ensure_ascii=False, indent=2)
    body += ";\n"
    with open(DST, "w", encoding="utf-8") as f:
        f.write(before + body + tail)
    print("Zapisano", DST)


if __name__ == "__main__":
    main()
