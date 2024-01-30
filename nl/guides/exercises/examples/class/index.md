---
title: Oefening met klassen
sidebarTitle: Klassen
order: 4
---

# Oefening met klassen

In deze handleiding stellen we een oefening op die gebruik maakt van klassen.

We zullen een klasse `Counter` implementeren, waarin we een getal kunnen tellen.

We gaan er in deze handleiding van uit dat je al een werkende oefeningenrepository hebt.
Is dat niet het geval, volg dan eerst de handleiding [_Oefeningen opstellen_](/nl/guides/exercises/creating-exercises/introduction/).

Het resultaat van deze handleiding (de volledige oefening) kan je ook vinden in onze [repository met voorbeelden](https://github.com/dodona-edu/example-exercises/tree/master/tested/class/).

## 1. Structuur

Elke oefening in Dodona komt overeen met een bepaalde map in de oefeningenrepository.
Die map heeft een [vaste structuur](/nl/references/exercise-directory-structure), die we nu zullen maken.

Maak dus eerst een nieuwe map voor de oefening, die we `counter` zullen noemen.
Maak daarna, in deze nieuwe map, nog drie mappen:
- `description`: map waarin de opgave komt
- `evaluation`: map met informatie over hoe een oplossing beoordeeld moet worden
- `solution`: map waarin een voorbeeldoplossing komt

Hierna moet je repository er als volgt uitzien:

```
repository/
└── counter/
   ├── evaluation/
   ├── description/
   └── solution/
```

## 2. Configuratie

Dodona eist voor elke oefeningen ook een [configuratiebestand](/nl/references/exercise-config).
Dit bestand bevat metadata, die door Dodona gebruikt worden.

Maak het bestand `config.json` in de map `counter` met de volgende inhoud:

```json
{
  "description": {
    "names": {
      "en": "Counter",
      "nl": "Teller"
    }
  },
  "evaluation": {
    "handler": "tested",
    "test_suite": "suite.yaml"
  },
  "programming_language": "python",
  "access": "private"
}
```

In dit bestand worden een aantal dingen gespecifieerd:

- `description.names`: De **namen** van de oefening zoals getoond door Dodona in het Nederlands (_nl_) en in het Engels (_en_).
- `evaluation.handler`: We gebruiken TESTed als judge.
- `evaluation.test_suite`: Het testplan krijgt de naam `suite.yaml`.
- `programming_language`: De **programmeertaal** van de oefening: hier kies je in welke programmeertaal je de oplossingen wilt. In dit geval is dat Python.
- `acces`: Het **toegangsniveau** is hier _private_. We kiezen voor een private oefening omdat dit maar een handleiding is, maar we moedigen aan om je oefeningen publiek (_public_) te zetten: dan kunnen andere leerkrachten er ook gebruik van maken (net zoals jij de keuze hebt uit duizenden publieke oefeningen op Dodona).

Nadat je dit bestand gemaakt hebt, zal je repository er zo uitzien:

```
repository/
└── counter/
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
Schrijf een klasse `Counter`, waarmee we een telling kunnen doen.

Als een instantie van de klasse aangemaakt wordt,
kan de beginwaarde meegegeven worden aan de constructor.
De standaardwaarde is 0.

Daarnaast moet de klasse de volgende methoden ondersteunen:

- Een methode `count()` die de telling met één verhoogt.
  De methode moet de eigen instantie teruggeven.
- Een methode `report()` die de huidige telling schrijft naar `stdout`.

### Voorbeeld

```console?lang=python&prompt=>>>
>>> counter = Counter(5)
>>> counter.report()
5
>>> counter.count()
>>> counter.report()
6
>>> counter.count().count().count().count().report()
10
```
````

Als je ook een Engelstalige opgave wilt maken, gebruik je de naam `description.en.md` voor het tweede bestand.
De opgave zelf wordt geschreven in Markdown, een redelijk eenvoudig opmaakformaat. Meer informatie over Markdown is [hier](/nl/references/exercise-description) te vinden.

We voegen ook direct een voorbeeldoplossing toe.
Dit is niet verplicht, maar vaak is het wel handig om te hebben.
Leerlingen kunnen deze voorbeeldoplossing niet zien (tenzij je repository publiek staat natuurlijk).

Maak een bestand `solution.py` aan in de map `solution` met volgende inhoud:

```python
class Counter:
    def __init__(self, beginwaarde=0):
        self.teller = beginwaarde
    
    def count(self):
        self.teller += 1
        return self
    
    def report(self):
        print(self.teller)

```

Nadat je deze twee bestanden gemaakt hebt, moet je repository er zo uitzien:

```
repository/
└── counter/
   ├── evaluation/
   ├── description/
   |  └── description.nl.md
   ├── solution/
   |  └── solution.py
   └── config.json
```

## 4. Een testplan maken

We willen dat deze oefening automatisch getest wordt.
Hiervoor moeten we een testplan schrijven, waarin we Dodona vertellen welke testen we allemaal willen uitvoeren. Als alle testgevallen geslaagd zijn, is de ingediende oplossing van de student volgens Dodona correct.

Om dit kort te houden, beperken we ons testplan tot een aantal testen.
Maak een bestand `suite.yaml` in de map `evaluation` met volgende inhoud:

```yaml
- tab: "Counter"
  contexts:
    - testcases:
        - statement: "counter = Counter(5)"
        - statement: "counter.report()"
          stdout: "5"
        - statement: "counter.count()"
        - statement: "counter.report()"
          stdout: "6"
        - statement: "counter.count().count().count().count().report()"
          stdout: "10"
```

In dit testplan maken we één tabblad, met daarin een aantal testen.
Dit zijn dezelfde testen als in het voorbeeldje uit de opgave.

Hierna ziet de repository er als volgt uit:

```
repository/
└── counter/
   ├── evaluation/
   |  └── suite.yaml
   ├── description/
   |  └── description.nl.md
   ├── solution/
   |  └── solution.py
   └── config.json
```

## 5. Wijzigingen opslaan

Vergeet niet om je wijzigingen te _committen_, anders gaan ze verloren!

Een voorbeeld van hoe je dit kan doen vind je [hier](/nl/guides/exercises/creating-exercises/exercise/#_5-wijzigingen-opslaan).
