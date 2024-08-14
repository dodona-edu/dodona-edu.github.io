---
title: Oefening met bestanden
sidebarTitle: "Bestanden"
order: 5
---

# Oefening met bestanden

In deze handleiding stellen we een oefening op die gebruik maakt van bestanden.
Dit zowel op bestanden als invoer (dus de code van de studenten leest een bestand) en als uitvoer (de code van de studenten maakt en schrijft naar een bestand).
In dit voorbeeld gebruiken we de [commandoregel](/nl/guides/exercises/examples/command-line), maar het deel met bestanden is hetzelfde bij gebruik met andere soorten oefeningen, zoals functies of klassen.

Als voorbeeld implementeren we een programma dat een gesorteerde kopie van een bestand maakt.
We zullen deze oefening hier volledig uitwerken voor gebruik met Dodona.

We gaan er in deze handleiding van uit dat je al een werkende oefeningenrepository hebt.
Is dat niet het geval, volg dan eerst de handleiding [_Oefeningen opstellen_](/nl/guides/exercises/creating-exercises/introduction/).

Het resultaat van deze handleiding (de volledige oefening) kan je ook vinden in onze [repository met voorbeelden](https://github.com/dodona-edu/example-exercises/tree/master/tested/files/).

## 1. Structuur

Elke oefening in Dodona komt overeen met een bepaalde map in de oefeningenrepository.
Die map heeft een [vaste structuur](/nl/references/exercise-directory-structure), die we nu zullen maken.

Maak dus eerst een nieuwe map voor de oefening, die we `sort` zullen noemen.
Maak daarna, in deze nieuwe map, nog drie mappen:
- `description`: map waarin de opgave komt
- `evaluation`: map met informatie over hoe een oplossing beoordeeld moet worden
- `solution`: map waarin een voorbeeldoplossing komt
- `workdir`: map met bestanden ter beschikking van de oplossing

Hierna moet je repository er als volgt uitzien:

```
repository/
└── sort/
   ├── evaluation/
   ├── description/
   ├── solution/
   └── workdir/
```

## 2. Configuratie

Dodona eist voor elke oefeningen ook een [configuratiebestand](/nl/references/exercise-config).
Dit bestand bevat metadata, die door Dodona gebruikt worden.

Maak het bestand `config.json` in de map `sort` met de volgende inhoud:

```json
{
  "description": {
    "names": {
      "en": "Sort",
      "nl": "Sorteren"
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

- `description.names`: De **namen** van de oefening zoals getoond door Dodona in het Nederlands (_nl_) en in het Engels (_en_). In dit geval zijn de namen gelijk.
- `evaluation.handler`: We gebruiken TESTed als judge.
- `evaluation.test_suite`: Het testplan krijgt de naam `suite.yaml`.
- `programming_language`: De **programmeertaal** van de oefening: hier kies je in welke programmeertaal je de oplossingen wilt. In dit geval is dat Python.
- `access`: Het **toegangsniveau** is hier _private_. We kiezen voor een private oefening omdat dit maar een handleiding is, maar we moedigen aan om je oefeningen publiek (_public_) te zetten: dan kunnen andere leerkrachten er ook gebruik van maken (net zoals jij de keuze hebt uit duizenden publieke oefeningen op Dodona).

Nadat je dit bestand gemaakt hebt, zal je repository er zo uitzien:

```
repository/
└── sort/
   ├── evaluation/
   ├── description/
   ├── solution/
   ├── workdir/
   └── config.json
```

## 3. Opgave en voorbeeldoplossing

De volgende stap is de opgave van de oefening.
Dit krijgen leerlingen en studenten te zien wanneer ze de oefening willen oplossen en vertelt hen wat ze moeten doen.

Maak een bestand `description.nl.md` aan in de map `description` van de oefening, met volgende inhoud:

````markdown
Schrijf een Python-programma dat twee argumenten aanvaardt:

1. De naam van een gegeven bestand (het bronbestand).
2. De naam van een nieuw bestand (het doelbestand).

Het programma moet de inhoud van het bronbestand lezen, sorteren,
en de gesorteerde inhoud uitschrijven naar het doelbestand.
Als het doelbestand nog niet bestaat moet het aangemaakt worden,
anders moet het overschreven worden.

### Voorbeeld

```console
$ ./sorteer ongeordend.txt geordend.txt
$ cat ongeordend.txt
2
3
1
$ cat geordend.txt
1
2
3
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

bronbestandslocatie = sys.argv[1]
doelbestandslocatie = sys.argv[2]

with open(bronbestandslocatie, 'r') as bronbestand:
    inhoud = bronbestand.readlines()

inhoud.sort()

with open(doelbestandslocatie, 'w') as doelbestand:
    doelbestand.writelines(inhoud)
```


Nadat je deze twee bestanden gemaakt hebt, moet je repository er zo uitzien:

```
repository/
└── sort/
   ├── evaluation/
   ├── description/
   |  └── description.nl.md
   ├── solution/
   |  └── solution.py
   ├── workdir/
   └── config.json
```

## 4. Een testplan maken

We willen dat deze oefening automatisch getest wordt.
Hiervoor moeten we een testplan schrijven, waarin we Dodona vertellen welke testen we allemaal willen uitvoeren.
Als alle testgevallen geslaagd zijn, is de ingediende oplossing van de student volgens Dodona correct.

In dit voorbeeld gebruiken we slechts één testgeval om het kort te houden, waarbij we een ongesorteerd bestand gesorteerd willen zien.
In een echte oefening zal je nog een aantal extra testgevallen willen toevoegen, afhankelijk van de opgave.
Enkele voorbeelden zijn een bestand met meerdere keren dezelfde regel, een bestand met unicode, een bestand met hoofdletters en cijfers, enzovoort.

Maak een bestand `suite.yaml` in de map `evaluation` met volgende inhoud:

```yaml
- tab: "Sorteren"
  testcases:
  - arguments: ["ongesorteerd.txt", "gesorteerd.txt"]
    file:
      content: "oplossing.txt"
      location: "gesorteerd.txt"
    files:
    - name: "ongesorteerd.txt"
      url: "media/ongesorteerd.txt"
```

Een testplan wordt geschreven in YAML, en moet ook voldoen aan een bepaalde structuur.
In het voorbeeld hierboven maken we één tabblad met als naam "Sorteren", en definiëren één test.

Deze test bestaat uit drie grote stukken:

- Met `arguments` geven we de argumenten aan het programma door, met het eerste argument het bronbestand en het tweede argument het doelbestand.
- Met `file` geven we aan dat we willen controleren of het bestand "gesorteerd.txt" bestaat en of de inhoud overeenkomt met "oplossing.txt".
- Met `files` geven we aan dat we willen dat de tekst "ongesorteerd.txt" in de argumenten op Dodona vervangen wordt met een link naar dat bestand. Dit is optioneel, maar maakt het voor de studenten wel makkelijker om de oefening op te lossen.

::: warning
Momenteel is het nodig om het bronbestand zowel in de `workdir` (voor tijdens het beoordelen van de oplossing) en de map `description/media` te plaatsen (voor het tonen op Dodona). In de toekomst hopen we dit op te lossen.
Zie [hier](/nl/guides/exercises/testsuites/#bestanden-koppelen-aan-expressies) voor meer informatie.
:::

We hebben nu nog het bronbestand en het oplossingsbestand nodig.
Het bronbestand moet in de `workdir` komen, met de naam die we in het testplan gespecifieerd hebben: `ongesorteerd.txt`:

```txt
2
3
1
```

Plaats dit bestand ook in `description/media`.

Het oplossingsbestand is het bestand waarmee het doelbestand van de studenten mee vergeleken wordt.
Dit bestand moet in de map `evaluation` komen, met de naam die in het testplan staat: `oplossing.txt`:

```txt
1
2
3
```

Hierna ziet de repository er als volgt uit:

```
repository/
└── sort/
   ├── evaluation/
   |  ├── oplossing.txt
   |  └── suite.yaml
   ├── description/
   |  ├── media/
   |  |  └── ongesorteerd.txt
   |  └── description.nl.md
   ├── solution/
   |  └── solution.py
   ├── workdir/
   |  └── ongesorteerd.txt
   └── config.json
```

## 5. Wijzigingen opslaan

Vergeet niet om je wijzigingen te _committen_, anders gaan ze verloren!

Een voorbeeld van hoe je dit kan doen vind je [hier](/nl/guides/exercises/creating-exercises/exercise/#_5-wijzigingen-opslaan).
