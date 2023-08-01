---
title: Oefening met invoer-uitvoer
sidebarTitle: "Invoer-uitvoer"
order: 1
---

# Oefening met invoer en uitvoer

In deze handleiding stellen we een oefening op die gebruik maakt van invoer en uitvoer.

Een vaak gebruikt voorbeeld van een dergelijke oefening is de naam van de gebruiker vragen en die vervolgens een boodschap tonen waarin de naam staat.
We zullen deze oefening hier volledig uitwerken voor gebruik met Dodona.

We gaan er in deze handleiding van uit dat je al een werkende oefeningenrepository hebt.
Is dat niet het geval, volg dan eerst de handleiding [_Oefeningen opstellen_](/nl/guides/exercises/creating-exercises/introduction/).

## 1. Structuur

Elke oefening in Dodona komt overeen met een bepaalde map in de oefeningenrepository.
Die map heeft een [vaste structuur](/nl/references/exercise-directory-structure), die we nu zullen maken.

Maak dus eerst een nieuwe map voor de oefening, die we `hello-world` zullen noemen.
Maak daarna, in deze nieuwe map, nog twee mappen:
- `description`: de map waarin de opgave komt
- `evaluation`: map met informatie over hoe een oplossing beoordeeld moet worden
- `solution`: map waarin een voorbeeldoplossing komt

Hierna moet je repository er als volgt uitzien:

```
repository/
└── hello-world/
   ├── evaluation/
   ├── description/
   └── solution/
```

## 2. Configuratie

Dodona eist voor elke oefeningen ook een [configuratiebestand](/nl/references/exercise-config).
Dit bestand bevat metadata, die door Dodona gebruikt worden.

Maak het bestand `config.json` in de map `hello-world` met de volgende inhoud:

```json
{
  "description": {
    "names": {
      "en": "Hello World",
      "nl": "Hello World"
    }
  },
  "programming_language": "python",
  "access": "private"
}
```

In dit bestand worden drie dingen gespecifieerd:

- De naam van de oefening zoals getoond door Dodona in het Nederlands en in het Engels (in dit geval zijn beide namen hetzelfde).
- We stellen de naam van het testplan in (later meer hierover). Dit is een bestand relatief ten opzicht van de map `evaluation`.
- De programmeertaal van de oefening: hier kies je in welke programmeertaal je de oplossingen wilt. In dit geval is dat Python.
- Het toegangsniveau: hier _private_. We kiezen voor een private oefening omdat dit maar een handleiding is, maar we moedigen aan om je oefeningen publiek te zetten: dan kunnen andere leerkrachten er ook gebruik van maken (net zoals jij de keuze hebt uit duizenden publieke oefeningen op Dodona).

Nadat je dit bestand gemaakt hebt, zal je repository er zo uitzien:

```
repository/
└── hello-world/
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
Schrijf een Python-programma dat de naam van de gebruiker vraagt
en vervolgens de gebruiker begroet met de zin `Hallo, [NAAM]!`,
waarbij `[NAAM]` de naam van de gebruiker is.

Het programma moet de naam dus inlezen van standaardinvoer (stdin)
en de begroeting uitschrijven naar standaarduitvoer (stdout).

### Voorbeeld

```console
$ python programma.py
Jan
Hallo, Jan!
```
````

De `nl` in de naam van de opgave kan je vervangen door `en` als je ook een Engelstalige opgave wilt maken.
De opgave zelf wordt geschreven in Markdown, een redelijk eenvoudig opmaakformaat. Meer informatie over Markdown is [hier](/nl/references/exercise-description) te vinden.

We voegen ook direct een voorbeeldoplossing toe.
Dit is niet verplicht, maar vaak is het wel handig om te hebben.
Leerlingen kunnen deze voorbeeldoplossing niet zien (tenzij je repository publiek staat natuurlijk).

Maak een bestand `solution.py` aan in de map `solution` met volgende inhoud:

```python
naam = input()
print(f"Hallo, {naam}!")
```

Nadat je deze twee bestanden gemaakt hebt, moet je repository er zo uitzien:

```
repository/
└── hello-world/
   ├── evaluation/
   ├── description/
   |  └── description.nl.md
   ├── solution/
   |  └── solution.py
   └── config.json
```

## 4. Een testplan maken

We willen dat deze oefening automatisch getest wordt.
Hiervoor moeten we een testplan schrijven, waarin we Dodona vertellen welke testen we allemaal willen uitvoeren.

Deze oefening heeft natuurlijk een aantal voor de hand liggende testen, waarbij verschillende namen geprobeerd worden.
Ook kunnen we eens een naam met cijfers of speciale tekens invullen.
Nog een leuke naam is om een naam met dubbelen en enkele aanhalingstekens te proberen.
Ook een naam met _escaped newlines_ kunnen we proberen.

Om dit kort te houden, beperken we ons testplan tot zeven testen.
Maak een bestand `suite.yaml` in de map `evaluation` met volgende inhoud:

```yaml
- tab: "Testen"
  testcases:
  - stdin: "Jan"
    stdout: "Hallo, Jan!"
  - stdin: "Piet"
    stdout: "Hallo, Piet!"
  - stdin: "5236-hallo!"
    stdout: "Hallo, 5236-hallo!!"
  - stdin: "'wereld'"
    stdout: "Hallo, 'wereld'!"
  - stdin: '"wereld"'
    stdout: 'Hallo, "wereld"!'
  - stdin: "    "
    stdout: "Hallo,     !"
```

Een testplan wordt geschreven in YAML, en moet ook voldoen aan een bepaalde structuur.
In het voorbeeld hierboven maken we één tabblad met als naam "Testen", en definiëren zeven testen in dat tabblad:
- Testen 1 en 2 gebruiken twee namen.
- Test 3 gebruikt cijfers en leestekens.
- Test 4 gebruikt enkele aanhalingstekens.
- Test 5 gebruikt dubbele aanhalingstekens.
- Test 6 heeft een naam die enkel uit spaties bestaan.
- Test 7 heeft een naam met _escaped newlines_.

Elk nieuw testgeval begint met een liggend streepje: dit is in YAML de manier om een nieuw object te beginnen (je ziet dat ons tabblad ook een object is).
We maken dus een tabblad-object, waarin we een lijst van testgeval-objecten steken.

Hierna ziet de repository er als volgt uit:

```
repository/
└── hello-world/
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
