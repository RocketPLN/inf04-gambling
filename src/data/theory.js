// MOCKUP — przykładowe pytania teoretyczne INF.04 (nie jest to prawdziwa baza CKE).
// Prawdziwe bazy żyją na: ee-informatyk.pl, praktycznyegzamin.pl, kursinf.pl,
// egzamin-programista.pl, zawodowe.edu.pl + open-source repo Marmo77/egzamin-programista (MIT, Supabase).
// Format docelowy dla prawdziwej bazy: ten sam kształt co poniżej (id, kat, tresc, odpowiedzi[4], poprawna, wyjasnienie).

export const THEORY_CATEGORIES = [
  { id: "oop", label: "OOP", color: "#ff00ff", text: "#ffff00" },
  { id: "sql", label: "SQL / BAZY", color: "#00ffff", text: "#000000" },
  { id: "testy", label: "TESTY", color: "#00ff00", text: "#000000" },
  { id: "algo", label: "ALGORYTMY", color: "#ffff00", text: "#ff0000" },
  { id: "mobile", label: "MOBILE", color: "#ff0000", text: "#ffff00" },
  { id: "cpp", label: "KOD", color: "#0000ff", text: "#ffff00" },
  { id: "web", label: "WEB / SIECI", color: "#ff8800", text: "#000000" },
  { id: "bhp", label: "BHP / PRAWO", color: "#9900ff", text: "#ffff00" },
];

export const THEORY_QUESTIONS = [
  {
    id: "ee-1",
    kat: "bhp",
    tresc:
      "Prawidłową i ergonomiczną pozycję pracy przy komputerze zapewni krzesło, którego",
    odpowiedzi: [
      "podłokietniki są 20 cm niżej niż blat",
      "podłokietniki są 30 cm wyżej niż blat",
      "oparcie zapewnia lordozę w odcinku lędźwiowym",
      "oparcie w odcinku szyi jest pochylone do przodu o 40o",
    ],
    poprawna: 2,
  },
  {
    id: "ee-2",
    kat: "web",
    tresc:
      "Zapisane w kodzie szesnastkowym składowe RGB koloru #AA41FF po przekształceniu do kodu dziesiętnego wynoszą kolejno",
    odpowiedzi: [
      "160, 65, 255",
      "160, 64, 255",
      "170, 65, 255",
      "170, 64, 255",
    ],
    poprawna: 2,
  },
  {
    id: "ee-3",
    kat: "algo",
    tresc:
      "Która struktura danych może być zaimplementowana przy wykorzystaniu jedynie wymienionych metod?",
    odpowiedzi: ["stos", "tablica", "kolejka FIFO", "drzewo binarne"],
    poprawna: 0,
    img: "https://ee-informatyk.pl/src/img/quizy/inf04/inf04-3.jpg",
  },
  {
    id: "ee-4",
    kat: "algo",
    tresc:
      "Który z wymienionych algorytmów działających na tablicy jednowymiarowej ma złożoność obliczeniową O(n2)?",
    odpowiedzi: [
      "Sortowanie szybkie",
      "Wyszukiwanie binarne",
      "Sortowanie bąbelkowe",
      "Wypisanie elementów",
    ],
    poprawna: 2,
  },
  {
    id: "ee-5",
    kat: "sql",
    tresc:
      "W którym modelu Cyklu Życia Projektu Informatycznego występuje etap analizy ryzyka?",
    odpowiedzi: [
      "W spiralnym",
      "W kaskadowym",
      "W modelu Fry’ego",
      "W modelu z prototypem",
    ],
    poprawna: 0,
  },
  {
    id: "ee-6",
    kat: "web",
    tresc: "Przedstawiona metoda jest implementacją algorytmu",
    odpowiedzi: [
      "odwracającego napis",
      "wyszukującego znak w napisie",
      "sprawdzającego czy napis jest palindromem",
      "sortującego napis od znaku o najniższym kodzie ASCII do znaku o najwyższym kodzie",
    ],
    poprawna: 0,
    img: "https://ee-informatyk.pl/src/img/quizy/inf04/inf04-6.jpg",
  },
  {
    id: "ee-7",
    kat: "cpp",
    tresc:
      "Rezultatem wykonania przedstawionego fragmentu kodu jest wypisanie liczb z przedziału od 2 do 20, które są",
    odpowiedzi: [
      "parzyste",
      "pierwsze",
      "podzielne przez wartość zmiennej test",
      "podzielne przez wartość zmiennej check",
    ],
    poprawna: 1,
    img: "https://ee-informatyk.pl/src/img/quizy/inf04/inf04-7.jpg",
  },
  {
    id: "ee-8",
    kat: "oop",
    tresc:
      "Założenie programowania obiektowego polegające na ukrywaniu składowych klasy tak, aby były one dostępne tylko metodom tej klasy lub funkcjom zaprzyjaźnionym, to",
    odpowiedzi: ["wyjątki", "polimorfizm", "dziedziczenie", "hermetyzacja"],
    poprawna: 3,
  },
  {
    id: "ee-9",
    kat: "cpp",
    tresc: "W metodach klasy GoldCustomer są widoczne jedynie pola",
    odpowiedzi: [
      "GoldPoints",
      "GoldPoints, Name",
      "GoldPoints, Name, Id",
      "GoldPoints, Name, Id, Age",
    ],
    poprawna: 2,
    img: "https://ee-informatyk.pl/src/img/quizy/inf04/inf04-9.jpg",
  },
  {
    id: "ee-10",
    kat: "oop",
    tresc: "Co można powiedzieć o metodach klasy Point?",
    odpowiedzi: [
      "Są przeładowane (przeciążone)",
      "Zawierają przeładowanie (przeciążenie) operatora",
      "Zawierają błąd, gdyż nazwy metod muszą się różnić",
      "Pełnią funkcję konstruktorów w zależności od liczby parametrów",
    ],
    poprawna: 0,
    img: "https://ee-informatyk.pl/src/img/quizy/inf04/inf04-10.jpg",
  },
  {
    id: "ee-11",
    kat: "bhp",
    tresc:
      "W środowisku IDE do tworzenia aplikacji okienkowych utworzono okno Form1. Aby zmienić ustawienia, kolejno: nazwa\r\nokna widoczna na górnej belce, domyślny kursor na strzałkę oraz kolor tła okna, należy zmodyfikować następujące pola\r\nokna Properties:",
    odpowiedzi: [
      "Text, Cursor, BackColor",
      "Text, UseWaitCursor, BackColor",
      "(Name), Cursor, BackgroundImage",
      "(Name), UseWaitCursor, BackgroundImage",
    ],
    poprawna: 0,
    img: "https://ee-informatyk.pl/src/img/quizy/inf04/inf04-11.jpg",
  },
  {
    id: "ee-12",
    kat: "cpp",
    tresc: "Okna dialogowe niemodalne służą do",
    odpowiedzi: [
      "kontrolowania stanu aplikacji poprzez systemy menu",
      "blokowania działania aplikacji na czas wprowadzenia i zatwierdzenia danych",
      "wyświetlania komunikatów z koniecznością ich potwierdzenia, aby dalej kontynuować działanie aplikacji",
      "kontrolowania ustawień aplikacji, jako okno pozostające otwarte na ekranie przez cały czas trwania aplikacji",
    ],
    poprawna: 3,
  },
  {
    id: "ee-13",
    kat: "cpp",
    tresc:
      "Które zdarzenie jest wygenerowane, gdy nieaktywne okno lub kontrolka zostaje kliknięta myszą?",
    odpowiedzi: ["blur", "focus", "keyup", "validating"],
    poprawna: 1,
  },
  {
    id: "ee-14",
    kat: "mobile",
    tresc:
      "Na obrazie przedstawiono fragment emulacji iOS z kontrolką. Który kod XAML opisuje tę kontrolkę?",
    odpowiedzi: [
      "&lt;Slider Maximum= &quot;255&quot; /&gt;",
      "&lt;Stepper Increment= &quot;1&quot; /&gt;",
      "&lt;Switch IsToggled= &quot;true&quot; /&gt;",
      "&lt;Entry IsPassword= &quot;true&quot; /&gt;",
    ],
    poprawna: 2,
    img: "https://ee-informatyk.pl/src/img/quizy/inf04/inf04-14.jpg",
  },
  {
    id: "ee-15",
    kat: "mobile",
    tresc:
      "Aplikacja mobilna wyświetla listę, której każdy z elementów może być dotknięty palcem, aby wyświetlić jego szczegóły.\r\nZdarzenie odpowiadające tej akcji to",
    odpowiedzi: ["tapped", "toggled", "value changed", "button clicked"],
    poprawna: 0,
  },
  {
    id: "ee-16",
    kat: "oop",
    tresc:
      "Na dwóch przykładach przedstawiono mechanizm o nazwie Binding. Ma on na celu",
    odpowiedzi: [
      "wiązanie i eksportowanie plików z różnych modułów aplikacji",
      "obsługiwanie zdarzenia kontrolek interfejsu użytkownika wywołując odpowiednie funkcje",
      "wiązanie właściwości (property) elementu interfejsu użytkownika z danymi bądź właściwością innego obiektu",
      "obsługiwanie mechanizmu obietnic (promises) lub obserwatora (observable) w programowaniu asynchronicznym",
    ],
    poprawna: 2,
    img: "https://ee-informatyk.pl/src/img/quizy/inf04/inf04-16.jpg",
  },
  {
    id: "ee-17",
    kat: "sql",
    tresc:
      "Na obrazie przedstawiono fragment emulacji systemu iOS z prostą aplikacją. Górna część strony zachodzi na belkę ze stanem baterii. Który z zapisów należy zastosować w miejscu znaków zapytania, aby wprowadzić tylko marginesy górne wyłącznie dla platformy iOS?",
    odpowiedzi: [
      "x:TypeArguments=&quot;Thickness&quot;\n\n(0, 20, 0, 0)",
      "x:TypeArguments=&quot;Thickness&quot;\r\niOS= 20",
      "x:TypeArguments=&quot;Thickness&quot;\r\niOS= &quot;0, 0, 0, 0&quot;\r\nAndroid= &quot;0, 20, 0, 0&quot;\r\nWinPhone= &quot;0, 0, 0, 0&quot;",
      "x:TypeArguments=&quot;Thickness&quot;\r\niOS= &quot;0, 20, 0, 0&quot;\r\nAndroid= &quot;0, 0, 0, 0&quot;\r\nWinPhone= &quot;0, 0, 0, 0&quot;",
    ],
    poprawna: 3,
    img: "https://ee-informatyk.pl/src/img/quizy/inf04/inf04-17.jpg",
  },
  {
    id: "ee-18",
    kat: "web",
    tresc:
      "Aplikacje Web wykonane we frameworku Angular lub bibliotece React i działające na domyślnych ustawieniach portów można uruchomić na lokalnym serwerze, wpisując w przeglądarce",
    odpowiedzi: [
      "localhost:8080 (React) lub localhost:8000 (Angular)",
      "localhost:3000 (React) lub localhost:4200 (Angular)",
      "localhost:5001 (React) lub localhost:8080 (Angular)",
      "localhost:8000 (React) lub localhost:49887 (Angular)",
    ],
    poprawna: 1,
  },
  {
    id: "ee-19",
    kat: "web",
    tresc: "Mechanizm obietnic (ang. promises) w języku JavaScript ma na celu",
    odpowiedzi: [
      "poprawić czytelność kodu synchronicznego",
      "obsłużyć przechwytywanie błędów aplikacji",
      "obsłużyć funkcjonalność związaną z kodem asynchronicznym",
      "zastąpić mechanizm dziedziczenia w programowaniu obiektowym",
    ],
    poprawna: 2,
  },
  {
    id: "ee-20",
    kat: "web",
    tresc:
      "Przedstawione równoważne funkcjonalnie fragmenty kodu w bibliotece React.js oraz we frameworku Angular mają za zadanie wyświetlić",
    odpowiedzi: [
      "jedynie napis BTN_1",
      "liczbę kliknięć przycisku",
      "liczbę 0 po przyciśnięciu przycisku",
      "jedynie przycisk i obsłużyć generowane nim zdarzenie click",
    ],
    poprawna: 1,
    img: "https://ee-informatyk.pl/src/img/quizy/inf04/inf04-20.jpg",
  },
  {
    id: "ee-21",
    kat: "testy",
    tresc:
      "Które z wymienionych zadań, składających się na proces tworzenia prostej galerii zdjęć będącej aplikacją mobilną,\r\njest zadaniem zespołowym?",
    odpowiedzi: [
      "Implementacja funkcji dodajZdjecie()",
      "Utworzenie dokumentacji kodu aplikacji",
      "Przygotowanie i skonfigurowanie repozytorium dla projektu",
      "Utworzenie testu jednostkowego dla funkcji przegladajZdjecia()",
    ],
    poprawna: 1,
  },
  {
    id: "ee-22",
    kat: "cpp",
    tresc:
      "Przedstawione listingi zawierają implementację funkcji oraz zdefiniowany jeden test automatyczny sprawdzający\r\nzachowanie funkcji w przypadku, gdy argumentem jest wartość ujemna. W miejscu kropek należy wstawić drugi test\r\nsprawdzający działanie funkcji, gdy argumentem jest wartość dodatnia. Który z kodów odpowiada temu testowi?",
    odpowiedzi: ["A", "B", "C", "D"],
    poprawna: 2,
    img: "https://ee-informatyk.pl/src/img/quizy/inf04/inf04-22.jpg",
  },
  {
    id: "ee-23",
    kat: "cpp",
    tresc:
      "Która z cech przycisków typu Radio-button wyspecyfikowanych w prezentowanym fragmencie dokumentacji jest prawdziwa?",
    odpowiedzi: [
      "Właściwość labelPosition przyjmuje jedną z dwóch wartości",
      ". Etykieta (label) może być umieszczona tylko po przycisku radio-button",
      "Przyciski radio-button są grupowane w elemencie o nazwie radio-group",
      "Właściwość value radio grupy przechowuje tekst podpisu dla każdego radio-button",
    ],
    poprawna: 0,
    img: "https://ee-informatyk.pl/src/img/quizy/inf04/inf04-23.jpg",
  },
  {
    id: "ee-24",
    kat: "algo",
    tresc:
      "Metoda poszukiwań w tablicach posortowanych, która polega na podzieleniu tablicy na kilka bloków i wyszukaniu\r\nliniowym tylko w tym bloku, w którym docelowy element może się znajdować, w języku angielskim nosi nazwę",
    odpowiedzi: [
      "Jump search",
      "Binary search",
      "Ternary search",
      "Exponential search",
    ],
    poprawna: 0,
  },
  {
    id: "ee-25",
    kat: "cpp",
    tresc:
      "Wskaż odpowiedź, która wykorzystuje parafrazę jako technikę aktywnego słuchania, w sytuacji, gdy klient mówi:\r\n&quot;Interesuje mnie aplikacja, która działa szybko, niezależnie od tego, czy korzysta z niej kilku czy tysiąc użytkowników&quot;",
    odpowiedzi: [
      "Dlaczego Pani poszukuje takiej aplikacji?",
      "ilu dokładnie użytkowników będzie z niej korzystać?",
      "Wyczuwam niepewność w Pani głosie. Proszę pozwolić mi zadać kilka pytań",
      "Jeśli prawidłowo zrozumiałam, chodzi o aplikację, która dobrze się skaluje do obciążenia",
    ],
    poprawna: 3,
  },
  {
    id: "ee-26",
    kat: "cpp",
    tresc:
      'Na przedstawionych rysunkach znajduje się okno aplikacji w stanie początkowym oraz po wypełnieniu danych. Zakładając, że pole "Dostępne środki" jest przeznaczone do wprowadzania wartości typu rzeczywistego, wskaż składowe struktury, które optymalnie pasują do tych danych',
    odpowiedzi: ["Kod 1", "Kod 2", "Kod 3", "Kod 4"],
    poprawna: 1,
    img: "https://ee-informatyk.pl/src/img/quizy/inf04/inf04-26.jpg",
  },
  {
    id: "ee-27",
    kat: "web",
    tresc:
      "Na podstawie definicji przedstawionej w ramce wskaż, który rysunek przedstawia komponent Chip zdefiniowany w bibliotece Angular Material.",
    odpowiedzi: ["Rysunek 1", "Rysunek 2", "Rysunek 3", "Rysunek 4"],
    poprawna: 3,
    img: "https://ee-informatyk.pl/src/img/quizy/inf04/inf04-27.jpg",
  },
  {
    id: "ee-28",
    kat: "cpp",
    tresc: "Oznaczeniem komentarza jednoliniowego w języku Python jest:",
    odpowiedzi: ["#", "!", "&quot;&quot;", "//"],
    poprawna: 0,
  },
  {
    id: "ee-29",
    kat: "sql",
    tresc:
      "Utworzenie procedury składowej o nazwie dodajUsera w MS SQL rozpoczyna się od poleceń",
    odpowiedzi: [
      "add dodajUsera procedure",
      "create procedure dodajUsera",
      "create dodajUsera procedure",
      "add procedure dodajUsera",
    ],
    poprawna: 1,
  },
  {
    id: "ee-30",
    kat: "sql",
    tresc:
      "Zastosowanie typu DECIMAL języka SQL wymaga wcześniejszego zdefiniowania długości (liczby cyfr) przed przecinkiem oraz długości cyfr po przecinku. Jest to zapis:",
    odpowiedzi: [
      "logiczny",
      "łańcuchowy",
      "stałoprzecinkowy",
      "zmiennoprzecinkowy",
    ],
    poprawna: 2,
  },
  {
    id: "ee-31",
    kat: "sql",
    tresc:
      "Przedstawiony diagram Gantta dotyczy projektu informatycznego. Zakładając, że każdy członek zespołu ma wystarczające umiejętności, aby wykonać każde z zadań oraz do każdego z zadań można przydzielić tylko jedną osobę, która poświęca na zadanie cały dzień pracy, to minimalnie zespół musi liczyć:",
    odpowiedzi: ["5 osób", "4 osoby", "1 osobę", "2 osoby"],
    poprawna: 3,
    img: "https://ee-informatyk.pl/src/img/quizy/inf04/inf04-31.jpg",
  },
  {
    id: "ee-32",
    kat: "testy",
    tresc:
      "Jednym z etapów publikacji mobilnej w sklepie Google Play są testy Beta, których cechą charakterystyczną jest to, że są one:",
    odpowiedzi: [
      "podzielone na testy funkcjonalne, wydajnościowe i skalowalności",
      "przeprowadzane w oparciu o dokument z przypadkami testowymi",
      "wykonane przez grupę docelowych użytkowników aplikacji",
      "wykonywane przez grupę zatrudnionych testerów z firmy Google",
    ],
    poprawna: 2,
  },
  {
    id: "ee-33",
    kat: "cpp",
    tresc:
      'W przedstawionym fragmencie kodu Java wskaż nazwę zmiennej, która będzie w stanie przechowywać wartość "T"',
    odpowiedzi: ["zm1", "zm2", "zm4", "zm3"],
    poprawna: 3,
    img: "https://ee-informatyk.pl/src/img/quizy/inf04/inf04-33.jpg",
  },
  {
    id: "ee-34",
    kat: "cpp",
    tresc:
      "Reguła zaangażowania i konsekwencji jako jedna z reguł wywierania wpływu wiąże się",
    odpowiedzi: [
      "z odwdzięczeniem się osobie, która wyświadczyła nam przysługę",
      "z sugerowaniem się opinią danej społeczności",
      "z doprowadzeniem spraw do końca",
      "z posłuszeństwem wobec autorytetów",
    ],
    poprawna: 2,
  },
  {
    id: "ee-35",
    kat: "oop",
    tresc: "W językach C++ lub C# słowo kluczowe virtual można stosować do",
    odpowiedzi: [
      "pól klasy",
      "konstruktorów",
      "metod klasy",
      "funkcji zaprzyjaźnionych",
    ],
    poprawna: 2,
  },
  {
    id: "ee-36",
    kat: "bhp",
    tresc:
      "Narzędziem dedykowanym do implementacji aplikacji w środowisku WPf (ang. Windows Presentation Foundation) jest",
    odpowiedzi: ["Visual Studio", "NetBeans", "PyCharm", "XamarinStudio"],
    poprawna: 0,
  },
  {
    id: "ee-37",
    kat: "bhp",
    tresc: "Przedstawiony symbol przedstawia",
    odpowiedzi: [
      "Creative Commons",
      "domenę publiczną",
      "prawa autorskie",
      "prawo cytatu",
    ],
    poprawna: 1,
    img: "https://ee-informatyk.pl/src/img/quizy/inf04/inf04-37.jpg",
  },
  {
    id: "ee-38",
    kat: "oop",
    tresc:
      "Zastosowanie modyfikatora abstract w definicji metody klasy oznacza, że",
    odpowiedzi: [
      "w klasie tej należy zaimplementować tę metodę",
      "nie można dziedziczyć po tej klasie",
      "w klasach dziedziczących nie wolno implementować tej metody",
      "klasa ta jest bazowa dla innych klas",
    ],
    poprawna: 3,
  },
  {
    id: "ee-39",
    kat: "testy",
    tresc:
      "Wskaż rodzaj testów, które przeprowadza się podczas fazy tworzenia kodu źródłowego",
    odpowiedzi: [
      "testy wydajnościowe",
      "testy kompatybilności",
      "testy wdrożeniowe",
      "testy jednostkowe",
    ],
    poprawna: 3,
  },
  {
    id: "ee-40",
    kat: "sql",
    tresc: "Jedną z wytycznych standardu WCAG 2.0 jest",
    odpowiedzi: [
      "unikanie zapisu informacji w formie uproszczonej",
      "zmniejszanie zawartości strony poprzez zaniechanie stosowania alternatyw tekstowych dla obrazów i video",
      "stosowanie kilku schematów kolorystycznych, w tym bardzo kontrastowego",
      "stosowanie jednego, odpowiednio dużego rozmiaru czcionki",
    ],
    poprawna: 2,
  },
  {
    id: "ee-41",
    kat: "algo",
    tresc: "Wskaż niestabilny algorytm sortowania",
    odpowiedzi: [
      "sortowanie bąbelkowe",
      "sortowanie przez wstawianie",
      "sortowanie szybkie",
      "sortowanie przez zliczanie",
    ],
    poprawna: 2,
  },
  {
    id: "ee-42",
    kat: "web",
    tresc:
      "Przedstawiona deklaracja zmiennych zapisanych językiem JAVA obejmuje",
    odpowiedzi: [
      "dwie zmienne typu napisowego, dwie typu całkowitego i jedną logiczną",
      "dwie zmienne typu strukturalnego",
      "jedną zmienną typu napisowego, dwie typu całkowitego, jedną znakowego i jedną logiczną",
      "jedną zmienną typu napisowego, jedną typu rzeczywistego, jedną całkowitego, jedną znakowego i jedną logiczną",
    ],
    poprawna: 2,
    img: "https://ee-informatyk.pl/src/img/quizy/inf04/inf04-42.jpg",
  },
  {
    id: "ee-43",
    kat: "mobile",
    tresc: "Z przedstawionej definicji pola licznik można wywnioskować, że",
    odpowiedzi: [
      "aktualna wartość pola jest wspólna dla wszystkich instancji klasy i nie może być modyfikowana",
      "aktualna wartość pola jest wspólna dla wszystkich instancji klasy",
      "pole jest powiązane z daną instancją klasy i jego wartość jest charakterystyczna tylko dla tej instancji",
      "pole nie może być modyfikowane w kodzie klasy",
    ],
    poprawna: 1,
    img: "https://ee-informatyk.pl/src/img/quizy/inf04/inf04-43.jpg",
  },
  {
    id: "ee-44",
    kat: "sql",
    tresc:
      "Aby w aplikacji Web zaimplementować mechanizm gromadzenia na komputerach użytkowników danych statystycznych, można zastosować",
    odpowiedzi: ["buforowanie", "ciasteczka", "sesje", "formularze"],
    poprawna: 1,
  },
  {
    id: "ee-45",
    kat: "cpp",
    tresc:
      "Zakładając, że przedstawiona hierarchia klas reprezentuje figury geometryczne została prawidłowo zaimplementowana funkcjonalnie, a każda z możliwych figur zawiera metodę liczenia pola, to sposób deklaracji metody liczPole() wskazuje, że znajduje się ona w klasie",
    odpowiedzi: ["figura", "trapez", "czworokąt", "trójkąt"],
    poprawna: 0,
    img: "https://ee-informatyk.pl/src/img/quizy/inf04/inf04-45.jpg",
  },
  {
    id: "ee-46",
    kat: "mobile",
    tresc:
      "Z przedstawionego fragmentu kodu można wywnioskować, że element o nazwie rysunek jest",
    odpowiedzi: ["konstruktorem", "polem klasy", "metodą klasy", "obiektem"],
    poprawna: 2,
    img: "https://ee-informatyk.pl/src/img/quizy/inf04/inf04-46.jpg",
  },
  {
    id: "ee-47",
    kat: "cpp",
    tresc:
      "W aplikacji desktopowej zdefiniowano listę rozwijaną i przypisano cztery funkcje obsługujące zdarzenia tej kontrolki. Który komunikat zostanie wyświetlony w momencie wyboru w liście?",
    odpowiedzi: ["Zdarzenie 3", "Zdarzenie 4", "Zdarzenie 1", "Zdarzenie 2"],
    poprawna: 2,
    img: "https://ee-informatyk.pl/src/img/quizy/inf04/inf04-47.jpg",
  },
  {
    id: "ee-48",
    kat: "algo",
    tresc:
      "Programista chce dobrać najszybciej działający algorytm przetwarzania danych w swojej aplikacji. Na podstawie przedstawionej w tabeli złożoności obliczeniowej, należy wybrać algorytm numer",
    odpowiedzi: ["2 lub 3", "3", "4", "1 lub 5"],
    poprawna: 2,
    img: "https://ee-informatyk.pl/src/img/quizy/inf04/inf04-48.jpg",
  },
  {
    id: "ee-49",
    kat: "web",
    tresc:
      "Frameworkiem umożliwiającym programowanie aplikacji desktopowych jest",
    odpowiedzi: ["WPF", "Symfony", "Xamarin", "Angular"],
    poprawna: 0,
  },
  {
    id: "ee-50",
    kat: "web",
    tresc:
      "Którą strukturę danych reprezentuje przedstawiony kod zapisany w języku C#?",
    odpowiedzi: [
      "tablicę jednowymiarową",
      "tablicę dwuwymiarową",
      "stos",
      "listę",
    ],
    poprawna: 1,
    img: "https://ee-informatyk.pl/src/img/quizy/inf04/inf04-50.jpg",
  },
  {
    id: "ee-51",
    kat: "oop",
    tresc:
      "Przedstawiony listing zawiera pola pewnej klasy. Które pole (pola) są dostępne z poziomu programu głównego poprzez wywołanie postaci nazwaObiektu.nazwaPola?",
    odpowiedzi: ["p1", "p3 i p4", "tylko p3", "tylko p3, p4, p5"],
    poprawna: 2,
    img: "https://ee-informatyk.pl/src/img/quizy/inf04/inf04-51.jpg",
  },
  {
    id: "ee-52",
    kat: "sql",
    tresc:
      "Z której kolekcji należy skorzystać, aby przechowywać dane związane z elementem interfejsu użytkownika tak, aby element był ten informowany przez kolekcję o dodaniu, usunięciu lub zmianie jej elementu",
    odpowiedzi: [
      "ObservableCollection",
      "KeyedCollection",
      "Collection",
      "ReadOnlyCollection",
    ],
    poprawna: 0,
  },
  {
    id: "ee-53",
    kat: "web",
    tresc:
      "Na funkcjonalnie równoważnych sobie listingach fragmentów aplikacji Angular i React.js jest utworzona lista punktowana, która zawiera",
    odpowiedzi: [
      "tyle elementów, ile jest elementów w tablicy books, w każdym punkcie listy jest jeden element tablicy",
      "tyle elementów, ile jest elementów w tablicy books, w każdym punkcie listy jest element o treści {book}",
      "tylko jeden element o treści Harry Potter, Hobbit, Władca pierścieni",
      "tylko jeden element o treści Harry Potter",
    ],
    poprawna: 0,
    img: "https://ee-informatyk.pl/src/img/quizy/inf04/inf04-53.jpg",
  },
  {
    id: "ee-54",
    kat: "bhp",
    tresc:
      "W środowisku do tworzenia aplikacji, którego menu zostało przedstawione, aby usunąć wszystkie pliki pośrednie i wyjściowe projektu należy wybrać opcję",
    odpowiedzi: [
      "Run Code Analysis on Solution",
      "Batch Build",
      "Build Solution",
      "Clean Solution",
    ],
    poprawna: 3,
    img: "https://ee-informatyk.pl/src/img/quizy/inf04/inf04-54.jpg",
  },
  {
    id: "ee-55",
    kat: "cpp",
    tresc: "Pierwszym etapem tworzenia aplikacji jest",
    odpowiedzi: [
      "utworzenie przypadków testowych",
      "projekt architektury systemu",
      "dobór zestawu typów i zmiennych dla aplikacji",
      "analiza wymagań klienta",
    ],
    poprawna: 3,
  },
  {
    id: "ee-56",
    kat: "web",
    tresc:
      "Według dokumentacji menu Navbar z biblioteki Bootstrap 4, aby utworzyć menu należy zdefiniować listę",
    odpowiedzi: [
      "&lt; ul class=&quot;a, .nav-item&quot; &gt; ... &lt; /ul&gt;",
      "&lt; ol class=&quot;navbar-nav&quot; &gt; ... &lt; /ol&gt;",
      "&lt; ol class=&quot;a, .nav-item&quot; &gt; ... &lt; /ol&gt;",
      "&lt; ul class=&quot;navbar-nav&quot; &gt; ... &lt; /ul&gt;",
    ],
    poprawna: 3,
    img: "https://ee-informatyk.pl/src/img/quizy/inf04/inf04-56.jpg",
  },
  {
    id: "ee-57",
    kat: "mobile",
    tresc:
      "Przedstawiony fragment kodu z Android Studio implementuje metodę nasłuchującą do obsługi zdarzenia:",
    odpowiedzi: [
      "wciśnięcia przycisku",
      "wybrania daty",
      "przełączenia kontrolki Switch",
      "zmiany pola edycyjnego",
    ],
    poprawna: 0,
    img: "https://ee-informatyk.pl/src/img/quizy/inf04/inf04-57.jpg",
  },
  {
    id: "ee-58",
    kat: "oop",
    tresc: "Dziedziczenie jest stosowane, gdy istnieje potrzeba",
    odpowiedzi: [
      "asynchronicznej obsługi długotrwałych operacji",
      "definicji klasy bardziej specjalistycznej niż już zdefiniowana",
      "stosowania wartości stałych, niezmiennych przez czas trwania aplikacji",
      "zdefiniowania zakresu widzialności metod i pól jednej klasy",
    ],
    poprawna: 1,
  },
  {
    id: "ee-59",
    kat: "sql",
    tresc:
      "Wskaż frazę, która w języku angielskim oznacza &quot;testy wydajnościowe&quot;",
    odpowiedzi: [
      "unit testing",
      "performance testing",
      "integration testing",
      "security testing",
    ],
    poprawna: 1,
  },
  {
    id: "ee-60",
    kat: "web",
    tresc: "Kod w języku JavaScript jest",
    odpowiedzi: [
      "prototypem metody klasy",
      "definicją zmiennej typu tablicowego",
      "prototypem interfejsu",
      "definicją funkcji strzałkowej",
    ],
    poprawna: 3,
    img: "https://ee-informatyk.pl/src/img/quizy/inf04/inf04-60.jpg",
  },
  {
    id: "ee-61",
    kat: "cpp",
    tresc:
      "Teoria ustalania celów opisuje właściwie określony cel jako SMART, od pierwszych liter słów: specyficzny, Mierzalny, Ambitny, Realny i Terminowy. Wskaż cel, którego osiągnięcie wymaga wysiłku i stanowi wyzwanie dla pracownika",
    odpowiedzi: ["Mierzalny", "Ambitny", "Terminowy", "Specyficzny"],
    poprawna: 1,
  },
  {
    id: "ee-62",
    kat: "algo",
    tresc:
      "Co można obliczyć za pomocą przedstawionego algorytmu działającego na liczbach całkowitych dodatnich?",
    odpowiedzi: [
      "sumę cyfr wczytanej liczby",
      "liczbę cyfr we wczytanej liczbie",
      "największy wspólny dzielnik wczytanej liczby",
      "sumę wczytanych liczb",
    ],
    poprawna: 1,
    img: "https://ee-informatyk.pl/src/img/quizy/inf04/inf04-62.jpg",
  },
  {
    id: "ee-63",
    kat: "cpp",
    tresc:
      "Którego kodu może dotyczyć przedstawiona treść wygenerowana podczas uruchomienia programu Java>",
    odpowiedzi: ["Kodu 4", "Kodu 2", "Kodu 3", "Kodu 1"],
    poprawna: 0,
    img: "https://ee-informatyk.pl/src/img/quizy/inf04/inf04-63.jpg",
  },
  {
    id: "ee-64",
    kat: "bhp",
    tresc: "Wskaż przykład wypadku przy pracy",
    odpowiedzi: [
      "oparzenie ręki, które nastąpiło w czasie nieobowiązkowego doszkalania w czasie wolnym pracownika",
      "złe samopoczucie wywołane przewlekła chorobą pracownika, które nastąpiło w miejscu pracy",
      "uraz stawu skokowego, który nastąpił podczas bezpośredniej drogi do pracy",
      "złamanie nogi podczas urlopu wypoczynkowego udzielonego przez pracodawcę",
    ],
    poprawna: 2,
  },
  {
    id: "ee-65",
    kat: "cpp",
    tresc:
      "Która dokumentacja funkcji jest prawidłowa dla przedstawionego kodu źródłowego?",
    odpowiedzi: [
      "Dokumentacja 1",
      "Dokumentacja 3",
      "Dokumentacja 4",
      "Dokumentacja 2",
    ],
    poprawna: 3,
    img: "https://ee-informatyk.pl/src/img/quizy/inf04/inf04-65.jpg",
  },
  {
    id: "ee-66",
    kat: "cpp",
    tresc: "Przedstawiony zbiór operatorów należy do grupy operatorów",
    odpowiedzi: ["arytmetycznych", "przypisania", "logicznych", "porównania"],
    poprawna: 0,
    img: "https://ee-informatyk.pl/src/img/quizy/inf04/inf04-66.jpg",
  },
  {
    id: "ee-67",
    kat: "testy",
    tresc: "Który typ testów może być opisany przedstawionym scenariuszem",
    odpowiedzi: [
      "testy wydajnościowe",
      "testy jednostkowe",
      "testy kompatybilności",
      "testy funkcjonalne",
    ],
    poprawna: 3,
    img: "https://ee-informatyk.pl/src/img/quizy/inf04/inf04-67.jpg",
  },
  {
    id: "ee-68",
    kat: "web",
    tresc:
      "Którą wartość zwróci funkcja zapisana językiem C++, jeżeli jej parametr wejściowym jest tablica utworzona w następujący sposób: int tablica[6] = {3,4,2,4,10,0);?",
    odpowiedzi: ["10", "0", "23", "20"],
    poprawna: 2,
    img: "https://ee-informatyk.pl/src/img/quizy/inf04/inf04-68.jpg",
  },
  {
    id: "ee-69",
    kat: "algo",
    tresc:
      "Aby zaimplementować w aplikacji jednokierunkową funkcję skrótu tzw. funkcję haszującą można posłużyć się algorytmem",
    odpowiedzi: ["DES", "RSA", "AES", "MD5"],
    poprawna: 3,
  },
  {
    id: "ee-70",
    kat: "web",
    tresc: "Liczba A4 zapisana systemem heksadecymalnym ma postać binarną",
    odpowiedzi: ["1010100", "10100100", "10100010", "1011100"],
    poprawna: 1,
  },
  {
    id: "ee-71",
    kat: "cpp",
    tresc:
      "Wskaż uproszczony kod XAML dla kontrolek w przedstawionym oknie dialogowym",
    odpowiedzi: ["Kod 3", "Kod 1", "Kod 2", "Kod 4"],
    poprawna: 2,
    img: "https://ee-informatyk.pl/src/img/quizy/inf04/inf04-71.jpg",
  },
  {
    id: "ee-72",
    kat: "web",
    tresc: "Przedstawiony kod napisany w języku XML/XAML definiuje",
    odpowiedzi: ["stepper", "listę rozwijaną", "suwak", "przełącznik"],
    poprawna: 3,
    img: "https://ee-informatyk.pl/src/img/quizy/inf04/inf04-72.jpg",
  },
  {
    id: "ee-73",
    kat: "sql",
    tresc: "Przedstawiony opis licencji w ramce wskazuje, że jest to licencja",
    odpowiedzi: ["OEM", "Open Source", "Freeware", "Shareware"],
    poprawna: 1,
    img: "https://ee-informatyk.pl/src/img/quizy/inf04/inf04-73.jpg",
  },
  {
    id: "ee-74",
    kat: "cpp",
    tresc:
      "W wyniku wykonania przedstawionego kodu w konsoli wyświetlona zostanie liczba",
    odpowiedzi: ["108", "115", "73", "0"],
    poprawna: 1,
    img: "https://ee-informatyk.pl/src/img/quizy/inf04/inf04-74.jpg",
  },
  {
    id: "ee-75",
    kat: "testy",
    tresc: "Klasa w programowaniu obiektowym to",
    odpowiedzi: ["zmienna", "wskaźnik", "instrukcja", "typ danych"],
    poprawna: 3,
  },
  {
    id: "ee-76",
    kat: "cpp",
    tresc: "Przedstawiony kod funkcji &quot;wykonaj()&quot; sprawdza, czy",
    odpowiedzi: [
      "wszystkie elementy tablicy są równe wartości określonego elementu (argument)",
      "określony element (argument) znajduje się w tablicy zawierającej liczby całkowite",
      "w tablicy liczb całkowitych znajdują się tylko wartości 4, 15, -2, 9, 202",
      "określony element (argument) jest wartością z zakresu od 0 do 4",
    ],
    poprawna: 1,
    img: "https://ee-informatyk.pl/src/img/quizy/inf04/inf04-76.jpg",
  },
  {
    id: "ee-77",
    kat: "oop",
    tresc:
      "Poprawna definicja konstruktora przedstawionej klasy w języku C++ może wyglądać jak w",
    odpowiedzi: [
      "Deklaracji 1",
      "Deklaracji 2",
      "Deklaracji 3",
      "Deklaracji 4",
    ],
    poprawna: 0,
    img: "https://ee-informatyk.pl/src/img/quizy/inf04/inf04-77.jpg",
  },
  {
    id: "ee-78",
    kat: "web",
    tresc:
      "Wywołanie funkcji zamien napisanej w języku C++ może wyglądać następująco",
    odpowiedzi: [
      "zamien(12, 34);",
      "zamien(*a, *b); //a,b - zmienne typu całkowitego",
      "zamien(&a, &b); //x,y - zmienne typu całkowitego",
      "zamien(m,n); //m,n - zmienne typu całkowitego",
    ],
    poprawna: 2,
    img: "https://ee-informatyk.pl/src/img/quizy/inf04/inf04-78.jpg",
  },
  {
    id: "ee-79",
    kat: "web",
    tresc:
      "W programie napisanym w języku C++ należy utworzyć zmienną, która przechowa liczbę rzeczywistą. Określ typ tej zmiennej",
    odpowiedzi: ["int", "double", "number", "numeric"],
    poprawna: 1,
  },
  {
    id: "ee-80",
    kat: "cpp",
    tresc:
      "Przedstawiony fragment opisuje funkcję resize języka C++. Funkcja ta zmniejszy długość elementu string, gdy wartość parametru",
    odpowiedzi: [
      "c jest mniejsza niż bieżąca długość łańcucha",
      "n jest mniejsza niż bieżąca długość łańcucha",
      "n jest większa niż bieżąca długość łańcucha",
      "c jest większa niż bieżąca długość łańcucha",
    ],
    poprawna: 1,
    img: "https://ee-informatyk.pl/src/img/quizy/inf04/inf04-80.jpg",
  },
  {
    id: "ee-81",
    kat: "web",
    tresc:
      "Co stanie się po wykonaniu przedstawionego fragmentu kodu napisanego w języku C++?",
    odpowiedzi: [
      "do tablicy liczby, na jej początku, dodawane są kolejne wartości",
      "z tablicy liczby usuwane są elementy, za każdym obiegiem pętli usuwany jest element z jej końca",
      "z tablicy liczby usuwane są elementy, za każdym obiegiem pętli usuwany jest element z jej początku",
      "do tablicy liczby, na jej końcu, dodawane są kolejne wartości",
    ],
    poprawna: 3,
    img: "https://ee-informatyk.pl/src/img/quizy/inf04/inf04-81.jpg",
  },
  {
    id: "ee-82",
    kat: "algo",
    tresc:
      "Na rysunku przedstawiony jest fragment schematu blokowego pewnego algorytmu. Ile razy zostanie sprawdzony warunek n&lt;7?",
    odpowiedzi: ["8", "5", "7", "6"],
    poprawna: 3,
    img: "https://ee-informatyk.pl/src/img/quizy/inf04/inf04-82.jpg",
  },
  {
    id: "ee-83",
    kat: "testy",
    tresc:
      "Które narzędzie programistyczne służy do tłumaczenia kodu źródłowego do postaci zrozumiałej dla komputera, sprawdza wszystkie instrukcje kodu, czy nie występują w nich błędy, a następnie tworzy wykonywalny moduł?",
    odpowiedzi: ["interpreter", "kompilator", "debugger", "dekompilator"],
    poprawna: 1,
  },
  {
    id: "ee-84",
    kat: "algo",
    tresc: "Przedstawiona dokumentacja opisuje algorytm sortowania",
    odpowiedzi: [
      "szybkiego (Quicksort)",
      "przez wybór",
      "przez wstawianie",
      "bąbelkowe",
    ],
    poprawna: 3,
    img: "https://ee-informatyk.pl/src/img/quizy/inf04/inf04-84.jpg",
  },
  {
    id: "ee-85",
    kat: "bhp",
    tresc:
      "Pracując w grupie i dbając o jej poprawne funkcjonowanie, nie należy",
    odpowiedzi: [
      "wzajemnie się motywować",
      "rzetelnie i na czas wywiązywać się ze swoich zobowiązań",
      "dbać wyłącznie o własny interes",
      "brać odpowiedzialność za podejmowane działania",
    ],
    poprawna: 2,
  },
  {
    id: "ee-86",
    kat: "algo",
    tresc: "Który blok kodu zawiera przykład użycia rekurencji?",
    odpowiedzi: ["Blok 1", "Blok 3", "Blok 4", "Blok 2"],
    poprawna: 0,
    img: "https://ee-informatyk.pl/src/img/quizy/inf04/inf04-86.jpg",
  },
  {
    id: "ee-87",
    kat: "mobile",
    tresc:
      "Programy działające w systemach Android wykorzystują do interakcji z użytkownikiem klasę",
    odpowiedzi: ["Activity", "Screens", "Fragments", "Windows"],
    poprawna: 0,
  },
  {
    id: "ee-88",
    kat: "web",
    tresc:
      "W wyniku wykonania przedstawionego kodu napisanego w języku C++ w konsoli zostanie wyświetlony ciąg liczb",
    odpowiedzi: ["1 2 3 4 5 6", "2 3 4 5 6 7", "1 2 3 4 5", "2 3 4 5 6"],
    poprawna: 3,
    img: "https://ee-informatyk.pl/src/img/quizy/inf04/inf04-88.jpg",
  },
  {
    id: "ee-89",
    kat: "sql",
    tresc: "Do form przekazu werbalnego należy",
    odpowiedzi: ["mówienie", "wyraz twarzy", "pozycja ciała", "gestykulacja"],
    poprawna: 0,
  },
  {
    id: "ee-90",
    kat: "oop",
    tresc:
      "Przy pomocy którego obiektu można utworzyć kontrolkę wskazaną strzałką na obrazie?",
    odpowiedzi: [
      "Windows - dla biblioteki WPF; JFrame - dla biblioteki Swing",
      "Text - dla biblioteki WPF; JText - dla biblioteki Swing",
      "Box - dla biblioteki WPF; JField - dla biblioteki Swing",
      "TextBox - dla biblioteki WPF; JTextField - dla biblioteki Swing",
    ],
    poprawna: 3,
    img: "https://ee-informatyk.pl/src/img/quizy/inf04/inf04-90.jpg",
  },
  {
    id: "ee-91",
    kat: "web",
    tresc:
      "Co zostanie wyświetlone po wykonaniu przedstawionego kodu zapisanego w języku C++?",
    odpowiedzi: [
      "Pochodna. Pochodna.",
      "Bazowa. Pochodna.",
      "Pochodna. Bazowa.",
      "Bazowa. Bazowa.",
    ],
    poprawna: 0,
    img: "https://ee-informatyk.pl/src/img/quizy/inf04/inf04-91.jpg",
  },
  {
    id: "ee-92",
    kat: "oop",
    tresc:
      "W przedstawionym kodzie zostało zaprezentowane jedno z podstawowych założeń programowania obiektowego. Jest to",
    odpowiedzi: ["polimorfizm", "abstrakcja", "dziedziczenie", "hermetyzacja"],
    poprawna: 2,
    img: "https://ee-informatyk.pl/src/img/quizy/inf04/inf04-92.jpg",
  },
  {
    id: "ee-93",
    kat: "web",
    tresc: "Framework Angular został napisany w języku",
    odpowiedzi: ["Postscript", "PHP", "Typescript", "C#"],
    poprawna: 2,
  },
  {
    id: "ee-94",
    kat: "testy",
    tresc:
      "Jedną z możliwości testów funkcjonalnych wykonywanych na aplikacji webowej jest sprawdzenie",
    odpowiedzi: [
      "bezpieczeństwa aplikacji",
      "stopnia optymalizacji kodu aplikacji",
      "wydajności aplikacji",
      "poprawności wyświetlanych elementów aplikacji",
    ],
    poprawna: 3,
  },
  {
    id: "ee-95",
    kat: "web",
    tresc: "Wyróżnione elementy w przedstawionych ramkach mają za zadanie",
    odpowiedzi: [
      "pobranie nazwy obiektu reprezentującego okno aplikacji",
      "ustawienie nazwy obiektu reprezentującego okno aplikacji",
      "ustawienie tytułu okna na &quot;Tekst&quot;",
      "zapisanie tytułu okna do obiektu Tekst",
    ],
    poprawna: 2,
    img: "https://ee-informatyk.pl/src/img/quizy/inf04/inf04-95.jpg",
  },
  {
    id: "ee-96",
    kat: "web",
    tresc:
      "Jaki będzie efekt działania przedstawionych dwóch równoważnych funkcjonalnie fragmentów kodu źródłowego?",
    odpowiedzi: [
      "wyświetlony na stronie tekst w akapicie: &quot;Egzamin zawodowy&quot;",
      "wyświetlony na stronie tekst w nagłówku: &quot;Egzamin zawodowy&quot;",
      "nadany tytuł każdego elementu HTML: &quot;Egzamin zawodowy&quot;",
      "nadany tytuł strony: &quot;Egzamin zawodowy&quot;",
    ],
    poprawna: 1,
    img: "https://ee-informatyk.pl/src/img/quizy/inf04/inf04-96.jpg",
  },
  {
    id: "ee-97",
    kat: "oop",
    tresc:
      "Jaki kwalifikator należy nadać metodzie, aby dostęp do niej był możliwy tylko z ciała tej klasy i klas potomnych,a jednocześnie, żeby ta metoda nie była dostępna w dowolnej funkcji?",
    odpowiedzi: ["public", "private", "reinterpret_cast", "protected"],
    poprawna: 3,
  },
  {
    id: "ee-98",
    kat: "web",
    tresc:
      "Co zostanie zapisane w etykiecie label po wykonaniu przedstawionego kodu, uruchomionego po kliknięciu w przycisk okna aplikacji?",
    odpowiedzi: [
      "suma liczb parzystych z przedziału od 0 do 100",
      "liczby parzyste z przedziału od 0 do 100",
      "suma liczb z przedziału od 0 do 100",
      "liczby z przedziału od 0 do 100",
    ],
    poprawna: 0,
    img: "https://ee-informatyk.pl/src/img/quizy/inf04/inf04-98.jpg",
  },
  {
    id: "ee-99",
    kat: "cpp",
    tresc:
      "Szkodliwe oprogramowanie, zaprojektowane w celu zapewnienia hakerom uprawnień administracyjnych do komputera ofiary bez jej wiedzy, to",
    odpowiedzi: ["wirus", "keylogger", "robak", "rootkit"],
    poprawna: 3,
  },
  {
    id: "ee-100",
    kat: "web",
    tresc:
      "Po wykonaniu przedstawionego kodu zapisanego w języku C++ na ekranie konsoli zostanie wyświetlony tekst:",
    odpowiedzi: [
      "&quot;%s dodawania: %d + %.2f=%f&quot;, &quot;Wynik&quot;, a, b, w",
      "dodawania: 5+5.12345=10.123450 Wynik",
      "Wynik dodawania: 5+5.12=10.123450",
      "&quot;%s dodawania: %d + %.2f = %f&quot;, &quot;Wynik&quot;, 5, 5.12345, 10.123450",
    ],
    poprawna: 2,
    img: "https://ee-informatyk.pl/src/img/quizy/inf04/inf04-100.jpg",
  },
  {
    id: "ee-101",
    kat: "cpp",
    tresc:
      "Jaki ciąg tekstowy zostanie wyświetlony po wykonaniu jednego z przedstawionych kodów?",
    odpowiedzi: ["{{2+2}}", "{2+2}", "4", "{4}"],
    poprawna: 2,
    img: "https://ee-informatyk.pl/src/img/quizy/inf04/inf04-101.jpg",
  },
  {
    id: "ee-102",
    kat: "cpp",
    tresc:
      "W języku Java wyjątek ArrayIndexOutOfBoundsException może pojawić się w sytuacji odwołania się do elementu tablicy, którego",
    odpowiedzi: [
      "wartość jest większa niż rozmiar tablicy",
      "indeks jest równy lub większy od rozmiaru tablicy",
      "indeks jest z przedziału od 0 do n-1, gdzie n jest rozmiarem tablicy",
      "wartość jest większa niż jego indeks",
    ],
    poprawna: 1,
  },
  {
    id: "ee-103",
    kat: "cpp",
    tresc: "Resuscytacja krążeniowo-oddechowa polega na wykonywaniu",
    odpowiedzi: [
      "10 uciśnięć klatki piersiowej i 5 oddechów ratowniczych",
      "15 uciśnięć klatki piersiowej i 3 oddechów ratowniczych",
      "30 uciśnięć klatki piersiowej i 2 oddechów ratowniczych",
      "20 uciśnięć klatki piersiowej i 1 oddechu ratowniczego",
    ],
    poprawna: 2,
  },
  {
    id: "ee-105",
    kat: "web",
    tresc:
      "Która metoda biblioteki jQuery języka JavaScript odpowiada za naprzemienne dodawanie i usuwanie klasy elementu?",
    odpowiedzi: [
      ".toggleClass()",
      ".switchClass()",
      ".changeClass()",
      ".bingClass()",
    ],
    poprawna: 0,
  },
  {
    id: "ee-106",
    kat: "sql",
    tresc: "Framework to",
    odpowiedzi: [
      "platforma programistyczna dostarczająca pewne komponenty i narzucająca pewien szkielet lub metodykę tworzenia aplikacji",
      "zbiór podprogramów, danych i złożonych typów danych wykorzystywanych w kodzie źródłowym aplikacji",
      "oprogramowanie, które metodą drag and drop umożliwia utworzenie interfejsu aplikacji",
      "narzędzie służące do tworzenia, modyfikowania, testowania i uruchamiania oprogramowania",
    ],
    poprawna: 0,
  },
  {
    id: "ee-107",
    kat: "algo",
    tresc: "Diagram Gantta jest stosowany w celu",
    odpowiedzi: [
      "obrazowania funkcjonalności systemu",
      "szczegółowej analizy czasowo-kosztowej projektu",
      "planowania i zarządzania projektem",
      "wizualizacji zależności między elementami systemów",
    ],
    poprawna: 2,
  },
  {
    id: "ee-108",
    kat: "oop",
    tresc: "Jednym z zadań widoku we wzorcu MVVM (Model_View-Viewmodel) jest",
    odpowiedzi: [
      "obsługa logiki aplikacji - zawiera implementację algorytmów",
      "obsługa interakcji użytkownika, utworzenie interfejsu użytkownika",
      "udostępnianie danych dla widoku oraz wymiana danych z modelem",
      "przechowywanie pobranych oraz przetworzonych danych",
    ],
    poprawna: 1,
  },
  {
    id: "ee-109",
    kat: "oop",
    tresc: "Jednostką zalecaną przy tworzeniu układu interfejsu aplikacji jest",
    odpowiedzi: ["mm", "px", "dp", "pt"],
    poprawna: 2,
  },
  {
    id: "ee-110",
    kat: "mobile",
    tresc:
      "Które logo przedstawia narzędzie, którego nie wykorzystuje się do tworzenia aplikacji mobilnych",
    odpowiedzi: ["4", "1", "3", "2"],
    poprawna: 3,
    img: "https://ee-informatyk.pl/src/img/quizy/inf04/inf04-110.jpg",
  },
  {
    id: "ee-111",
    kat: "mobile",
    tresc: "Frameworki/biblioteki typowe dla aplikacji webowych to",
    odpowiedzi: [
      "ASP.NET Core, jQuery, Joomla!, Wordpress, Angular",
      "jquery, Joomla!, Wordpress, android Studio, Xamarin",
      "ASP.NET Core, Django, Angular, React.js, Node.js",
      "Visual Studio, Eclipse, angular, React.js, Node.js",
    ],
    poprawna: 2,
  },
  {
    id: "ee-112",
    kat: "web",
    tresc: "Jak zaimportować tylko komponent z biblioteki React?",
    odpowiedzi: [
      "import React.Component from &quot;react&quot;",
      "import [ Component ] from &quot;react&quot;",
      "import Component from &quot;react&quot;",
      "import { Component } from &quot;react&quot;",
    ],
    poprawna: 3,
  },
  {
    id: "ee-113",
    kat: "cpp",
    tresc: "W wyniku wykonania przedstawionego kodu zostaną wypisane",
    odpowiedzi: [
      "elementy tablicy o następujących indeksach: 1, 2, 4, 5, 7, 8",
      "elementy spod indeksów tablicy podzielnych przez 3",
      "wszystkie elementy tablicy, które są podzielne przez 3",
      "wszystkie nieparzyste elementy tablicy",
    ],
    poprawna: 0,
    img: "https://ee-informatyk.pl/src/img/quizy/inf04/inf04-113.jpg",
  },
  {
    id: "ee-114",
    kat: "algo",
    tresc:
      "W firmie IT obowiązują przedstawione wytyczne dotyczące zarządzania projektami, Wynika z nich, że firma stosuje model zarządzania",
    odpowiedzi: ["prototypowy", "zwinny", "kaskadowy", "spiralny"],
    poprawna: 1,
    img: "https://ee-informatyk.pl/src/img/quizy/inf04/inf04-114.jpg",
  },
  {
    id: "ee-115",
    kat: "web",
    tresc: "Aby zastosować framework Django należy programować w języku",
    odpowiedzi: ["C#", "JavaScript", "Python", "Java"],
    poprawna: 2,
  },
  {
    id: "ee-116",
    kat: "cpp",
    tresc: "Wskaż wspólną cechę wszystkich kontrolek przedstawionych w ramce",
    odpowiedzi: [
      "wszystkie są widoczne",
      "mają tło tego samego koloru",
      "mają ten sam kolor czcionki",
      "są w nich ustawione te same wartości domyślne",
    ],
    poprawna: 1,
    img: "https://ee-informatyk.pl/src/img/quizy/inf04/inf04-116.jpg",
  },
  {
    id: "ee-117",
    kat: "bhp",
    tresc:
      "Aby programować aplikacje desktopowe za pomocą języka Java można wybrać środowisko",
    odpowiedzi: ["NetBeans", "SharpDevelop", "PyCharm", "Ms Visual Studio"],
    poprawna: 0,
  },
  {
    id: "ee-118",
    kat: "web",
    tresc: "Przedstawiona pętla wykorzystuje obiekt random do",
    odpowiedzi: [
      "wielokrotnego losowania liczby, aby utworzyć napis składający się z liczb pseudolosowych",
      "wypełnienia tablicy wynik liczbami pseudolosowymi",
      "pojedynczego wylosowania znaki z podanej puli znaków",
      "wygenerowania 8-znakowego losowego napisu składającego się z liter",
    ],
    poprawna: 2,
    img: "https://ee-informatyk.pl/src/img/quizy/inf04/inf04-118.jpg",
  },
  {
    id: "ee-119",
    kat: "bhp",
    tresc: "Ryzykiem zawodowym nazywa się",
    odpowiedzi: [
      "zagrożenie wypadkowe występujące na stanowisku pracy",
      "skutki zagrożeń wypadkowych wystepujących na stanowisku pracy",
      "ciężkość następstw niepożądanych zdarzeń związanych z wykonywaną pracą",
      "prawdopodobieństwo wystąpienia niepożądanych zdarzeń związanych z wykonywaną pracą, powodujących straty, w szczególności wystąpienia u pracowników niekorzystnych skutków zdrowotnych",
    ],
    poprawna: 3,
  },
  {
    id: "ee-120",
    kat: "mobile",
    tresc:
      "Który system operacyjny jest natywnym systemem do tworzenia aplikacji mobilnych w języku Swift?",
    odpowiedzi: ["iOS", "LG UX", "Android", "Windows UWP"],
    poprawna: 0,
  },
  {
    id: "ee-121",
    kat: "algo",
    tresc:
      "Które wyrażenie logiczne należy zastosować, aby sprawdzić czy zmienna x przechowuje wartości ujemne albo z przedziału (10, 100)",
    odpowiedzi: [
      "x &gt; 10 || x &lt; 100 || x &lt; 0",
      "(x &gt; 10 && x &lt; 100) || x &lt; 0",
      "x &gt; 10 || x &lt; 100 || x &lt; 0",
      "(x &gt; 10 || x &lt; 100) && x &lt; 0",
    ],
    poprawna: 1,
  },
  {
    id: "ee-122",
    kat: "oop",
    tresc:
      "Odpowiednikami zmiennych i funkcji programowania strukturalnego są w programowaniu obiektowym",
    odpowiedzi: [
      "pola i metody",
      "metody statyczne i abstrakcyjne",
      "hermetyzacja i dziedziczenia",
      "pola i kwalifikatory dostępu",
    ],
    poprawna: 0,
  },
  {
    id: "ee-123",
    kat: "sql",
    tresc:
      "Za pomocą React.js i Angular zapisano funkcjonalnie równoważne kody źródłowe. Aby w metodzie handleSubmit można było wyświetlić zawartość kontrolki input w miejscu oznaczonym ??? należy odnieść się do atrybutu o nazwie",
    odpowiedzi: ["nazwa4", "nazwa2", "nazwa1", "nazwa3"],
    poprawna: 2,
    img: "https://ee-informatyk.pl/src/img/quizy/inf04/inf04-123.jpg",
  },
  {
    id: "ee-124",
    kat: "algo",
    tresc: "Który kod jest implementacją przedstawionego fragmentu algorytmu?",
    odpowiedzi: ["Kod 1", "Kod 2", "Kod 3", "Kod 4"],
    poprawna: 2,
    img: "https://ee-informatyk.pl/src/img/quizy/inf04/inf04-124.jpg",
  },
  {
    id: "ee-125",
    kat: "algo",
    tresc: "Dla podanego algorytmu złożoność obliczeniowa jest równa",
    odpowiedzi: ["O(n log n)", "O(n)", "O(1)", "O(n2)"],
    poprawna: 1,
    img: "https://ee-informatyk.pl/src/img/quizy/inf04/inf04-125.jpg",
  },
  {
    id: "ee-126",
    kat: "cpp",
    tresc: "Wskaż kod funkcjonalnie równorzędny przedstawionemu",
    odpowiedzi: ["Kod 1", "Kod 2", "Kod 3", "Kod 4"],
    poprawna: 1,
    img: "https://ee-informatyk.pl/src/img/quizy/inf04/inf04-126.jpg",
  },
  {
    id: "ee-127",
    kat: "bhp",
    tresc:
      "Środowiskiem dedykowanym do tworzenia aplikacji mobilnych dla urządzeń Apple i wykorzystującym do tego celu różne języki programowania w tym Java i Objective C jest",
    odpowiedzi: ["Android Studio", "NetBeans", "XCode", "React Native"],
    poprawna: 2,
  },
  {
    id: "ee-128",
    kat: "cpp",
    tresc: "Przedstawiony symbol ochrony przeciwpożarowej oznacza",
    odpowiedzi: [
      "tablicę rozdzielczą",
      "alarm pożarowy",
      "wyłącznik prądu",
      "stanowisko zdalnego uwalniania",
    ],
    poprawna: 1,
    img: "https://ee-informatyk.pl/src/img/quizy/inf04/inf04-128.jpg",
  },
  {
    id: "ee-129",
    kat: "testy",
    tresc: "Systemem kontroli wersji jest",
    odpowiedzi: ["Trello", "Jira", "Git", "Bugzilla"],
    poprawna: 2,
  },
  {
    id: "ee-130",
    kat: "algo",
    tresc: "Sumą liczb binarnych 1101 i 1001 jest",
    odpowiedzi: ["1110", "10111", "1001", "10110"],
    poprawna: 3,
  },
  {
    id: "ee-131",
    kat: "oop",
    tresc: "Wskaż cechę charakterystyczną dla metody abstrakcyjnej",
    odpowiedzi: [
      "jest zawsze prywatna",
      "jest pusta w klasach potomnych",
      "nie jest zaimplementowana w klasie bazowej",
      "jest pusta w klasie bazowej",
    ],
    poprawna: 2,
  },
  {
    id: "ee-132",
    kat: "bhp",
    tresc:
      "Błędy interpretracji kodu wytworzonego za pomocą środowiska React.js lub Angular można śledzić przy pomocy",
    odpowiedzi: [
      "wbudowanego w środowisko debuggera",
      "konsoli przeglądarki internetowej",
      "narzędzi zainstalowanych po stronie serwera aplikacji",
      "kompilatora języka JavaScript",
    ],
    poprawna: 1,
  },
  {
    id: "ee-133",
    kat: "sql",
    tresc:
      "W standardzie dokumentacji testów oprogramowania IEEE 829-1998 jest opisany dokument, który zawiera informacje o tym, które przypadki testowania zostały użyte, kto je użył i czy powiodły się. Jest to",
    odpowiedzi: [
      "Test Plan",
      "Test Procedure Specification",
      "Test Log",
      "Test Summary Report",
    ],
    poprawna: 2,
  },
  {
    id: "ee-134",
    kat: "oop",
    tresc:
      "Klasie o nazwie samochod nadano cechy: marka, rocznik, parametry[]. Cechy te należy zdefiniować jako",
    odpowiedzi: ["funckje", "pola", "interfejsy", "metody"],
    poprawna: 1,
  },
  {
    id: "ee-135",
    kat: "web",
    tresc:
      "Błąd kompilacji &quot;incompatible types&quot; może zostać wygenerowany, gdy",
    odpowiedzi: [
      "funkcja przyjmuje jako argument całkowitą, a wywołana została z napisem jako parametr",
      "popełniono błąd podczas deklaracji zmiennej, zastosowano typ, który nie istnieje",
      "zmiennej typu int została przypisana wartość 243",
      "funkcja zwraca typ void, a podczas wywołania nie jest przypisana do żadnej zmiennej",
    ],
    poprawna: 0,
  },
  {
    id: "ee-136",
    kat: "sql",
    tresc:
      "Programista aplikacji mobilnych chce przekwalifikować się na pracownika Full-Stack Developer. Wskaż kurs, który powinien wybrać, aby było to możliwe",
    odpowiedzi: [
      "Mastering Cross-platform Developping",
      "Ultimate C# Serier from Beginner to Advanced",
      "Complete JavaScript React, SQL, Node.js Cource",
      "Raster and Vector Graphics with Adobe",
    ],
    poprawna: 2,
  },
  {
    id: "ee-137",
    kat: "cpp",
    tresc: "Oznaczeniem komentarza wieloliniowego w języku Java jest",
    odpowiedzi: [
      "/* ... */",
      "",
      "// ... //",
      "&quot;&quot;&quot; ... &quot;&quot;&quot;",
    ],
    poprawna: 0,
  },
  {
    id: "ee-138",
    kat: "cpp",
    tresc: "Wskaż numeryczne typy stałoprzecinkowe",
    odpowiedzi: [
      "float, double",
      "int, short, long",
      "bool char, string",
      "long long, long double",
    ],
    poprawna: 1,
  },
  {
    id: "ee-139",
    kat: "cpp",
    tresc: "Zmienna typy logicznego może przyjąć wartości:",
    odpowiedzi: [
      "1, -1",
      "true, false",
      "0 oraz dowolną całkowitą",
      "trzy dowolne naturalne",
    ],
    poprawna: 1,
  },
  {
    id: "ee-140",
    kat: "web",
    tresc:
      "Szablon MojaTablica implementuje funkcjonalność tablicy o indeksach różnego typu i elementach różnego typu. Na podstawie przedstawionego kodu, który wykorzystuje szablon do inicjacji tablicy asocjacyjnej wskaż definicję wykorzystującą szablon do utworzenia tablicy, w której indeksami są liczby całkowite a elementy napisy",
    odpowiedzi: [
      "MojaTablica tab2 = MOjaTablica();",
      "int tab2[] = new MojaTablica();",
      "MojaTablica tab2 = new MojaTablica();",
      "int tab2 = new MojaTablica();",
    ],
    poprawna: 2,
    img: "https://ee-informatyk.pl/src/img/quizy/inf04/inf04-140.jpg",
  },
  {
    id: "ee-141",
    kat: "cpp",
    tresc:
      "Dla podanego fragmentu kodu Java zostanie wygenerowany wyjątek, gdy zmienna index przyjmie wartość:",
    odpowiedzi: ["5", "0", "1", "7"],
    poprawna: 3,
    img: "https://ee-informatyk.pl/src/img/quizy/inf04/inf04-141.jpg",
  },
  {
    id: "ee-142",
    kat: "algo",
    tresc:
      "Jednym z zadań projektowanej aplikacji jest funkcjonalność cofnięcia wykonywanych ostatnio czynności do 20 operacji wstecz (undo). Strukturą danych przeznaczoną do tego typu zadania, którą cechuje dostęp jedynie do ostatnio dodanego elementu jest:",
    odpowiedzi: ["kolejka", "drzewo", "tablica", "stos"],
    poprawna: 3,
  },
  {
    id: "ee-143",
    kat: "web",
    tresc:
      "Analizując kod interfejsu graficznego zapisanego językiem XAML można stwierdzić, że:",
    odpowiedzi: [
      "napis &quot;Fotograf&quot; jest położony po prawej stronie obrazu.",
      "elementy: napis, obraz, przycisk Like, przycisk Share, napis są ułożone jeden pod drugim.",
      "przyciski są ułożone poziomo jeden obok drugiego.",
      "obraz jest po lewej stronie, a pozostałe elementy po prawej.",
    ],
    poprawna: 2,
    img: "https://ee-informatyk.pl/src/img/quizy/inf04/inf04-143.jpg",
  },
  {
    id: "ee-144",
    kat: "bhp",
    tresc:
      "Wskaż język programowania, który umożliwia utworzenie aplikacji mobilnej w środowisku Android Studio",
    odpowiedzi: ["Java", "Objective-C", "C++", "Swift"],
    poprawna: 0,
  },
  {
    id: "ee-145",
    kat: "web",
    tresc: "Która cecha wyróżnia framework od biblioteki?",
    odpowiedzi: [
      "Framework jest zbiorem funkcjonalności, które programista może wykorzystać",
      "Framework determinuje architekturę aplikacji i dostarcza jej szkielet",
      "Framework dostarcza API do większego zestawu funkcji",
      "Framework dostarcza funkcje użytkowe w danej dziedzinie problemu",
    ],
    poprawna: 1,
  },
  {
    id: "ee-146",
    kat: "algo",
    tresc:
      "Algorytm sekwencyjnego wyszukiwania elementu z wartownikiem polega na założeniu, że",
    odpowiedzi: [
      "na końcu przeszukiwanego zbioru należy wstawić wartownika",
      "zbiór wejściowy musi być posortowany",
      "zbiór jest zawsze 100 elementowy",
      "szukany element musi powtórzyć się kilkakrotnie w zbiorze.",
    ],
    poprawna: 0,
  },
  {
    id: "ee-147",
    kat: "oop",
    tresc:
      "Wewnątrz klasy pracownik zdefiniowano przedstawione metody. Do której z nich można zgodnie z jej przeznaczeniem dopisać element diagnostyczny o treści: cout &lt;&lt; &quot;Obiekt został usunięty&quot;;?",
    odpowiedzi: ["wypisz", "~pracownik", "pracownik", "operator=="],
    poprawna: 1,
    img: "https://ee-informatyk.pl/src/img/quizy/inf04/inf04-147.jpg",
  },
  {
    id: "ee-148",
    kat: "web",
    tresc: "Programista zapisał w pliku HTML przedstawioną linię kodu, aby",
    odpowiedzi: [
      "skorzystać z funkcji biblioteki jQuery, która wcześniej została pobrana i zapisana lokalnie",
      "umieścić kod JavaScript pomiędzy znacznikami &lt;script&gt;&lt;/script&gt;.",
      "pobrać z Internetu w momencie odsłony strony i zastosować bibliotekę jQuery.",
      "zadeklarować własną funkcję JavaScript o nazwie min.js.",
    ],
    poprawna: 0,
    img: "https://ee-informatyk.pl/src/img/quizy/inf04/inf04-148.jpg",
  },
  {
    id: "ee-149",
    kat: "cpp",
    tresc:
      "W języku C++ zakładając, że przedstawiona linia kodu się skompiluje i wykona, to do zmiennej liczba zostanie przypisana wartość",
    odpowiedzi: [
      "równa 1OOO.",
      "dowolna pseudolosowa z zakresu typu int",
      "rzeczywista podzielna przez 1OOO.",
      "pseudolosowa nie większa niż 999.",
    ],
    poprawna: 3,
    img: "https://ee-informatyk.pl/src/img/quizy/inf04/inf04-149.jpg",
  },
  {
    id: "ee-150",
    kat: "web",
    tresc:
      "W wyniku wykonania kodu języka C++ została wyświetlona wartość O (zamiast 50). Jaki jest tego powód?",
    odpowiedzi: [
      "Działanie wewnątrz funkcji jest zapisane niepoprawnie",
      "Argument funkcji został przekazany przez wartość, a nie przez referencję.",
      "Funkcja zwraca wartość, a nie powinna jej zwracać.",
      "Zmienna x powinna być inicjowana wartością wynoszącą 1 a nie O.",
    ],
    poprawna: 1,
    img: "https://ee-informatyk.pl/src/img/quizy/inf04/inf04-150.jpg",
  },
  {
    id: "ee-151",
    kat: "sql",
    tresc:
      "Wskaż kod poprawny składniowo dla formatu JSON, służącego do wymiany danych pomiędzy częściami backend i frontend aplikacji.",
    odpowiedzi: ["Kod1", "Kod2", "Kod3", "Kod4"],
    poprawna: 1,
    img: "https://ee-informatyk.pl/src/img/quizy/inf04/inf04-151.jpg",
  },
  {
    id: "ee-152",
    kat: "algo",
    tresc:
      "W przedstawionym fragmencie kodu znajduje się błąd logiczny. Polega on na",
    odpowiedzi: [
      "braku inicjalizacji zmiennej x, który sprawia, że zmienna nie ma wartości początkowej.",
      "błędnym zastosowaniu funkcji cout, który sprawia, że zmienna jest wczytywana w pętli",
      "nieprawidłowym warunku pętli, który sprawia, że pętla nigdy się nie wykona",
      "nieprawidłowym warunku pętli, który sprawia, że pętla jest nieskończona",
    ],
    poprawna: 3,
    img: "https://ee-informatyk.pl/src/img/quizy/inf04/inf04-152.jpg",
  },
  {
    id: "ee-153",
    kat: "testy",
    tresc:
      "W ramce przedstawiono notatki testera dotyczące testów aplikacji. Który rodzaj testów ma zamiar wykonać tester?",
    odpowiedzi: [
      "Jednostkowe",
      "Wydajnościowe",
      "Interfejsu",
      "Bezpieczeństwa",
    ],
    poprawna: 1,
    img: "https://ee-informatyk.pl/src/img/quizy/inf04/inf04-153.jpg",
  },
  {
    id: "ee-154",
    kat: "algo",
    tresc:
      "Do rozwiązywania problemów przybliżonych lub takich, których nie można opisać algorytmem dokładnym, np. przewidywanie pogody, rozpoznawanie nowych wirusów komputerowych służą algorytmy.",
    odpowiedzi: ["liniowe", "iteracyjne", "heurystyczne", "rekurencyjne"],
    poprawna: 2,
  },
  {
    id: "ee-155",
    kat: "web",
    tresc:
      "W ramce zaprezentowano fragment opisu metody compile języka Java stosowanej przy pracy z wyrażeniami regularnymi. Który znak należy zastosować, aby znaleźć dopasowanie na końcu napisu?",
    odpowiedzi: ["^", "|", "$", "."],
    poprawna: 2,
    img: "https://ee-informatyk.pl/src/img/quizy/inf04/inf04-155.jpg",
  },
  {
    id: "ee-156",
    kat: "cpp",
    tresc:
      "W którym języku programowania kod źródłowy programu, przed jego uruchomieniem, musi być skompilowany do kodu maszynowego konkretnej architektury procesora?",
    odpowiedzi: ["Java", "PHP", "Perl", "C++"],
    poprawna: 3,
  },
  {
    id: "ee-157",
    kat: "cpp",
    tresc: "Wskaż kod, który wygeneruje przedstawioną kontrolkę.",
    odpowiedzi: ["Kod1", "Kod2", "Kod3", "Kod4"],
    poprawna: 2,
    img: "https://ee-informatyk.pl/src/img/quizy/inf04/inf04-157.jpg",
  },
  {
    id: "ee-158",
    kat: "cpp",
    tresc:
      "Wskaż komentarz jednoliniowy, który można dopisać do linii 3 w miejscu znaków zapytania tak, aby był poprawny składniowo i opisywał operację wykonaną w tej linii.",
    odpowiedzi: [
      "// wyswietlenie elementu tablicy",
      "# wypełnienie elementu tablicy",
      "// wypełnienie elementu tablicy",
      "# wyswietlenie elementu tablicy",
    ],
    poprawna: 0,
    img: "https://ee-informatyk.pl/src/img/quizy/inf04/inf04-158.jpg",
  },
  {
    id: "ee-159",
    kat: "sql",
    tresc:
      "Na równoważnych funkcjonalnie fragmentach kodu aplikacji Angular i React.js przedstawiono.",
    odpowiedzi: [
      "obsługę zdarzenia zatwierdzenia formularza",
      "wypisanie w konsoli przeglądarki danych pobranych z pól formularza w czasie rzeczywistym, gdy użytkownik je wypełnia.",
      "funkcję, która przepisuje do zmiennych f lub e dane z pola &lt;input&gt; formularza.",
      "funkcję wypełniającą dane w formularzu podczas jego inicjacji.",
    ],
    poprawna: 0,
    img: "https://ee-informatyk.pl/src/img/quizy/inf04/inf04-159.jpg",
  },
  {
    id: "ee-160",
    kat: "oop",
    tresc: "Które działanie dotyczące klasy abstrakcyjnej jest zabronione?",
    odpowiedzi: [
      "Powołanie instancji tej klasy.",
      "Deklaracja pól publicznych.",
      "Deklaracja metody wirtualnej.",
      "Dziedziczenie po tej klasie",
    ],
    poprawna: 0,
  },
  {
    id: "ee-161",
    kat: "mobile",
    tresc:
      "Programując przedstawioną na obrazie kontrolkę stepper w aplikacji mobilnej należy obsłużyć zmienną, która przechowuje zawsze jej aktualną wartość. Do uzyskania takiej funkcjonalności można skorzystać ze zdarzenia.",
    odpowiedzi: ["DescendantAdded", "ValueChanged", "Unfocused", "SizeChanged"],
    poprawna: 1,
    img: "https://ee-informatyk.pl/src/img/quizy/inf04/inf04-161.jpg",
  },
  {
    id: "ee-162",
    kat: "cpp",
    tresc: "Cechą dobrego negocjatora jest",
    odpowiedzi: ["zarozumiałość", "egoizm", "opanowanie", "niepewność"],
    poprawna: 2,
  },
  {
    id: "ee-163",
    kat: "web",
    tresc:
      "Liczba 1AF zapisana kodem szesnastkowym po przeliczeniu na kod dziesiętny wynosi",
    odpowiedzi: ["26", "431", "6890", "257"],
    poprawna: 1,
  },
  {
    id: "ee-164",
    kat: "web",
    tresc:
      "Wydane polecenia dotyczące repozytorium Git zakładając, że aktywnym folderem jest folder projektu, mają na celu",
    odpowiedzi: [
      "rozpoczęcie pracy z nowym repozytorium, dodanie i zatwierdzenie kodu projektu pod nazwą first commit.",
      "zamknięcie projektu, tak, że wszystkie rewizje zostaną zarchiwizowane do lokalnego archiwum o nazwie first commit",
      "utworzenie kopii istniejącego repozytorium jedynie z rewizją zapisaną pod nazwą first commit",
      "rozpoczęcie sesji z istniejącym repozytorium i pobranie kodu projektu do lokalnego folderu",
    ],
    poprawna: 0,
    img: "https://ee-informatyk.pl/src/img/quizy/inf04/inf04-164.jpg",
  },
  {
    id: "ee-165",
    kat: "algo",
    tresc:
      "Przedstawionym na schemacie algorytmem Euklidesa należy się posłużyć do wyznaczenia.",
    odpowiedzi: [
      "największego elementu zbioru liczb",
      "najmniejszej liczby pierwszej w przedziale",
      "Najmniejszej Wspólnej Wielokrotności",
      "Największego Wspólnego Dzielnika",
    ],
    poprawna: 3,
    img: "https://ee-informatyk.pl/src/img/quizy/inf04/inf04-165.jpg",
  },
  {
    id: "ee-166",
    kat: "mobile",
    tresc:
      "Narzędziem do monitorowania procesu wykonywania zadań przez członków zespołu projektowego może być diagram",
    odpowiedzi: ["związków encji", "Venna", "aktywności UML", "Gantta"],
    poprawna: 3,
  },
  {
    id: "ee-167",
    kat: "oop",
    tresc:
      "Wskaż prawidłową definicję interfejsu (szablonu klasy) w języku Java.",
    odpowiedzi: ["Definicja 1", "Definicja 2", "Definicja 3", "Definicja 4"],
    poprawna: 3,
    img: "https://ee-informatyk.pl/src/img/quizy/inf04/inf04-167.jpg",
  },
  {
    id: "ee-168",
    kat: "cpp",
    tresc: "Definicja dotyczy wzorca projektowego o nazwie",
    odpowiedzi: ["Fasada", "Prototyp", "Dekorator", "Kompozyt"],
    poprawna: 0,
    img: "https://ee-informatyk.pl/src/img/quizy/inf04/inf04-168.jpg",
  },
  {
    id: "ee-169",
    kat: "oop",
    tresc:
      "Projektując aplikację zorientowaną obiektowo należy założyć, że program będzie sterowany za pomocą",
    odpowiedzi: [
      "modułów z zawartymi w nich funkcjami i zmiennymi globalnymi",
      "pętli dyspozytora, która w zależności od zdarzenia wywoła odpowiednią funkcję",
      "zbioru instancji klas współpracujących ze sobą",
      "definicji warunków końcowego rozwiązania",
    ],
    poprawna: 2,
  },
  {
    id: "ee-170",
    kat: "cpp",
    tresc:
      "Jedną z chorób, która występuje u programistów na skutek długotrwałej pracy z myszą komputerową lub klawiaturą, charakteryzującą się bólami, drętwieniem i zaburzeniami czucia w obszarze 1-3 palca ręki jest",
    odpowiedzi: [
      "zespól cieśni kanału nadgarstka",
      "kifoza",
      "zespół suchego oka",
      "Dyskopatia",
    ],
    poprawna: 0,
  },
  {
    id: "ee-171",
    kat: "cpp",
    tresc: "Która lista typów obejmuje jedynie typy złożone?",
    odpowiedzi: [
      "char, struct, union",
      "unsigned, struct, float",
      "class, struct, float",
      "class, struct, union",
    ],
    poprawna: 3,
  },
  {
    id: "ee-172",
    kat: "algo",
    tresc:
      "Wskaż kod, który jest implementacją w języku C++ przedstawionego fragmentu algorytmu",
    odpowiedzi: ["kod 1", "kod 2", "kod 3", "kod 4"],
    poprawna: 3,
    img: "https://ee-informatyk.pl/src/img/quizy/inf04/inf04-172.jpg",
  },
  {
    id: "ee-173",
    kat: "cpp",
    tresc: "Zmienna typu logicznego może przyjąć wartości:",
    odpowiedzi: [
      "true, false",
      "1, -1",
      "O oraz dowolną całkowitą",
      "trzy dowolne naturalne",
    ],
    poprawna: 0,
  },
  {
    id: "ee-174",
    kat: "sql",
    tresc:
      "Wskaż kod za pomocą, którego zostanie wygenerowane okno dialogowe widoczne na obrazie. Dla uproszczenia kodu, pominięto atrybuty znaczników",
    odpowiedzi: ["kod 1", "kod 2", "kod 3", "kod 4"],
    poprawna: 1,
    img: "https://ee-informatyk.pl/src/img/quizy/inf04/inf04-174.jpg",
  },
  {
    id: "ee-175",
    kat: "cpp",
    tresc:
      "Aby zadeklarować pole, które będzie pełniło funkcję licznika instancji klasy, należy definicję takiego pola poprzedzić słowem kluczowym",
    odpowiedzi: ["operator", "virtual", "static", "register"],
    poprawna: 2,
  },
  {
    id: "ee-176",
    kat: "oop",
    tresc: "Które stwierdzenie dotyczące pojęcia obiekt jest prawdziwe?",
    odpowiedzi: [
      "Obiekt i klasa są tożsame",
      "Obiekt jest typem złożonym",
      "Obiekt umożliwia zdefiniowanie klasy",
      "Obiekt jest instancją klasy",
    ],
    poprawna: 3,
  },
  {
    id: "ee-177",
    kat: "web",
    tresc:
      "Frameworkiem CSS służącym do określenia wyglądu aplikacji internetowych, którego klasy zostały zastosowane na prezentowanym przykładzie jest",
    odpowiedzi: ["Yaml", "Angular", "Symfony", "Bootstrap"],
    poprawna: 3,
    img: "https://ee-informatyk.pl/src/img/quizy/inf04/inf04-177.jpg",
  },
  {
    id: "ee-178",
    kat: "testy",
    tresc:
      "Jeżeli w aplikacji występuje błąd działania, a programista musi sprawdzić wartości przechowywane w zmiennych, w danym momencie uruchomienia aplikacji, to należy do tego celu wykorzystać",
    odpowiedzi: [
      "debugger",
      "interpreter",
      "analizator składni",
      "wirtualną maszynę",
    ],
    poprawna: 0,
  },
  {
    id: "ee-179",
    kat: "cpp",
    tresc:
      "Po wykonaniu przedstawionego kodu wartość przechowywana w zmiennej b wynosi",
    odpowiedzi: ["5", "2", "11", "20"],
    poprawna: 0,
    img: "https://ee-informatyk.pl/src/img/quizy/inf04/inf04-179.jpg",
  },
  {
    id: "ee-180",
    kat: "web",
    tresc:
      "Na podstawie opisu umieszczonego w ramce, wskaż który rysunek przedstawia element odpowiadający klasie Badge zdefiniowanej w bibliotece Bootstrap",
    odpowiedzi: ["Rysunek 1", "Rysunek 2", "Rysunek 3", "Rysunek 4"],
    poprawna: 1,
    img: "https://ee-informatyk.pl/src/img/quizy/inf04/inf04-180.jpg",
  },
  {
    id: "ee-181",
    kat: "web",
    tresc: "Przedstawiony zapis w języku C# oznacza definicję klasy Car, która",
    odpowiedzi: [
      "jest zaprzyjaźniona z klasą Vehicle",
      "korzysta z pól prywatnych klasy Vehicle.",
      "jest klasą bazową (nie dziedziczy po żadnej klasie).",
      "dziedziczy po Vehide",
    ],
    poprawna: 3,
    img: "https://ee-informatyk.pl/src/img/quizy/inf04/inf04-181.jpg",
  },
  {
    id: "ee-182",
    kat: "web",
    tresc:
      "Którą nazwę kontrolki należy zapisać w pierwszej linii kodu, w miejscu &lt;???, aby została ona wyrenderowana w przedstawiony sposób?",
    odpowiedzi: ["Switch", "SeekBar", "Spinner", "RatinoBar"],
    poprawna: 0,
    img: "https://ee-informatyk.pl/src/img/quizy/inf04/inf04-182.jpg",
  },
  {
    id: "ee-183",
    kat: "testy",
    tresc: "Zadaniem interpretera jest",
    odpowiedzi: [
      "optymalizowanie większej części kodu, w celu szybszego wykonania",
      "przetłumaczenie kodu na kod maszynowy",
      "wykonanie skryptu instrukcja po instrukcji",
      "analizowanie składni całego programu przed jego uruchomieniem",
    ],
    poprawna: 2,
  },
  {
    id: "ee-184",
    kat: "bhp",
    tresc:
      "Przedstawione oznaczenie praw Creative Commons, pozwala na darmowe korzystanie z utworu",
    odpowiedzi: [
      "w celach komercyjnych",
      "pod warunkiem zostawienia go w oryginalnej postaci",
      "w celu zmiany lub remiksowania",
      "pod warunkiem udostępnienia go na tej samej licencji",
    ],
    poprawna: 2,
    img: "https://ee-informatyk.pl/src/img/quizy/inf04/inf04-184.jpg",
  },
  {
    id: "ee-185",
    kat: "oop",
    tresc:
      "Obiektowe podejście do rozwiązywania problemów obejmuje między innymi:",
    odpowiedzi: [
      "pola, metody, rekurencję i kwerendy",
      "zmienne, procedury i funkcje",
      "klasy, obiekty i hermetyzację",
      "wyzwalacze i polimorfizm",
    ],
    poprawna: 2,
  },
  {
    id: "ee-186",
    kat: "oop",
    tresc:
      "Przedstawiony fragment programu w języku C#, generuje hasło. Wskaż zdanie prawdziwe określające własność tego hasła",
    odpowiedzi: [
      "Może zawierać małe i wielkie litery, cyfry oraz symbole",
      "Jest co najwyżej 7-znakowe, co wyznacza zmienna i",
      "Jest 8 znakowe lub dłuższe oraz zawiera małe i wielkie litery oraz cyfry",
      "Może zawierał małe i wielkie litery oraz cyfry",
    ],
    poprawna: 3,
    img: "https://ee-informatyk.pl/src/img/quizy/inf04/inf04-186.jpg",
  },
  {
    id: "ee-187",
    kat: "mobile",
    tresc:
      "Przedstawiony fragment kodu z Android Studio implementuje metodę nasłuchującą do obsługi zdarzenia",
    odpowiedzi: [
      "zmiany pola edycyjnego",
      "przełączenia kontrolki Switch",
      "wciśnięcia przycisku",
      "wybrania daty",
    ],
    poprawna: 2,
    img: "https://ee-informatyk.pl/src/img/quizy/inf04/inf04-187.jpg",
  },
  {
    id: "ee-188",
    kat: "sql",
    tresc: "Dane z serwera do aplikacji front-end można przesłać za pomocą",
    odpowiedzi: [
      "biblioteki jQuery",
      "formatu JSON",
      "metody POST",
      "protokołem SSH",
    ],
    poprawna: 1,
  },
  {
    id: "ee-189",
    kat: "algo",
    tresc:
      "Z tabeli przedstawiającej złożoność obliczeniową algorytmów sortowania na dowolnym, dużym, zbiorze wejściowym (ponad 100 elementowym) wynika, że najszybszą metodą jest algorytm sortowania",
    odpowiedzi: [
      "przez zliczanie",
      "bąbelkowego",
      "przez scalanie",
      "kubełkowego",
    ],
    poprawna: 0,
    img: "https://ee-informatyk.pl/src/img/quizy/inf04/inf04-189.jpg",
  },
  {
    id: "ee-190",
    kat: "testy",
    tresc:
      "Oprogramowaniem do śledzenia błędów oraz do zarządzania projektami jest",
    odpowiedzi: ["Bugzilla", "Git", "Jira", "Jasmine"],
    poprawna: 2,
  },
  {
    id: "ee-191",
    kat: "oop",
    tresc:
      "W przedstawionym kodzie zdefiniowano abstrakcyjną klasę Figura i dziedziczącą po niej klasę prostokąta ze zdefiniowanymi polami i konstruktorami. Wskaż minimalną implementację sekcji /* metody klasy */ dla klasy Prostokąt",
    odpowiedzi: ["Kod 1", "Kod 2", "Kod 3", "Kod 4"],
    poprawna: 0,
    img: "https://ee-informatyk.pl/src/img/quizy/inf04/inf04-191.jpg",
  },
  {
    id: "ee-192",
    kat: "oop",
    tresc: "Rekomendacje standardu WCAG 2.0 związane z percepcją dotyczą",
    odpowiedzi: [
      "zrozumienia i rzetelności w dostarczonych treściach na stronie",
      "zapewnienia wystarczającej ilości czasu na przeczytanie i przetworzenie treści",
      "przedstawienia komponentów interfejsu użytkownika",
      "zapewnienia interakcji pomiędzy komponentami użytkownika przy użyciu klawiatury.",
    ],
    poprawna: 2,
  },
  {
    id: "ee-193",
    kat: "cpp",
    tresc:
      "Obsługę wyjątku, który wygenerowała aplikacja należy zdefiniować w sekcji",
    odpowiedzi: ["catch", "try", "throw", "finally"],
    poprawna: 0,
  },
  {
    id: "ee-194",
    kat: "cpp",
    tresc:
      "W tabeli przedstawiono doświadczenie zawodowe pracowników firmy IT. Do zbudowania aplikacji front-end powinien/powinna zostać przydzielony/a",
    odpowiedzi: ["Krzysztof", "Anna", "Patryk", "Ewa"],
    poprawna: 0,
    img: "https://ee-informatyk.pl/src/img/quizy/inf04/inf04-194.jpg",
  },
  {
    id: "ee-195",
    kat: "cpp",
    tresc:
      "Przedstawiony fragment kodu w języku Java wypełnia tablicę wartościami:",
    odpowiedzi: [
      "2,4,6,8, 10, 12, 14, 16, 18,20",
      "1, 2, 3, 4, 5, 6, 7, 8, 9, 10",
      "2, 2, 2, 2, 2, 2, 2, 2, 2, 2",
      "O, 1, 2, 3, 4, 5, 6, 7, 8, 9",
    ],
    poprawna: 0,
    img: "https://ee-informatyk.pl/src/img/quizy/inf04/inf04-195.jpg",
  },
  {
    id: "ee-196",
    kat: "mobile",
    tresc:
      "Wskaż język programowania, w którym można utworzyć aplikację mobilną dla systemu Android",
    odpowiedzi: ["Java", "C++", "Obiective-C", "Swift"],
    poprawna: 0,
  },
  {
    id: "ee-197",
    kat: "sql",
    tresc:
      "Zastosowanie typu DECIMAL języka MySQL wymaga wcześniejszego zdefiniowania długości (liczby cyfr) przed przecinkiem oraz długości cyfr po przecinku. Jest to zapis",
    odpowiedzi: [
      "łańcuchowy",
      "zmiennoprzecinkowy",
      "stałoprzecinkowy",
      "logiczny",
    ],
    poprawna: 1,
  },
  {
    id: "ee-198",
    kat: "cpp",
    tresc: "Przedstawiony kod XAML zostanie wyrenderowany jako",
    odpowiedzi: ["Rysunek 1", "Rysunek 2", "Rysunek 3", "Rysunek 4"],
    poprawna: 3,
    img: "https://ee-informatyk.pl/src/img/quizy/inf04/inf04-198.jpg",
  },
  {
    id: "ee-199",
    kat: "web",
    tresc: "Przedstawiony zapis w języku Python prezentuje",
    odpowiedzi: [
      "kolejkę (LIFO)",
      "strukturę",
      "stos",
      "tablicę asocjacyjną (słownik)",
    ],
    poprawna: 3,
    img: "https://ee-informatyk.pl/src/img/quizy/inf04/inf04-199.jpg",
  },
  {
    id: "ee-200",
    kat: "oop",
    tresc:
      "Modyfikator dostępu poprzedzający definicję metody Dodaj() zdefiniowanej w klasie Kalkulator powoduje, że",
    odpowiedzi: [
      "jest ona dostępna wewnątrz klasy oraz wewnątrz klas dziedziczących po klasie Kalkulator.",
      "nie jest ona dostępna w klasach dziedziczących po klasie Kalkulator.",
      "jest ona dostępna w programie głównym i może być wołana na rzecz instancji klasy Kalkulator",
      "nie jest ona dostępna z poziomu klas, które są zaprzyjaźnione z klasą Kalkulator",
    ],
    poprawna: 0,
    img: "https://ee-informatyk.pl/src/img/quizy/inf04/inf04-200.jpg",
  },
  {
    id: "ee-201",
    kat: "oop",
    tresc:
      "Stosowanie wzorca Obserwator w programowaniu aplikacji WEB ma na celu",
    odpowiedzi: [
      "powiadamianie obiektów o zmianie stanu innych obiektów",
      "dopasowanie interfejsu użytkownika do różnych typów użytkowników",
      "obserwowanie interakcji użytkownika i wysyłanie wyjątków",
      "obsługę funkcji synchronicznych w kodzie aplikacji",
    ],
    poprawna: 0,
  },
  {
    id: "ee-202",
    kat: "testy",
    tresc:
      "Przedstawiony algorytm może być zaimplementowany w języku Java w oparciu o instrukcję",
    odpowiedzi: ["if", "switch", "try", "while"],
    poprawna: 3,
    img: "https://ee-informatyk.pl/src/img/quizy/inf04/inf04-202.jpg",
  },
  {
    id: "ee-203",
    kat: "oop",
    tresc:
      "W języku C# szablon List implementuje funkcjonalność listy. Z inicjalizacji obiektu wykaz wynika, że jego elementami są",
    odpowiedzi: [
      "liczby rzeczywiste",
      "elementy o niezdefiniowanym typie",
      "elementy typu List",
      "liczby całkowite",
    ],
    poprawna: 3,
    img: "https://ee-informatyk.pl/src/img/quizy/inf04/inf04-203.jpg",
  },
  {
    id: "ee-204",
    kat: "testy",
    tresc: "Przedstawiony wykres obrazuje wyniki testów",
    odpowiedzi: [
      "bezpieczeństwa",
      "funkcjonalnych",
      "wydajnościowych",
      "użyteczności",
    ],
    poprawna: 2,
    img: "https://ee-informatyk.pl/src/img/quizy/inf04/inf04-204.jpg",
  },
  {
    id: "ee-205",
    kat: "algo",
    tresc:
      "Kolor Pale Green w systemie RGB ma postać RGB(152, 251, 152). Kod szesnastkowy tego koloru wynosi",
    odpowiedzi: ["AO FB AO", "98 FE98", "AO FE AO", "98FB98"],
    poprawna: 3,
  },
  {
    id: "ee-206",
    kat: "cpp",
    tresc: "Cechami dobrego negocjatora są:",
    odpowiedzi: [
      "lojalność, nieśmiałość, uczciwość",
      "asertywność, pesymizm, buta",
      "dobra reputacja, przekora, porywczość",
      "intuicja, cierpliwość, asertywność",
    ],
    poprawna: 3,
  },
  {
    id: "ee-207",
    kat: "bhp",
    tresc:
      "Pierwotnym przeznaczeniem środowisk IDE o nazwach: lntellij IDEA, Eclipse, NetBeans jest programowanie w języku",
    odpowiedzi: ["C#", "C++", "Python", "Java"],
    poprawna: 3,
  },
  {
    id: "ee-208",
    kat: "sql",
    tresc:
      "Przedstawiony diagram Ganna dotyczy projektu informatycznego. Zakładając, że każdy członek zespołu ma wystarczające umiejętności, aby wykonać każde z zadań oraz do każdego z zadań można przydzielić tylko jedną osobę, która poświęca na zadanie cały dzień pracy, to minimalnie zespól musi liczyć",
    odpowiedzi: ["1 osobę", "5 osób", "4 osoby", "2 osoby"],
    poprawna: 3,
    img: "https://ee-informatyk.pl/src/img/quizy/inf04/inf04-208.jpg",
  },
  {
    id: "ee-209",
    kat: "cpp",
    tresc:
      "Poszkodowanego należy ułożyć w pozycji bocznej bezpiecznej w przypadku",
    odpowiedzi: [
      "uszkodzenia kręgosłupa",
      "omdlenia i braku tętna",
      "omdlenia, gdy osoba oddycha",
      "urazu pleców, gdy osoba jest przytomna.",
    ],
    poprawna: 2,
  },
  {
    id: "ee-210",
    kat: "cpp",
    tresc:
      "Która metodyka zarządzania projektem jest optymalna, gdy zakres projektu w początkowej fazie nie jest do końca znany, wymagania mogą ulec zmianie w trakcie trwania projektu oraz mogą pojawić się nowe wymagania?",
    odpowiedzi: ["Agile", "Model V", "Model kaskadowy", "PRINCE 2"],
    poprawna: 0,
  },
  {
    id: "ee-211",
    kat: "bhp",
    tresc:
      "Środowiskiem natywnym do programowania aplikacji desktopowych za pomocą języka C# jest",
    odpowiedzi: ["NetBeans", "Eclipse", "PyCharm", "MS Visual Studio"],
    poprawna: 3,
  },
  {
    id: "ee-212",
    kat: "web",
    tresc:
      "Na przedstawionych funkcjonalnie równoważnych sobie kodach źródłowych w wyniku wykonania operacji w zmiennej b zostanie zapisana wartość",
    odpowiedzi: ["6", "596", "5", "5.96"],
    poprawna: 2,
    img: "https://ee-informatyk.pl/src/img/quizy/inf04/inf04-212.jpg",
  },
  {
    id: "ee-213",
    kat: "mobile",
    tresc:
      "Programista może zastosować framework Angular w celu implementacji aplikacji",
    odpowiedzi: ["mobilnej", "typu back-end", "desktopowej", "typu front-end"],
    poprawna: 3,
  },
  {
    id: "ee-214",
    kat: "testy",
    tresc:
      "Jednym z etapów publikacji aplikacji mobilnej w sklepie Google Play są testy Beta, których cechą charakterystyczną jest to, że są one",
    odpowiedzi: [
      "wykonywane przez grupę docelowych użytkowników aplikacji",
      "wykonywane przez grupę zatrudnionych testerów z firmy Google",
      "podzielone na testy funkcjonalne, wydajnościowe i skalowalności",
      "przeprowadzane w oparciu o dokument z przypadkami testowymi",
    ],
    poprawna: 0,
  },
  {
    id: "ee-215",
    kat: "algo",
    tresc:
      "Aby zaprojektować zestaw danych do zainicjowania algorytmu sortowania bąbelkowego tablicy, należy zastosować przynajmniej typy:",
    odpowiedzi: [
      "dwa tablicowe, dwa do zamiany elementów miejscami",
      "jeden tablicowy, dwa liczbowe do kontroli pętli, jeden do zamiany elementów miejscami",
      "jeden tablicowy, jeden liczbowy do kontroli pętli, dwa do zamiany elementów miejscami",
      "dwa tablicowe, jeden liczbowy do kontroli pętli",
    ],
    poprawna: 1,
  },
  {
    id: "ee-216",
    kat: "algo",
    tresc:
      "Strategia budowania algorytmu poprzez podział na dwa lub więcej mniejszych pod problemów, tak długo, aż fragmenty staną się proste do bezpośredniego rozwiązania jest metodą",
    odpowiedzi: [
      "najkrótszej ścieżki.",
      "dziel i zwyciężaj",
      "komiwojażera",
      "heurystyczną",
    ],
    poprawna: 1,
  },
  {
    id: "ee-217",
    kat: "bhp",
    tresc:
      "Przedstawiony cytat jest opisem metodyki RAD. Rozwinięcie tego skrótu można przetłumaczyć na język polski jako",
    odpowiedzi: [
      "środowisko rozwijania aplikacji",
      "środowisko szybkiego programowania",
      "zintegrowane środowisko programistyczne",
      "szybki rozwój aplikacji",
    ],
    poprawna: 3,
    img: "https://ee-informatyk.pl/src/img/quizy/inf04/inf04-217.jpg",
  },
  {
    id: "ee-218",
    kat: "bhp",
    tresc:
      "Aby utworzyć aplikację mobilną typu cross-platform w języku C# można zastosować",
    odpowiedzi: [
      "platformę Xamarin",
      "środowisko XCode",
      "platformę React Native",
      "środowisko Android Studio",
    ],
    poprawna: 0,
  },
  {
    id: "ee-219",
    kat: "algo",
    tresc:
      "Która z poniższych kart graficznych zapewnia większą wydajność w grach komputerowych?",
    odpowiedzi: [
      "NVIDIA GeForce GTX 1050 Ti - 4GB GDDR5, 128-bit",
      "AMD Radeon RX 580 - 8GB GDDR5, 256-bit",
      "Intel UHD Graphics 630 - zintegrowana",
      "AMD Radeon R7 240 - 2GB GDDR5, 64-bit",
    ],
    poprawna: 1,
  },
  {
    id: "ee-220",
    kat: "cpp",
    tresc: "Który z poniższych dysków zapewnia najszybszy odczyt danych?",
    odpowiedzi: [
      "HDD 7200 RPM, SATA III, 64 MB Cache",
      "SSD NVMe PCIe 3.0, prędkość odczytu do 3500 MB/s",
      "HDD 5400 RPM, SATA II, 32 MB Cache",
      "SSD SATA III, prędkość odczytu do 550 MB/s",
    ],
    poprawna: 1,
  },
  {
    id: "ee-221",
    kat: "cpp",
    tresc: "Który z poniższych parametrów opisuje szybkość procesora?",
    odpowiedzi: [
      "Ilość rdzeni",
      "Częstotliwość taktowania",
      "Pojemność pamięci podręcznej",
      "Typ złącza",
    ],
    poprawna: 1,
  },
  {
    id: "ee-222",
    kat: "cpp",
    tresc:
      "Który z poniższych parametrów dysku twardego ma największy wpływ na jego szybkość?",
    odpowiedzi: [
      "Pojemność dysku",
      "Prędkość obrotowa talerzy (RPM)",
      "Rodzaj złącza (SATA/PCIe)",
      "Ilość pamięci podręcznej (Cache)",
    ],
    poprawna: 1,
  },
  {
    id: "ee-223",
    kat: "cpp",
    tresc: "Ile kilobajtów (KB) mieści się w 1 megabajcie (MB)?",
    odpowiedzi: ["10", "100", "1024", "1000"],
    poprawna: 2,
  },
  {
    id: "ee-224",
    kat: "cpp",
    tresc: "1 terabajt (TB) to ile gigabajtów (GB)?",
    odpowiedzi: ["1024", "1000", "2048", "512"],
    poprawna: 0,
  },
  {
    id: "ee-225",
    kat: "web",
    tresc:
      "Jakie urządzenie techniki komputerowej najlepiej nadaje się do projektowania graficznego w programach typu CAD?",
    odpowiedzi: [
      "Laptop z zintegrowaną kartą graficzną",
      "Komputer stacjonarny z kartą graficzną NVIDIA Quadro",
      "Laptop z ekranem dotykowym",
      "Serwer z dużą ilością pamięci RAM",
    ],
    poprawna: 1,
  },
  {
    id: "ee-226",
    kat: "cpp",
    tresc:
      "Który rodzaj pamięci RAM należy wybrać do wydajnego komputera gamingowego?",
    odpowiedzi: ["DDR3", "DDR4", "DDR5", "LPDDR4"],
    poprawna: 2,
  },
  {
    id: "ee-227",
    kat: "testy",
    tresc:
      "Który z poniższych etapów przetwarzania rozkazów przez procesor następuje jako pierwszy?",
    odpowiedzi: [
      "Wykonanie instrukcji (Execution)",
      "Dekodowanie rozkazu (Decode)",
      "Pobranie rozkazu z pamięci (Fetch)",
      "Zapis wyników do pamięci (Write Back)",
    ],
    poprawna: 2,
  },
  {
    id: "ee-228",
    kat: "testy",
    tresc: "Co określa zestaw instrukcji (ISA) procesora?",
    odpowiedzi: [
      "Rodzaje danych przechowywanych w pamięci",
      "Instrukcje, które procesor jest w stanie wykonać",
      "Sposób zarządzania pamięcią podręczną",
      "Schemat połączeń między procesorem a innymi komponentami",
    ],
    poprawna: 1,
  },
  {
    id: "ee-229",
    kat: "testy",
    tresc:
      "Jakie zadanie pełni pamięć operacyjna (RAM) w systemie komputerowym?",
    odpowiedzi: [
      "Stałe przechowywanie systemu operacyjnego",
      "Tymczasowe przechowywanie danych i instrukcji dla procesora",
      "Zarządzanie przepływem danych między urządzeniami wejścia/wyjścia",
      "Zapewnianie kopii zapasowej danych użytkownika",
    ],
    poprawna: 1,
  },
  {
    id: "ee-230",
    kat: "algo",
    tresc:
      "Który element systemu komputerowego odpowiada za przesyłanie danych między procesorem a pamięcią RAM?",
    odpowiedzi: [
      "Kontroler DMA",
      "Mostek północny (Northbridge)",
      "Karta graficzna",
      "Zasilacz",
    ],
    poprawna: 1,
  },
  {
    id: "ee-231",
    kat: "cpp",
    tresc: "Jak procesor komunikuje się z pamięcią podręczną (cache)?",
    odpowiedzi: [
      "Za pomocą linii danych w magistrali systemowej",
      "Poprzez system przerwań",
      "Wykorzystując jedynie pamięć RAM",
      "Bezpośrednio, z pominięciem mostków systemowych",
    ],
    poprawna: 0,
  },
  {
    id: "ee-232",
    kat: "sql",
    tresc:
      "Który z poniższych opisów najlepiej definiuje system informatyczny?",
    odpowiedzi: [
      "Zespół urządzeń technicznych wykorzystywanych do pracy biurowej",
      "Zespół ludzi, procedur, oprogramowania i sprzętu służący do przetwarzania danych",
      "Oprogramowanie wspierające wyłącznie zarządzanie danymi osobowymi",
      "Sieć komputerowa umożliwiająca komunikację między użytkownikami",
    ],
    poprawna: 1,
  },
  {
    id: "ee-233",
    kat: "sql",
    tresc:
      "Który z poniższych przykładów jest systemem informacji przetwarzanym przez system informatyczny?",
    odpowiedzi: [
      "System wentylacji w biurowcach",
      "System PESEL",
      "System monitorowania temperatury serwerów",
      "System sterowania światłami drogowymi",
    ],
    poprawna: 1,
  },
  {
    id: "ee-234",
    kat: "web",
    tresc:
      "Gdzie są przechowywane dane w przypadku korzystania z chmury obliczeniowej?",
    odpowiedzi: [
      "Na serwerze lokalnym użytkownika",
      "Na dysku twardym użytkownika",
      "Na zdalnych serwerach dostawcy usług",
      "Na dyskach optycznych użytkownika",
    ],
    poprawna: 2,
  },
  {
    id: "ee-235",
    kat: "sql",
    tresc:
      "Jaki system informatyczny powinien zostać wykorzystany do obsługi sprzedaży w sklepie internetowym?",
    odpowiedzi: ["System CMS", "System ERP", "System CRM", "System e-commerce"],
    poprawna: 3,
  },
  {
    id: "ee-236",
    kat: "web",
    tresc: "Co jest główną funkcją portali społecznościowych?",
    odpowiedzi: [
      "Zarządzanie sprzedażą produktów i usług",
      "Udostępnianie treści i komunikacja między użytkownikami",
      "Tworzenie kopii zapasowych danych",
      "Analiza wyników biznesowych",
    ],
    poprawna: 1,
  },
  {
    id: "ee-237",
    kat: "bhp",
    tresc:
      "Która z poniższych zasad jest kluczowa dla bezpiecznego korzystania z portali społecznościowych?",
    odpowiedzi: [
      "Udostępnianie jak największej ilości danych osobowych",
      "Unikanie ustawiania silnych haseł do konta",
      "Regularne sprawdzanie ustawień prywatności",
      "Zgłaszanie postów, które nie są zgodne z regulaminem",
    ],
    poprawna: 2,
  },
  {
    id: "ee-238",
    kat: "sql",
    tresc:
      "Który z poniższych przykładów jest zastosowaniem systemu informatycznego w działalności biznesowej?",
    odpowiedzi: [
      "E-sklep",
      "System wentylacji",
      "System sterowania ruchem miejskim",
      "System nawigacji GPS",
    ],
    poprawna: 0,
  },
  {
    id: "ee-239",
    kat: "algo",
    tresc:
      "Które z poniższych rozwiązań ułatwia korzystanie z serwisów internetowych osobom niewidomym?",
    odpowiedzi: [
      "Dostosowanie rozdzielczości ekranu",
      "Dodanie czytnika ekranu (screen reader)",
      "Zapewnienie możliwości zmiany czcionki",
      "Zmniejszenie liczby grafik na stronie",
    ],
    poprawna: 1,
  },
  {
    id: "ee-240",
    kat: "mobile",
    tresc: "Jakie są główne zasady WCAG 2.0?",
    odpowiedzi: [
      "Postępowa, responsywna, efektywna",
      "Percepcyjna, operacyjna, zrozumiała, solidna",
      "Dostosowana, szybka, mobilna, dostępna",
      "Elastyczna, prosta, przejrzysta, trwała",
    ],
    poprawna: 1,
  },
  {
    id: "ee-241",
    kat: "mobile",
    tresc: "Co oznacza poziom dostępności AAA w WCAG 2.0?",
    odpowiedzi: [
      "Minimalny poziom dostępności",
      "Średni poziom dostępności",
      "Najwyższy poziom dostępności",
      "Dostosowanie wyłącznie do użytkowników mobilnych",
    ],
    poprawna: 2,
  },
  {
    id: "ee-242",
    kat: "cpp",
    tresc:
      "Która z poniższych topologii sieci charakteryzuje się połączeniem wszystkich urządzeń jednym kablem?",
    odpowiedzi: [
      "Topologia gwiazdy",
      "Topologia pierścienia",
      "Topologia magistrali",
      "Topologia siatki",
    ],
    poprawna: 2,
  },
  {
    id: "ee-243",
    kat: "cpp",
    tresc:
      "W której topologii sieci każde urządzenie jest połączone bezpośrednio z każdym innym?",
    odpowiedzi: [
      "Topologia magistrali",
      "Topologia gwiazdy",
      "Topologia pierścienia",
      "Topologia siatki",
    ],
    poprawna: 3,
  },
  {
    id: "ee-244",
    kat: "web",
    tresc:
      "Który protokół modelu TCP/IP jest odpowiedzialny za niezawodne przesyłanie danych?",
    odpowiedzi: ["IP", "UDP", "TCP", "HTTP"],
    poprawna: 2,
  },
  {
    id: "ee-245",
    kat: "cpp",
    tresc: "Ile warstw ma model TCP/IP?",
    odpowiedzi: ["2", "4", "5", "7"],
    poprawna: 1,
  },
  {
    id: "ee-246",
    kat: "cpp",
    tresc: "Która z poniższych cech dotyczy sieci bezprzewodowej?",
    odpowiedzi: [
      "Wymaga użycia kabli do połączenia urządzeń",
      "Jest bardziej podatna na zakłócenia w transmisji danych",
      "Nie wymaga zabezpieczeń, ponieważ jest automatycznie chroniona",
      "Nie działa w miejscach z dużą liczbą urządzeń",
    ],
    poprawna: 1,
  },
  {
    id: "ee-247",
    kat: "cpp",
    tresc: "Jaką przepustowość ma sieć przesyłająca 500 MB danych w 10 sekund?",
    odpowiedzi: ["50 Mbps", "400 Mbps", "500 Mbps", "40 Mbps"],
    poprawna: 1,
  },
  {
    id: "ee-248",
    kat: "web",
    tresc:
      "Jak nazywa się proces przesyłania danych z komputera lokalnego na serwer?",
    odpowiedzi: [
      "Pobieranie danych",
      "Wysyłanie danych",
      "Przesyłanie danych",
      "Streaming",
    ],
    poprawna: 1,
  },
  {
    id: "ee-249",
    kat: "bhp",
    tresc: "Która cecha wyróżnia sieć synchroniczną?",
    odpowiedzi: [
      "Transmisja danych odbywa się w ustalonych odstępach czasu",
      "Przesyłanie danych odbywa się w sposób nieciągły",
      "Nie wymaga synchronizacji zegarów",
      "Zapewnia większą elastyczność w przesyłaniu danych",
    ],
    poprawna: 0,
  },
  {
    id: "ee-250",
    kat: "cpp",
    tresc: "Która cecha wyróżnia sieć asynchroniczną?",
    odpowiedzi: [
      "Wymaga synchronizacji zegarów",
      "Dane są przesyłane tylko w ustalonych ramach czasowych",
      "Dane są przesyłane w sposób nieciągły, bez synchronizacji zegarów",
      "Jest bardziej niezawodna niż sieć synchroniczna",
    ],
    poprawna: 2,
  },
  {
    id: "ee-251",
    kat: "cpp",
    tresc: "Która zasada poprawia bezpieczeństwo korzystania z sieci?",
    odpowiedzi: [
      "Udostępnianie haseł wśród znajomych",
      "Unikanie aktualizacji systemu operacyjnego",
      "Używanie silnych, unikalnych haseł",
      "Pobieranie plików z niezaufanych źródeł",
    ],
    poprawna: 2,
  },
  {
    id: "ee-252",
    kat: "cpp",
    tresc: "Które narzędzie jest przykładem komunikatora audio-video?",
    odpowiedzi: ["Slack", "Microsoft Teams", "Google Drive", "Notion"],
    poprawna: 1,
  },
  {
    id: "ee-253",
    kat: "sql",
    tresc: "Która z poniższych zasad jest częścią netykiety?",
    odpowiedzi: [
      "Ignorowanie wiadomości od innych użytkowników",
      "Unikanie pisania wielkimi literami w wiadomościach",
      "Używanie nieformalnego języka w każdej rozmowie",
      "Publikowanie treści bez zgody autorów",
    ],
    poprawna: 1,
  },
  {
    id: "ee-254",
    kat: "algo",
    tresc: "Jaka jest dziesiętna wartość liczby binarnej 1010?",
    odpowiedzi: ["8", "10", "12", "14"],
    poprawna: 1,
  },
  {
    id: "ee-255",
    kat: "web",
    tresc: "Jaki jest zapis liczby dziesiętnej 255 w systemie szesnastkowym?",
    odpowiedzi: ["FE", "FF", "100", "EF"],
    poprawna: 1,
  },
  {
    id: "ee-256",
    kat: "web",
    tresc:
      "Jaki jest kod uzupełnieniowy do dwóch dla liczby -5 w zapisie binarnym na 8 bitach?",
    odpowiedzi: ["11111011", "00000101", "11111101", "10000101"],
    poprawna: 0,
  },
  {
    id: "ee-257",
    kat: "algo",
    tresc: "Co charakteryzuje kod uzupełnieniowy do dwóch?",
    odpowiedzi: [
      "Przedstawia liczbę w postaci odwrotnej binarnej",
      "Umożliwia reprezentację liczb ujemnych w systemie binarnym",
      "Służy do konwersji liczb binarnych na liczby dziesiętne",
      "Umożliwia zamianę systemu binarnego na szesnastkowy",
    ],
    poprawna: 1,
  },
  {
    id: "ee-258",
    kat: "algo",
    tresc: "Jaki jest wynik dodawania binarnego liczb 1011 + 110?",
    odpowiedzi: ["11001", "10101", "10001", "11101"],
    poprawna: 2,
  },
  {
    id: "ee-259",
    kat: "algo",
    tresc:
      "Jaki będzie wynik logicznej operacji AND dla liczb binarnych 1010 i 1100?",
    odpowiedzi: ["1000", "1110", "1100", "1010"],
    poprawna: 0,
  },
  {
    id: "ee-260",
    kat: "web",
    tresc:
      "Które narzędzie najlepiej nadaje się do konwersji liczby szesnastkowej na binarną?",
    odpowiedzi: [
      "Edytor tekstowy",
      "Kalkulator programisty",
      "Arkusz kalkulacyjny",
      "Przeglądarka internetowa",
    ],
    poprawna: 1,
  },
  {
    id: "ee-261",
    kat: "web",
    tresc:
      "Które z poniższych narzędzi umożliwia jednoczesną pracę z systemami BIN, DEC i HEX?",
    odpowiedzi: [
      "Microsoft Word",
      "Kalkulator systemowy",
      "GIMP",
      "Przeglądarka grafów",
    ],
    poprawna: 1,
  },
  {
    id: "ee-262",
    kat: "cpp",
    tresc:
      "Które z poniższych określeń najlepiej opisuje oprogramowanie typu ransomware?",
    odpowiedzi: [
      "Oprogramowanie blokujące dostęp do danych w celu wymuszenia okupu",
      "Programy zbierające dane osobowe bez zgody użytkownika",
      "Oprogramowanie używane do przeprowadzania ataków DDoS",
      "Złośliwe aplikacje wyświetlające reklamy",
    ],
    poprawna: 0,
  },
  {
    id: "ee-263",
    kat: "sql",
    tresc:
      "Jaki rodzaj złośliwego oprogramowania działa w tle, przechwytując informacje o wpisywanych hasłach?",
    odpowiedzi: ["Trojan", "Keylogger", "Spyware", "Adware"],
    poprawna: 1,
  },
  {
    id: "ee-264",
    kat: "bhp",
    tresc: "Co jest głównym celem ataku phishingowego?",
    odpowiedzi: [
      "Przejęcie danych osobowych poprzez fałszywe strony lub wiadomości",
      "Zakłócenie działania sieci poprzez nadmiar zapytań",
      "Wykradanie haseł z pamięci operacyjnej urządzenia",
      "Blokowanie dostępu do usług online",
    ],
    poprawna: 0,
  },
  {
    id: "ee-265",
    kat: "sql",
    tresc:
      "Który atak hakerski polega na zasypywaniu serwera dużą liczbą zapytań, co powoduje jego przeciążenie?",
    odpowiedzi: ["Phishing", "Man-in-the-Middle", "DDoS", "SQL Injection"],
    poprawna: 2,
  },
  {
    id: "ee-266",
    kat: "cpp",
    tresc:
      "Który z poniższych środków najlepiej zabezpiecza komputer przed wirusami?",
    odpowiedzi: [
      "Regularne tworzenie kopii zapasowych",
      "Aktualny program antywirusowy",
      "Unikanie korzystania z publicznych sieci Wi-Fi",
      "Używanie silnych haseł",
    ],
    poprawna: 1,
  },
  {
    id: "ee-267",
    kat: "algo",
    tresc: "Co jest głównym celem firewalla w systemie komputerowym?",
    odpowiedzi: [
      "Szyfrowanie przesyłanych danych",
      "Zarządzanie ruchem sieciowym i blokowanie nieautoryzowanego dostępu",
      "Zapobieganie wyciekom danych na skutek błędów systemowych",
      "Ochrona danych na poziomie aplikacji internetowych",
    ],
    poprawna: 1,
  },
  {
    id: "ee-268",
    kat: "bhp",
    tresc:
      "Które z poniższych zachowań jest zagrożeniem dla sfery emocjonalnej człowieka w cyberprzestrzeni?",
    odpowiedzi: [
      "Cyberstalking",
      "Nadmierne korzystanie z mediów społecznościowych",
      "Zła postawa podczas pracy przy komputerze",
      "Przesyłanie niezaszyfrowanych plików",
    ],
    poprawna: 0,
  },
  {
    id: "ee-269",
    kat: "bhp",
    tresc:
      "Które zagrożenie związane z korzystaniem z cyberprzestrzeni dotyczy zdrowia fizycznego?",
    odpowiedzi: [
      "Depresja związana z cyberprzemocą",
      "Problemy z kręgosłupem spowodowane długim siedzeniem",
      "Uzależnienie od gier komputerowych",
      "Rozprzestrzenianie fałszywych informacji",
    ],
    poprawna: 1,
  },
  {
    id: "ee-270",
    kat: "cpp",
    tresc:
      "Który z poniższych sposobów pomaga przeciwdziałać uzależnieniu od internetu?",
    odpowiedzi: [
      "Zwiększenie liczby godzin spędzanych w mediach społecznościowych",
      "Wprowadzenie regularnych przerw od korzystania z urządzeń cyfrowych",
      "Korzystanie z komputera tylko w nocy",
      "Zainstalowanie większej liczby aplikacji rozrywkowych",
    ],
    poprawna: 1,
  },
  {
    id: "ee-271",
    kat: "sql",
    tresc:
      "Jak można zapobiec problemom społecznym wynikającym z nadmiernego korzystania z internetu?",
    odpowiedzi: [
      "Utrzymywać równowagę między relacjami online i offline",
      "Wycofać się całkowicie z życia wirtualnego",
      "Zwiększać ilość czasu spędzanego przed ekranem",
      "Unikać kontaktu z ludźmi w rzeczywistości",
    ],
    poprawna: 0,
  },
  {
    id: "ee-272",
    kat: "algo",
    tresc: "Co należy zrobić, aby bezpiecznie przechowywać dane na komputerze?",
    odpowiedzi: [
      "Nie korzystać z kopii zapasowych",
      "Regularnie aktualizować oprogramowanie i tworzyć kopie zapasowe",
      "Przechowywać dane na niezaszyfrowanych urządzeniach przenośnych",
      "Udostępniać hasła do plików współpracownikom",
    ],
    poprawna: 1,
  },
  {
    id: "ee-273",
    kat: "algo",
    tresc:
      "Które z poniższych narzędzi najlepiej zabezpiecza dane na urządzeniu przenośnym?",
    odpowiedzi: [
      "Nieaktualne oprogramowanie",
      "Hasło ustawione na urządzeniu",
      "Szyfrowanie danych na urządzeniu",
      "Zainstalowanie aplikacji rozrywkowych",
    ],
    poprawna: 2,
  },
  {
    id: "ee-274",
    kat: "sql",
    tresc: "Jakie działanie sprzyja ochronie cyfrowego wizerunku w internecie?",
    odpowiedzi: [
      "Publikowanie wszystkich informacji o swoim życiu prywatnym",
      "Sprawdzanie ustawień prywatności na portalach społecznościowych",
      "Udostępnianie swoich danych logowania znajomym",
      "Niezweryfikowanie źródeł publikowanych treści",
    ],
    poprawna: 1,
  },
  {
    id: "ee-275",
    kat: "cpp",
    tresc:
      "Które z poniższych działań może narazić cyfrową tożsamość na niebezpieczeństwo?",
    odpowiedzi: [
      "Ustawianie unikalnych i silnych haseł",
      "Klikanie w podejrzane linki w wiadomościach e-mail",
      "Regularne zmienianie haseł do kont",
      "Włączanie uwierzytelniania dwuskładnikowego",
    ],
    poprawna: 1,
  },
  {
    id: "ee-276",
    kat: "bhp",
    tresc: "Która z poniższych zasad dotyczy ochrony prywatności w internecie?",
    odpowiedzi: [
      "Udostępnianie danych osobowych na publicznych forach",
      "Używanie pseudonimów zamiast prawdziwych imion na portalach społecznościowych",
      "Zapisywanie haseł w wiadomościach e-mail",
      "Publikowanie wszystkich zdjęć na portalach społecznościowych",
    ],
    poprawna: 1,
  },
  {
    id: "ee-277",
    kat: "mobile",
    tresc:
      "Jak można ograniczyć ilość danych zbieranych przez aplikacje mobilne?",
    odpowiedzi: [
      "Nie wyłączać dostępu aplikacji do lokalizacji i kontaktów",
      "Sprawdzać i dostosowywać uprawnienia aplikacji w ustawieniach",
      "Korzystać z aplikacji bez weryfikowania ich pochodzenia",
      "Udostępniać aplikacjom wszystkie wymagane dane",
    ],
    poprawna: 1,
  },
  {
    id: "ee-278",
    kat: "bhp",
    tresc: "Co jest podstawowym celem ochrony danych osobowych?",
    odpowiedzi: [
      "Zapewnienie anonimowości użytkownikom internetu",
      "Ochrona danych osobowych przed nieuprawnionym dostępem i wykorzystaniem",
      "Utrudnienie pracy organom ścigania",
      "Publikowanie danych osobowych w celach marketingowych",
    ],
    poprawna: 1,
  },
  {
    id: "ee-279",
    kat: "bhp",
    tresc:
      "Który z poniższych aktów prawnych dotyczy ochrony danych osobowych w Unii Europejskiej?",
    odpowiedzi: [
      "GDPR (RODO)",
      "DMCA",
      "Creative Commons",
      "Open Source Initiative",
    ],
    poprawna: 0,
  },
  {
    id: "ee-280",
    kat: "bhp",
    tresc: "Co to jest własność intelektualna?",
    odpowiedzi: [
      "Zbiór danych osobowych",
      "Koncepcja praw chroniących twórczość i wynalazki",
      "Zestaw ustaw o ochronie prywatności",
      "Lista plików przechowywanych w chmurze",
    ],
    poprawna: 1,
  },
  {
    id: "ee-281",
    kat: "bhp",
    tresc: "Która z poniższych sytuacji narusza prawa autorskie?",
    odpowiedzi: [
      "Korzystanie z programu typu open-source zgodnie z licencją",
      "Publikowanie filmu chronionego prawami autorskimi bez zgody właściciela",
      "Zakup licencji na oprogramowanie",
      "Tworzenie kopii zapasowej posiadanego legalnie programu",
    ],
    poprawna: 1,
  },
  {
    id: "ee-282",
    kat: "web",
    tresc:
      "Które z poniższych działań poprawia bezpieczeństwo transakcji internetowych?",
    odpowiedzi: [
      "Korzystanie z publicznego Wi-Fi do logowania na konto bankowe",
      "Sprawdzanie certyfikatów SSL na stronach transakcyjnych",
      "Udostępnianie danych karty kredytowej w wiadomościach e-mail",
      "Brak aktualizacji oprogramowania przeglądarki",
    ],
    poprawna: 1,
  },
  {
    id: "ee-283",
    kat: "web",
    tresc:
      "Który z poniższych sposobów najlepiej chroni dane karty płatniczej podczas transakcji internetowych?",
    odpowiedzi: [
      "Zapisywanie numeru karty w przeglądarce internetowej",
      "Korzystanie z wirtualnych kart płatniczych lub jednorazowych kodów",
      "Podawanie danych karty w odpowiedzi na e-mail od nieznanej osoby",
      "Udostępnianie danych karty na forach internetowych",
    ],
    poprawna: 1,
  },
  {
    id: "ee-284",
    kat: "bhp",
    tresc: "Co jest głównym celem normalizacji krajowej?",
    odpowiedzi: [
      "Utrudnienie handlu międzynarodowego",
      "Ujednolicenie wymagań technicznych i poprawa bezpieczeństwa",
      "Zwiększenie liczby regulacji prawnych",
      "Zwiększenie kosztów produkcji",
    ],
    poprawna: 1,
  },
  {
    id: "ee-285",
    kat: "sql",
    tresc: "Jaki wpływ ma normalizacja krajowa na produkty i usługi?",
    odpowiedzi: [
      "Zapewnia lepszą kompatybilność i jakość",
      "Zmniejsza liczbę dostępnych produktów",
      "Eliminuje potrzebę kontroli jakości",
      "Ogranicza innowacje technologiczne",
    ],
    poprawna: 0,
  },
  {
    id: "ee-286",
    kat: "bhp",
    tresc: "Jakie oznaczenie ma norma międzynarodowa?",
    odpowiedzi: ["ISO", "PN", "EN", "CE"],
    poprawna: 0,
  },
  {
    id: "ee-287",
    kat: "sql",
    tresc: "Która norma jest oznaczeniem krajowym w Polsce?",
    odpowiedzi: ["ISO", "PN", "EN", "IEC"],
    poprawna: 1,
  },
  {
    id: "ee-288",
    kat: "cpp",
    tresc:
      "Który z poniższych typów danych jest przykładem typu stałoprzecinkowego?",
    odpowiedzi: ["float", "int", "double", "decimal"],
    poprawna: 1,
  },
  {
    id: "ee-289",
    kat: "cpp",
    tresc:
      "Jaka jest główna różnica między typami stałoprzecinkowymi a zmiennoprzecinkowymi?",
    odpowiedzi: [
      "Stałoprzecinkowe przechowują liczby całkowite, zmiennoprzecinkowe przechowują liczby z częściami dziesiętnymi",
      "Stałoprzecinkowe obsługują liczby ujemne, a zmiennoprzecinkowe tylko dodatnie",
      "Stałoprzecinkowe wymagają więcej pamięci niż zmiennoprzecinkowe",
      "Zmiennoprzecinkowe przechowują tylko liczby ujemne",
    ],
    poprawna: 0,
  },
  {
    id: "ee-290",
    kat: "cpp",
    tresc: "Który z poniższych typów danych jest typem logicznym?",
    odpowiedzi: ["bool", "char", "float", "int"],
    poprawna: 0,
  },
  {
    id: "ee-291",
    kat: "sql",
    tresc: "Jaką wartość może przechowywać zmienna typu logicznego?",
    odpowiedzi: [
      "Każdą liczbę rzeczywistą",
      "Tylko wartość tekstową",
      "Jedną z dwóch wartości: true lub false",
      "Wartość w formacie binarnym",
    ],
    poprawna: 2,
  },
  {
    id: "ee-292",
    kat: "cpp",
    tresc: "Który z poniższych typów jest przykładem typu znakowego?",
    odpowiedzi: ["char", "string", "boolean", "float"],
    poprawna: 0,
  },
  {
    id: "ee-293",
    kat: "cpp",
    tresc: "Czym różni się typ łańcuchowy od znakowego?",
    odpowiedzi: [
      "Typ łańcuchowy przechowuje pojedyncze znaki, a znakowy długie ciągi znaków",
      "Typ znakowy przechowuje pojedyncze znaki, a łańcuchowy ciągi znaków",
      "Typ łańcuchowy obsługuje liczby całkowite, a znakowy liczby zmiennoprzecinkowe",
      "Typ znakowy przechowuje dane logiczne, a łańcuchowy tekst",
    ],
    poprawna: 1,
  },
  {
    id: "ee-294",
    kat: "testy",
    tresc:
      "Która instrukcja poprawnie deklaruje zmienną typu łańcuchowego w języku C++?",
    odpowiedzi: [
      "int name = &quot;Jan&quot;",
      "float name = &quot;Jan&quot;",
      "string name = &quot;Jan&quot;",
      "bool name = &quot;Jan&quot;",
    ],
    poprawna: 2,
  },
  {
    id: "ee-295",
    kat: "cpp",
    tresc: 'Jakiego typu danych użyjesz w C++ do przechowania wartości "true"?',
    odpowiedzi: ["string", "bool", "int", "float"],
    poprawna: 1,
  },
  {
    id: "ee-296",
    kat: "cpp",
    tresc: "Który z poniższych jest przykładem złożonego typu danych?",
    odpowiedzi: ["int", "char", "struct", "bool"],
    poprawna: 2,
  },
  {
    id: "ee-297",
    kat: "cpp",
    tresc: "Do jakiej kategorii należy typ danych &quot;array&quot;?",
    odpowiedzi: [
      "Prosty typ danych",
      "Złożony typ danych",
      "Typ wskaźnikowy",
      "Typ logiczny",
    ],
    poprawna: 1,
  },
  {
    id: "ee-298",
    kat: "cpp",
    tresc: "Jaką wartość przechowuje tablica jednowymiarowa?",
    odpowiedzi: [
      "Tylko jedną wartość",
      "Wiele wartości pod jednym indeksem",
      "Wiele wartości pod różnymi indeksami",
      "Wartość logiczną true lub false",
    ],
    poprawna: 2,
  },
  {
    id: "ee-299",
    kat: "cpp",
    tresc:
      "Która deklaracja w języku C++ poprawnie definiuje tablicę dwuwymiarową?",
    odpowiedzi: [
      "int matrix[3];",
      "int matrix[3][3];",
      "int matrix[];",
      "int matrix[3][3][3];",
    ],
    poprawna: 1,
  },
  {
    id: "ee-300",
    kat: "cpp",
    tresc: "Które stwierdzenie najlepiej opisuje tablicę asocjacyjną?",
    odpowiedzi: [
      "Tablica przechowująca wartości dostępne tylko za pomocą indeksów numerycznych",
      "Tablica przechowująca dane w postaci par klucz-wartość",
      "Tablica, która zmienia rozmiar w czasie wykonania programu",
      "Tablica, która przechowuje tylko dane tekstowe",
    ],
    poprawna: 1,
  },
  {
    id: "ee-301",
    kat: "cpp",
    tresc:
      "Jakiej funkcji w C++ można użyć do dynamicznego alokowania pamięci dla tablicy?",
    odpowiedzi: ["malloc()", "free()", "sizeof()", "delete[]"],
    poprawna: 0,
  },
  {
    id: "ee-302",
    kat: "sql",
    tresc: "Które z poniższych jest przykładem typu rekordowego?",
    odpowiedzi: [
      "struct w języku C++",
      "int w języku Python",
      "bool w języku Java",
      "float w języku C",
    ],
    poprawna: 0,
  },
  {
    id: "ee-303",
    kat: "cpp",
    tresc:
      "Jaka jest główna różnica między strukturą (struct) a unią (union) w języku C?",
    odpowiedzi: [
      "Struktura przechowuje wiele wartości jednocześnie, unia jedną",
      "Unia pozwala na dynamiczne typowanie danych, struktura nie",
      "Struktura wymaga więcej pamięci niż unia",
      "Unia nie jest wspierana przez kompilatory nowoczesnych języków",
    ],
    poprawna: 0,
  },
  {
    id: "ee-304",
    kat: "mobile",
    tresc: "Jakiego nagłówka należy użyć w języku C++ do pracy z plikami?",
    odpowiedzi: [
      "&lt;stdio.h&gt;",
      "&lt;fstream&gt;",
      "&lt;fileio.h&gt;",
      "&lt;iostream&gt;",
    ],
    poprawna: 1,
  },
  {
    id: "ee-305",
    kat: "web",
    tresc: "Które operacje na plikach są podstawowe?",
    odpowiedzi: [
      "Tylko otwieranie i zamykanie plików",
      "Otwieranie, zapisywanie, odczytywanie, zamykanie",
      "Usuwanie i tworzenie nowych plików",
      "Zmiana rozszerzenia plików w trakcie działania programu",
    ],
    poprawna: 1,
  },
  {
    id: "ee-306",
    kat: "cpp",
    tresc: "Czym jest wskaźnik w języku C?",
    odpowiedzi: [
      "Zmiennej przechowującej wartość logiczną",
      "Zmiennej przechowującej adres pamięci",
      "Funkcją dynamicznie alokującą pamięć",
      "Typem danych do przechowywania tekstów",
    ],
    poprawna: 1,
  },
  {
    id: "ee-307",
    kat: "cpp",
    tresc:
      "Który operator w języku C++ jest używany do uzyskiwania adresu zmiennej?",
    odpowiedzi: ["&amp;", "*", "&quot;&gt;&quot;", "delete"],
    poprawna: 0,
  },
  {
    id: "ee-308",
    kat: "oop",
    tresc: "Do czego służy iterator w kolekcjach?",
    odpowiedzi: [
      "Do tworzenia kopii kolekcji",
      "Do przechodzenia przez elementy kolekcji",
      "Do usuwania elementów z kolekcji",
      "Do zmiany typu kolekcji w trakcie działania programu",
    ],
    poprawna: 1,
  },
  {
    id: "ee-309",
    kat: "algo",
    tresc:
      "Który typ kolekcji umożliwia dostęp do elementów w trybie FIFO (First In First Out)?",
    odpowiedzi: ["Lista", "Stos", "Kolejka", "Wektor"],
    poprawna: 2,
  },
  {
    id: "ee-310",
    kat: "algo",
    tresc:
      "Który z poniższych typów kolekcji umożliwia dostęp do ostatnio dodanego elementu w pierwszej kolejności?",
    odpowiedzi: ["Lista", "Stos", "Kolejka", "Tablica dwuwymiarowa"],
    poprawna: 1,
  },
  {
    id: "ee-311",
    kat: "cpp",
    tresc:
      "W którym przypadku kolekcja typu lista będzie bardziej efektywna niż tablica?",
    odpowiedzi: [
      "Kiedy liczba elementów w kolekcji jest stała",
      "Kiedy liczba elementów w kolekcji dynamicznie się zmienia",
      "Kiedy chcemy uzyskać dostęp do elementów za pomocą indeksu",
      "Kiedy znamy dokładny rozmiar kolekcji przed kompilacją",
    ],
    poprawna: 1,
  },
  {
    id: "ee-312",
    kat: "testy",
    tresc:
      "Co jest kluczowym krokiem podczas projektowania zestawów danych dla problemu programistycznego?",
    odpowiedzi: [
      "Dobór odpowiednich struktur danych",
      "Implementacja algorytmu sortującego",
      "Zmiana języka programowania na bardziej efektywny",
      "Testowanie zestawów danych przed ich użyciem",
    ],
    poprawna: 0,
  },
  {
    id: "ee-313",
    kat: "algo",
    tresc:
      "Która z poniższych struktur danych najlepiej nadaje się do przechowywania niepowtarzających się elementów?",
    odpowiedzi: ["Lista", "Tablica", "Zbiór (Set)", "Kolejka priorytetowa"],
    poprawna: 2,
  },
  {
    id: "ee-314",
    kat: "algo",
    tresc:
      "Dlaczego warto używać kolekcji typu mapa (np. HashMap w Javie) przy projektowaniu zestawów danych?",
    odpowiedzi: [
      "Ze względu na szybki dostęp do elementów za pomocą klucza",
      "Bo kolekcje typu mapa zajmują mniej pamięci niż tablice",
      "Bo nie wymagają znajomości rozmiaru danych przed kompilacją",
      "Bo umożliwiają sortowanie danych bez dodatkowych operacji",
    ],
    poprawna: 0,
  },
  {
    id: "ee-315",
    kat: "testy",
    tresc:
      "Który z poniższych elementów należy uwzględnić przy projektowaniu zestawów danych?",
    odpowiedzi: [
      "Długość kodu programu",
      "Sposób alokacji pamięci dla danych",
      "Rodzaj użytego kompilatora",
      "Narzędzia do debugowania",
    ],
    poprawna: 1,
  },
  {
    id: "ee-316",
    kat: "algo",
    tresc:
      "W jakim przypadku stos będzie lepszym wyborem niż lista przy projektowaniu zestawu danych?",
    odpowiedzi: [
      "Kiedy chcemy usunąć element z końca",
      "Kiedy kolejność przetwarzania danych jest odwrócona (LIFO)",
      "Kiedy dane muszą być posortowane",
      "Kiedy zależy nam na szybkim wyszukiwaniu elementów",
    ],
    poprawna: 1,
  },
  {
    id: "ee-317",
    kat: "algo",
    tresc:
      "Która z poniższych metod najlepiej nadaje się do wizualnego przedstawienia procesu decyzyjnego?",
    odpowiedzi: [
      "Pseudokod",
      "Schemat blokowy",
      "Drzewo decyzyjne",
      "Lista kroków",
    ],
    poprawna: 2,
  },
  {
    id: "ee-318",
    kat: "algo",
    tresc:
      "Co jest zaletą wykorzystania pseudokodu podczas projektowania algorytmu?",
    odpowiedzi: [
      "Możliwość szybkiego wykonania algorytmu w dowolnym języku",
      "Łatwość w modyfikacji kodu maszynowego",
      "Zrozumiałość dla osób niezaznajomionych z programowaniem",
      "Tworzenie dynamicznych struktur danych",
    ],
    poprawna: 2,
  },
  {
    id: "ee-319",
    kat: "algo",
    tresc: "Który z poniższych algorytmów jest algorytmem iteracyjnym?",
    odpowiedzi: [
      "QuickSort",
      "BubbleSort",
      "Fibonacci (rekurencyjnie)",
      "DFS (przeszukiwanie w głąb)",
    ],
    poprawna: 1,
  },
  {
    id: "ee-320",
    kat: "algo",
    tresc: "Jaka jest główna cecha algorytmów szyfrowania symetrycznego?",
    odpowiedzi: [
      "Użycie tego samego klucza do szyfrowania i deszyfrowania",
      "Działanie bez użycia klucza",
      "Użycie różnych kluczy do szyfrowania i deszyfrowania",
      "Szyfrowanie tylko plików tekstowych",
    ],
    poprawna: 0,
  },
  {
    id: "ee-321",
    kat: "algo",
    tresc:
      "Który problem najczęściej rozwiązywany jest przy użyciu algorytmu rekurencyjnego?",
    odpowiedzi: [
      "Obliczanie sumy elementów tablicy",
      "Wyszukiwanie binarne w posortowanej tablicy",
      "Generowanie ciągu Fibonacciego",
      "Sortowanie metodą QuickSort",
    ],
    poprawna: 2,
  },
  {
    id: "ee-322",
    kat: "algo",
    tresc: "Jaka jest kluczowa cecha algorytmu rekurencyjnego?",
    odpowiedzi: [
      "Wywołuje się wielokrotnie w jednej iteracji",
      "Podzielony jest na wiele niezależnych funkcji",
      "Zawiera wywołanie samego siebie",
      "Działa tylko na tablicach dynamicznych",
    ],
    poprawna: 2,
  },
  {
    id: "ee-323",
    kat: "algo",
    tresc:
      "Które z poniższych oznaczeń określa złożoność algorytmu jako liniową?",
    odpowiedzi: ["O(1)", "O(n)", "O(n2)", "O(log n)"],
    poprawna: 1,
  },
  {
    id: "ee-324",
    kat: "algo",
    tresc: "Który algorytm charakteryzuje się złożonością O(n2)?",
    odpowiedzi: ["Binary Search", "Merge Sort", "Bubble Sort", "Dijkstra"],
    poprawna: 2,
  },
  {
    id: "ee-325",
    kat: "algo",
    tresc:
      "Który z poniższych algorytmów sortowania charakteryzuje się średnią złożonością obliczeniową O(n log n)?",
    odpowiedzi: [
      "Sortowanie przez wstawianie",
      "Sortowanie szybkie (QuickSort)",
      "Sortowanie bąbelkowe",
      "Sortowanie przez wybór",
    ],
    poprawna: 1,
  },
  {
    id: "ee-326",
    kat: "algo",
    tresc:
      "Które z poniższych typów sortowania jest najbardziej efektywne dla dużych zbiorów danych w większości przypadków?",
    odpowiedzi: [
      "Sortowanie bąbelkowe",
      "Sortowanie szybkie (QuickSort)",
      "Sortowanie przez zliczanie",
      "Sortowanie przez wstawianie",
    ],
    poprawna: 1,
  },
  {
    id: "ee-327",
    kat: "algo",
    tresc:
      "W którym przypadku algorytm sortowania bąbelkowego działa z optymalną wydajnością?",
    odpowiedzi: [
      "Dla tablicy posortowanej rosnąco",
      "Dla tablicy posortowanej malejąco",
      "Dla losowej tablicy",
      "Dla tablicy o dużej liczbie powtórzeń",
    ],
    poprawna: 0,
  },
  {
    id: "ee-328",
    kat: "algo",
    tresc:
      "Który typ sortowania wykorzystuje podejście &quot;dziel i zwyciężaj&quot;?",
    odpowiedzi: [
      "Sortowanie przez wybór",
      "Sortowanie bąbelkowe",
      "Sortowanie szybkie (QuickSort)",
      "Sortowanie przez wstawianie",
    ],
    poprawna: 2,
  },
  {
    id: "ee-329",
    kat: "algo",
    tresc:
      "Który algorytm wyszukiwania wymaga posortowanej tablicy do działania?",
    odpowiedzi: [
      "Wyszukiwanie liniowe",
      "Wyszukiwanie binarne",
      "Wyszukiwanie z hashem",
      "Wyszukiwanie sekwencyjne",
    ],
    poprawna: 1,
  },
  {
    id: "ee-330",
    kat: "algo",
    tresc:
      "Która struktura danych jest wykorzystywana w algorytmie BFS (przeszukiwanie wszerz)?",
    odpowiedzi: ["Stos", "Kolejka", "Lista", "Drzewo"],
    poprawna: 1,
  },
  {
    id: "ee-331",
    kat: "oop",
    tresc:
      "Które z poniższych funkcji są charakterystyczne dla narzędzi do zarządzania projektami?",
    odpowiedzi: [
      "Tworzenie diagramów przepływu",
      "Monitorowanie postępu prac",
      "Projektowanie interfejsu użytkownika",
      "Analiza statystyczna",
    ],
    poprawna: 1,
  },
  {
    id: "ee-332",
    kat: "testy",
    tresc: "Jakie jest główne zadanie narzędzia do zarządzania projektami?",
    odpowiedzi: [
      "Tworzenie animacji komputerowych",
      "Optymalizacja kodu programu",
      "Zarządzanie zadaniami i czasem w projekcie",
      "Tworzenie bazy danych dla projektu",
    ],
    poprawna: 2,
  },
  {
    id: "ee-333",
    kat: "cpp",
    tresc: "Co przedstawia diagram Gantta?",
    odpowiedzi: [
      "Hierarchię plików w projekcie",
      "Harmonogram zadań w projekcie",
      "Powiązania między różnymi projektami",
      "Schemat przepływu danych",
    ],
    poprawna: 1,
  },
  {
    id: "ee-334",
    kat: "sql",
    tresc:
      "Który z poniższych elementów jest typowym składnikiem diagramu Gantta?",
    odpowiedzi: [
      "Lista błędów w projekcie",
      "Oś czasu i zakresy czasowe dla zadań",
      "Model relacji między tabelami w bazie danych",
      "Lista użytkowników w systemie",
    ],
    poprawna: 1,
  },
  {
    id: "ee-335",
    kat: "testy",
    tresc:
      "Który z poniższych programów służy do zarządzania projektami przy użyciu tablic kanban?",
    odpowiedzi: ["Jira", "Trello", "Photoshop", "Word"],
    poprawna: 1,
  },
  {
    id: "ee-336",
    kat: "testy",
    tresc: "Jaką funkcję pełni program Jira?",
    odpowiedzi: [
      "Zarządzanie wersjami systemu operacyjnego",
      "Tworzenie grafik 3D",
      "Planowanie, monitorowanie i raportowanie zadań projektowych",
      "Edytowanie arkuszy kalkulacyjnych",
    ],
    poprawna: 2,
  },
  {
    id: "ee-337",
    kat: "web",
    tresc:
      "Które polecenie w Gicie służy do zapisania zmian w lokalnym repozytorium?",
    odpowiedzi: ["git push", "git commit", "git clone", "git pull"],
    poprawna: 1,
  },
  {
    id: "ee-338",
    kat: "web",
    tresc: "Co oznacza polecenie &quot;git pull&quot;?",
    odpowiedzi: [
      "Pobranie zmian zdalnego repozytorium i połączenie z lokalnym",
      "Zapisanie zmian w lokalnym repozytorium",
      "Stworzenie nowej gałęzi w repozytorium",
      "Usunięcie pliku z repozytorium",
    ],
    poprawna: 0,
  },
  {
    id: "ee-339",
    kat: "web",
    tresc: "Jakie działanie wykonuje polecenie &quot;git clone&quot;?",
    odpowiedzi: [
      "Tworzy kopię lokalną istniejącego repozytorium",
      "Łączy dwie gałęzie w repozytorium",
      "Zapisuje zmiany w historii repozytorium",
      "Usuwa repozytorium zdalne",
    ],
    poprawna: 0,
  },
  {
    id: "ee-340",
    kat: "cpp",
    tresc: "Do czego służy polecenie &quot;git merge&quot;?",
    odpowiedzi: [
      "Do pobierania zmian zdalnego repozytorium",
      "Do łączenia zmian z różnych gałęzi",
      "Do tworzenia nowego repozytorium",
      "Do usuwania zmian w repozytorium",
    ],
    poprawna: 1,
  },
  {
    id: "ee-341",
    kat: "cpp",
    tresc:
      "Co jest kluczowym krokiem podczas analizy wymagań klienta przed rozpoczęciem tworzenia projektu aplikacji?",
    odpowiedzi: [
      "Sporządzenie diagramu Gantta",
      "Zrozumienie potrzeb biznesowych i oczekiwań klienta",
      "Przydzielenie ról w zespole projektowym",
      "Wybór języka programowania",
    ],
    poprawna: 1,
  },
  {
    id: "ee-342",
    kat: "oop",
    tresc:
      "Który z elementów interfejsu użytkownika pozwala użytkownikowi wprowadzać dane tekstowe?",
    odpowiedzi: [
      "Przycisk",
      "Pole tekstowe",
      "Pasek narzędziowy",
      "Dialog wyboru pliku",
    ],
    poprawna: 1,
  },
  {
    id: "ee-343",
    kat: "bhp",
    tresc: "Czym charakteryzuje się architektura klient-serwer?",
    odpowiedzi: [
      "Komunikacja odbywa się bezpośrednio między urządzeniami klienckimi",
      "Dane są przechowywane i przetwarzane na serwerze, a klient wysyła żądania i odbiera odpowiedzi",
      "Każdy klient działa niezależnie od innych",
      "Serwer działa jako pasywny odbiornik danych od klientów",
    ],
    poprawna: 1,
  },
  {
    id: "ee-344",
    kat: "oop",
    tresc:
      "Który paradygmat programowania kładzie największy nacisk na dziedziczenie i polimorfizm?",
    odpowiedzi: [
      "Programowanie strukturalne",
      "Programowanie obiektowe",
      "Programowanie proceduralne",
      "Programowanie funkcyjne",
    ],
    poprawna: 1,
  },
  {
    id: "ee-345",
    kat: "web",
    tresc:
      "Który element specyfikacji technicznej jest kluczowy dla określenia metod ochrony danych w aplikacji?",
    odpowiedzi: [
      "Plan zarządzania zadaniami",
      "System zabezpieczeń aplikacji",
      "Opis architektury klient-serwer",
      "Projekt interfejsu użytkownika",
    ],
    poprawna: 1,
  },
  {
    id: "ee-346",
    kat: "oop",
    tresc:
      "Który z poniższych elementów interfejsu użytkownika służy do wizualnej nawigacji pomiędzy różnymi sekcjami aplikacji?",
    odpowiedzi: [
      "Lista rozwijana",
      "Pasek menu",
      "Pole tekstowe",
      "Przycisk radiowy",
    ],
    poprawna: 1,
  },
  {
    id: "ee-347",
    kat: "sql",
    tresc:
      "Jakie podejście najlepiej zastosować podczas projektowania aplikacji, która ma działać na różnych platformach?",
    odpowiedzi: [
      "Tworzenie dedykowanego kodu dla każdej platformy",
      "Zastosowanie technik responsywnego projektowania interfejsu",
      "Wyłączne dostosowanie aplikacji do systemu Windows",
      "Skupienie się wyłącznie na wyglądzie aplikacji",
    ],
    poprawna: 1,
  },
  {
    id: "ee-348",
    kat: "web",
    tresc:
      "Który z poniższych elementów jest kluczowy w architekturze klient-serwer?",
    odpowiedzi: [
      "Scentralizowane przechowywanie danych",
      "Zdalne wykonywanie aplikacji na urządzeniu klienta",
      "Brak podziału na funkcje klienta i serwera",
      "Wyłącznie komunikacja synchroniczna",
    ],
    poprawna: 0,
  },
  {
    id: "ee-349",
    kat: "oop",
    tresc:
      "Który z poniższych jest przykładem projektowania interfejsu zgodnego z zasadami user experience (UX)?",
    odpowiedzi: [
      "Przycisk umieszczony w losowym miejscu aplikacji",
      "Użycie czytelnych czcionek i intuicyjnego układu elementów",
      "Zastosowanie tylko jednego koloru w całym interfejsie",
      "Brak możliwości cofnięcia wykonanej akcji",
    ],
    poprawna: 1,
  },
  {
    id: "ee-350",
    kat: "algo",
    tresc:
      "Co należy wziąć pod uwagę przy projektowaniu struktury danych dla aplikacji?",
    odpowiedzi: [
      "Złożoność przetwarzania danych i ich optymalną organizację",
      "Wyłącznie typ języka programowania",
      "Wyłącznie wymagania sprzętowe",
      "Brak związku między strukturą danych a wydajnością aplikacji",
    ],
    poprawna: 0,
  },
  {
    id: "ee-351",
    kat: "web",
    tresc:
      "Co jest kluczowym elementem projektowania aplikacji w architekturze klient-serwer?",
    odpowiedzi: [
      "Brak rozróżnienia ról pomiędzy klientem i serwerem",
      "Użycie serwera jako centralnego miejsca przetwarzania danych",
      "Przeniesienie całości obliczeń na stronę klienta",
      "Działanie aplikacji wyłącznie w trybie offline",
    ],
    poprawna: 1,
  },
  {
    id: "ee-352",
    kat: "cpp",
    tresc:
      "Które podejście do projektowania aplikacji pozwala najlepiej uwzględnić przyszłe modyfikacje funkcjonalności?",
    odpowiedzi: [
      "Projektowanie bez wcześniejszej specyfikacji technicznej",
      "Użycie modularnej architektury aplikacji",
      "Pisanie kodu bez dokumentacji",
      "Fokus wyłącznie na wygląd aplikacji",
    ],
    poprawna: 1,
  },
  {
    id: "ee-353",
    kat: "sql",
    tresc:
      "Dlaczego dostosowanie interfejsu użytkownika do różnych platform jest ważne?",
    odpowiedzi: [
      "Umożliwia unifikację kodu bez względu na platformę",
      "Zapewnia optymalną użyteczność na każdym urządzeniu",
      "Pozwala skupić się wyłącznie na funkcjach aplikacji",
      "Eliminuje potrzebę testowania na różnych platformach",
    ],
    poprawna: 1,
  },
  {
    id: "ee-354",
    kat: "sql",
    tresc:
      "Który element projektu aplikacji jest najważniejszy dla ochrony danych użytkowników?",
    odpowiedzi: [
      "Stosowanie zaawansowanych mechanizmów bezpieczeństwa",
      "Projektowanie prostych formularzy rejestracyjnych",
      "Wykluczenie testowania aplikacji w fazie produkcji",
      "Skupienie się na estetyce interfejsu użytkownika",
    ],
    poprawna: 0,
  },
  {
    id: "ee-355",
    kat: "cpp",
    tresc:
      "W jaki sposób najlepiej przełożyć wymagania klienta na specyfikację techniczną dla zespołu programistów?",
    odpowiedzi: [
      "Sporządzając szczegółowy dokument z funkcjami i wymaganiami technicznymi",
      "Prowadząc rozmowy wyłącznie z zespołem programistów",
      "Tworząc wizualne makiety bez szczegółowych opisów",
      "Pomijając szczegółowe wymagania techniczne",
    ],
    poprawna: 0,
  },
  {
    id: "ee-356",
    kat: "cpp",
    tresc: "Który z poniższych punktów najlepiej opisuje cel projektu?",
    odpowiedzi: [
      "Określenie problemu i sposobu jego rozwiązania",
      "Przygotowanie harmonogramu działań",
      "Zidentyfikowanie technologii, które mogą być użyte",
      "Analiza postępów pracy w czasie realizacji projektu",
    ],
    poprawna: 0,
  },
  {
    id: "ee-357",
    kat: "testy",
    tresc: "Jakie są podstawowe fazy realizacji projektu programistycznego?",
    odpowiedzi: [
      "Planowanie, analiza, implementacja, wdrożenie",
      "Planowanie, projektowanie, debugowanie, konserwacja",
      "Analiza, implementacja, testowanie, aktualizacja",
      "Projektowanie, testowanie, aktualizacja, implementacja",
    ],
    poprawna: 0,
  },
  {
    id: "ee-358",
    kat: "testy",
    tresc:
      "Który z etapów cyklu życia projektu polega na określeniu wymagań użytkownika?",
    odpowiedzi: ["Planowanie", "Analiza", "Implementacja", "Testowanie"],
    poprawna: 1,
  },
  {
    id: "ee-359",
    kat: "cpp",
    tresc:
      "Co należy uwzględnić podczas planowania zasobów ludzkich w projekcie?",
    odpowiedzi: [
      "Umiejętności i doświadczenie członków zespołu",
      "Wyłącznie dostępność technologii",
      "Tylko wymagania techniczne projektu",
      "Budżet projektu, bez uwzględniania umiejętności zespołu",
    ],
    poprawna: 0,
  },
  {
    id: "ee-360",
    kat: "cpp",
    tresc:
      "Która z metodologii zarządzania projektem opiera się na iteracyjnych przyrostach?",
    odpowiedzi: [
      "Model kaskadowy (waterfall)",
      "Metodyki zwinne (Agile)",
      "Model prototypowy",
      "Model spiralny",
    ],
    poprawna: 1,
  },
  {
    id: "ee-361",
    kat: "cpp",
    tresc:
      "W której metodologii zarządzania projektem priorytetem jest minimalizacja marnotrawstwa?",
    odpowiedzi: ["Scrum", "Kanban", "Waterfall", "Prototypowy"],
    poprawna: 1,
  },
  {
    id: "ee-362",
    kat: "cpp",
    tresc:
      "Który z poniższych dokumentów najczęściej wykorzystuje się do organizacji pracy w zespole Scrum?",
    odpowiedzi: [
      "Diagram Gantta",
      "Product backlog",
      "Specyfikacja techniczna",
      "Lista zasobów ludzkich",
    ],
    poprawna: 1,
  },
  {
    id: "ee-363",
    kat: "cpp",
    tresc: "Jakie elementy powinien zawierać harmonogram projektu?",
    odpowiedzi: [
      "Tylko etapy projektu",
      "Ramy czasowe i zasoby ludzkie",
      "Tylko czas realizacji i budżet",
      "Etapy projektu, ramy czasowe, zasoby i zadania",
    ],
    poprawna: 3,
  },
  {
    id: "ee-364",
    kat: "cpp",
    tresc:
      "Który model zarządzania projektem zakłada, że każda faza jest realizowana sekwencyjnie, bez możliwości powrotu do wcześniejszych etapów?",
    odpowiedzi: [
      "Model spiralny",
      "Model przyrostowy",
      "Model kaskadowy (waterfall)",
      "Metodyki zwinne (Agile)",
    ],
    poprawna: 2,
  },
  {
    id: "ee-365",
    kat: "testy",
    tresc:
      "W której fazie cyklu życia projektu powstaje szczegółowy opis wymagań funkcjonalnych i niefunkcjonalnych?",
    odpowiedzi: ["Implementacja", "Testowanie", "Analiza", "Planowanie"],
    poprawna: 2,
  },
  {
    id: "ee-366",
    kat: "testy",
    tresc:
      "Czym charakteryzuje się model prototypowy w zarządzaniu projektami?",
    odpowiedzi: [
      "Tworzeniem pełnej wersji produktu przed testowaniem",
      "Tworzeniem niekompletnej wersji systemu do uzyskania opinii użytkownika",
      "Iteracyjnym rozwojem produktu w krótkich cyklach",
      "Planowaniem wszystkich etapów projektu przed jego rozpoczęciem",
    ],
    poprawna: 1,
  },
  {
    id: "ee-367",
    kat: "web",
    tresc:
      "Która metodologia zarządzania projektami koncentruje się na transparentności i wizualizacji pracy w toku?",
    odpowiedzi: ["Scrum", "Kanban", "Agile", "Waterfall"],
    poprawna: 1,
  },
  {
    id: "ee-368",
    kat: "cpp",
    tresc:
      "Który dokument w metodologii Agile zawiera spis funkcjonalności produktu uporządkowanych według priorytetów?",
    odpowiedzi: [
      "Backlog sprintu",
      "Product backlog",
      "Diagram Gantta",
      "Harmonogram projektu",
    ],
    poprawna: 1,
  },
  {
    id: "ee-369",
    kat: "cpp",
    tresc:
      "Która metodologia zarządzania projektami pozwala elastycznie reagować na zmieniające się wymagania klienta?",
    odpowiedzi: ["Waterfall", "Kanban", "Scrum", "Model spiralny"],
    poprawna: 2,
  },
  {
    id: "ee-370",
    kat: "testy",
    tresc: "Które z poniższych działań jest kluczowe w modelu kaskadowym?",
    odpowiedzi: [
      "Równoległa realizacja kilku faz projektu",
      "Iteracyjne wprowadzanie zmian na każdym etapie",
      "Testowanie systemu po ukończeniu każdej fazy",
      "Kończenie jednej fazy przed rozpoczęciem kolejnej",
    ],
    poprawna: 3,
  },
  {
    id: "ee-371",
    kat: "bhp",
    tresc:
      "W której fazie cyklu życia projektu informatycznego odbywa się integracja i testowanie wszystkich modułów systemu?",
    odpowiedzi: ["Planowanie", "Analiza", "Implementacja", "Wdrożenie"],
    poprawna: 2,
  },
  {
    id: "ee-372",
    kat: "oop",
    tresc:
      "Który z poniższych wzorców projektowych najlepiej nadaje się do uproszczenia interfejsu do złożonego systemu?",
    odpowiedzi: [
      "Kompozyt (Composite)",
      "Metoda szablonowa (Template method)",
      "Fasada (Facade)",
      "Singleton (Singleton)",
    ],
    poprawna: 2,
  },
  {
    id: "ee-373",
    kat: "oop",
    tresc:
      "Wzorzec projektowy &quot;Metoda szablonowa&quot; (Template method) jest używany do:",
    odpowiedzi: [
      "dzielenia obiektów na hierarchiczne struktury drzewiaste",
      "zdefiniowania szkieletu algorytmu i pozostawienia szczegółowej implementacji podklasom",
      "przechowywania obiektów w jednorodnej kolekcji",
      "centralizacji zarządzania wieloma instancjami obiektów",
    ],
    poprawna: 1,
  },
  {
    id: "ee-374",
    kat: "oop",
    tresc: "Jaki jest główny cel wzorca &quot;Kompozyt&quot; (Composite)?",
    odpowiedzi: [
      "Zapewnienie jednej klasy do zarządzania wieloma obiektami tego samego typu",
      "Pozwolenie klientom na obsługę obiektów i ich grup w jednolity sposób",
      "Zdefiniowanie interfejsu komunikacji między komponentami systemu",
      "Umożliwienie dynamicznej zmiany zachowania obiektu",
    ],
    poprawna: 1,
  },
  {
    id: "ee-375",
    kat: "oop",
    tresc:
      "Który z poniższych wzorców projektowych jest przykładem wzorca strukturalnego?",
    odpowiedzi: [
      "Metoda szablonowa (Template method)",
      "Fasada (Facade)",
      "Fabryka abstrakcyjna (Abstract Factory)",
      "Obserwator (Observer)",
    ],
    poprawna: 1,
  },
  {
    id: "ee-376",
    kat: "bhp",
    tresc:
      "Które z poniższych praw autorskich nie wygasa po określonym czasie?",
    odpowiedzi: [
      "Autorskie prawa majątkowe",
      "Autorskie prawa osobiste",
      "Prawa pokrewne",
      "Licencje wolnego oprogramowania",
    ],
    poprawna: 1,
  },
  {
    id: "ee-377",
    kat: "cpp",
    tresc:
      "Jaki jest podstawowy czas trwania autorskich praw majątkowych w Unii Europejskiej?",
    odpowiedzi: [
      "50 lat od momentu pierwszej publikacji utworu",
      "70 lat od śmierci autora",
      "75 lat od momentu powstania utworu",
      "Bezterminowo",
    ],
    poprawna: 1,
  },
  {
    id: "ee-378",
    kat: "bhp",
    tresc:
      "Która z poniższych konsekwencji może wyniknąć z naruszenia prawa autorskiego?",
    odpowiedzi: [
      "Obowiązek opublikowania przeprosin w mediach",
      "Zakaz używania oprogramowania open-source",
      "Nałożenie grzywny lub kary więzienia",
      "Unieważnienie licencji użytkownika końcowego",
    ],
    poprawna: 2,
  },
  {
    id: "ee-379",
    kat: "bhp",
    tresc:
      "Do której kategorii własności intelektualnej należą znaki towarowe?",
    odpowiedzi: [
      "Dobra niematerialne",
      "Własność przemysłowa",
      "Autorskie prawa majątkowe",
      "Prawa pokrewne",
    ],
    poprawna: 1,
  },
  {
    id: "ee-380",
    kat: "sql",
    tresc:
      "Który typ licencji pozwala na swobodne modyfikowanie i rozpowszechnianie kodu źródłowego?",
    odpowiedzi: [
      "Licencja komercyjna",
      "Licencja GNU GPL",
      "Licencja shareware",
      "Licencja OEM",
    ],
    poprawna: 1,
  },
  {
    id: "ee-381",
    kat: "bhp",
    tresc: "Czym różni się kompilator od interpretera?",
    odpowiedzi: [
      "Kompilator tłumaczy kod na język maszynowy w trakcie jego wykonywania.",
      "Kompilator tłumaczy kod źródłowy na język maszynowy przed uruchomieniem programu.",
      "Interpreter tłumaczy kod źródłowy na język maszynowy przed jego kompilacją.",
      "Interpreter generuje plik wykonywalny, który działa niezależnie od środowiska.",
    ],
    poprawna: 1,
  },
  {
    id: "ee-382",
    kat: "testy",
    tresc: "Które z poniższych zadań należy do debuggera?",
    odpowiedzi: [
      "Tłumaczenie kodu źródłowego na język maszynowy",
      "Wykrywanie błędów składniowych w trakcie kompilacji",
      "Umożliwianie analizy działania programu krok po kroku",
      "Tworzenie pliku wykonywalnego programu",
    ],
    poprawna: 2,
  },
  {
    id: "ee-383",
    kat: "testy",
    tresc:
      "Który z poniższych etapów jest charakterystyczny wyłącznie dla kompilacji kodu?",
    odpowiedzi: [
      "Tłumaczenie instrukcji w czasie rzeczywistym",
      "Generowanie pliku wykonywalnego",
      "Wykrywanie błędów logicznych w trakcie działania programu",
      "Wykonywanie kodu krok po kroku",
    ],
    poprawna: 1,
  },
  {
    id: "ee-384",
    kat: "cpp",
    tresc:
      "Które z poniższych stwierdzeń najlepiej opisuje bibliotekę w programowaniu?",
    odpowiedzi: [
      "Zestaw kodu źródłowego, który jest używany wyłącznie podczas kompilacji programu.",
      "Zestaw funkcji i klas, które można wykorzystywać w programach.",
      "Plik wykonywalny, który działa jako niezależny program.",
      "Zbiór zmiennych globalnych dostępnych w trakcie działania programu.",
    ],
    poprawna: 1,
  },
  {
    id: "ee-385",
    kat: "testy",
    tresc: "Co jest wynikiem działania kompilatora?",
    odpowiedzi: [
      "Plik źródłowy w języku wyższego poziomu",
      "Plik maszynowy gotowy do uruchomienia",
      "Lista błędów występujących w kodzie",
      "Zestaw instrukcji w języku pośrednim",
    ],
    poprawna: 1,
  },
  {
    id: "ee-386",
    kat: "cpp",
    tresc: "Które z poniższych zdań najlepiej opisuje etap interpretacji kodu?",
    odpowiedzi: [
      "Tłumaczenie kodu źródłowego na język maszynowy w czasie rzeczywistym",
      "Generowanie pliku wykonywalnego",
      "Analiza struktury kodu przed tłumaczeniem",
      "Tworzenie bibliotek dynamicznych dla programu",
    ],
    poprawna: 0,
  },
  {
    id: "ee-387",
    kat: "testy",
    tresc: "Do czego służy debugger w procesie programowania?",
    odpowiedzi: [
      "Do tłumaczenia kodu źródłowego na język maszynowy",
      "Do analizy błędów podczas działania programu",
      "Do automatycznego tworzenia dokumentacji projektu",
      "Do zarządzania wersjami kodu źródłowego",
    ],
    poprawna: 1,
  },
  {
    id: "ee-388",
    kat: "oop",
    tresc:
      "Czym charakteryzuje się biblioteka statyczna w porównaniu do dynamicznej?",
    odpowiedzi: [
      "Jest ładowana do pamięci podczas działania programu.",
      "Jest dołączana do pliku wykonywalnego podczas kompilacji.",
      "Nie wymaga obecności pliku wykonywalnego.",
      "Może być modyfikowana w trakcie działania programu.",
    ],
    poprawna: 1,
  },
  {
    id: "ee-389",
    kat: "cpp",
    tresc:
      "Które z poniższych stwierdzeń najlepiej opisuje etap uruchamiania programu?",
    odpowiedzi: [
      "Tworzenie pliku źródłowego",
      "Wykonywanie kodu źródłowego przez kompilator",
      "Wykonywanie programu na podstawie przetłumaczonego kodu maszynowego",
      "Tłumaczenie kodu źródłowego na język pośredni",
    ],
    poprawna: 2,
  },
  {
    id: "ee-390",
    kat: "testy",
    tresc: "Który z poniższych elementów NIE należy do etapu kompilacji?",
    odpowiedzi: [
      "Optymalizacja kodu",
      "Tłumaczenie kodu źródłowego na język maszynowy",
      "Analiza działania programu w czasie rzeczywistym",
      "Weryfikacja błędów składniowych",
    ],
    poprawna: 2,
  },
  {
    id: "ee-391",
    kat: "cpp",
    tresc: "Który z poniższych opisów najlepiej charakteryzuje kompilator?",
    odpowiedzi: [
      "Narzędzie służące do analizy kodu w czasie rzeczywistym",
      "Narzędzie zamieniające kod źródłowy na plik wykonywalny",
      "Program łączący dynamiczne biblioteki z kodem źródłowym",
      "System śledzący zmiany w kodzie źródłowym",
    ],
    poprawna: 1,
  },
  {
    id: "ee-392",
    kat: "bhp",
    tresc: "Jaką funkcję pełni interpreter w środowisku programistycznym?",
    odpowiedzi: [
      "Tłumaczy kod źródłowy na język maszynowy podczas działania programu",
      "Tworzy plik wykonywalny dla systemu operacyjnego",
      "Łączy kod źródłowy z bibliotekami zewnętrznymi",
      "Optymalizuje działanie aplikacji w środowisku produkcyjnym",
    ],
    poprawna: 0,
  },
  {
    id: "ee-393",
    kat: "oop",
    tresc: "Która z poniższych cech najlepiej opisuje biblioteki dynamiczne?",
    odpowiedzi: [
      "Są ładowane w czasie kompilacji",
      "Są ładowane w czasie działania programu",
      "Zawierają kod źródłowy programu",
      "Są statycznie dołączane do pliku wykonywalnego",
    ],
    poprawna: 1,
  },
  {
    id: "ee-394",
    kat: "testy",
    tresc: "Czym różni się etap kompilacji od interpretacji kodu?",
    odpowiedzi: [
      "Kompilacja wymaga debuggera, a interpretacja nie",
      "Kompilacja tłumaczy cały kod źródłowy przed uruchomieniem, a interpretacja tłumaczy kod na bieżąco",
      "Kompilacja jest używana wyłącznie w programowaniu obiektowym",
      "Interpretacja pozwala na tworzenie bibliotek dynamicznych, kompilacja na statyczne",
    ],
    poprawna: 1,
  },
  {
    id: "ee-395",
    kat: "testy",
    tresc:
      "Które narzędzie najlepiej nadaje się do wyszukiwania błędów w czasie wykonywania programu?",
    odpowiedzi: ["Debugger", "Kompilator", "Interpreter", "Linker"],
    poprawna: 0,
  },
  {
    id: "ee-396",
    kat: "testy",
    tresc:
      "Które stwierdzenie najlepiej opisuje cel dzielenia programu na funkcje (metody)?",
    odpowiedzi: [
      "Pozwala na skrócenie kodu poprzez usunięcie wszystkich komentarzy",
      "Ułatwia debugowanie oraz ponowne użycie fragmentów kodu",
      "Zapewnia automatyczną kompilację programu",
      "Eliminuje konieczność używania zmiennych globalnych",
    ],
    poprawna: 1,
  },
  {
    id: "ee-397",
    kat: "bhp",
    tresc:
      "W jakim przypadku stosowanie rekurencji może być bardziej efektywne od iteracji?",
    odpowiedzi: [
      "Gdy liczba iteracji przekracza maksymalny zakres zmiennej licznikowej",
      "Gdy algorytm wymaga naturalnego podziału na mniejsze podproblemy",
      "Gdy program działa w środowisku wielowątkowym",
      "Gdy kod źródłowy ma zostać zoptymalizowany dla kompilatorów starszych generacji",
    ],
    poprawna: 1,
  },
  {
    id: "ee-398",
    kat: "algo",
    tresc: "Który z poniższych algorytmów najczęściej stosuje rekurencję?",
    odpowiedzi: [
      "Sortowanie bąbelkowe",
      "Obliczanie liczb Fibonacciego",
      "Wyszukiwanie liniowe",
      "Sortowanie przez wstawianie",
    ],
    poprawna: 1,
  },
  {
    id: "ee-399",
    kat: "testy",
    tresc: "Co należy zrobić, aby zapobiec nieskończonej rekurencji w funkcji?",
    odpowiedzi: [
      "Zwiększyć zakres zmiennych globalnych",
      "Dodać warunek stopu w funkcji",
      "Użyć iteracji zamiast rekurencji",
      "Skorzystać z automatycznego debuggera w kompilatorze",
    ],
    poprawna: 1,
  },
  {
    id: "ee-400",
    kat: "algo",
    tresc:
      "Który z wymienionych algorytmów może być zaimplementowany zarówno iteracyjnie, jak i rekurencyjnie?",
    odpowiedzi: [
      "Algorytm wyszukiwania binarnego",
      "Algorytm sortowania bąbelkowego",
      "Algorytm mapowania kluczy w tablicach asocjacyjnych",
      "Algorytm generowania liczb losowych",
    ],
    poprawna: 0,
  },
  {
    id: "ee-401",
    kat: "cpp",
    tresc: "Co oznacza deklaracja zmiennej w programowaniu?",
    odpowiedzi: [
      "Utworzenie nowej wartości w bazie danych",
      "Określenie typu i nazwy zmiennej w kodzie programu",
      "Przypisanie zmiennej wartości domyślnej",
      "Zarezerwowanie miejsca w pamięci dla wyników operacji arytmetycznych",
    ],
    poprawna: 1,
  },
  {
    id: "ee-402",
    kat: "cpp",
    tresc:
      "Który z poniższych przykładów przedstawia poprawną deklarację zmiennej typu całkowitego w języku C++?",
    odpowiedzi: [
      "int liczba;",
      "float liczba;",
      "char liczba;",
      "bool liczba;",
    ],
    poprawna: 0,
  },
  {
    id: "ee-403",
    kat: "cpp",
    tresc:
      "Która operacja logiczna zwróci wynik &quot;true&quot;, jeśli obie zmienne są równe?",
    odpowiedzi: ["x && y", "x || y", "x == y", "x != y"],
    poprawna: 2,
  },
  {
    id: "ee-404",
    kat: "cpp",
    tresc:
      "Który z poniższych przykładów przedstawia deklarację typu złożonego w języku C++?",
    odpowiedzi: [
      "class Student {};",
      "bool status;",
      "int wynik = 100;",
      "float ocena = 4.5;",
    ],
    poprawna: 0,
  },
  {
    id: "ee-405",
    kat: "cpp",
    tresc: "Co oznacza &quot;operacja wejścia&quot; w programowaniu?",
    odpowiedzi: [
      "Przekazywanie danych do programu z zewnętrznego źródła",
      "Dodawanie nowych funkcji do programu",
      "Modyfikowanie wartości zmiennych globalnych",
      "Usuwanie błędów w kodzie programu",
    ],
    poprawna: 0,
  },
  {
    id: "ee-406",
    kat: "cpp",
    tresc: "Co oznacza operator &quot;==&quot; w języku C++?",
    odpowiedzi: [
      "Przypisanie wartości do zmiennej",
      "Porównanie dwóch wartości",
      "Negacja logiczna",
      "Zwiększenie wartości zmiennej o 1",
    ],
    poprawna: 1,
  },
  {
    id: "ee-407",
    kat: "cpp",
    tresc:
      "Który operator w Pythonie służy do sprawdzania przynależności elementu do listy?",
    odpowiedzi: ["==", "in", "is", "and"],
    poprawna: 1,
  },
  {
    id: "ee-408",
    kat: "testy",
    tresc:
      "Która instrukcja w języku C++ pozwala na wielokrotne wykonanie tego samego fragmentu kodu?",
    odpowiedzi: ["if", "while", "break", "switch"],
    poprawna: 1,
  },
  {
    id: "ee-409",
    kat: "bhp",
    tresc:
      "Która z poniższych bibliotek jest częścią standardowego środowiska programistycznego w Pythonie?",
    odpowiedzi: ["&lt;math.h&gt;", "sys", "&lt;stdio.h&gt;", "vector"],
    poprawna: 1,
  },
  {
    id: "ee-410",
    kat: "cpp",
    tresc: "Co oznacza operator &quot;|&quot; w języku C++?",
    odpowiedzi: [
      "Logiczne &quot;lub&quot;",
      "Bitowe &quot;lub&quot;",
      "Bitowe &quot;xor&quot;",
      "Operację przesunięcia bitowego w prawo",
    ],
    poprawna: 1,
  },
  {
    id: "ee-411",
    kat: "oop",
    tresc:
      "Jak nazywa się proces, w którym obiekt dziedziczy cechy innej klasy w programowaniu obiektowym?",
    odpowiedzi: ["Polimorfizm", "Hermetyzacja", "Dziedziczenie", "Abstrakcja"],
    poprawna: 2,
  },
  {
    id: "ee-412",
    kat: "oop",
    tresc:
      "Które z poniższych jest przykładem hermetyzacji w programowaniu obiektowym?",
    odpowiedzi: [
      "Użycie klasy bazowej w innej klasie",
      "Ograniczenie dostępu do pól klasy za pomocą modyfikatorów dostępu",
      "Definiowanie wielu metod o tej samej nazwie w różnych klasach",
      "Tworzenie klasy abstrakcyjnej",
    ],
    poprawna: 1,
  },
  {
    id: "ee-413",
    kat: "oop",
    tresc: "Czym jest polimorfizm w programowaniu obiektowym?",
    odpowiedzi: [
      "Umożliwia tworzenie obiektów z wielu klas jednocześnie",
      "Pozwala jednej metodzie działać w różny sposób w zależności od klasy, której jest częścią",
      "Dzieli program na klasy i obiekty",
      "Ogranicza dostęp do pól klasy",
    ],
    poprawna: 1,
  },
  {
    id: "ee-414",
    kat: "oop",
    tresc:
      "Który z poniższych terminów oznacza &quot;zmienną klasy&quot; w programowaniu obiektowym?",
    odpowiedzi: ["Pole", "Obiekt", "Metoda", "Konstruktor"],
    poprawna: 0,
  },
  {
    id: "ee-415",
    kat: "sql",
    tresc: "Jakie podejście wykorzystuje programowanie obiektowe?",
    odpowiedzi: [
      "Dzielenie kodu na funkcje i procedury",
      "Tworzenie aplikacji opartej na relacyjnych bazach danych",
      "Rozwiązywanie problemów poprzez modelowanie ich za pomocą klas i obiektów",
      "Stosowanie wyłącznie algorytmów heurystycznych",
    ],
    poprawna: 2,
  },
  {
    id: "ee-416",
    kat: "oop",
    tresc: "Jaką rolę pełnią pola klasy w programowaniu obiektowym?",
    odpowiedzi: [
      "Przechowują wartości lokalne w metodach",
      "Definiują stałe globalne programu",
      "Przechowują dane opisujące stan obiektu",
      "Pozwalają na wykonywanie operacji na obiektach",
    ],
    poprawna: 2,
  },
  {
    id: "ee-417",
    kat: "oop",
    tresc:
      "Który modyfikator dostępu pozwala na dostęp do pól klasy wyłącznie z jej metod?",
    odpowiedzi: ["Public", "Private", "Protected", "Static"],
    poprawna: 1,
  },
  {
    id: "ee-418",
    kat: "oop",
    tresc: "Co jest głównym zadaniem konstruktora w klasie?",
    odpowiedzi: [
      "Usuwanie obiektów",
      "Inicjalizacja obiektu podczas jego tworzenia",
      "Przypisanie wartości do pól obiektu po jego zniszczeniu",
      "Dodanie nowej metody do istniejącej klasy",
    ],
    poprawna: 1,
  },
  {
    id: "ee-419",
    kat: "testy",
    tresc: "Jakie zadanie pełni destruktor w klasie?",
    odpowiedzi: [
      "Tworzy nowe obiekty klasy",
      "Inicjalizuje pola klasy",
      "Usuwa obiekty i zwalnia zasoby",
      "Przeprowadza testy jednostkowe klasy",
    ],
    poprawna: 2,
  },
  {
    id: "ee-420",
    kat: "oop",
    tresc:
      "Który z poniższych terminów najlepiej opisuje składnik statyczny klasy?",
    odpowiedzi: [
      "Pole lub metoda, która należy do klasy, a nie do jej obiektów",
      "Metoda z dostępem ograniczonym do tej samej klasy",
      "Funkcja, która wywołuje destruktor klasy",
      "Zmienna lokalna wewnątrz klasy",
    ],
    poprawna: 0,
  },
  {
    id: "ee-421",
    kat: "oop",
    tresc:
      "Która metoda klasy jest wywoływana automatycznie przy tworzeniu kopii obiektu?",
    odpowiedzi: [
      "Metoda statyczna",
      "Konstruktor kopiujący",
      "Destruktor",
      "Metoda zaprzyjaźniona",
    ],
    poprawna: 1,
  },
  {
    id: "ee-422",
    kat: "oop",
    tresc:
      "Które z poniższych pól klasy może być dostępne tylko w ramach tej klasy oraz jej klas pochodnych?",
    odpowiedzi: ["Public", "Private", "Protected", "Static"],
    poprawna: 2,
  },
  {
    id: "ee-423",
    kat: "oop",
    tresc:
      "Które stwierdzenie najlepiej opisuje funkcję zaprzyjaźnioną w klasie?",
    odpowiedzi: [
      "Funkcja, która jest wywoływana automatycznie po utworzeniu obiektu",
      "Funkcja, która ma dostęp do prywatnych pól i metod klasy, której jest zaprzyjaźniona",
      "Funkcja, która umożliwia dziedziczenie wielokrotne",
      "Funkcja, która jest statyczna i nie może modyfikować pól klasy",
    ],
    poprawna: 1,
  },
  {
    id: "ee-424",
    kat: "testy",
    tresc:
      "Który z poniższych elementów jest niezbędny, aby zainicjować pole klasy podczas tworzenia obiektu?",
    odpowiedzi: [
      "Metoda statyczna",
      "Konstruktor",
      "Funkcja zaprzyjaźniona",
      "Instrukcja warunkowa",
    ],
    poprawna: 1,
  },
  {
    id: "ee-425",
    kat: "oop",
    tresc: "Czym różni się konstruktor od zwykłej metody klasy?",
    odpowiedzi: [
      "Konstruktor musi zwracać wartość",
      "Konstruktor ma zawsze tę samą nazwę co klasa i nie zwraca wartości",
      "Konstruktor może być wywoływany bez tworzenia obiektu",
      "Konstruktor jest wywoływany tylko przez destruktor",
    ],
    poprawna: 1,
  },
  {
    id: "ee-426",
    kat: "oop",
    tresc:
      "Który modyfikator pozwala na dostęp do składowej klasy z dowolnego miejsca w programie?",
    odpowiedzi: ["Public", "Private", "Protected", "Static"],
    poprawna: 0,
  },
  {
    id: "ee-427",
    kat: "oop",
    tresc:
      "Które z poniższych stwierdzeń najlepiej opisuje klasę dziedziczoną?",
    odpowiedzi: [
      "Klasa, która korzysta z pól i metod innej klasy bez ich ponownego definiowania",
      "Klasa, która dzieli swoje pola z klasami zaprzyjaźnionymi",
      "Klasa, która nie może zawierać konstruktorów ani destruktorów",
      "Klasa, która pozwala na wielokrotne dziedziczenie pól prywatnych",
    ],
    poprawna: 0,
  },
  {
    id: "ee-428",
    kat: "oop",
    tresc:
      "Które z poniższych działań można wykonać przy użyciu składnika statycznego klasy?",
    odpowiedzi: [
      "Przechowywanie wartości wspólnych dla wszystkich obiektów klasy",
      "Tworzenie prywatnych kopii pól dla każdego obiektu",
      "Dzielenie pól klasy pomiędzy klasy zaprzyjaźnione",
      "Wywołanie destruktora klasy bez jej usuwania",
    ],
    poprawna: 0,
  },
  {
    id: "ee-429",
    kat: "oop",
    tresc:
      "Które z poniższych pól klasy można zainicjować przed utworzeniem obiektu?",
    odpowiedzi: [
      "Pole prywatne",
      "Pole statyczne",
      "Pole chronione",
      "Pole publiczne",
    ],
    poprawna: 1,
  },
  {
    id: "ee-430",
    kat: "oop",
    tresc: "Jakie jest główne zadanie funkcji zaprzyjaźnionej w klasie?",
    odpowiedzi: [
      "Dodawanie nowych obiektów do klasy",
      "Umożliwienie funkcji dostępu do prywatnych składowych klasy",
      "Tworzenie kopii pól obiektu w innej klasie",
      "Ograniczenie zakresu widoczności pól klasy",
    ],
    poprawna: 1,
  },
  {
    id: "ee-431",
    kat: "oop",
    tresc:
      "Który rodzaj funkcji jest definiowany poza klasą, ale ma dostęp do jej prywatnych i chronionych składowych?",
    odpowiedzi: [
      "Konstruktor",
      "Funkcja zaprzyjaźniona",
      "Metoda statyczna",
      "Destruktor",
    ],
    poprawna: 1,
  },
  {
    id: "ee-432",
    kat: "oop",
    tresc:
      'Co oznacza termin "klasa zaprzyjaźniona" w programowaniu obiektowym?',
    odpowiedzi: [
      "Klasa, która może być dziedziczona przez inne klasy",
      "Klasa, której wszystkie składowe są publiczne",
      "Klasa, która ma dostęp do prywatnych i chronionych składowych innej klasy",
      "Klasa, która nie może zawierać metod statycznych",
    ],
    poprawna: 2,
  },
  {
    id: "ee-433",
    kat: "oop",
    tresc: "Jaką funkcję pełni składnik statyczny klasy?",
    odpowiedzi: [
      "Umożliwia dynamiczne tworzenie nowych metod",
      "Utrzymuje wspólną wartość dla wszystkich obiektów tej klasy",
      "Ogranicza dostęp do metod publicznych klasy",
      "Automatycznie usuwa obiekty klasy po zakończeniu programu",
    ],
    poprawna: 1,
  },
  {
    id: "ee-434",
    kat: "cpp",
    tresc:
      "Który z poniższych elementów NIE jest wymagany do utworzenia klasy w C++?",
    odpowiedzi: [
      "Deklaracja pól klasy",
      "Definicja destruktora",
      "Definicja metod klasy",
      "Użycie słowa kluczowego class",
    ],
    poprawna: 1,
  },
  {
    id: "ee-435",
    kat: "oop",
    tresc: "Które z poniższych jest cechą klasy statycznej?",
    odpowiedzi: [
      "Nie może zawierać zmiennych ani metod",
      "Może zawierać tylko statyczne pola i metody",
      "Może być dziedziczona przez klasy pochodne",
      "Jest automatycznie usuwana po zakończeniu programu",
    ],
    poprawna: 1,
  },
  {
    id: "ee-436",
    kat: "oop",
    tresc: "Jak definiuje się konstruktor kopiujący w klasie?",
    odpowiedzi: [
      "Tworzy nowy obiekt klasy bez przypisania wartości",
      "Tworzy nowy obiekt jako dokładną kopię innego obiektu",
      "Tworzy obiekt klasy na podstawie klasy pochodnej",
      "Tworzy nowy obiekt i usuwa poprzedni",
    ],
    poprawna: 1,
  },
  {
    id: "ee-437",
    kat: "oop",
    tresc:
      'Co oznacza termin "hierarchia dziedziczenia" w programowaniu obiektowym?',
    odpowiedzi: [
      "Zestaw klas, które nie mają wspólnego powiązania",
      "Organizacja klas w strukturę, w której klasy pochodne dziedziczą właściwości od klas bazowych",
      "Zbiór metod i pól o tym samym modyfikatorze dostępu",
      "Struktura klas, która ogranicza wielokrotne dziedziczenie",
    ],
    poprawna: 1,
  },
  {
    id: "ee-438",
    kat: "oop",
    tresc:
      "Które z poniższych pól należy umieścić w klasie bazowej w hierarchii dziedziczenia?",
    odpowiedzi: [
      "Pola, które są specyficzne tylko dla jednej klasy pochodnej",
      "Pola, które są wspólne dla wszystkich klas pochodnych",
      "Pola, które są wyłącznie prywatne",
      "Pola, które są używane tylko w metodach statycznych",
    ],
    poprawna: 1,
  },
  {
    id: "ee-439",
    kat: "oop",
    tresc: "Który z poniższych elementów jest cechą klasy pochodnej?",
    odpowiedzi: [
      "Nie może dodawać nowych metod",
      "Dziedziczy pola i metody z klasy bazowej",
      "Jest automatycznie usuwana po zakończeniu programu",
      "Nie może być używana w hierarchii dziedziczenia",
    ],
    poprawna: 1,
  },
  {
    id: "ee-440",
    kat: "oop",
    tresc: "Co to jest klasa abstrakcyjna?",
    odpowiedzi: [
      "Klasa, która nie może mieć żadnych metod",
      "Klasa, która może zawierać zarówno metody zdefiniowane, jak i niezdefiniowane (czysto wirtualne)",
      "Klasa, która zawsze dziedziczy z klasy pochodnej",
      "Klasa, która może być dziedziczona, ale nie może być instancjonowana",
    ],
    poprawna: 1,
  },
  {
    id: "ee-441",
    kat: "oop",
    tresc: "Które z poniższych stwierdzeń najlepiej opisuje metodę wirtualną?",
    odpowiedzi: [
      "Metoda, która może być wywoływana tylko przez klasę bazową",
      "Metoda, która może być przesłonięta w klasie pochodnej",
      "Metoda, która działa tylko dla statycznych pól klasy",
      "Metoda, która jest zawsze używana w konstruktorach klasy",
    ],
    poprawna: 1,
  },
  {
    id: "ee-442",
    kat: "cpp",
    tresc:
      "Jakie słowo kluczowe w języku C++ jest używane do oznaczenia klasy bazowej?",
    odpowiedzi: ["class", "public", "virtual", "base"],
    poprawna: 0,
  },
  {
    id: "ee-443",
    kat: "oop",
    tresc:
      'Co oznacza termin "przesłanianie metody" w programowaniu obiektowym?',
    odpowiedzi: [
      "Definiowanie nowej metody w klasie bazowej",
      "Użycie tej samej nazwy metody w klasie bazowej i pochodnej, ale z inną implementacją w klasie pochodnej",
      "Zamiana metody prywatnej na metodę publiczną",
      "Kopiowanie metod z jednej klasy do innej",
    ],
    poprawna: 1,
  },
  {
    id: "ee-444",
    kat: "oop",
    tresc:
      "Który z poniższych terminów odnosi się do klasy, która jest podstawą dla innych klas, ale nie może być instancjonowana?",
    odpowiedzi: [
      "Klasa statyczna",
      "Klasa abstrakcyjna",
      "Klasa pochodna",
      "Klasa finalna",
    ],
    poprawna: 1,
  },
  {
    id: "ee-445",
    kat: "oop",
    tresc: "Które z poniższych jest przykładem hierarchii dziedziczenia?",
    odpowiedzi: [
      "Klasa Pojazd dziedziczy po klasie Samochód",
      "Klasa Samochód dziedziczy po klasie Pojazd",
      "Klasa Pojazd nie dziedziczy po żadnej klasie",
      "Klasa Samochód i Pojazd nie są powiązane",
    ],
    poprawna: 1,
  },
  {
    id: "ee-446",
    kat: "oop",
    tresc: "Jakie jest główne zastosowanie metod wirtualnych?",
    odpowiedzi: [
      "Umożliwienie dynamicznego wiązania metod w czasie wykonania",
      "Umożliwienie korzystania z metod bezpośrednio z klasy bazowej",
      "Zapewnienie, że metoda działa wyłącznie na danych statycznych",
      "Umożliwienie wielokrotnego dziedziczenia",
    ],
    poprawna: 0,
  },
  {
    id: "ee-447",
    kat: "oop",
    tresc: "Które z poniższych stwierdzeń najlepiej opisuje klasę bazową?",
    odpowiedzi: [
      "Klasa, która dziedziczy po klasie pochodnej",
      "Klasa, która dostarcza wspólne pola i metody dla klas pochodnych",
      "Klasa, która zawsze zawiera metody wirtualne",
      "Klasa, która nie może być dziedziczona",
    ],
    poprawna: 1,
  },
  {
    id: "ee-448",
    kat: "cpp",
    tresc: "Które słowa kluczowe są używane w języku C++ do obsługi wyjątków?",
    odpowiedzi: [
      "try i catch",
      "throw i handle",
      "except i finally",
      "try i raise",
    ],
    poprawna: 0,
  },
  {
    id: "ee-449",
    kat: "testy",
    tresc: "Jaka jest funkcja instrukcji throw w języku C++?",
    odpowiedzi: [
      "Tworzy nowy wyjątek w trakcie działania programu",
      "Zgłasza wyjątek, który może być przechwycony przez blok catch",
      "Kończy działanie programu, jeśli wystąpi wyjątek",
      "Ogranicza zakres zmiennych w bloku try",
    ],
    poprawna: 1,
  },
  {
    id: "ee-450",
    kat: "testy",
    tresc:
      "Co dzieje się, gdy wyjątek nie zostanie przechwycony przez blok catch?",
    odpowiedzi: [
      "Program kontynuuje działanie z pominięciem błędu",
      "Wyjątek zostanie zignorowany przez kompilator",
      "Program zakończy działanie z błędem",
      "Instrukcja throw zostanie automatycznie usunięta",
    ],
    poprawna: 2,
  },
  {
    id: "ee-451",
    kat: "cpp",
    tresc:
      "Który z poniższych przykładów przedstawia poprawny szkielet obsługi wyjątków w języku C++?",
    odpowiedzi: [
      "try { kod } handle { obsługa }",
      "try { kod } catch { obsługa }",
      "try { kod } except { obsługa }",
      "try { kod } finally { obsługa }",
    ],
    poprawna: 1,
  },
  {
    id: "ee-452",
    kat: "cpp",
    tresc:
      "Który z poniższych błędów wykonania aplikacji można obsłużyć za pomocą wyjątków?",
    odpowiedzi: [
      "Błąd składniowy",
      "Błąd dzielenia przez zero",
      "Błąd kompilacji",
      "Niezgodność typów danych w kodzie",
    ],
    poprawna: 1,
  },
  {
    id: "ee-453",
    kat: "oop",
    tresc: "Co należy zrobić, aby zdefiniować własny wyjątek w języku C++?",
    odpowiedzi: [
      "Użyć standardowej funkcji obsługi błędów",
      "Stworzyć klasę dziedziczącą po std::exception",
      "Zastosować blok try z pustym blokiem catch",
      "Wywołać funkcję throw automatycznie",
    ],
    poprawna: 1,
  },
  {
    id: "ee-454",
    kat: "bhp",
    tresc:
      "Które z poniższych jest przykładem zagrożenia fizycznego w środowisku pracy?",
    odpowiedzi: [
      "Przeciążenie psychiczne",
      "Promieniowanie UV",
      "Złe relacje w zespole",
      "Brak ergonomicznych stanowisk pracy",
    ],
    poprawna: 1,
  },
  {
    id: "ee-455",
    kat: "cpp",
    tresc: "Jakie mogą być skutki długotrwałego hałasu w miejscu pracy?",
    odpowiedzi: [
      "Zmniejszenie ostrości widzenia",
      "Uszkodzenie słuchu i zmęczenie",
      "Choroby skóry",
      "Zwiększenie wydajności pracy",
    ],
    poprawna: 1,
  },
  {
    id: "ee-456",
    kat: "cpp",
    tresc:
      "Który z poniższych czynników może być sklasyfikowany jako psychofizyczny?",
    odpowiedzi: [
      "Promieniowanie elektromagnetyczne",
      "Stres i monotonia pracy",
      "Zanieczyszczenie powietrza",
      "Nadmiar światła w miejscu pracy",
    ],
    poprawna: 1,
  },
  {
    id: "ee-457",
    kat: "bhp",
    tresc:
      "Jakie mogą być skutki oddziaływania monotonnego środowiska pracy na organizm człowieka?",
    odpowiedzi: [
      "Zwiększenie poziomu motywacji",
      "Zmniejszenie koncentracji i ryzyko błędów",
      "Poprawa kondycji fizycznej",
      "Zwiększenie odporności na stres",
    ],
    poprawna: 1,
  },
  {
    id: "ee-458",
    kat: "cpp",
    tresc: "Czym jest choroba zawodowa?",
    odpowiedzi: [
      "Każdą chorobą, która pojawia się w trakcie zatrudnienia",
      "Chorobą spowodowaną warunkami pracy lub związanymi z nią czynnikami",
      "Stanem zdrowia, który uniemożliwia wykonywanie pracy przez okres krótszy niż tydzień",
      "Chorobą występującą wyłącznie w sektorze przemysłowym",
    ],
    poprawna: 1,
  },
  {
    id: "ee-459",
    kat: "bhp",
    tresc: "Jak definiuje się wypadek przy pracy?",
    odpowiedzi: [
      "Każde zdarzenie, które powoduje opóźnienie w realizacji zadań",
      "Nagłe zdarzenie związane z pracą, powodujące uraz lub śmierć",
      "Każde zdarzenie wymagające pomocy technicznej w miejscu pracy",
      "Każdy incydent spowodowany działaniem osób trzecich",
    ],
    poprawna: 1,
  },
  {
    id: "ee-460",
    kat: "bhp",
    tresc: "Które z poniższych jest przykładem środka ochrony zbiorowej?",
    odpowiedzi: [
      "Zatyczki do uszu",
      "Ekran akustyczny",
      "Okulary ochronne",
      "Kask ochronny",
    ],
    poprawna: 1,
  },
  {
    id: "ee-461",
    kat: "cpp",
    tresc:
      "Który środek ochrony najlepiej zabezpiecza przed hałasem w pracy biurowej?",
    odpowiedzi: [
      "Maty antypoślizgowe",
      "Wygłuszające panele akustyczne",
      "Zamknięte okna",
      "Lampy biurowe o niskim natężeniu światła",
    ],
    poprawna: 1,
  },
  {
    id: "ee-462",
    kat: "bhp",
    tresc:
      "Jakie powinno być minimalne natężenie oświetlenia na stanowisku pracy biurowej?",
    odpowiedzi: ["100 lx", "200 lx", "500 lx", "800 lx"],
    poprawna: 2,
  },
  {
    id: "ee-463",
    kat: "bhp",
    tresc:
      "Które z poniższych rozwiązań zapobiega porażeniom prądem w pracy biurowej?",
    odpowiedzi: [
      "Regularne testowanie instalacji elektrycznych",
      "Użycie ergonomicznych foteli",
      "Monitorowanie jakości powietrza",
      "Używanie ekranów LCD",
    ],
    poprawna: 0,
  },
  {
    id: "ee-464",
    kat: "bhp",
    tresc:
      "Co należy zrobić, aby zapobiec pogorszeniu wzroku podczas pracy przy komputerze?",
    odpowiedzi: [
      "Stosować filtry przeciwodblaskowe na monitorze",
      "Używać słuchawek redukujących hałas",
      "Utrzymywać stałą temperaturę w pomieszczeniu",
      "Stosować ergonomiczne podkładki pod nadgarstki",
    ],
    poprawna: 0,
  },
  {
    id: "ee-465",
    kat: "bhp",
    tresc:
      "Które środki ochrony zbiorowej najlepiej zapobiegają pogorszeniu kręgosłupa w pracy biurowej?",
    odpowiedzi: [
      "Używanie regulowanych foteli i biurek",
      "Ustawianie monitorów na poziomie oczu",
      "Dostosowanie natężenia światła w biurze",
      "Zmniejszenie natężenia hałasu w pomieszczeniu",
    ],
    poprawna: 0,
  },
  {
    id: "ee-466",
    kat: "bhp",
    tresc:
      "Który z poniższych objawów może wskazywać na nagłe zagrożenie zdrowotne?",
    odpowiedzi: [
      "Zwiększona wydajność pracy",
      "Ostry ból w klatce piersiowej",
      "Zwiększona potliwość w gorącym pomieszczeniu",
      "Obniżony nastrój w ciągu dnia",
    ],
    poprawna: 1,
  },
  {
    id: "ee-467",
    kat: "cpp",
    tresc:
      "Co należy zrobić w pierwszej kolejności, oceniając stan poszkodowanego?",
    odpowiedzi: [
      "Zapewnić sobie bezpieczeństwo",
      "Podjąć resuscytację krążeniowo-oddechową",
      "Sprawdzić obecność krwawienia",
      "Wezwać karetkę pogotowia",
    ],
    poprawna: 0,
  },
  {
    id: "ee-468",
    kat: "bhp",
    tresc: "Jakie jest kluczowe działanie w zabezpieczeniu miejsca wypadku?",
    odpowiedzi: [
      "Zapewnienie stabilności ciała poszkodowanego",
      "Usunięcie niebezpiecznych przedmiotów z otoczenia",
      "Zapewnienie odpowiedniego oświetlenia",
      "Użycie sterylnych materiałów opatrunkowych",
    ],
    poprawna: 1,
  },
  {
    id: "ee-469",
    kat: "cpp",
    tresc:
      "W jakiej sytuacji należy ułożyć poszkodowanego w pozycji bezpiecznej?",
    odpowiedzi: [
      "Kiedy poszkodowany jest przytomny, ale ma uraz kończyny",
      "Kiedy poszkodowany jest nieprzytomny, ale oddycha",
      "Kiedy poszkodowany nie oddycha",
      "Kiedy poszkodowany ma krwotok zewnętrzny",
    ],
    poprawna: 1,
  },
  {
    id: "ee-470",
    kat: "cpp",
    tresc:
      "Który numer telefonu należy wybrać, aby wezwać pogotowie ratunkowe w Polsce?",
    odpowiedzi: ["997", "998", "112", "113"],
    poprawna: 2,
  },
  {
    id: "ee-471",
    kat: "cpp",
    tresc: "Jak należy postąpić w przypadku silnego krwotoku z rany?",
    odpowiedzi: [
      "Przemyć ranę wodą utlenioną i pozostawić do wyschnięcia",
      "Założyć opatrunek uciskowy i unieść kończynę powyżej poziomu serca",
      "Nałożyć bandaż elastyczny bez ucisku",
      "Poczekać, aż krwawienie ustanie samoistnie",
    ],
    poprawna: 1,
  },
  {
    id: "ee-472",
    kat: "cpp",
    tresc: "Który objaw może wskazywać na zawał serca?",
    odpowiedzi: [
      "Silny ból w klatce piersiowej promieniujący do lewej ręki",
      "Ból brzucha po zjedzeniu posiłku",
      "Gorączka i dreszcze",
      "Obniżenie nastroju",
    ],
    poprawna: 0,
  },
  {
    id: "ee-473",
    kat: "cpp",
    tresc: "Jakie są podstawowe kroki resuscytacji krążeniowo-oddechowej?",
    odpowiedzi: [
      "30 uciśnięć klatki piersiowej na przemian z 2 wdechami ratowniczymi",
      "20 uciśnięć klatki piersiowej na przemian z 5 wdechami ratowniczymi",
      "10 uciśnięć klatki piersiowej bez wdechów",
      "30 wdechów ratowniczych bez uciśnięć",
    ],
    poprawna: 0,
  },
  {
    id: "ee-474",
    kat: "bhp",
    tresc:
      "Które środowisko programistyczne jest najczęściej wykorzystywane do tworzenia aplikacji w języku C#?",
    odpowiedzi: ["PyCharm", "Visual Studio", "Eclipse", "NetBeans"],
    poprawna: 1,
  },
  {
    id: "ee-475",
    kat: "testy",
    tresc: "Co oznacza skrót IDE w kontekście programowania?",
    odpowiedzi: [
      "Integrated Debugging Environment",
      "Interactive Development Engine",
      "Integrated Development Environment",
      "Interactive Debugging Editor",
    ],
    poprawna: 2,
  },
  {
    id: "ee-476",
    kat: "bhp",
    tresc:
      "Czym różni się środowisko RAD (Rapid Application Development) od tradycyjnych IDE?",
    odpowiedzi: [
      "RAD skupia się wyłącznie na testowaniu kodu",
      "RAD umożliwia szybkie prototypowanie i rozwój aplikacji z minimalnym kodowaniem",
      "RAD nie zawiera żadnych narzędzi do debugowania",
      "RAD działa wyłącznie w systemach operacyjnych typu Linux",
    ],
    poprawna: 1,
  },
  {
    id: "ee-477",
    kat: "testy",
    tresc:
      "Które z poniższych narzędzi nie jest wykorzystywane w procesie tworzenia aplikacji desktopowych?",
    odpowiedzi: [
      "Kompilator",
      "Debugger",
      "Edytor graficzny",
      "Przeglądarka internetowa",
    ],
    poprawna: 3,
  },
  {
    id: "ee-478",
    kat: "bhp",
    tresc: "Co jest głównym zadaniem debuggera w środowisku programistycznym?",
    odpowiedzi: [
      "Pisanie kodu źródłowego",
      "Analiza i usuwanie błędów w kodzie",
      "Tworzenie plików wykonywalnych",
      "Kompilowanie kodu źródłowego",
    ],
    poprawna: 1,
  },
  {
    id: "ee-479",
    kat: "bhp",
    tresc:
      "Który z poniższych elementów należy do podstawowego wyposażenia środowiska IDE?",
    odpowiedzi: [
      "Kompilator, edytor kodu, debugger",
      "Edytor tekstowy, przeglądarka internetowa, translator",
      "Kompilator, serwer webowy, system kontroli wersji",
      "Edytor graficzny, przeglądarka kodu, narzędzia analityczne",
    ],
    poprawna: 0,
  },
  {
    id: "ee-480",
    kat: "web",
    tresc: "Czym jest framework w programowaniu?",
    odpowiedzi: [
      "System operacyjny służący do uruchamiania aplikacji",
      "Zbiór gotowych bibliotek, narzędzi i reguł wspierających tworzenie aplikacji",
      "Edytor graficzny do projektowania interfejsów użytkownika",
      "Moduł do zarządzania bazami danych",
    ],
    poprawna: 1,
  },
  {
    id: "ee-481",
    kat: "web",
    tresc:
      "Który z poniższych frameworków jest typowy dla aplikacji desktopowych tworzonych w języku C#?",
    odpowiedzi: [
      "Qt",
      "WPF (Windows Presentation Foundation)",
      "Spring",
      "React",
    ],
    poprawna: 1,
  },
  {
    id: "ee-482",
    kat: "web",
    tresc:
      "Który framework jest szeroko stosowany do tworzenia aplikacji desktopowych w języku C++?",
    odpowiedzi: ["Node.js", "WPF", "Qt", "Flutter"],
    poprawna: 2,
  },
  {
    id: "ee-483",
    kat: "web",
    tresc:
      "Jakie są główne zalety stosowania frameworków w programowaniu aplikacji desktopowych?",
    odpowiedzi: [
      "Zapewniają dostęp do niskopoziomowego kodu systemowego",
      "Ułatwiają zarządzanie wersjami systemu operacyjnego",
      "Skracają czas tworzenia aplikacji dzięki gotowym komponentom i narzędziom",
      "Minimalizują zapotrzebowanie na pamięć operacyjną aplikacji",
    ],
    poprawna: 2,
  },
  {
    id: "ee-484",
    kat: "bhp",
    tresc: "Które z poniższych stwierdzeń najlepiej opisuje WPF?",
    odpowiedzi: [
      "Framework służący do tworzenia aplikacji webowych",
      "Framework służący do tworzenia aplikacji desktopowych w środowisku Windows",
      "Biblioteka do przetwarzania danych w Pythonie",
      "Framework umożliwiający obsługę urządzeń IoT",
    ],
    poprawna: 1,
  },
  {
    id: "ee-485",
    kat: "web",
    tresc:
      "Który framework umożliwia projektowanie aplikacji z graficznym interfejsem użytkownika oraz obsługą zdarzeń?",
    odpowiedzi: ["Django", "Qt", "TensorFlow", "Express.js"],
    poprawna: 1,
  },
  {
    id: "ee-486",
    kat: "web",
    tresc:
      "Który z poniższych elementów interfejsu użytkownika jest typowy dla aplikacji desktopowej?",
    odpowiedzi: ["Przycisk (Button)", "Strona HTML", "API REST", "Routing"],
    poprawna: 0,
  },
  {
    id: "ee-487",
    kat: "cpp",
    tresc: "Czym różni się dialog modalny od niemodalnego?",
    odpowiedzi: [
      "Dialog modalny wymaga zamknięcia, aby wrócić do głównego okna aplikacji, dialog niemodalny tego nie wymaga",
      "Dialog modalny działa w tle, a dialog niemodalny jest zawsze na pierwszym planie",
      "Dialog modalny pozwala na interakcję z innymi oknami aplikacji, dialog niemodalny nie",
      "Dialog modalny jest ograniczony tylko do aplikacji konsolowych",
    ],
    poprawna: 0,
  },
  {
    id: "ee-488",
    kat: "web",
    tresc:
      "Który język programowania jest szeroko stosowany do tworzenia aplikacji desktopowych?",
    odpowiedzi: ["HTML", "C++", "PHP", "JavaScript"],
    poprawna: 1,
  },
  {
    id: "ee-489",
    kat: "testy",
    tresc: "Do czego służy język XAML w programowaniu aplikacji desktopowych?",
    odpowiedzi: [
      "Do obsługi zdarzeń klawiatury",
      "Do projektowania graficznego interfejsu użytkownika",
      "Do optymalizacji działania aplikacji",
      "Do zarządzania bazami danych",
    ],
    poprawna: 1,
  },
  {
    id: "ee-490",
    kat: "cpp",
    tresc:
      "Który z poniższych komponentów może być częścią systemu menu aplikacji desktopowej?",
    odpowiedzi: ["CheckBox", "MenuItem", "ScrollBar", "Canvas"],
    poprawna: 1,
  },
  {
    id: "ee-491",
    kat: "cpp",
    tresc:
      "Co należy zrobić, aby obsłużyć zdarzenie kliknięcia przycisku w aplikacji desktopowej?",
    odpowiedzi: [
      "Zdefiniować metodę w systemie menu",
      "Podłączyć zdarzenie kliknięcia do odpowiedniej metody w kodzie",
      "Stworzyć nowy dialog modalny",
      "Zmodyfikować plik XAML",
    ],
    poprawna: 1,
  },
  {
    id: "ee-492",
    kat: "web",
    tresc:
      "Która z poniższych bibliotek umożliwia obsługę zdarzeń myszy w aplikacjach desktopowych?",
    odpowiedzi: ["Qt", "Numpy", "Django", "TensorFlow"],
    poprawna: 0,
  },
  {
    id: "ee-493",
    kat: "bhp",
    tresc:
      "Które środowisko programistyczne jest powszechnie stosowane do tworzenia aplikacji na system Android?",
    odpowiedzi: ["XCode", "Android Studio", "Visual Studio", "PyCharm"],
    poprawna: 1,
  },
  {
    id: "ee-494",
    kat: "bhp",
    tresc:
      "Czym różni się środowisko RAD (Rapid Application Development) od tradycyjnych IDE w kontekście aplikacji mobilnych?",
    odpowiedzi: [
      "RAD umożliwia szybsze tworzenie aplikacji dzięki narzędziom do wizualnego projektowania i generowania kodu",
      "RAD skupia się wyłącznie na debugowaniu aplikacji",
      "RAD nie wspiera obsługi interfejsu użytkownika",
      "RAD działa tylko na urządzeniach z systemem iOS",
    ],
    poprawna: 0,
  },
  {
    id: "ee-495",
    kat: "bhp",
    tresc:
      "Które środowisko programistyczne jest używane do tworzenia aplikacji na system iOS?",
    odpowiedzi: ["Android Studio", "Visual Studio Code", "XCode", "Eclipse"],
    poprawna: 2,
  },
  {
    id: "ee-496",
    kat: "bhp",
    tresc:
      "Który z poniższych elementów jest typowy dla środowiska IDE do tworzenia aplikacji mobilnych?",
    odpowiedzi: [
      "Kompilator, debugger, emulator urządzenia mobilnego",
      "Edytor tekstowy, przeglądarka internetowa, system kontroli wersji",
      "Narzędzia do analizy danych, serwer webowy, przeglądarka internetowa",
      "Edytor graficzny, narzędzia analityczne, klient FTP",
    ],
    poprawna: 0,
  },
  {
    id: "ee-497",
    kat: "testy",
    tresc:
      "Które z poniższych narzędzi jest wykorzystywane do emulacji urządzeń mobilnych podczas tworzenia aplikacji?",
    odpowiedzi: ["Genymotion", "TensorFlow", "Postman", "Numpy"],
    poprawna: 0,
  },
  {
    id: "ee-498",
    kat: "testy",
    tresc:
      "Które z poniższych narzędzi wspiera tworzenie interfejsu użytkownika w aplikacjach mobilnych?",
    odpowiedzi: [
      "Android Studio Layout Editor",
      "PyCharm Debugger",
      "Narzędzie do zarządzania bazami danych",
      "Kompilator Javy",
    ],
    poprawna: 0,
  },
  {
    id: "ee-499",
    kat: "mobile",
    tresc:
      "Który język programowania jest dedykowany do tworzenia aplikacji na system Android?",
    odpowiedzi: ["Swift", "Java", "Objective-C", "Python"],
    poprawna: 1,
  },
  {
    id: "ee-500",
    kat: "testy",
    tresc: "Do czego służy język Swift w kontekście aplikacji mobilnych?",
    odpowiedzi: [
      "Do tworzenia aplikacji na system iOS",
      "Do tworzenia aplikacji na system Android",
      "Do obsługi baz danych w aplikacjach mobilnych",
      "Do testowania aplikacji mobilnych",
    ],
    poprawna: 0,
  },
  {
    id: "ee-501",
    kat: "mobile",
    tresc:
      "Który z poniższych komponentów UI aplikacji mobilnych odpowiada za nawigację między ekranami?",
    odpowiedzi: [
      "Przycisk",
      "ListView",
      "Navigation Drawer",
      "Pasek narzędziowy",
    ],
    poprawna: 2,
  },
  {
    id: "ee-502",
    kat: "mobile",
    tresc:
      "W jaki sposób można przechowywać dane użytkownika w aplikacji mobilnej na system Android?",
    odpowiedzi: [
      "Za pomocą plików SharedPreferences",
      "W rejestrze systemu",
      "Wyłącznie w zewnętrznych bazach danych",
      "Tylko w pamięci RAM",
    ],
    poprawna: 0,
  },
  {
    id: "ee-503",
    kat: "mobile",
    tresc: "Który z poniższych jest przykładem prostej aplikacji mobilnej?",
    odpowiedzi: [
      "Aplikacja monitorująca zużycie pamięci RAM",
      "Aplikacja typu zegar",
      "Aplikacja do analizy danych finansowych",
      "Aplikacja z zaawansowanym systemem zarządzania projektami",
    ],
    poprawna: 1,
  },
  {
    id: "ee-504",
    kat: "oop",
    tresc:
      "Który język programowania jest powszechnie używany do programowania interfejsów użytkownika za pomocą XAML?",
    odpowiedzi: ["C++", "Java", "C#", "Objective-C"],
    poprawna: 2,
  },
  {
    id: "ee-505",
    kat: "sql",
    tresc:
      "Co jest głównym celem przygotowania aplikacji do publikacji w sklepie mobilnym?",
    odpowiedzi: [
      "Optymalizacja kodu aplikacji pod kątem szybkości działania",
      "Dostosowanie aplikacji do wymagań platformy i przepisów sklepu",
      "Zmniejszenie rozmiaru aplikacji poniżej 10 MB",
      "Umożliwienie korzystania z aplikacji tylko w trybie offline",
    ],
    poprawna: 1,
  },
  {
    id: "ee-506",
    kat: "mobile",
    tresc:
      "Które z poniższych jest przykładem aplikacji mobilnej korzystającej z bazy danych?",
    odpowiedzi: [
      "Aplikacja pokazująca godzinę lokalną",
      "Aplikacja przechowująca listę kontaktów użytkownika",
      "Aplikacja do robienia zdjęć",
      "Aplikacja kalkulator",
    ],
    poprawna: 1,
  },
  {
    id: "ee-507",
    kat: "bhp",
    tresc:
      "Które środowisko programistyczne jest często używane do tworzenia aplikacji webowych w języku Java?",
    odpowiedzi: ["Eclipse", "XCode", "Android Studio", "PyCharm"],
    poprawna: 0,
  },
  {
    id: "ee-508",
    kat: "bhp",
    tresc:
      "Czym różni się środowisko RAD od tradycyjnego IDE w kontekście aplikacji webowych?",
    odpowiedzi: [
      "RAD skupia się wyłącznie na tworzeniu frontendu aplikacji",
      "RAD pozwala na szybsze prototypowanie i rozwój aplikacji dzięki narzędziom wizualnym",
      "RAD działa tylko w systemach Windows",
      "RAD nie obsługuje żadnych języków backendowych",
    ],
    poprawna: 1,
  },
  {
    id: "ee-509",
    kat: "testy",
    tresc:
      "Które z poniższych narzędzi jest powszechnie używane do debugowania aplikacji webowych?",
    odpowiedzi: ["Git", "Chrome DevTools", "Postman", "Blender"],
    poprawna: 1,
  },
  {
    id: "ee-510",
    kat: "bhp",
    tresc:
      "Który element środowiska IDE jest kluczowy dla pracy nad aplikacjami webowymi?",
    odpowiedzi: [
      "Narzędzie do projektowania grafiki",
      "Emulator urządzeń mobilnych",
      "Debugger, edytor kodu, integracja z systemem kontroli wersji",
      "Zarządzanie bazami danych",
    ],
    poprawna: 2,
  },
  {
    id: "ee-511",
    kat: "testy",
    tresc: "Które narzędzie pozwala na testowanie API aplikacji webowych?",
    odpowiedzi: ["Postman", "Blender", "Microsoft Excel", "Node.js"],
    poprawna: 0,
  },
  {
    id: "ee-512",
    kat: "bhp",
    tresc:
      "Które z poniższych środowisk jest zalecane do tworzenia aplikacji w języku Python z frameworkiem Django?",
    odpowiedzi: ["Android Studio", "PyCharm", "XCode", "Unity"],
    poprawna: 1,
  },
  {
    id: "ee-513",
    kat: "web",
    tresc:
      "Który framework jest często używany do tworzenia aplikacji webowych w języku Python?",
    odpowiedzi: ["Django", "Angular", "React.js", "ASP.NET Core"],
    poprawna: 0,
  },
  {
    id: "ee-514",
    kat: "web",
    tresc:
      "Który framework opiera się na tworzeniu komponentów w języku JavaScript?",
    odpowiedzi: ["Node.js", "React.js", "Django", "ASP.NET Core"],
    poprawna: 1,
  },
  {
    id: "ee-515",
    kat: "testy",
    tresc:
      "Co jest głównym celem stosowania frameworka Node.js w aplikacjach webowych?",
    odpowiedzi: [
      "Tworzenie aplikacji mobilnych",
      "Obsługa aplikacji serwerowych i przetwarzanie asynchroniczne",
      "Projektowanie graficznego interfejsu użytkownika",
      "Testowanie API",
    ],
    poprawna: 1,
  },
  {
    id: "ee-516",
    kat: "web",
    tresc:
      "Który framework wspiera tworzenie dynamicznych interfejsów użytkownika przy użyciu TypeScript?",
    odpowiedzi: ["Angular", "Django", "ASP.NET Core", "jQuery"],
    poprawna: 0,
  },
  {
    id: "ee-517",
    kat: "mobile",
    tresc: "Które z poniższych zastosowań najlepiej opisuje bibliotekę jQuery?",
    odpowiedzi: [
      "Tworzenie aplikacji mobilnych",
      "Ułatwianie manipulacji DOM i obsługi zdarzeń w JavaScript",
      "Tworzenie interfejsów w aplikacjach desktopowych",
      "Projektowanie struktur baz danych",
    ],
    poprawna: 1,
  },
  {
    id: "ee-518",
    kat: "web",
    tresc:
      "Który z poniższych frameworków jest przeznaczony do tworzenia aplikacji webowych w języku C#?",
    odpowiedzi: ["Django", "Angular", "ASP.NET Core", "React.js"],
    poprawna: 2,
  },
  {
    id: "ee-519",
    kat: "web",
    tresc: "Który z poniższych jest odpowiednikiem biblioteki jQuery?",
    odpowiedzi: ["Bootstrap", "Lodash", "TypeScript", "Express.js"],
    poprawna: 1,
  },
  {
    id: "ee-520",
    kat: "web",
    tresc:
      "Który język programowania jest najczęściej używany do tworzenia aplikacji webowych po stronie serwera?",
    odpowiedzi: ["JavaScript", "PHP", "HTML", "CSS"],
    poprawna: 1,
  },
  {
    id: "ee-521",
    kat: "web",
    tresc: "Do czego służy mechanizm ciasteczek w aplikacjach webowych?",
    odpowiedzi: [
      "Do przechowywania danych użytkownika po stronie serwera",
      "Do przechowywania danych użytkownika w przeglądarce",
      "Do tworzenia dynamicznych interfejsów użytkownika",
      "Do przechowywania danych w bazie danych",
    ],
    poprawna: 1,
  },
  {
    id: "ee-522",
    kat: "sql",
    tresc:
      "Który z poniższych mechanizmów umożliwia śledzenie stanu użytkownika podczas sesji w aplikacji webowej?",
    odpowiedzi: [
      "HTTP Headers",
      "Sesje (Sessions)",
      "HTML Forms",
      "CSS Selectors",
    ],
    poprawna: 1,
  },
  {
    id: "ee-523",
    kat: "sql",
    tresc: "Który element jest niezbędny w dynamicznym formularzu logowania?",
    odpowiedzi: [
      "Nagłówek HTTP",
      "Pola tekstowe do wprowadzania danych użytkownika",
      "Plik graficzny",
      "Tabela w bazie danych",
    ],
    poprawna: 1,
  },
  {
    id: "ee-524",
    kat: "sql",
    tresc:
      "Która technologia jest używana do integracji aplikacji webowej z bazą danych?",
    odpowiedzi: ["HTTP", "SQL", "CSS", "JavaScript"],
    poprawna: 1,
  },
  {
    id: "ee-525",
    kat: "web",
    tresc:
      "Który z poniższych elementów najlepiej opisuje funkcjonalność e-sklepu?",
    odpowiedzi: [
      "Dostęp do bazy danych użytkownika",
      "System zarządzania koszykiem i realizacją zamówień",
      "Obsługa serwera e-mail",
      "Mechanizm renderowania grafiki 3D",
    ],
    poprawna: 1,
  },
  {
    id: "ee-526",
    kat: "web",
    tresc: "Jakie dane mogą być przechowywane w ciasteczkach przeglądarki?",
    odpowiedzi: [
      "Wrażliwe dane użytkownika, takie jak hasła",
      "Preferencje użytkownika, takie jak język lub motyw witryny",
      "Dane przechowywane w bazie danych",
      "Kod źródłowy aplikacji webowej",
    ],
    poprawna: 1,
  },
  {
    id: "ee-527",
    kat: "sql",
    tresc:
      "Który z poniższych mechanizmów pozwala na ograniczenie dostępu do niektórych części aplikacji webowej?",
    odpowiedzi: [
      "Dynamiczne formularze",
      "System logowania i kontroli dostępu",
      "Statyczne pliki CSS",
      "Mechanizm renderowania treści",
    ],
    poprawna: 1,
  },
  {
    id: "ee-528",
    kat: "testy",
    tresc: "Które z poniższych narzędzi jest używane do testowania aplikacji?",
    odpowiedzi: ["Git", "Selenium", "Photoshop", "WordPress"],
    poprawna: 1,
  },
  {
    id: "ee-529",
    kat: "testy",
    tresc: "Czym jest walidacja kodu programu?",
    odpowiedzi: [
      "Procesem tworzenia dokumentacji kodu",
      "Procesem sprawdzania poprawności i zgodności kodu z założeniami",
      "Procesem kompilowania kodu",
      "Procesem publikowania aplikacji w sklepie",
    ],
    poprawna: 1,
  },
  {
    id: "ee-530",
    kat: "testy",
    tresc: "Który z poniższych etapów jest częścią testowania aplikacji?",
    odpowiedzi: [
      "Tworzenie bazy danych",
      "Debugowanie kodu w celu znalezienia błędów",
      "Tworzenie interfejsu graficznego",
      "Kompilowanie aplikacji",
    ],
    poprawna: 1,
  },
  {
    id: "ee-531",
    kat: "bhp",
    tresc: 'Co oznacza termin "debugowanie" w programowaniu?',
    odpowiedzi: [
      "Tworzenie dokumentacji kodu",
      "Wyszukiwanie i usuwanie błędów w kodzie",
      "Opracowywanie nowych funkcji aplikacji",
      "Publikowanie aplikacji w środowisku produkcyjnym",
    ],
    poprawna: 1,
  },
  {
    id: "ee-532",
    kat: "testy",
    tresc:
      "Który z poniższych sposobów może służyć optymalizacji kodu źródłowego?",
    odpowiedzi: [
      "Usunięcie nieużywanych zmiennych i funkcji",
      "Zwiększenie liczby instrukcji warunkowych",
      "Użycie większej liczby komentarzy w kodzie",
      "Zastąpienie zmiennych globalnych lokalnymi",
    ],
    poprawna: 0,
  },
  {
    id: "ee-533",
    kat: "testy",
    tresc:
      "Które narzędzie może być używane do automatycznego testowania aplikacji webowych?",
    odpowiedzi: ["Selenium", "Postman", "Blender", "Visual Studio Code"],
    poprawna: 0,
  },
  {
    id: "ee-534",
    kat: "testy",
    tresc: "Co należy zrobić po znalezieniu błędu w kodzie podczas testowania?",
    odpowiedzi: [
      "Zignorować błąd, jeśli aplikacja działa poprawnie",
      "Poprawić błąd i ponownie przetestować aplikację",
      "Zgłosić błąd do użytkownika końcowego",
      "Usunąć moduł zawierający błąd",
    ],
    poprawna: 1,
  },
  {
    id: "ee-535",
    kat: "testy",
    tresc:
      "Który etap pozwala na poprawienie wydajności aplikacji przed jej publikacją?",
    odpowiedzi: [
      "Optymalizacja kodu",
      "Testowanie jednostkowe",
      "Tworzenie interfejsu graficznego",
      "Dodawanie komentarzy do kodu",
    ],
    poprawna: 0,
  },
  {
    id: "ee-536",
    kat: "testy",
    tresc: "Do czego służą komentarze w kodzie źródłowym programu?",
    odpowiedzi: [
      "Do uruchamiania kodu w trybie debugowania",
      "Do dokumentowania działania kodu i ułatwienia jego zrozumienia",
      "Do definiowania zmiennych globalnych",
      "Do optymalizacji wydajności kodu",
    ],
    poprawna: 1,
  },
  {
    id: "ee-537",
    kat: "testy",
    tresc:
      "Który z poniższych elementów należy uwzględnić w dokumentacji kodu programu?",
    odpowiedzi: [
      "Lista błędów wykrytych podczas testów",
      "Opis funkcji, klas i zmiennych w kodzie",
      "Plan marketingowy aplikacji",
      "Szczegóły konfiguracji serwera",
    ],
    poprawna: 1,
  },
  {
    id: "ee-538",
    kat: "testy",
    tresc: "Czym jest dokumentacja pomocy programu?",
    odpowiedzi: [
      "Dokumentem zawierającym szczegóły techniczne kodu źródłowego",
      "Instrukcją wyjaśniającą, jak korzystać z funkcji programu",
      "Zbiorem testów jednostkowych i wyników",
      "Dokumentem zawierającym plany rozwoju aplikacji",
    ],
    poprawna: 1,
  },
  {
    id: "ee-539",
    kat: "testy",
    tresc: "Co należy uwzględnić w instrukcji użytkownika aplikacji?",
    odpowiedzi: [
      "Opis instalacji, konfiguracji i obsługi programu",
      "Opis struktur danych używanych w kodzie",
      "Plan wdrożenia projektu",
      "Opis narzędzi programistycznych użytych podczas tworzenia aplikacji",
    ],
    poprawna: 0,
  },
  {
    id: "ee-540",
    kat: "bhp",
    tresc: "Co zawiera dokumentacja wdrożenia projektu?",
    odpowiedzi: [
      "Opis błędów znalezionych podczas testów",
      "Informacje o etapach implementacji aplikacji w środowisku produkcyjnym",
      "Plan marketingowy aplikacji",
      "Instrukcję obsługi aplikacji dla użytkowników końcowych",
    ],
    poprawna: 1,
  },
  {
    id: "ee-541",
    kat: "testy",
    tresc: "Co powinno znaleźć się w dokumentacji testów aplikacji?",
    odpowiedzi: [
      "Opis procedur testowych i wyników przeprowadzonych testów",
      "Plan wdrożenia aplikacji",
      "Instrukcje dotyczące optymalizacji kodu",
      "Dane techniczne serwera",
    ],
    poprawna: 0,
  },
  {
    id: "ee-542",
    kat: "testy",
    tresc:
      "Które z poniższych NIE jest elementem instrukcji użytkownika programu?",
    odpowiedzi: [
      "Opis sposobu instalacji aplikacji",
      "Opis testów jednostkowych",
      "Instrukcje obsługi poszczególnych funkcji aplikacji",
      "Rozwiązywanie problemów z obsługą aplikacji",
    ],
    poprawna: 1,
  },
  {
    id: "ee-543",
    kat: "bhp",
    tresc: "Do czego służy dokumentacja wdrożeniowa?",
    odpowiedzi: [
      "Do zarządzania bazą danych aplikacji",
      "Do opisania procesu instalacji i konfiguracji aplikacji w środowisku produkcyjnym",
      "Do testowania wydajności aplikacji",
      "Do tworzenia zadań w systemie kontroli wersji",
    ],
    poprawna: 1,
  },
  {
    id: "ee-544",
    kat: "testy",
    tresc: "Czym różnią się testy funkcjonalne od niefunkcjonalnych?",
    odpowiedzi: [
      "Testy funkcjonalne sprawdzają wydajność aplikacji, a niefunkcjonalne poprawność kodu",
      "Testy funkcjonalne sprawdzają zgodność działania aplikacji z założeniami, a niefunkcjonalne testują aspekty wydajności, bezpieczeństwa i użyteczności",
      "Testy funkcjonalne są przeprowadzane tylko przez użytkowników końcowych, a niefunkcjonalne przez programistów",
      "Testy funkcjonalne skupiają się na interfejsie, a niefunkcjonalne na zapleczu aplikacji",
    ],
    poprawna: 1,
  },
  {
    id: "ee-545",
    kat: "sql",
    tresc: "Który z poniższych przykładów jest testem niefunkcjonalnym?",
    odpowiedzi: [
      "Sprawdzenie poprawności logowania użytkownika",
      "Testowanie wydajności aplikacji pod dużym obciążeniem",
      "Weryfikacja poprawności działania przycisku",
      "Sprawdzenie obsługi formularza rejestracji",
    ],
    poprawna: 1,
  },
  {
    id: "ee-546",
    kat: "sql",
    tresc:
      "Które narzędzie służy do raportowania błędów w projektach informatycznych?",
    odpowiedzi: ["Photoshop", "JIRA", "Blender", "Git"],
    poprawna: 1,
  },
  {
    id: "ee-547",
    kat: "testy",
    tresc:
      "Który rodzaj testów sprawdza użyteczność aplikacji z perspektywy użytkownika końcowego?",
    odpowiedzi: [
      "Testy obciążeniowe",
      "Testy użyteczności",
      "Testy funkcjonalne",
      "Testy zgodności",
    ],
    poprawna: 1,
  },
  {
    id: "ee-548",
    kat: "bhp",
    tresc: "Co powinno zostać uwzględnione w scenariuszu testowym aplikacji?",
    odpowiedzi: [
      "Szczegółowe instrukcje dotyczące implementacji kodu",
      "Opis kroków testowych, oczekiwanych wyników i warunków wstępnych",
      "Dokumentacja techniczna aplikacji",
      "Plan wdrożenia aplikacji w środowisku produkcyjnym",
    ],
    poprawna: 1,
  },
  {
    id: "ee-549",
    kat: "testy",
    tresc:
      "Który z poniższych rodzajów testów najlepiej sprawdza odporność aplikacji na duże obciążenie?",
    odpowiedzi: [
      "Testy funkcjonalne",
      "Testy obciążeniowe",
      "Testy zgodności",
      "Testy bezpieczeństwa",
    ],
    poprawna: 1,
  },
  {
    id: "ee-550",
    kat: "testy",
    tresc: "Czym charakteryzują się testy interfejsu?",
    odpowiedzi: [
      "Sprawdzają wydajność aplikacji w czasie rzeczywistym",
      "Sprawdzają poprawność działania elementów graficznych i interakcji użytkownika z aplikacją",
      "Testują zgodność aplikacji z wymogami prawnymi",
      "Optymalizują kod aplikacji",
    ],
    poprawna: 1,
  },
  {
    id: "ee-551",
    kat: "testy",
    tresc:
      "Który rodzaj testów służy do weryfikacji funkcji prototypu interfejsu?",
    odpowiedzi: [
      "Testy wydajnościowe",
      "Testy interfejsu",
      "Testy zgodności",
      "Testy obciążeniowe",
    ],
    poprawna: 1,
  },
  {
    id: "ee-552",
    kat: "bhp",
    tresc: "Czym jest automatyzacja procesu testowania?",
    odpowiedzi: [
      "Procesem integracji testów w środowisku programistycznym",
      "Wykorzystaniem narzędzi i skryptów do przeprowadzania testów automatycznie bez ingerencji człowieka",
      "Weryfikacją poprawności działania aplikacji na urządzeniach mobilnych",
      "Kompilacją kodu w celu optymalizacji wydajności",
    ],
    poprawna: 1,
  },
  {
    id: "ee-553",
    kat: "cpp",
    tresc:
      "W procesorze, jednostką odpowiedzialną za działania na liczbach zmiennoprzecinko",
    odpowiedzi: ["IU", "AU", "FPU", "ALU"],
    poprawna: 2,
  },
  {
    id: "ee-554",
    kat: "web",
    tresc:
      "Klasa Mieszkaniec zawiera pola: imie, nazwisko, ulica, nrDomu, rokUrodzenia. w klasie zdefiniowano przedstawione w punktach konstruktory (zapisano jedynie typy argumrntów). Do inicjowania obiektu konstruktorem kopiującym wykorzystany zostanie konstruktor przedstawiony w punkcie",
    odpowiedzi: ["1", "2", "3", "4"],
    poprawna: 1,
    img: "https://ee-informatyk.pl/src/img/quizy/inf04/inf04-554.jpg",
  },
  {
    id: "ee-555",
    kat: "cpp",
    tresc:
      "Który z warunków logicznych sprawdza, czy zmienna całkowita x jest dodatnią liczbą dwucyfrową podzielną przez 4?",
    odpowiedzi: [
      "(x &gt; 9 &amp;&amp; x &lt; 100) &amp;&amp; (x % 4 == 0)",
      "(x &gt; 9 || x &lt; 100) &amp;&amp; (x / 4 == 0)",
      "(x &gt; 9 &amp;&amp; x &lt; 100) || (x % 4 == 0)",
      "(x &gt; 0 &amp;&amp; x &lt; 100) || (x / 4 == 0)",
    ],
    poprawna: 0,
  },
  {
    id: "ee-556",
    kat: "web",
    tresc:
      "Stosując jeden z dwóch przedstawionych zapisów inkrementacji w językach rodziny C lub Java, można stwierdzić, że",
    odpowiedzi: [
      "wartość zmiennej b będzie wyższa po wykonaniu zapisu drugiego w porównaniu z pierwszym",
      "zapis drugi jest niezgodny ze składnią, co spowoduje błędy kompilacji",
      "niezależnie od zapisu, w zmiennej b zawsze będzie ten sam wynik",
      "jedynie stosując zapis pierwszy, zmienna a zostanie zwiększona o 1",
    ],
    poprawna: 0,
    img: "https://ee-informatyk.pl/src/img/quizy/inf04/inf04-556.jpg",
  },
  {
    id: "ee-557",
    kat: "algo",
    tresc:
      "Które określenie najlepiej opisuje złożoność obliczeniową algorytmy quicksort?",
    odpowiedzi: [
      "jest wyższa niż złożoność sortowania bąbelkowego",
      "jest zawsze niższa niż złożoność każdego innego algorytmy sortowania",
      "jest wyższa niż O(n2).",
      "jest różna w zależności od wyboru elementu rozdzielającego",
    ],
    poprawna: 3,
  },
  {
    id: "ee-558",
    kat: "web",
    tresc:
      "Co zostanie wygenerowane w przeglądarce w wyniku działania kodu źródłowego zapisanego za pomocą dwóch równoważnych funkcjonalnie fragmentów?",
    odpowiedzi: [
      "Trzy paragrafy, każdy z kolejnym elementem tablicy tags",
      "jeden paragraf z kolejno wszystkimi elementami tablicy tags",
      "jeden paragraf z pierwszym elementem tablicy tags",
      "trzy paragrafy, w każdym z nich napis o treści: {tag}",
    ],
    poprawna: 0,
    img: "https://ee-informatyk.pl/src/img/quizy/inf04/inf04-558.jpg",
  },
  {
    id: "ee-559",
    kat: "sql",
    tresc:
      "W aplikacji mobilnej, aby zdefiniować warianty grafiki w zależności od rozdzielczości ekranu, należy (uwaga: odpowiedzi wariantowe dla dwóch platform - sugerować się platformą wykorzystywaną na zajęciach)",
    odpowiedzi: [
      "iOS: dodać do nazw przyrostki wskazujące na rozdzielczość, np.32ppi. Android: umieścić grafikę w odpowiednich folderach: 32ppi, 64ppi, 96ppi.",
      "iOS: dodać do nazw plików przyrostki @2x, @3x. Android: umieścić grafikę w odpowiednich folderach drawable: -hdpi, -xhpi, xxhdpi.",
      "iOS: dodać do nazw przyrostki #2x, #3x. Android: dodać do nazw przyrostek rozdzielczości: -32x32, -64x64, -96x96.",
      "iOS: utworzyć foldery hdpi, lhpi, xhpi i dodać do nich grafiki. Android: utworzyć foldery 32x32, 64x64, 96x96 i dodać do nich grafiki.",
    ],
    poprawna: 1,
  },
  {
    id: "ee-560",
    kat: "algo",
    tresc:
      "Programista projektuje obsługę bufora drukowania dokumentów. Najnowsze zadanie drukowania jest ustawiane na końcu kolejki, najstarsze jest przekazywane do wydruku. Strukturą danych najlepiej pasującą do problemu jest",
    odpowiedzi: ["Stos", "Sterta", "LIFO", "FIFO"],
    poprawna: 3,
  },
  {
    id: "ee-561",
    kat: "sql",
    tresc:
      "Która z akcji powinna być zaimplementowana w części back-end aplikacji internetowej?",
    odpowiedzi: [
      "wypisywanie danych pobranych z formularza w przeglądarce",
      "obsługa zdarzeń kontrolek",
      "walidacja formularzy w czasie rzeczywistym",
      "obsługa bazy danych",
    ],
    poprawna: 3,
  },
  {
    id: "ee-562",
    kat: "web",
    tresc:
      "Programista popełnił błąd w przedstawionym kodzie. Na czym ten błąd polega?",
    odpowiedzi: [
      "brak konstruktora w definicji klasy",
      "inicjacja obiektu jest nieprawidłowo zapisana",
      "w inicjacji obiektu powinny być przekazane argumenty konstruktora",
      "pole autor jest niedostępne z tego poziomu",
    ],
    poprawna: 3,
    img: "https://ee-informatyk.pl/src/img/quizy/inf04/inf04-562.jpg",
  },
  {
    id: "ee-563",
    kat: "algo",
    tresc:
      "Aby zaimplementować algorytm sortowania bąbelkowego dla tablicy n-elementowej, potrzeba",
    odpowiedzi: [
      "n-liczby warunków",
      "dwóch pętli działających na co najmniej (n+1) elementach każda",
      "jednej pętli działającej na 2n elementach i warunku",
      "dwóch pętli działających na najwyżej n-elementach każda",
    ],
    poprawna: 3,
  },
  {
    id: "ee-564",
    kat: "oop",
    tresc:
      "W przedstawionych fragmentach kodu zdefiniowano funkcję o nazwie fun1. W funkcji tej należy umieścić obsługę",
    odpowiedzi: [
      "wybrania przycisku zatwierdzającego dialog",
      "aplikacji po zdarzeniu utraty focusa przez pola opcji",
      "inicjalizacji elementów interfejsu użytkownika",
      "usunięcia kontrolek z pamięci operacyjnej",
    ],
    poprawna: 0,
    img: "https://ee-informatyk.pl/src/img/quizy/inf04/inf04-564.jpg",
  },
  {
    id: "ee-565",
    kat: "web",
    tresc:
      "Przedstawiona pętla operuje na zmiennej napisowej ciąg. Jej zadaniem jest",
    odpowiedzi: [
      "od każdego znaku w napisie, który nie jest równy 0, odjąć kod 32",
      "zamienić w napisie małe litery na wielkie",
      "od każdego znaku w napisie odjąć kod 32",
      "zamienić w napisie wielkie litery na małe",
    ],
    poprawna: 1,
    img: "https://ee-informatyk.pl/src/img/quizy/inf04/inf04-565.jpg",
  },
  {
    id: "ee-566",
    kat: "oop",
    tresc: "Przedstawiony sposób deklaracji Klasa2 oznacza, że",
    odpowiedzi: [
      "Klasa1 dziedziczy po Klasa2",
      "Klasa1 jest potomkiem Klasy2",
      "Klasa2 dziedziczy po Klasa1",
      "Klasa2 jest klasą bazową",
    ],
    poprawna: 2,
    img: "https://ee-informatyk.pl/src/img/quizy/inf04/inf04-566.jpg",
  },
  {
    id: "ee-567",
    kat: "testy",
    tresc:
      "Testy mające na celu wykrycie błędów w interfejsach pomiędzy modułami lub systemami to testy",
    odpowiedzi: [
      "wydajnościowe",
      "bezpieczeństwa",
      "integracyjne",
      "jednostkowe",
    ],
    poprawna: 2,
  },
  {
    id: "ee-568",
    kat: "testy",
    tresc: "Metodyka zwinna (ang. agile) polega na",
    odpowiedzi: [
      "podziale przedsięwzięcia na następujące po sobie etapy: projekt, programowania, testy, wraz z ciągłym szacowaniem ryzyka przedsięwzięcia",
      "dekompozycji przedsięwzięcia na części, które są oddzielnie projektowane, wytwarzane i testowane w krótkich cyklach",
      "zaprojektowaniu całej aplikacji na początku trwania przedsięwzięcia i tworzeniu jej na przemian z testowaniem",
      "opracowaniu testów dla całego przedsięwzięcia, a następnie implementowaniu kolejnych jego części",
    ],
    poprawna: 1,
  },
  {
    id: "ee-569",
    kat: "oop",
    tresc:
      "Mechanizm programowania obiektowego w C++, wykorzystujący funkcje wirtualne (z ang. Virtual), który przy wywołaniu metod zwalnia programistę z obowiązku sprawdzenia jaką klasę pochodną aktualnie obsługuje, np. przez wskaźnik nosi nazwę",
    odpowiedzi: [
      "dziedziczenia",
      "przeciążenia",
      "hermetyzacji",
      "polimorfizmu",
    ],
    poprawna: 3,
  },
  {
    id: "ee-570",
    kat: "mobile",
    tresc:
      "We frameworkach do tworzenia aplikacji mobilnych lub desktopowych występuje wzorzec MVVM, czyli Model-View-ViewModel. To podejście do programowania zakłada, że",
    odpowiedzi: [
      "interfejs użytkownika oraz logika aplikacji są kodowane w jednym pliku",
      "kontrolki i widoki interfejsu użytkownika są zaszyte w logice aplikacji",
      "interfejs użytkownika oraz logika aplikacji są rozdzielone",
      "w aplikacji występuje tylko interfejs użytkownika",
    ],
    poprawna: 2,
  },
  {
    id: "ee-571",
    kat: "cpp",
    tresc:
      "W której sekcji obsługi wyjątków jest zaimplementowana reakcja na rzucony wyjątek?",
    odpowiedzi: ["throw", "try", "finally", "catch"],
    poprawna: 3,
  },
  {
    id: "ee-572",
    kat: "sql",
    tresc: "Na obrazie widoczna jest aplikacja, która umozliwia",
    odpowiedzi: [
      "debugowanie kodu na wskazanej platformie Android",
      "zarządzanie emulacjami systemu Android",
      "kompilowanie kodu pod wskazaną platformę Android",
      "zarządzanie wirtualnymi dyskami emulacji systemu android",
    ],
    poprawna: 1,
    img: "https://ee-informatyk.pl/src/img/quizy/inf04/inf04-572.jpg",
  },
  {
    id: "ee-573",
    kat: "cpp",
    tresc: "W oknie dialogowym aplikacji desktopowej umieszczono",
    odpowiedzi: [
      "trzy pola edycyjne, dwa pola opcji, jedno pole listy rozwijanej i dwa przyciski",
      "trzy pola edycyjne, dwa pola etykiet, pole listy rozwijanej i dwa przyciski",
      "trzy pola etykiet, dwa pola wyboru, pole opcji i dwa przyciski",
      "cztery pola edycyjne, dwa pola opcji i dwa przyciski",
    ],
    poprawna: 0,
    img: "https://ee-informatyk.pl/src/img/quizy/inf04/inf04-573.jpg",
  },
  {
    id: "ee-574",
    kat: "testy",
    tresc:
      "Liczba pierwiastków równania kwadratowego jest zależna od delty w sposób przedstawiony w ramce. Która instrukcja warunkowa odpowiada tej zależności, jeżeli delta to zmienna d?",
    odpowiedzi: [
      "Instrukcja 1",
      "Instrukcja 4",
      "Instrukcja 2",
      "Instrukcja 3",
    ],
    poprawna: 3,
    img: "https://ee-informatyk.pl/src/img/quizy/inf04/inf04-574.jpg",
  },
  {
    id: "ee-575",
    kat: "mobile",
    tresc:
      "Aby opublikować aplikację w sklepie Google Play/Apple Store, wymagane jest aktywne konto programisty w aplikacji",
    odpowiedzi: [
      "poczta gmail/poczta Apple ID",
      "Google Search Console/Apple Store Connect",
      "Google Analitics/Apple Keynote",
      "konsola Google Play/iTunes Connect",
    ],
    poprawna: 3,
  },
  {
    id: "ee-576",
    kat: "testy",
    tresc:
      "Program, który analizuje kod źródłowy programu i od razu wykonuje przeanalizowany fragment, jest nazywany",
    odpowiedzi: [
      "interpreterem",
      "konsolidatorem",
      "kompilatorem",
      "debuggerem",
    ],
    poprawna: 0,
  },
  {
    id: "ee-577",
    kat: "cpp",
    tresc: "Które zdanie dotyczące okna modalnego jest prawdziwe?",
    odpowiedzi: [
      "Okno modalne może zawierać system menu, ale nie może zawierać w sobie kontrolek.",
      "Okno modalne oddaje kontrolę innemu oknu, jeżeli to otrzymało zdarzenie.",
      "Okno modalne pozwala na obsługę wszystkich zdarzeń aplikacji.",
      "Okno modalne nie pozwala na obsługę zdarzeń dotyczących pozostałych okien aplikacji.",
    ],
    poprawna: 3,
  },
  {
    id: "ee-578",
    kat: "sql",
    tresc:
      "Które zdanie jest zgodne z informacjami o funkcjach zaprzyjaźnionych przedstawionych we fragmencie dokumentacji?",
    odpowiedzi: [
      "Gdy prototypy funkcji zaprzyjaźnionych znajdują się w definicji klasy, funkcje te są jej metodami.",
      "Funkcja zaprzyjaźniona nie ma dostępu do elementów protected klasy.",
      "Tylko funkcje mogą być zaprzyjaźnione.",
      "Funkcja zaprzyjaźniona, mimo że jest zdefiniowana na zewnątrz klasy ma dostęp do jej prywatnych elementów.",
    ],
    poprawna: 3,
    img: "https://ee-informatyk.pl/src/img/quizy/inf04/inf04-578.jpg",
  },
  {
    id: "ee-579",
    kat: "cpp",
    tresc: "Typami reprezentującymi liczby rzeczywiste są",
    odpowiedzi: [
      "float, unsigned",
      "double, char",
      "unsigned, long",
      "float, double",
    ],
    poprawna: 3,
  },
  {
    id: "ee-580",
    kat: "bhp",
    tresc:
      "W prezentowanym kodzie popełniono błąd logiczny, który polega na tym, że",
    odpowiedzi: [
      "w warunku powinna być sprawdzona wartość zmiennej a",
      "warunek powinien być zastąpiony pętlą while",
      "w warunku jest przypisanie zamiast porównania",
      "warunek nie ma sensu, środowisko uruchomieniowe samo sprawdzi argument dzielenia",
    ],
    poprawna: 2,
    img: "https://ee-informatyk.pl/src/img/quizy/inf04/inf04-580.jpg",
  },
  {
    id: "ee-581",
    kat: "web",
    tresc:
      "Który z frameworków jest stosowany do budowy części back-end w aplikacjach WEB?",
    odpowiedzi: ["Django", "Xamarin", "React.js", "Angular"],
    poprawna: 0,
  },
  {
    id: "ee-582",
    kat: "algo",
    tresc: "Przedstawiona na obrazie idea sortowania odnosi się do sortowania",
    odpowiedzi: [
      "przez scalanie",
      "kubełkowego",
      "przez wybieranie",
      "bąbelkowego",
    ],
    poprawna: 0,
    img: "https://ee-informatyk.pl/src/img/quizy/inf04/inf04-582.jpg",
  },
  {
    id: "ee-583",
    kat: "bhp",
    tresc: "Które z praw autorskich są niezbywalne i nieograniczone w czasie?",
    odpowiedzi: [
      "Prawa do dokumentów urzędowych.",
      "Autorskie prawa osobiste.",
      "Autorskie prawa majątkowe.",
      "Prawa do prostych informacji prasowych.",
    ],
    poprawna: 1,
  },
  {
    id: "ee-584",
    kat: "bhp",
    tresc:
      "Wskaż środek ochrony, który nie jest zaliczany do środków ochrony zbiorowej",
    odpowiedzi: [
      "ekran dźwiękochłonny",
      "gaśnica",
      "barierki chroniące przed upadkiem z wysokości",
      "okulary ochronne",
    ],
    poprawna: 3,
  },
  {
    id: "ee-585",
    kat: "web",
    tresc:
      "Kod przedstawia operacje na 1000-elementowej tablicy wypełnionej liczbami całkowitymi. Aby zoptymalizować kod, nie tracąc na jego czytelności, należy",
    odpowiedzi: [
      "zmniejszyć o połowę liczbę iteracji pętli",
      "pętlę for zamienić na pętlę while",
      "wynik metody Pow wyliczyć przed pętlą",
      "zapisać kod bez pętli",
    ],
    poprawna: 2,
    img: "https://ee-informatyk.pl/src/img/quizy/inf04/inf04-585.jpg",
  },
  {
    id: "ee-586",
    kat: "web",
    tresc:
      "W kodzie źródłowym dwóch równoważnych funkcjonalnie fragmentów zapisano:",
    odpowiedzi: [
      "obsługę zdarzenia dla przycisku",
      "przypisanie stylu o nazwie fun1 do przycisku",
      "obsługę błędów",
      "wywołanie funkcji, aby zainicjować stronę w przeglądarce",
    ],
    poprawna: 0,
    img: "https://ee-informatyk.pl/src/img/quizy/inf04/inf04-586.jpg",
  },
  {
    id: "ee-587",
    kat: "sql",
    tresc: "Wskaż cechę charakterystyczną szablonów programowania obiektowego",
    odpowiedzi: [
      "odnoszą się tylko do typów liczbowych",
      "zawierają informacje o formatowaniu stron internetowych",
      "definiują funkcjonalność uniwersalną dla różnych typów danych",
      "operują na danych jednego określonego typu",
    ],
    poprawna: 2,
  },
  {
    id: "ee-588",
    kat: "cpp",
    tresc:
      "Dana jest tablica liczb całkowitych o nazwie tbl. Po wykonaniu przedstawionych operacji w zmiennej wynik znajdzie się",
    odpowiedzi: [
      "liczba elementów tablicy",
      "suma elementów tablicy",
      "wynik dzielenia sąsiadujących elementów tablicy",
      "średnia arytmetyczna elementów tablicy",
    ],
    poprawna: 3,
    img: "https://ee-informatyk.pl/src/img/quizy/inf04/inf04-588.jpg",
  },
  {
    id: "ee-589",
    kat: "sql",
    tresc: "Wskaż system typu e-commerce",
    odpowiedzi: [
      "WordPress CMS bez dodatkowych wtyczek",
      "Dziennik elektroniczny Librus Synergia",
      "PrestaShop, platforma do tworzenia własnych sklepów internetowych",
      "Elektroniczna Platforma Usług Administracji Publicznej ePUAP",
    ],
    poprawna: 2,
  },
  {
    id: "ee-590",
    kat: "sql",
    tresc:
      "Przedstawiony format plików, służący, między innymi, do wymiany danych pomiędzy częścią back-end a front-end aplikacji internetowej, to",
    odpowiedzi: ["JSX", "XML", "YAML", "JSON"],
    poprawna: 3,
    img: "https://ee-informatyk.pl/src/img/quizy/inf04/inf04-590.jpg",
  },
  {
    id: "ee-591",
    kat: "cpp",
    tresc: "Jaki typ służy do przechowywania wartości TRUE/FALSE w języku C++?",
    odpowiedzi: ["bool", "decimal", "byte", "char"],
    poprawna: 0,
  },
  {
    id: "ee-592",
    kat: "bhp",
    tresc:
      "Natężenie dźwięku na stanowisku pracy w biurze nie może przekraczać",
    odpowiedzi: ["50 dB", "45 dB", "40 dB", "55 dB"],
    poprawna: 1,
  },
  {
    id: "ee-593",
    kat: "sql",
    tresc:
      "Mechanizm pozwalający programowi czytać informacje o samym sobie to",
    odpowiedzi: ["asemblacja", "lustro", "instacjonowanie", "refleksja"],
    poprawna: 3,
  },
  {
    id: "ee-594",
    kat: "cpp",
    tresc:
      "Jaki typ służy do przechowywania wartości całkowitych z zakresu 0 do 255 w języku C++?",
    odpowiedzi: ["unsigned char", "char", "unsigned short", "short"],
    poprawna: 0,
  },
  {
    id: "ee-595",
    kat: "oop",
    tresc: "Metoda ustawiająca prywatne pole to",
    odpowiedzi: ["metoda abstrakcyjna", "getter", "setter", "metoda wirtualna"],
    poprawna: 2,
  },
  {
    id: "ee-596",
    kat: "oop",
    tresc: "W języku C# delegat jest to",
    odpowiedzi: [
      "specjalny typ do przechowywania typów prostych",
      "specjalny typ do przechowywania referencji na funkcję",
      "specjalny typ pełniący rolę wskaźnika do poruszania się po pliku",
      "specjalny typ pełniący rolę iteratora po kolekcji",
    ],
    poprawna: 1,
  },
  {
    id: "ee-597",
    kat: "testy",
    tresc: "Do testowania REST API wykorzystuje się program",
    odpowiedzi: ["Postman", "ApiViewer", "Putty", "RestTeamViewer"],
    poprawna: 0,
  },
  {
    id: "ee-598",
    kat: "sql",
    tresc:
      "W języku C, aby wypisać odpowiednio string, znak, liczbę całkowitą ze znakiem oraz liczbę zmiennoprzecinkową za pomocą funkcji print(), należy posłużyć się ciągiem formatującym",
    odpowiedzi: ["%s %c %d %f", "%c %s %u %x", "%f %c %s %u", "%d %u %f %c"],
    poprawna: 0,
  },
  {
    id: "ee-599",
    kat: "oop",
    tresc: "Elementem języka C++, który pozwala definiować własne typy jest?",
    odpowiedzi: [
      "typ wyliczeniowy enum",
      "klasa",
      "struktura",
      "wszystkie pozostałem",
    ],
    poprawna: 3,
  },
  {
    id: "ee-600",
    kat: "cpp",
    tresc: "Wartość wyrażenia !5 w języku C++ to",
    odpowiedzi: ["1", "undefined", "false", "0xE"],
    poprawna: 2,
  },
  {
    id: "ee-601",
    kat: "algo",
    tresc: "Przykładem algorytmu typu dziel i zwyciężaj jest?",
    odpowiedzi: [
      "quick-sort",
      "algorytm kruskala",
      "algorytm Dijkstra",
      "insert-sort",
    ],
    poprawna: 0,
  },
  {
    id: "ee-602",
    kat: "algo",
    tresc:
      "Przedstawiając algorytm za pomocą bloków, blok start/stop narysujemy w kształcie?",
    odpowiedzi: ["Równoległoboku.", "Elipsy.", "Trójkąta.", "Prostokąta."],
    poprawna: 1,
  },
  {
    id: "ee-603",
    kat: "algo",
    tresc: "Algorytm można przedstawić za pomocą?",
    odpowiedzi: [
      "Pseudokodem.",
      "Każdym z wymienionych sposobów.",
      "Schematem blokowym.",
      "Opisem słownym.",
    ],
    poprawna: 1,
  },
  {
    id: "ee-604",
    kat: "oop",
    tresc: "Z ilu klas może dziedziczyć klasa w C#/Java/Python?",
    odpowiedzi: ["1", "dowolnej ilości", "0", "2"],
    poprawna: 0,
  },
  {
    id: "ee-605",
    kat: "oop",
    tresc:
      "Przekazywanie zależności do klasy poprzez konstruktor nazywane jest",
    odpowiedzi: [
      "wstrzykiwaniem zależności",
      "żadnym z wymienionych",
      "dziedziczeniem zależności",
      "odwracaniem zależności",
    ],
    poprawna: 0,
  },
  {
    id: "ee-606",
    kat: "oop",
    tresc: "Interfejs to konstrukcja znana np. z język C#. Jest ona podobna do",
    odpowiedzi: ["klasy abstrakcyjnej", "zwykłej klasy", "struktury", "uni"],
    poprawna: 0,
  },
  {
    id: "ee-607",
    kat: "oop",
    tresc: "Plik źródłowy języka C# ma rozszerzenie?",
    odpowiedzi: [".sc", ".cc", ".cs", ".cp"],
    poprawna: 2,
  },
  {
    id: "ee-608",
    kat: "oop",
    tresc: "Pojęcie tablicy postrzępionej w języku C#, oznacza:",
    odpowiedzi: [
      "każdą tablicę w języku C#, niezależnie od jej wymiaru",
      "tablicę dwuwymiarową, gdzie każda podtablica jest równa",
      "tablicę dwuwymiarową, gdzie każda podtablica ma nieparzystą ilość elementów",
      "tablicę dwuwymiarową, gdzie każda podtablica jest innego rozmiaru",
    ],
    poprawna: 3,
  },
  {
    id: "ee-609",
    kat: "algo",
    tresc: "Które zdanie o funkcji skrótu nie jest prawdziwe?",
    odpowiedzi: [
      '"hash" uzyskany z funkcji skrótu jest odwracalny.',
      'Wynik funkcji skrótu to tak zwany "hash".',
      "Funkcja skrótu przypisuje dowolnie dużej wartości krótką wartość o stałym rozmiarze.",
      '"hash" uzyskany z funkcji skrótu jest nieodwracalny.',
    ],
    poprawna: 0,
  },
  {
    id: "ee-610",
    kat: "oop",
    tresc: "Na obrazku klasa Repository jest dla klasy Server?",
    odpowiedzi: [
      "Zależnością twardą.",
      "Żadne z wymienionych.",
      "Klasą pochodną.",
      "Zależnością miękką.",
    ],
    poprawna: 3,
    img: "https://ee-informatyk.pl/src/img/quizy/inf04/inf04-610.jpg",
  },
  {
    id: "ee-611",
    kat: "cpp",
    tresc:
      'Jakiego przełącznika należy użyć z poleceniem "git reset", aby cofnięte zmiany wylądowały na "stage"?',
    odpowiedzi: ["--medium", "--hard", "--mixed", "--soft"],
    poprawna: 3,
  },
  {
    id: "ee-612",
    kat: "testy",
    tresc: "Testy jednostkowe składają się z trzech głównych faz w kolejności",
    odpowiedzi: [
      "assert/arrange/act",
      "assert/act/arrange",
      "act/assert/arrange",
      "arrange/act/assert",
    ],
    poprawna: 3,
  },
  {
    id: "ee-613",
    kat: "oop",
    tresc: "Zasada mówiąca o tym by unikać powtórzeń w kodzie to",
    odpowiedzi: ["YAGNI", "DRY", "SOLID", "KISS"],
    poprawna: 1,
  },
  {
    id: "ee-614",
    kat: "mobile",
    tresc: "Na ilustracji został przedstawiony Diagram UML:",
    odpowiedzi: [
      "diagram klas",
      "diagram ERD",
      "diagram przypadków użycia",
      "diagram aktywności",
    ],
    poprawna: 2,
    img: "https://ee-informatyk.pl/src/img/quizy/inf04/inf04-614.jpg",
  },
  {
    id: "ee-615",
    kat: "oop",
    tresc: 'W języku C# delegat "Func", zwraca:',
    odpowiedzi: ["int", "bool", "double", "nic"],
    poprawna: 1,
  },
  {
    id: "ee-616",
    kat: "oop",
    tresc:
      "Typem danych wykorzystywanym do precyzyjnego przechowywania liczb ułamkowych w języku C# jest:",
    odpowiedzi: ["double", "dynamic", "decimal", "float"],
    poprawna: 2,
  },
  {
    id: "ee-617",
    kat: "oop",
    tresc: '"Indexer", to konstrukcja języka C#, która',
    odpowiedzi: [
      "jest odpowiednikiem przeciążonego operatora &",
      "jest odpowiednikiem przeciążonego operatora []",
      "jest odpowiednikiem przeciążonego operatora ()",
      "jest odpowiednikiem przeciążonego operatora (type)",
    ],
    poprawna: 1,
    img: "https://ee-informatyk.pl/src/img/quizy/inf04/inf04-617.jpg",
  },
  {
    id: "ee-618",
    kat: "cpp",
    tresc:
      "Listę plików/katalogów, które są ignorowane przez system kontroli wersji git należy umieścić w pliku:",
    odpowiedzi: [".gitsettings", ".configgit", ".ignoregit", ".gitignore"],
    poprawna: 3,
  },
  {
    id: "ee-619",
    kat: "testy",
    tresc: "TDD (Test Driven Development) to:",
    odpowiedzi: [
      "metodologia pisania oprogramowania, gdzie testy pisze się przed kodem testowanym",
      "wzorzec projektowy",
      "metodologia pisania oprogramowania, gdzie testy wykorzystuje się do dokumentowania kodu",
      "wszystkie odpowiedzi są błędne",
    ],
    poprawna: 0,
    img: "https://ee-informatyk.pl/src/img/quizy/inf04/inf04-619.jpg",
  },
  {
    id: "ee-620",
    kat: "web",
    tresc: "Skrót SPA oznacza:",
    odpowiedzi: [
      "Super-Pure Application",
      "Super-Page Application",
      "Simple-Page Application",
      "Single-Page Application",
    ],
    poprawna: 3,
  },
  {
    id: "ee-621",
    kat: "sql",
    tresc: "Rozwinięciem skrótu ORM jest:",
    odpowiedzi: [
      "Object Relational Mapping",
      "Object Relational Macro",
      "Object Reconstruct Mapping",
      "Object Relational Model",
    ],
    poprawna: 0,
  },
  {
    id: "ee-622",
    kat: "web",
    tresc:
      "Metodą protokołu HTTP/HTTPS odpowiedzialną za aktualizowanie danych jest",
    odpowiedzi: ["POST", "PUT", "HEAD", "GET"],
    poprawna: 1,
  },
  {
    id: "ee-623",
    kat: "sql",
    tresc: "API typu REST wymienia dane w formacie zwanym",
    odpowiedzi: ["JSON", "JWT", "XML", "HTML"],
    poprawna: 0,
  },
  {
    id: "ee-624",
    kat: "sql",
    tresc:
      "Podatność stron internetowych polegająca na wstrzykiwaniu własnego kodu do strony to",
    odpowiedzi: ["XSS", "Hijacking", "SQL Injection", "Data Poisoning"],
    poprawna: 0,
  },
  {
    id: "ee-625",
    kat: "bhp",
    tresc: "Kategorią zagrożeń na stanowisku pracy nie są",
    odpowiedzi: [
      "zagrożenia chemiczne",
      "zagrożenia biologiczne",
      "zagrożenia fizyczne",
      "zagrożenia psychofizyczne",
    ],
    poprawna: 1,
  },
  {
    id: "ee-626",
    kat: "testy",
    tresc: "Jakie są podstawowe etapy tworzenia aplikacji?",
    odpowiedzi: [
      "Analiza wymagań, projektowanie, implementacja, testowanie, wdrożenie",
      "Projektowanie, wdrożenie, utrzymanie, dokumentacja",
      "Implementacja, testowanie, wdrożenie, analiza potrzeb",
      "Analiza wymagań, testowanie, projektowanie, wdrożenie",
    ],
    poprawna: 0,
  },
  {
    id: "ee-627",
    kat: "web",
    tresc: "Jakie jest główne zadanie serwera aplikacyjnego?",
    odpowiedzi: [
      "Przechowywanie danych",
      "Hostowanie stron HTML",
      "Obsługa logiki aplikacji",
      "Renderowanie grafiki",
    ],
    poprawna: 2,
  },
  {
    id: "ee-628",
    kat: "oop",
    tresc: "Wzorzec MVC dzieli aplikację na:",
    odpowiedzi: [
      "Moduł, widok, kontroler",
      "Model, widok, kontroler",
      "Model, wersję, konfigurację",
      "Moduł, wersję, komponent",
    ],
    poprawna: 1,
  },
  {
    id: "ee-629",
    kat: "algo",
    tresc: "Który algorytm służy do wyszukiwania najkrótszej drogi w grafie?",
    odpowiedzi: [
      "Algorytm Dijkstry",
      "Algorytm Kruskala",
      "Algorytm Floyda-Warshalla",
      "Algorytm Prim",
    ],
    poprawna: 0,
  },
  {
    id: "ee-630",
    kat: "sql",
    tresc: "Jakiego typu dane przechowuje baza danych NoSQL?",
    odpowiedzi: [
      "Relacyjne dane tabelaryczne",
      "Dane hierarchiczne i nienormalizowane",
      "Wyłącznie dane tekstowe",
      "Dane tylko w formacie JSON",
    ],
    poprawna: 1,
  },
  {
    id: "ee-631",
    kat: "oop",
    tresc: "W programowaniu obiektowym, co to jest enkapsulacja?",
    odpowiedzi: [
      "Dzielenie aplikacji na moduły",
      "Ukrywanie szczegółów implementacji",
      "Dziedziczenie cech między klasami",
      "Definiowanie interfejsów",
    ],
    poprawna: 1,
  },
];

export const THEORY_SOURCES = [
  {
    nazwa: "EE-Informatyk.pl — baza INF.04 (TĄ MAMY WPIĘTĄ)",
    url: "https://ee-informatyk.pl/inf04/baza-pytan/",
    opis: "630 pytań: informator CKE (25) + opracowane z wymagań (334) + baza użytkowników (193) + 2× przykładowy arkusz (39+39). Ściągnięte skryptem scripts/scrape-teoria.py, poprawne odpowiedzi jawnie w HTML.",
    baza: "630 pytań",
    api: "BRAK API — scrape HTML",
  },
  {
    nazwa: "PraktycznyEgzamin.pl — teoria INF.04",
    url: "https://www.praktycznyegzamin.pl/inf04/teoria/",
    opis: "552 pytania (stan 01.2026). Trzy tryby: baza z odpowiedziami, jedno pytanie po drugim, test 40 pytań.",
    baza: "552 pytania",
    api: "BRAK API — tylko HTML",
  },
  {
    nazwa: "KursINF — teoria INF.04",
    url: "https://www.kursinf.pl/pytania/inf04",
    opis: "Losowanie 1 pytania, arkusz 40 losowych, przegląd wszystkich. Najbliższe temu mockupowi UX-owo.",
    baza: "pełna baza 2026",
    api: "BRAK API — tylko HTML",
  },
  {
    nazwa: "egzamin-programista.pl — test 40 pytań",
    url: "https://egzamin-programista.pl/testy-inf04-projektowanie-programowanie-i-testowanie-aplikacji/",
    opis: "Klasyczny test 40 pytań symulujący arkusz CKE (60 minut na prawdziwym egzaminie).",
    baza: "40 pytań / test",
    api: "BRAK API — tylko HTML",
  },
  {
    nazwa: "zawodowe.edu.pl — lista pytań INF.04",
    url: "https://zawodowe.edu.pl/technik-programista/INF.04/",
    opis: "Lista pytań z odpowiedziami ABCD do przeklikania, dobra do szybkiego researchu treści.",
    baza: "lista otwarta",
    api: "BRAK API — tylko HTML",
  },
  {
    nazwa: "GitHub Marmo77/egzamin-programista (MIT)",
    url: "https://github.com/Marmo77/egzamin-programista",
    opis: "Open-source: React + Supabase (Postgres), 2000+ pytań INF.03+INF.04, 650+ obrazków, licencja MIT. Dane w Supabase (nie w repo), apka czyta je publicznym kluczem anon.",
    baza: "2000+ pytań",
    api: "TAK — Supabase / Postgres + storage obrazków",
  },
];
