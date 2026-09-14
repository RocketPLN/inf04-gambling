#!/usr/bin/env node
// Pobiera wszystkie PDF INF.04 + ZIPy do public/pdfs/
// Uruchom: node scripts/download-pdfs.js
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const outDir = path.join(root, "public", "pdfs");

const exams = [
  { id:"inf04-2026-czerwiec", pdf:"https://arkusze.pl/zawodowy/inf04-2026-czerwiec-egzamin-zawodowy-praktyczny.pdf", zasady:"https://arkusze.pl/zawodowy/inf04-2026-czerwiec-egzamin-zawodowy-praktyczny-zasady-oceniania.pdf" },
  { id:"inf04-2026-styczen", pdf:"https://arkusze.pl/zawodowy/inf04-2026-styczen-egzamin-zawodowy-praktyczny.pdf", zasady:"https://arkusze.pl/zawodowy/inf04-2026-styczen-egzamin-zawodowy-praktyczny-zasady-oceniania.pdf", zip:"https://arkusze.pl/zawodowy/inf04-2026-styczen-egzamin-zawodowy-praktyczny-zalaczniki.zip" },
  { id:"inf04-2025-czerwiec", pdf:"https://arkusze.pl/zawodowy/inf04-2025-czerwiec-egzamin-zawodowy-praktyczny.pdf", zasady:"https://arkusze.pl/zawodowy/inf04-2025-czerwiec-egzamin-zawodowy-praktyczny-zasady-oceniania.pdf" },
  { id:"inf04-2025-styczen", pdf:"https://arkusze.pl/zawodowy/inf04-2025-styczen-egzamin-zawodowy-praktyczny.pdf", zasady:"https://arkusze.pl/zawodowy/inf04-2025-styczen-egzamin-zawodowy-praktyczny-zasady-oceniania.pdf", zip:"https://arkusze.pl/zawodowy/inf04-2025-styczen-egzamin-zawodowy-praktyczny-zalaczniki.zip" },
  { id:"inf04-2024-czerwiec", pdf:"https://arkusze.pl/zawodowy/inf04-2024-czerwiec-egzamin-zawodowy-praktyczny.pdf", zasady:"https://arkusze.pl/zawodowy/inf04-2024-czerwiec-egzamin-zawodowy-praktyczny-zasady-oceniania.pdf" },
  { id:"inf04-2024-styczen", pdf:"https://arkusze.pl/zawodowy/inf04-2024-styczen-egzamin-zawodowy-praktyczny.pdf", zasady:"https://arkusze.pl/zawodowy/inf04-2024-styczen-egzamin-zawodowy-praktyczny-zasady-oceniania.pdf" },
  { id:"inf04-2023-czerwiec", pdf:"https://arkusze.pl/zawodowy/inf04-2023-czerwiec-egzamin-zawodowy-praktyczny.pdf", zasady:"https://arkusze.pl/zawodowy/inf04-2023-czerwiec-egzamin-zawodowy-praktyczny-zasady-oceniania.pdf", zip:"https://arkusze.pl/zawodowy/inf04-2023-czerwiec-egzamin-zawodowy-praktyczny-zalaczniki.zip" },
  { id:"inf04-2023-styczen", pdf:"https://arkusze.pl/zawodowy/inf04-2023-styczen-egzamin-zawodowy-praktyczny.pdf", zasady:"https://arkusze.pl/zawodowy/inf04-2023-styczen-egzamin-zawodowy-praktyczny-zasady-oceniania.pdf" },
  { id:"inf04-2022-czerwiec", pdf:"https://arkusze.pl/zawodowy/inf04-2022-czerwiec-egzamin-zawodowy-praktyczny.pdf", zasady:"https://arkusze.pl/zawodowy/inf04-2022-czerwiec-egzamin-zawodowy-praktyczny-zasady-oceniania.pdf", zip:"https://arkusze.pl/zawodowy/inf04-2022-czerwiec-egzamin-zawodowy-praktyczny-zalaczniki.zip" },
  { id:"inf04-2022-styczen", pdf:"https://arkusze.pl/zawodowy/inf04-2022-styczen-egzamin-zawodowy-praktyczny.pdf", zasady:"https://arkusze.pl/zawodowy/inf04-2022-styczen-egzamin-zawodowy-praktyczny-zasady-oceniania.pdf" },
  { id:"inf04-2021-czerwiec", pdf:"https://arkusze.pl/zawodowy/inf04-2021-czerwiec-egzamin-zawodowy-praktyczny.pdf", zasady:"https://arkusze.pl/zawodowy/inf04-2021-czerwiec-egzamin-zawodowy-praktyczny-zasady-oceniania.pdf" },
];

async function download(url, dest){
  try{
    const res = await fetch(url);
    if(!res.ok){ console.warn(`⚠️  ${res.status} ${url}`); return false; }
    const buf = Buffer.from(await res.arrayBuffer());
    fs.mkdirSync(path.dirname(dest), {recursive:true});
    fs.writeFileSync(dest, buf);
    console.log(`✓ ${path.basename(dest)} (${(buf.length/1024).toFixed(1)} KB)`);
    return true;
  }catch(e){ console.error("✗", url, e.message); return false;}
}

// Dodatkowe wersje zadań CKE (zad 02/03, których nie ma na arkusze.pl) + oryginalne
// paczki załączników CKE. CKE centralnie nie publikuje arkuszy sesyjnych formuły 2019
// (robią to OKE) – pliki 1:1 z dokumentami CKE (oryginalne nazwy w komentarzu).
// ZIPy/7z CKE są szyfrowane hasłem z dnia egzaminu. Warianty SD/AD/AG (sesja dodatkowa,
// duży druk) pominięte – to te same zadania. Zasady w XLSX po pobraniu konwertuj:
//   pip install openpyxl fpdf2 && python3 scripts/xlsx_to_pdf.py
// (konwerter zapisuje *-zasady.pdf obok i usuwa XLSX – w repo zostają same PDF-y).
// [katalog sesji w mirrorze, oryginalna nazwa CKE, nazwa lokalna]
const CKE_RAW = "https://raw.githubusercontent.com/Technikum-TEB-Edukacja-we-Wroclawiu/INF.04-rozwiazania/main/_arkusze";
const ckeVersions = [
  // 2022-06 zad 02: konsola "Logika forum" + web "Zapisy na kursy"
  // (zad1.zip = obraz.jpg do zad 01 idzie zwykłą ścieżką `exams` z arkusze.pl)
  ["2022-06", "inf_04_2022_06_02_SG_kolor.pdf", "inf04-2022-czerwiec-z2-arkusz.pdf"],
  ["2022-06", "INF_04_2022_06_02_SG_zo.xlsx", "inf04-2022-czerwiec-z2-zasady.xlsx"],
  // 2023-01 zad 02: "Klasa notatki" + mobilna "Proste notatki" (+ dane.txt)
  ["2023-01", "inf_04_2023_01_02_SG_kolor.pdf", "inf04-2023-styczen-z2-arkusz.pdf"],
  ["2023-01", "INF_04_2023_01_02_SG_zo.xlsx", "inf04-2023-styczen-z2-zasady.xlsx"],
  ["2023-01/INF.04-02-23.01-SG", "zad2.zip", "inf04-2023-styczen-z2-zalaczniki.zip"],
  // 2023-06 zad 02: "Sortowanie bąbelkowe" + mobilna "Właściwości czcionki"
  ["2023-06", "inf_04_2023_06_02_SG_kolor.pdf", "inf04-2023-czerwiec-z2-arkusz.pdf"],
  ["2023-06", "INF_04_2023_06_02_SG_zo.xlsx", "inf04-2023-czerwiec-z2-zasady.xlsx"],
  // 2023-06 zad 03: "Wypożyczalnia filmów" + web "Formularz"
  ["2023-06", "inf_04_2023_06_03_SG_kolor.pdf", "inf04-2023-czerwiec-z3-arkusz.pdf"],
  ["2023-06", "INF_04_2023_06_03_SG_zo.xlsx", "inf04-2023-czerwiec-z3-zasady.xlsx"],
  // 2024-01 zad 02: "String tools" + mobilna "Wizyta u weterynarza" (+ materialy.7z)
  ["2024-01", "inf_04_2024_01_02_SG.pdf", "inf04-2024-styczen-z2-arkusz.pdf"],
  ["2024-01", "INF_04_2024_01_02_SG_zo.pdf", "inf04-2024-styczen-z2-zasady.pdf"],
  ["2024-01", "materialy.7z", "inf04-2024-styczen-zalaczniki.7z"],
  // 2024-06 zad 02: "Odtwarzacz muzyki" + desktop GUI; pliki1 = kości (zad 01)
  ["2024-06", "inf_04_2024_06_02_SG.pdf", "inf04-2024-czerwiec-z2-arkusz.pdf"],
  ["2024-06", "INF_04_2024_06_02_SG_zo.pdf", "inf04-2024-czerwiec-z2-zasady.pdf"],
  ["2024-06", "pliki1.zip", "inf04-2024-czerwiec-z1-zalaczniki.zip"],
  ["2024-06", "pliki2.zip", "inf04-2024-czerwiec-z2-zalaczniki.zip"],
  // 2025-01 zad 02: "Urządzenia domowe" + mobilna (pliki4 = odkurzacz/pralka)
  ["2025-01", "inf_04_2025_01_02_SG.pdf", "inf04-2025-styczen-z2-arkusz.pdf"],
  ["2025-01", "inf_04_2025_01_02_SG_zo.pdf", "inf04-2025-styczen-z2-zasady.pdf"],
  ["2025-01", "pliki4.zip", "inf04-2025-styczen-z2-zalaczniki.zip"],
  // 2025-06 zad 02: "Szyfr Cezara + testy" + desktop (bez dedykowanych załączników)
  ["2025-06", "inf_04_2025_06_02_SG.pdf", "inf04-2025-czerwiec-z2-arkusz.pdf"],
  ["2025-06", "INF_04_2025_06_02_SG_zo.pdf", "inf04-2025-czerwiec-z2-zasady.pdf"],
  // 2026-01 zad 02: "Quiz Pytanie" + mobilna "Quiz górski"
  ["2026-01", "inf_04_2026_01_02_SG.pdf", "inf04-2026-styczen-z2-arkusz.pdf"],
  ["2026-01", "INF_04_2026_01_02_SG_zo.pdf", "inf04-2026-styczen-z2-zasady.pdf"],
  ["2026-01", "zad1.7z", "inf04-2026-styczen-z1-zalaczniki.7z"],
  ["2026-01", "zad2.7z", "inf04-2026-styczen-z2-zalaczniki.7z"],
  // UWAGA: sesja 2026-06 (lato 2026) – publicznie dostępny jest tylko zad 01
  // (arkusze.pl); zad 02 nieopublikowany w dniu pobierania.
];

async function main(){
  fs.mkdirSync(outDir, {recursive:true});
  console.log(`Pobieranie ${exams.length*2} PDF-ów do ${outDir} ...`);
  for(const e of exams){
    await download(e.pdf, path.join(outDir, `${e.id}-arkusz.pdf`));
    await download(e.zasady, path.join(outDir, `${e.id}-zasady.pdf`));
    if(e.zip) await download(e.zip, path.join(outDir, `${e.id}-zalaczniki.zip`));
  }
  console.log(`\nPobieranie dodatkowych wersji CKE (zad 02/03) + załączników CKE ...`);
  for(const [dir, orig, local] of ckeVersions){
    await download(`${CKE_RAW}/${dir}/${orig}`, path.join(outDir, local));
  }
  console.log("\nGotowe. PDF-y serwowane z /pdfs/ i pokazywane we wbudowanym podglądzie przeglądarki.");
  console.log("Tip: npm run dev – podgląd w React.");
}
main();
