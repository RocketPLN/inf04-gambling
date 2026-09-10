#!/usr/bin/env node
// Pobiera wszystkie PDF INF.04 i generuje plany HTML
// Uruchom: node scripts/download-pdfs.js
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const outDir = path.join(root, "public", "pdfs");
const plansDir = path.join(root, "public", "plans");

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

function htmlTemplate(exam){
  const id = exam.id;
  return `<!DOCTYPE html>
<html lang="pl">
<head><meta charset="UTF-8"><title>Plan – ${id}</title>
<style>body{font-family:system-ui; max-width:800px; margin:40px auto; padding:0 20px; line-height:1.6} h1{color:#1e293b} .badge{background:#eef2ff; padding:4px 10px; border-radius:999px; font-size:13px} pre{background:#f8fafc; padding:12px; border-radius:8px; overflow:auto}</style>
</head>
<body>
<h1>Plan realizacji – ${id}</h1>
<p><span class="badge">INF.04</span> Wygenerowano automatycznie z PDF.</p>
<p>Oryginalny arkusz: <a href="${exam.pdf}">${exam.pdf}</a><br>Zasady oceniania: <a href="${exam.zasady}">${exam.zasady}</a></p>
<h2>Instrukcja</h2>
<ol>
<li>Zapoznaj się z arkuszem PDF i załącznikami (jeśli są).</li>
<li>Wykonaj zadania zgodnie z kolejnością w HTML planie w aplikacji React.</li>
<li>Sprawdź punktację w panelu bocznym – każdy punkt to 1 kryterium CKE.</li>
<li>Zrób zrzuty ekranu z paskiem zadań.</li>
</ol>
<pre>Ten plik jest placeholderem. Pełna konwersja PDF→HTML wymaga pdfjs.
W aplikacji React plany są renderowane dynamicznie z src/data/exams.js z punktacją na boku.</pre>
</body></html>`;
}

async function main(){
  fs.mkdirSync(outDir, {recursive:true});
  fs.mkdirSync(plansDir, {recursive:true});
  console.log(`Pobieranie ${exams.length*2} PDF-ów do ${outDir} ...`);
  for(const e of exams){
    await download(e.pdf, path.join(outDir, `${e.id}-arkusz.pdf`));
    await download(e.zasady, path.join(outDir, `${e.id}-zasady.pdf`));
    if(e.zip) await download(e.zip, path.join(outDir, `${e.id}-zalaczniki.zip`));
    const html = htmlTemplate(e);
    fs.writeFileSync(path.join(plansDir, `${e.id}.html`), html, "utf-8");
    console.log(`  → plan HTML: ${e.id}.html`);
  }
  console.log("\nGotowe. Plany HTML + PDF w public/");
  console.log("Tip: npm run dev – podgląd w React. PDF-y serwowane z /pdfs/");
}
main();
