# Mini-projekt-CRUD
Zbudować funkcjonalność CRUD z pełnym przepływem: tabela w RDBMS → API REST → prosty frontend. 
Rodzaj aplikacji: projekt ma być aplikacją internetową (webową), czyli uruchamianą w przeglądarce. 
Charakter aplikacji - ma to być dynamiczna aplikacja przeglądarkowa, która komunikuje się z bazą danych poprzez REST API. 
To nie może być statyczna strona HTML —aplikacja ma umożliwiać:
a. dodawanie,
b. edycję,
c. wyświetlanie,
d. usuwanie obiektów (czyli pełny CRUD).
Baza danych - wymagana jest relacyjna baza danych(np. PostgreSQL, MySQL, H2, SQLite), w której przechowywane będą dane aplikacji.

Część A(CRUD end to end):
1) model+ tabela: zaprojektować encję (min. 4 pola, w tym id + 1 data/liczba + 1 text). Przygotować migrację SQL.
2) API REST: GET /entities, GET /entities/{id},
POST, PUT, DELETE (z poprawnymi kodami
HTTP i walidacją).
3) Frontend: prosta strona (HTML)
pozwalająca listować, dodawać, edytować,
usuwać Twoją encję przez API.
4) README: jak uruchomić (lokalnie + w
labie), opis endpointów, zrzut ekranu UI.
5) Repo i git: osobny folder/modulek na
każda encję, PR do main z opisem.
Kryteria akceptacji (A):
Migracja tworzy tabelę i działa na czystej bazie. Każdy endpoint zwraca sensowne błędy(404, 400) i waliduje dane. Ul pozwala wykonać pełny CRUD (żadnych ,,ręcznych POST-ów" w konsoli). README jest wystarczające, by odpalić projekt na komputerze w labie.

Część B(Zamiana kodu: drobne
rozszerzenie modułów):
Dodać 2 nowe pola (atrybuty) do encji.
Zaktualizować:
1.model/tabelę (dodać kolumny,
migracja SQL lub JPA update),
2. API REST (walidacja nowych pól,
prezentacja w JSON),
3. frontend (formularz dodawania/edycji
+ lista + szczegóły z nowymi polami)
4. README - dopisać sekcję o nowych
polach.
Kryteria akceptacji (B):
Zmiana jest czytelnie wydzielona (osobny PR), opisuje co i po co. Ul/endpoint działa w labie; README dopisane o nową funkcję. Nie psujesz istniejącej funkcjonalności projektów (krótki smoke-test).

Minimalne wymagania techniczne:
1)Relacyjna baza + migracje(SQL/Flyway/Liquibase).
2)REST API z poprawnymi kodami statusu i
walidacją wejścia.
3)Frontend (dowolny: czysty
HTML/Thymeleaf/React/Vue) wykonujący
wywołania CRUD do API.

Struktura repozytoriów i współpraca:
1)2 repozytorium.
2)Repozytorium zawiera całość projektu w
ramach wymagań A i B.
3)W etapie B klonujemy repozytorium
projektu, rozwija ten projekt (dodaje 2 nowe
pola), a następnie tworzymy Pull Request (PR) z opisem zmian.
Każdy PR musi zawierać:
opis dodanych pól i przyczyny zmian,
instrukcję testowania,
zrzut ekranu lub krótki film z działania w UI.
PR obu projektów traktowane są jak review w prawdziwych zespołach programistycznych - mają być czytelnę i kompletnie.

Oddanie i struktura repozytorium:
Monorepo z dwoma modułami (np./encja-A, /encja-B) albo jedno repo z rozdzielonymi folderami. Dwa PR-y dla A (po 1 z każdego projektu) + dwa PR-y dla B (zamiana). Każdy PR z opisem: zakres, jak testować, zrzut ekranu UI lub GIF. 

Szybka checklista dla prowadzącego:
Tabele tworzą się z migracji na czystej
bazie.
CRUD działa z poziomu UI (nie tylko
Postman).
Walidacja/błędy HTTP na miejscu.
README uruchamia projekt w labie.
PR „zamiana” (B) nie łamie funkcji partnera.
Wymaganie dodatkowe - wdrożenie online:
Każdy powinien udostępnić aplikacji w internecie, działającą na publicznym adresie (domena lub darmowa subdomena). Hosting i konfiguracja środowiska są częścią zadania - należy samodzielnie dobrać technologię i usługę. Wybór hostingu ma być praktyczny i uzasadniony to element oceny. Celem jest, aby projekt mógł być traktowany jak produkt komercyjny - z własnym adresem URL, dostępny publicznie.
