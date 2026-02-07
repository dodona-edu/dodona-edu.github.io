Het resultaat van deze handleiding (de volledige oefening) kan je ook vinden in onze [repository met voorbeelden](https://github.com/dodona-edu/example-exercises/tree/master/tested/function/).

## 1. Structuur

Elke oefening in Dodona komt overeen met een bepaalde map in de oefeningenrepository.
Die map heeft een [vaste structuur](/nl/references/exercise-directory-structure), die we nu zullen maken.

Maak dus eerst een nieuwe map voor de oefening, die we `minimum` zullen noemen.
Maak daarna, in deze nieuwe map, nog drie mappen:
- `description`: map waarin de opgave komt
- `evaluation`: map met informatie over hoe een oplossing beoordeeld moet worden
- `solution`: map waarin een voorbeeldoplossing komt

De map voor deze oefening moet er als volgt uitzien:

```
exercises/
└── minimum/
   ├── evaluation/
   ├── description/
   └── solution/
```

## 2. Configuratie

Dodona eist voor elke oefening ook een [configuratiebestand](/nl/references/exercise-config).
Dit bestand bevat metadata, die door Dodona gebruikt worden.

Maak het bestand `config.json` in de map `minimum` met de volgende inhoud:

```json
{
  "description": {
    "names": {
      "en": "Minimum",
      "nl": "Minimum"
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

In dit bestand worden een aantal dingen gespecificeerd:

- `description.names`: De **namen** van de oefening zoals getoond door Dodona in het Nederlands (_nl_) en in het Engels (_en_). In dit geval zijn de namen gelijk.
- `evaluation.handler`: We gebruiken TESTed als judge.
- `evaluation.test_suite`: Het testplan krijgt de naam `suite.yaml`.
- `programming_language`: De **programmeertaal** van de oefening: hier kies je in welke programmeertaal je de oplossingen wilt. In dit geval is dat Python.
- `access`: Het **toegangsniveau** is hier _private_. We kiezen voor een private oefening omdat dit maar een handleiding is, maar we moedigen aan om je oefeningen publiek (_public_) te zetten: dan kunnen andere leerkrachten er ook gebruik van maken (net zoals jij de keuze hebt uit duizenden publieke oefeningen op Dodona).

Nadat je dit bestand gemaakt hebt, zal je repository er zo uitzien:

```
exercises/
└── minimum/
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
Schrijf een functie `minimum` die twee getallen als argumenten aanvaardt.
Deze functie moet het kleinste geval van die twee teruggeven.

### Voorbeeld

```console?lang=python&prompt=>>>
>>> minimum(5, 6)
5
```
````

Als je ook een Engelstalige opgave wilt maken, gebruik je de naam `description.en.md` voor het tweede bestand.
De opgave zelf wordt geschreven in Markdown, een redelijk eenvoudig opmaakformaat. Meer informatie over Markdown is [hier](/nl/references/exercise-description) te vinden.

We voegen ook direct een voorbeeldoplossing toe.
Dit is niet verplicht, maar vaak is het wel handig om te hebben.
Leerlingen kunnen deze voorbeeldoplossing niet zien (tenzij je repository publiek staat natuurlijk).

Maak een bestand `solution.py` aan in de map `solution` met volgende inhoud:

```python
def minimum(a, b):
    if a < b:
        return a
    else:
        return b
```

Nadat je deze twee bestanden gemaakt hebt, moet je repository er zo uitzien:

```
exercises/
└── minimum/
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
Als alle testgevallen geslaagd zijn, is de ingediende oplossing van de student volgens Dodona correct.

In dit geval houden we het testplan kort, met slechts een beperkt aantal testgevallen.
In een echte oefening wil je waarschijnlijk meer testgevallen voorzien.

Maak een bestand `suite.yaml` aan in de map `evaluation` van de oefening, met volgende inhoud:

```yaml
- tab: "minimum"
  testcases:
    - expression: "minimum(5, 6)"
      return: 5
    - expression: "minimum(1.2, 1.96)"
      return: 1.2
    - expression: "minimum(1000000000, -5)"
      return: -5
    - expression: "minimum(-5, -6)"
      return: -6
    - expression: "minimum(6, 6)"
      return: 6
```

In dit testplan gebeuren een aantal dingen:

- De tabbladen vanop Dodona komen overeen met het testplan.
  Alle testgevallen zitten hier in één tabblad, met als naam "minimum".
- Er zijn 5 testgevallen.
- Voor elk testgeval definiëren we een expressie: wat er uitgevoerd moet worden.
  Hiervoor gebruik je de Python-syntax.
  In dit geval voeren we de functie die de leerlingen moeten maken uit met verschillende parameters.
- We definiëren ook de verwachte returnwaarde voor elk testgeval.

Finaal ziet de bestandsstructuur er dus als volgt uit:

```
exercises/
└── minimum/
   ├── evaluation/
   |  └── suite.yaml 
   ├── description/
   |  └── description.nl.md
   ├── solution/
   |  └── solution.py
   └── config.json
```
