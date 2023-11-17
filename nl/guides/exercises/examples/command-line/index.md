---
title: Oefening op commandoregel
sidebarTitle: Commandoregel
order: 4
---

# Oefening op de commandoregel

In deze handleiding stellen we een oefening op die gebruik maakt van argumenten op de commandoregel.

We zullen een programma implementeren dat een aantal getallen binnenkrijgt als argumenten op de commandoregel.
Het programma moet vervolgens de som van deze getallen uitschrijven op _stdout_.

We gaan er in deze handleiding van uit dat je al een werkende oefeningenrepository hebt.
Is dat niet het geval, volg dan eerst de handleiding [_Oefeningen opstellen_](/nl/guides/exercises/creating-exercises/introduction/).

Het resultaat van deze handleiding (de volledige oefening) kan je ook vinden in onze [repository met voorbeelden](https://github.com/dodona-edu/example-exercises/tree/master/tested/command-line/).

## 1. Structuur

Elke oefening in Dodona komt overeen met een bepaalde map in de oefeningenrepository.
Die map heeft een [vaste structuur](/nl/references/exercise-directory-structure), die we nu zullen maken.

Maak dus eerst een nieuwe map voor de oefening, die we `sum` zullen noemen.
Maak daarna, in deze nieuwe map, nog drie mappen:
- `description`: map waarin de opgave komt
- `evaluation`: map met informatie over hoe een oplossing beoordeeld moet worden
- `solution`: map waarin een voorbeeldoplossing komt

Hierna moet je repository er als volgt uitzien:

```
repository/
└── sum/
   ├── evaluation/
   ├── description/
   └── solution/
```

## 2. Configuratie

Dodona eist voor elke oefeningen ook een [configuratiebestand](/nl/references/exercise-config).
Dit bestand bevat metadata, die door Dodona gebruikt worden.

Maak het bestand `config.json` in de map `sum` met de volgende inhoud:

```json
{
  "description": {
    "names": {
      "en": "Sum of numbers",
      "nl": "Som van getallen"
    }
  },
  "programming_language": "python",
  "access": "private"
}
```

In dit bestand worden drie dingen gespecifieerd:

- De **namen** (_names_) van de oefening zoals getoond door Dodona in het Nederlands (_nl_) en in het Engels (_en_).
- De **programmeertaal** (_programming_language_) van de oefening: hier kies je in welke programmeertaal je de oplossingen wilt. In dit geval is dat Python.
- Het **toegangsniveau** (_access_): hier _private_. We kiezen voor een private oefening omdat dit maar een handleiding is, maar we moedigen aan om je oefeningen publiek (_public_) te zetten: dan kunnen andere leerkrachten er ook gebruik van maken (net zoals jij de keuze hebt uit duizenden publieke oefeningen op Dodona).

Nadat je dit bestand gemaakt hebt, zal je repository er zo uitzien:

```
repository/
└── sum/
   ├── evaluation/
   ├── description/
   ├── solution/
   └── config.json
```

## 3. Opgave en voorbeeldoplossing

De volgende stap is de opgave van de oefening.
Dit krijgen leerlingen en studenten te zien wanneer ze de oefening willen oplossen en vertelt hen wat ze moeten doen.

Maak een bestand `description.nl.md` aan in de map `description` van de oefening, met volgende inhoud:

````markdown
Schrijf een programma `sum` dat de som van een reeks getallen uitschrijft op `stdout`.
Deze getallen worden als argumenten aan het programma meegegeven.

Als een van de argumenten geen geheel getal is, moet een foutboodschap uitgeschreven worden op `stderr`: `invalid arguments`.
In dat geval moet de exitcode van het programma ook `1` zijn.

### Voorbeeld

```console
$ ./sum -1 -23 72 84 -38 -61 49 45
127
$ ./sum
0
$ ./sum spam eggs beacon
invalid arguments
```
````

Als je ook een Engelstalige opgave wilt maken, gebruik je de naam `description.en.md` voor het tweede bestand.
De opgave zelf wordt geschreven in Markdown, een redelijk eenvoudig opmaakformaat. Meer informatie over Markdown is [hier](/nl/references/exercise-description) te vinden.

We voegen ook direct een voorbeeldoplossing toe.
Dit is niet verplicht, maar vaak is het wel handig om te hebben.
Leerlingen kunnen deze voorbeeldoplossing niet zien (tenzij je repository publiek staat natuurlijk).

Maak een bestand `solution.py` aan in de map `solution` met volgende inhoud:

```python
import sys

som = 0

for getal in sys.argv[1:]:
    try:
        som += int(getal)
    except ValueError:
        sys.stderr.write("invalid arguments")
        sys.exit(1)

print(som)

```

Nadat je deze twee bestanden gemaakt hebt, moet je repository er zo uitzien:

```
repository/
└── sum/
   ├── evaluation/
   ├── description/
   |  └── description.nl.md
   ├── solution/
   |  └── solution.py
   └── config.json
```

## 4. Een testplan maken

We willen dat deze oefening automatisch getest wordt.
Hiervoor moeten we een testplan schrijven, waarin we Dodona vertellen welke testen we allemaal willen uitvoeren. Als alle testgevallen geslaagd zijn, is de indiening van de student volgens Dodona correct.

Om dit kort te houden, beperken we ons testplan tot een aantal testen.
Maak een bestand `suite.yaml` in de map `evaluation` met volgende inhoud:

```yaml
- tab: "sum"
  testcases:
  - arguments: ["-1", "-23", "72", "84", "-38", "-61", "49", "45"]
    stdout: "127"
  - arguments: []
    stdout: "0"
  - arguments: ["spam", "eggs", "bacon"]
    stderr: "invalid arguments"
    exit_code: 1
```

Hierna ziet de repository er als volgt uit:

```
repository/
└── sum/
   ├── evaluation/
   |  └── suite.yaml
   ├── description/
   |  └── description.nl.md
   ├── solution/
   |  └── solution.py
   └── config.json
```

## 5. Wijzigingen opslaan

Vergeet niet om je wijzigingen te committen, anders gaan ze verloren!

Een voorbeeld van hoe je dit kan doen vind je in [hier](/nl/guides/exercises/creating-exercises/exercise/#_5-wijzigingen-opslaan).
