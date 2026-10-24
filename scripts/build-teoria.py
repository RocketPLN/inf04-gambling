#!/usr/bin/env python3
"""Buduje src/data/theory.ts z surowej bazy (/tmp/opencode/teoria-baza.json).

Klasyfikuje pytania do kategorii strony /teoria heurystyką słów kluczowych,
drukuje rozkład i pytania bez dopasowania.
Uruchomienie:  python3 scripts/build-teoria.py
Gdy surowej bazy nie ma w /tmp, klasyfikuje na nowo pytania wyciągnięte
z istniejącego src/data/theory.ts (ten sam kształt pól, id bez prefiksu "ee-").
"""
import json
import os
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
             "stanowisku pracy", "pierwsza pomoc", "p.poż", "przeciwpożarow",
             "poszkodowan", "pozycji bocznej", "gaśnic", "alarmow"]),
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
                "layout", "widżet", "aktywności", "activity", "responsive",
                "komórk"]),
    ("sieci", ["sieci", "sieć", "dns", "tcp", "udp", "ipv4", "ipv6",
               "adres ip", "adresy ip", "numer ip", "router", "switch",
               "modem", "ethernet", "wifi", "wi-fi", "wlan", "protok",
               "maska podsieci", "podsiec", "brama domyślna", "firewall",
               "zapora", "transmisj", "kabel", "topologi",
               "skrętk", "światłow", "smtp", "ftp",
               "dhcp", "ransomware", "phishing", "malware", "trojan",
               "antywirus", "wirus", "klucze publiczn"]),
    ("sprzet", ["procesor", "cpu", "pamięć", "pamięci", "dysk", "ssd", "hdd",
                "druk", "skaner", "płyta główna", "bios", "uefi", "zasilacz",
                "karta graficzna", "monitor", "komputer", "urządzeni",
                "peryfer", "sprzęt", "usb", "taktow", "gniazd", "twardy",
                "laptop", "analogow", "mikrokontroler"]),
    ("web", ["http", "html", "css", "javascript", "react", "angular",
             "jquery", "ciastecz", "cookie", "sesj", "xss", "api", "rest",
             "json", "xml", "node.js", "django", "asp.net", "e-commerce",
             "sklep internetowy", "websocket", "local storage", "spa",
             "single page", "framework", "bootstrap", "przeglądark",
             "serwer", "hosting", "domena", "url", "frontend", "backend",
             "fullstack", "webowa", "webowej", "witryn", "portal"]),
    ("projekt", ["git ", "github", "gitlab", "repozytor", "kontrola wersji",
                 "wersjonow", "scrum", "agile", "kanban", "sprint",
                 "cykl życia", "wytwarzani", "metodolog", "etap",
                 "pull request", "merge", "zasobów ludzkich",
                 "wymagań", "gantt", "kamień milowy",
                 "harmonogram", "ryzyka projektu", "budżetu"]),
    ("oop", ["klasa", "obiekt", "dziedzicz", "polimorfizm", "enkapsulacja",
             "hermetyzacja", "interfejs", "abstrakcyjn", "konstruktor",
             "wirtualn", "getter", "setter", "delegat", "dry", "solid",
             "kiss", "yagni", "wzorzec", "mvc", "obserwator", "iterator",
             "szablon", "refleksja", "indexer", "przeciąż", "przesłonię",
             "statyczn", "prywatne pole", "publiczne", "protected",
             "agregacj", "kompozycj", "uml", "diagram klas", "c#",
             "wyjątk", "exception"]),
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


def resolve_question_block(txt):
    """Zwraca (prefix, json_text) dla bloku THEORY_QUESTIONS, obsługuje formę z typem."""
    m = re.search(r"export const THEORY_QUESTIONS[^\n]*? = ", txt)
    if not m:
        return None, None
    prefix = txt[: m.end()]
    json_text = txt[m.end():]
    end = json_text.index("\n];")
    return prefix, json_text[: end + 3]


def load_baza():
    """Surowa baza z /tmp, a gdy jej brak — pytania z dotychczasowego theory.ts."""
    if os.path.exists(SRC):
        return json.load(open(SRC, encoding="utf-8"))
    _, json_text = resolve_question_block(open(DST, encoding="utf-8").read())
    out = []
    for q in json.loads(json_text):
        if q["id"].startswith("ee-"):
            q["id"] = q["id"][3:]
        out.append(q)
    print("Uwaga: brak", SRC, "— klasyfikuję na nowo pytania z", DST)
    return out


def main():
    baza = load_baza()
    out = []
    for q in baza:
        out.append({
            "id": f"ee-{q['id']}",
            "kat": kat(q),
            "tresc": q["tresc"],
            "odpowiedzi": q["odpowiedzi"],
            "poprawna": q["poprawna"],
            **({"img": mirror_img(q["img"])} if q.get("img") else {}),
            **({"wyjasnienie": q["wyjasnienie"]} if q.get("wyjasnienie") else {}),
        })
    print("ROZKŁAD:", dict(Counter(o["kat"] for o in out)))
    print("RAZEM:", len(out))

    old = open(DST, encoding="utf-8").read()
    prefix, json_text = resolve_question_block(old)
    if prefix is None:
        prefix = "export const THEORY_QUESTIONS: TheoryQuestion[] = "
        tail = old
    else:
        tail = old[len(prefix) + len(json_text):]
    body = json.dumps(out, ensure_ascii=False, indent=2) + ";\n"
    with open(DST, "w", encoding="utf-8") as f:
        f.write(prefix + body + tail)
    print("Zapisano", DST)


if __name__ == "__main__":
    main()
