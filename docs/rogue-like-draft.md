# Rogue-like INF.04, plan implementacji

> Nota historyczna (2026-10-24): plan zrealizowany, ale z dwoma zmianami — elity i
> bossowie to serie pytań ABCD z theory.ts (NIGDY checklisty z kryteriów R1–R4,
> bo zdający kryteriów nie zna), a styl strony porzucono na rzecz spokojnego
> designu v2 (DESIGN.md). Aktualne zasady: AGENTS.md, sekcja "Rogue-like rules".

To jest pelny plan, nie MVP. Ustalilismy go 2026-09-15 i od razu robimy calosc.

Pomysl jest prosty. Wchodzisz do lochu, odpowiadasz na pytania, idziesz glebiej albo giniesz. Jeden run to jedna sesja nauki. Bez corporate UI, zostaje casino brutalizm i polskie napisy z caps lockiem.

## Co ustalilismy

Run laczy dwa swiaty. Zwykle pokoje to pytania z teorii, elity i bossowie to checklisty z kryteriow R1-R4. Mapa to wybor drzwi przed kazdym pietrem, zwykle 2 albo 3 opcje. Widzisz kategorie, ryzyko i mnoznik punktow, i wybierasz.

Smierc jest miekka, i dobrze. Masz 3 HP. Zla odpowiedz zabiera 1 HP. Zero HP konczy run, ale polowa punktow i tak wpada do portfela. Dzieki temu porazka uczy, a nie wkurza.

Ekonomia jest wspolna z reszta portalu. Nagrody ida do wallet.ts, a w lochu dzialaja przedmioty ze sklepu, czyli 50/50, freeze, dogrywka i losowanie. Nie wymyslamy nowej waluty ani nowych reliktow. Sklep ma sens sam w sobie.

Loch nie ma konca. Idziesz tak gleboko, jak dasz rade. Rekord to pietro plus punkty. Boss czeka co 5 pietro.

Render to zwykly DOM z Tailwindem. Bez canvas, bez grida 2D. Szybciej to napiszemy i bedzie dzialac na telefonie.

## Jak wyglada jeden run

Zaczynasz z 3 HP i zerem punktow. Gra losuje seed i pilnuje, zeby pytania sie nie powtarzaly.

Od pietra 2 gra losuje mutator. Potem pokazuje drzwi. Jedne sa latwe i placa x1, drugie sa ryzykowne i placa x2. Elita ma znaczek skrzyni.

W pokoju ze zwyklym mobem dostajesz jedno pytanie ABCD z limitem czasu. W elicie dostajesz checkliste, np. zaznacz 3 wymagania pasujace do R3 z danego arkusza. Jeden blad to minus 1 HP.

Dobra odpowiedz czysci pokoj i daje punkty. Zla daje zero i zabiera HP. Przed odpowiedzia mozesz uzyc przedmiotu ze sklepu. 50/50 dziala tylko w mobach ABCD, w elitach nie. Freeze raz na run ratuje HP. Dogrywka po wtopie daje kolejne pytanie z tej kategorii za pol nagrody.

Koniec to smierc albo ucieczka przyciskiem. W endless nie ma wygranej, wiec ucieczka placi tak samo jak smierc, czyli polowe. Gra pokazuje podsumowanie z pietrem, liczba dobrych i zlych odpowiedzi i punktami brutto i netto. Rekord laduje w localStorage pod kluczem inf04.rogue.best. Trzymamy tam pietro, punkty, date i liczbe mutatorow. Bez szyfrowania, bo to rekord, nie kasa.

## Walka i pytania

Moby biora sie z theory.ts. Losujemy z kategorii wybranych drzwi. Jak w kategorii skonczy sie pula, gra losuje z dowolnej innej i placa x1. Uczciwe i proste.

Elity biora sie z exams.ts. Gra bierze wymagania z planu losowego arkusza i dokleja 2 albo 3 falszywe z innego arkusza. Ty zaznaczasz N poprawnych. W zwyklej elicie N to 3, w bossie N to 4. Boss ma krotszy timer, nagrode x3 i leczy 1 HP za czysty pokoj. To jedyne leczenie w grze.

I tu moje zdanie. Ten format elity to najlepszy kompromis. Nie zbudujemy edytora zadan praktycznych, a checklista z prawdziwych kryteriow CKE i tak uczy czytania arkusza.

## Mutatory CKE

Mutator to przyprawa pietra. Zaczyna sie od pietra 2. Od pietra 6 moga wpasc dwa naraz.

Pula na start to piec sztuk.
EGZAMINATOR skraca timer o 10 s i mnozy nagrode razy 2.
MGLA chowa odpowiedzi blur CSS przez pierwsze 5 s i mnozy razy 1.5.
GRZYBNIA miesza w opisie i dodaje 5 s, nagroda razy 1.5.
STRES CKE chowa podglad kolejnych drzwi, nagroda razy 2.
DOPING dodaje 10 s, ale nagroda spada do x0.5.

Mutator wisi duzym stemplem na drzwiach i w HUD. Od razu widac, na co sie piszesz.

Timer tez rosnie z pietrem. Moby maja 30 s na pietrach 1 do 5, potem 25 s, od 11 pietra 20 s. Elita ma zawsze 60 s. Boss ma 40 s. Pula trudnych kategorii tez rosnie. Najpierw podstawy, potem mieszanka, na glebokich pietrach tylko trudne.

## Punkty, sklep i portfel

Wejscie jest darmowe. Punkty liczysz w glowie tak.
Baza to 10 za moba, 20 za elite, 30 za bossa. Mnozysz przez mnoznik drzwi i mutatora. Do tego streak, plus 2 za kazdy dobry pokoj z rzedu, max 10, tak samo jak calcAward w portfelu. Streak zeruje sie na zlej odpowiedzi.

Wazne. Punkty trafiaja do portfela raz, na koncu runu. Gra robi jeden earnWallet z wartoscia netto plus zbiorczy zapis odpowiedzi. W trakcie runu punkty zyja tylko w pamieci. Dzieki temu przeladowanie strony nic nie dubluje.

Stan runu do przeladowania trzymamy w localStorage, ale bez punktow. Zapisujemy pietro, HP, liste uzytych pytan, zuzyte przedmioty i mutator. Punkty liczymy od nowa z historii odpowiedzi na koncu.

Przedmioty schodza przez consumeWallet. Spin i niespodzianka w lochu nie dzialaja, reszta tak. Flagi globalne dzialaja normalnie. Stop-klatka wycisza animacje. Loch domyslnie chowa kasyno, czyli jackpot, ticker i popupy. Ma byc skupienie, nie migotanie.

## Ekran i technika

Nowa strona to src/routes/rogue.tsx pod adresem /rogue. Link wchodzi do headera i do strony teorii. Fazy sa proste. Lobby, drzwi, walka, wynik, smierc.

Logike trzymamy w src/lib/rogue.ts. Czyste funkcje, zero Reacta. Seed, losowanie drzwi i pytan, mutatory, nagrody, budowanie elity. Hook src/hooks/use-rogue-run.ts trzyma stan runu i czyta oraz pisze klucze inf04.rogue. Komponenty to male pliki w stylu exam-gadgets.tsx. HUD, drzwi, walka z mobem, walka z elita, podsumowanie smierci.

Dane sa tylko do odczytu. Teoria z theory.ts, elity z exams.ts, kasa z wallet.ts, opisy przedmiotow z shop.ts.

Dostepnosc od poczatku. Duze przyciski, timer z aria-live, ABCD z klawiatury.

## Balans na start

3 HP. Leczenie tylko z czystego bossa, max 3. Freeze ratuje raz.

Nagrody jak wyzej, po smierci floor z polowy do portfela. Pytania bez powtorek w runie. Pula teorii ma setki pozycji, wiec starczy na dlugie zejscia.

Szczerze, balans i tak wyjdzie w grze. Te liczby to punkt startu do tuningu, nie swietosc.

## Czego nie robimy

Nie ma canvas ani animacji walki. Nie ma grida ani mgly wojny. Nie ma klas postaci, XP ani reliktow. Nie ma rankingu sieciowego ani backendu. Nie ma kosztu wejscia ani ujemnych punktow. Nie tykamy PDF viewera i nie wracamy do react-pdf.

## Jak sprawdzimy czy dziala

Najpierw lint ma byc czysty. Potem build musi przejsc razem z typecheckiem i regeneracja route tree. Potem recznie jeden run na minimum 8 pieter. Mob dobrze i zle, elita, 50/50, smierc, portfel plus 50 procent, zapisany best-run, refresh w trakcie runu bez dublowania punktow.
