---
title: TESTed-judge
description: "De TESTed-judge"
---

# TESTed: one judge to rule them all

::: tip
Dit is de uitgebreide documentatie voor de TESTed-judge. Een handleiding die gericht is op leerkrachten die voor het eerst een oefening opstellen is beschikbaar in [deze handleiding](/nl/guides/exercises/).
:::

TESTed is een *educational software testing framework* (ook bekend als een *judge*) dat toelaat om oplossingen voor programmeeroefeningen te beoordelen op basis van een programmeertaalonafhankelijk testplan.
Het laat om de softwarevereisten (d.w.z. de testen) voor een oefening één keer op te stellen, terwijl oplossingen in verschillende programmeertalen beoordeeld kunnen worden.
TESTed kan als afzonderlijk tool gebruikt worden, maar is ook geïntegreerd in de elektronische leeromgeving [Dodona](https://dodona.be).

## Wanneer gebruik je TESTed?

In de eerste plaats moet TESTed de programmeertaal die u wilt gebruiken ondersteunen.
Momenteel zijn dat volgende programmeertalen:

* Bash
* C (gcc)
* Haskell (ghc)
* Java
* JavaScript (NodeJS)
* Kotlin
* Python
* C# (.NET)

Doordat de programmeeroefeningen die beoordeeld worden met TESTed programmeertaalonafhankelijk zijn, is TESTed het best geschikt voor volgende soorten oefeningen:

- Oefeningen op generieke concepten die in (bijna) alle programmeertalen voorkomen.
- Oefeningen waarbij de nadruk ligt op algoritmen of programmeerconcepten op hoog niveau, niet op specifieke syntaxis of constructies van bepaalde programmeertalen.

TESTed is dus minder geschikt voor oefeningen met een focus op programmeertaalspecifieke concepten of syntaxis.
Zo zal een oefening over pointers in C niet goed werken met TESTed.

## Van start gaan

De volgende paragraaf is een korte handleiding over het zelf opstellen van een oefening met TESTed voor gebruik binnen Dodona.
Als u TESTed wenst te gebruiken buiten Dodona, raden we aan [deze handleiding](https://github.com/dodona-edu/universal-judge) te volgen.

Een aantal technische specificaties zijn ook beschikbaar:

- [Configuratie-opties](/nl/references/tested/exercise-config)
- [Referentie voor DSL-testplannen](/nl/references/tested/dsl) (aanbevolen)
- [Referentie voor geavanceerde testplannen](/en/references/tested/json) (niet aanbevolen voor algemeen gebruik)
- [Gegevenstypes voor programmeertalen](/nl/references/tested/types)

Nuttige handleidingen als u aan TESTed zelf wilt werken:

- De [installatie-instructies](https://github.com/dodona-edu/universal-judge) in om TESTed lokaal uit te voeren.
- Een [handleiding over het toevoegen van een programmeertaal](/en/references/tested/new-programming-language) (enkel in het Engels).

## Oefeningen ontwerpen voor Dodona

::: tip
In deze korte handleiding gaan we er van uit dat u TESTed binnen Dodona zult gebruiken.
Als u TESTed als afzonderlijke tool wilt gebruiken, verwijzen we u door naar de tutorial in de [tutorial in de repository](https://github.com/dodona-edu/universal-judge).
:::

### Systeemvereisten

Om deze handleiding te volgen hebt u het volgende nodig op uw systeem:

- `git` - om de oefeningen naar Dodona te _pushen_. Meer informatie kunt u vinden in [hoofdstuk 1 van het boek *Pro Git*](https://git-scm.com/book/nl/v2/Aan-de-slag-Git-installeren), dat uitlegt hoe u Git installeert voor verschillende besturingssystemen (Mac, Windows, Linux).
- een tekstverwerker (zoals Notepad++) om tekstbestanden aan te maken en te bewerken

We zullen uitleggen hoe u een eenvoudige programmeeroefening kunt opstellen, die van automatische feedback wordt voorzien door TESTed, alsook hoe u deze oefening beschikbaar stelt op Dodona.
De oefening heet "echo" en heeft de volgende opgave:

> Schrijf een functie `echo` die steeds haar argument naar standaarduitvoer schrijft.

Hier zijn een aantal correcte oplossingen voor deze oefeningen in een handvol programmeertalen:

::: code-group

```bash [Bash]
function echo {
    echo "$1"
}
```

```c [C]
#include <stdio.h>

void echo(char* wat) {
    printf("%s", wat);
}
```

```haskell [Haskell]
echo = putStrLn
```

```java [Java]
class Submission {
    public static void echo(String wat) {
        System.out.println(wat);
    }
}
```

```javascript [JavaScript]
function echo(wat) {
  console.log(wat);
}
```

```kotlin [Kotlin]
fun echo(wat: String) {
    println(wat)
}
```

```python [Python]
def echo(argument):
    print(argument)
```

```csharp [C#]
using System;

class Submission
{
    public static void Echo(string content)
    {
        Console.WriteLine(content);
    }
}
```

:::

Deze oplossingen willen we beoordelen met TESTed.

### 1. Git-repository

Dodona gebruikt Git-repository's om oefeningen te beheren.
Volg de handleiding [_Een nieuwe repository met oefeningen maken_](/nl/guides/exercises/new-exercise-repo)
en keer terug naar deze handleiding eens uw repository gemaakt is.

### 2. Mappenstructuur

Nu moeten we de juiste mappenstructuur maken voor Dodona-oefeningen in de repository die u zonet maakte.
Maak deze mappen:

```
├── echo/          # Map voor de nieuwe oefening
|   ├── evaluation/
|   └── description/
```

Dit is de mappenstructuur van Dodona voor oefeningen.
Meer informatie is te vinden in [_Oefeningmap-structuur_](/nl/references/exercise-directory-structure).

### 3. Configuratieopties

Om Dodona duidelijk te maken dat we een oefening maken, moeten we een configuratiebestand toevoegen aan de map `echo`.
Dit bestand bevat een aantal opties en wat metadata, die gebruikt worden door Dodona.

Maak een nieuw bestand `config.json` aan in de map `echo`, met volgende inhoud:

```json
{
  "description": {
    "names": {
      "en": "Echo",
      "nl": "Echo"
    }
  },
  "evaluation": {
    "plan_name": "tests.yaml"
  },
  "programming_language": "python",
  "access": "private"
}
```

Dit configuratiebestand specifieert, in volgorde:

1. Een naam voor de oefening in het Nederlands en het Engels.
2. Het pad naar het testplan (`tests.yaml`), relatief ten opzichte van de map `echo/evaluation`.
3. We stellen de standaardprogrammeetaal in op Python.
   Hoewel TESTed meerdere programmeertalen ondersteunt,
   is Dodona beperkt tot één programmeertaal per oefening.
4. Private toegang voor de oefening.
   We beperken de toegang omdat dit een handleiding is,
   maar we moedigen het publiek beschikbaar stellen van oefeningen op Dodona aan.

Zie [_Oefeningconfiguratie_](/nl/references/exercise-config) voor meer details over de configuratieopties voor Dodona-oefeningen.
Ook de [opties die eigen zijn aan TESTed](/nl/references/tested/exercise-config) kunnen interessant zijn.

### 4. Opgave

De opgave zegt hoe studenten de oefening moeten oplossen.
We zullen de opgave van hiervoor gebruiken en een voorbeeld toevoegen.
Maak een bestand `echo/description/description.nl.md` met volgende inhoud:

````markdown
Schrijf een functie `echo` die steeds haar argument naar standaarduitvoer schrijft.

### Voorbeeld in Python

```pycon
>>> echo("5");
"5"
>>> echo("OK");
"OK"
```
````

Ter controle, de bestandsstructuur moet er nu als volgt uitzien:

```
├── echo/
|   ├── config.json
|   ├── evaluation/
|   ├── description/
|   |   └── description.nl.md
```

Dit is opnieuw Dodona-specifiek en heeft niets te maken met TESTed.
Zie [_Oefeningbeschrijvingen_](/nl/references/exercise-description) voor meer informatie over opgaven voor Dodona-oefeningen.

### 5. Testplan

Een testplan opstellen is het deel van ontwerpen van een Dodona-oefening dat sterk afhangt van welke judge er gebruikt wordt.
Daarom moeten we het TESTed-formaat voor testplannen volgen.
Een testplan bevat alle testgevallen die uitgevoerd zullen worden op een oplossing om te controleren of deze oplossing al dan niet juist is.

Om deze handleiding kort te houden, beperken we ons tot een testplan met één enkel testgeval.
In een echte oefening zou het testplan veel meer testgevallen bevatten.
Maak een nieuw bestand `evaluation/tests.yaml` met volgende inhoud:

```yaml
- tab: "Echo"
  testcases:
     - expression: "echo('input-1')"
       stdout: "input-1"
```

Dit testplan definieert zegt:

1. Alle feedback is verzameld in één tabblad met naam _Echo_.
2. Het tabblad bevat feedback voor één testgeval.
3. Het testgeval roept we de functie `echo` op met een string `"input-1"` als argument.
4. Het verwachte resultaat is dat de tekst `input-1` op stdout geschreven wordt.

Nu ziet de bestandsstructuur er als volgt uit:

```
├── echo/
|   ├── config.json
|   ├── evaluation/
|   |   └── tests.yaml
|   ├── description/
|   |   └── description.nl.md
```

### 6. Toevoegen aan Dodona

We committen de nieuwe oefening met de volgende commando's van `git`:

```bash
$ git add .
$ git commit -m "Mijn eerste oefening"
```

Vervolgens pushen we de wijzigingen in de repository naar Dodona:

```bash
$ git push
```

Deze oefening is nu helemaal klaar en beschikbaar op Dodona als een private oefening, klaar om aan de leerpaden van uw cursussen toegevoegd te worden.
