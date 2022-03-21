---
title: TESTed judge
description: "TESTed judge"
---

# TESTed: one judge to rule them all

TESTed is een *educational software testing framework* (een *judge*) dat toelaat om oplossingen van een programmeeroefening te testen op basis van een programmeertaalonafhankelijk testplan.
Dat betekent dat je de vereisten waaraan oplossingen voor de oefening moeten voldoen slechts één keer moet vastleggen,
terwijl je toch oplossingen in verschillende programmeertalen automatisch kunt laten controleren.
TESTed kan als afzonderlijke tool gebruikt worden, maar integreert ook met de elektronische leeromgeving Dodona.

## Wanneer gebruik je TESTed?

In welke omstandigheden kan je TESTed gebruiken om programmeeroefeningen aan te bieden?
In de eerste plaats moet TESTed de programmeertaal die je wilt gebruiken ondersteunen.
Momenteel zijn dat volgende programmeertalen:

* Bash
* C (gcc)
* Haskell (ghc)
* Java
* JavaScript (NodeJS)
* Kotlin
* Python

Doordat de programmeeroefeningen in TESTed programmeertaalonafhankelijk zijn, is TESTed het best geschikt voor volgende soorten oefeningen:

- Oefeningen die vooral concepten bevatten die in (bijna) elke programmeertaal terug te vinden zijn.
- Oefeningen waarbij de nadruk ligt op het implementeren van algoritmen of andere concepten, en minder op de programmeertaal zelf.

TESTed is minder geschikt voor oefeningen met een focus op programmeertaalspecifieke concepten.
Zo zal een oefening over pointers in C niet werken in TESTed.

## Van start met TESTed

In de paragraaf hieronder volgt een tutorial om zelf een oefening op te stellen met TESTed binnen Dodona.
Als je TESTEd wilt gebruiken buiten Dodona volg je best de [tutorial in de repository](https://github.com/dodona-edu/universal-judge).

Ook nuttig zijn een aantal referentiegidsen:

- [De configuratie-opties](./references/exercise-config)
- [Formaat van geavanceerde testplannen](../../../en/tested/references/json) (Engels)
- [Formaat van eenvoudige testplannen](../../../en/tested/references/dsl) (experimenteel, Engels)

Wil je aan TESTed zelf werken?
Dan zijn volgende zaken interessant:

- De [installatie-instructies](https://github.com/dodona-edu/universal-judge) in de repo om TESTed lokaal uit te voeren.
- [Handleiding voor het toevoegen van een programmeertaal](../../en/tested/new-programming-language) (enkel in het Engels).

## Oefeningen opstellen voor TESTed

::: tip
In deze handleiding gaan we ervan uit dat je TESTed gebruikt in Dodona.
Als dat niet het geval is, verwijzen we je door naar de tutorial in de [tutorial in de repository](https://github.com/dodona-edu/universal-judge).
:::

Om deze handleiding te volgen heb je het volgende nodig op je systeem:

- `git` - om de oefeningen op Dodona te krijgen. Meer informatie kan je vinden in [hoofdstuk 1 van het boek *Pro Git*](https://git-scm.com/book/nl/v2/Aan-de-slag-Git-installeren), dat uitlegt hoe je Git installeert voor verschillende besturingssystemen (Mac, Windows, Linux).
- een tekstverwerker (zoals Notepad++) om tekstbestanden aan te maken en te bewerken

In deze tutorial leggen we uit hoe je een eenvoudige oefening kunt maken met TESTed en die in Dodona beschikbaar stellen.
De oefening die we maken is "schrijf".
Interessant is om de opgave te lezen:

> Schrijf een functie `schrijf` die steeds zijn argument naar standaarduitvoer schrijft.
> Het argument van de functie zal steeds een string zijn.

Een juiste oplossing in een aantal programmeertalen hiervoor is:

:::: tabs
::: tab Bash
```bash
function schrijf {
    echo "$1"
}
```
:::
::: tab C
```c
#include <stdio.h>

void schrijf(char* wat) {
    printf("%s", wat);
}
```
:::
::: tab Haskell
```haskell
schrijf = putStrLn
```
:::
::: tab Java
```java
class Submission {
    public static void schrijf(String wat) {
        System.out.println(wat);
    }
}
```
:::
::: tab JavaScript
```javascript
function schrijf(wat) {
  console.log(wat);
}
```
:::
::: tab Kotlin
```kotlin
fun schrijf(wat: String) {
    println(wat)
}
```
:::
::: tab Python
```python
def schrijf(argument):
    print(argument)
```
:::
::::

Deze oplossingen willen we dus kunnen beoordelen met TESTed in Dodona.

### 1. Git-repository

Dodona maakt gebruik van een Git-repository om oefeningen te beheren.
Volg hiervoor de handleiding [_Een nieuwe repository met oefeningen maken_
](../../guides/teachers/new-exercise-repo). Eens die gemaakt is, kan je terugkeren naar deze handleiding.

### 2. Mappenstructuur

In de repository die je net gemaakt hebt, moeten we de juiste mappenstructuur aanmaken.
Maak deze nieuwe mappen in de repository:

```
├── schrijf/          # Map voor de nieuwe oefening
|   ├── evaluation/
|   └── description/
```

Dit is de mappenstructuur van Dodona; meer informatie vind je in de [referentie](../../references/exercise-directory-structure).

### 3. Configuratieopties

Om aan Dodona duidelijk te maken dat we een oefening aan het opstellen zijn, moeten we een configuratiebestand toevoegen.
Dit bestand bevat een aantal opties en wat metadata, die gebruikt worden door Dodona.

Maak een nieuw bestand `config.json` aan in de map `schrijf`, met volgende inhoud:

```json
{
  "description": {
    "names": {
      "en": "Write",
      "nl": "Schrijf"
    }
  },
  "evaluation": {
    "plan_name": "testplan.json"
  },
  "programming_language": "python",
  "access": "private"
}
```

We doen hier vier dingen:

1. We geven een naam aan de oefening, in het Nederlands en in het Engels.
2. We geven mee waar het testplan zich bevindt in de oefening (`testplan.json`).
   Dit is altijd relatief ten opzichte van de map `schrijf/evaluation`.
3. We stellen de standaardprogrammeetaal in op Python. Hoewel TESTed meerdere programmeertalen ondersteunt, is dat voor Dodona nog niet het geval.
4. We stellen in dat het om een private oefening gaat.

### 4. De opgave schrijven

De opgave van een oefening beschrijft voor de studenten wat ze moeten doen.
Dit is opnieuw iets van Dodona; er is niets specifiek voor TESTed aan.
Meer informatie is opnieuw te vinden in de [relevante handleiding](../../references/exercise-description).

Voor het gemak zullen we de opgave van hierboven overnemen, aangevuld met een voorbeeldje.
Maak dus het bestand `schrijf/description/description.nl.md` aan met volgende inhoud:

````markdown
Schrijf een functie `schrijf` die steeds zijn argument naar standaarduitvoer schrijft.

Het argument van de functie zal steeds een string zijn.

### Voorbeeld in Python

```pycon
>>> schrijf("5"); 
"5"
>>> schrijf("ok");
"ok"
```
````

Ter controle, de bestandsstructuur moet er als volgt uitzien na deze stap:

```
├── schrijf/
|   ├── config.json
|   ├── evaluation/
|   ├── description/
|   |   └── description.nl.md
```

### 5. Het testplan opstellen

Nu komen we bij het belangrijkste deel van een oefeningen opstellen: het testplan.
Dit testplan bevat alle testgevallen die uitgevoerd zullen worden op een oplossing om te controleren of deze oplossing al dan niet juist is.

Om deze tutorial kort te houden, beperken we ons tot één testgeval, maar in een echte oefeningen zullen dit er meer zijn.

Maak een nieuw bestand `evaluation/testplan.json` met volgende inhoud:

```json
{
 "tabs": [
  {
   "name": "Schrijf",
   "runs": [
    {
     "contexts": [
      {
       "testcases": [
        {
         "input": {
          "type": "function",
          "name": "schrijf",
          "arguments": [
           {
            "type": "text",
            "data": "input-1"
           }
          ]
         },
         "output": {
          "stdout": {
           "type": "text",
           "data": "input-1"
          }
         }
        }
       ]
      }
     ]
    }
   ]
  }
 ]
}
```

Dit testplan definieert een aantal dingen:

1. We hebben één tabblad, met als naam _Schrijf_.
2. In dat tabblad definiëren we 1 testgevallen.
3. In het testgeval roepen we de functie `schrijf` op met één argument, de string `input-1`.
   Eigenlijk staat hier `schrijf("input-1")`.
4. We verwachten `input-1` te vinden op stdout.

Nu ziet de bestandsstructuur er als volgt uit:

```
├── schrijf/
|   ├── config.json
|   ├── evaluation/
|   |   └── testplan.json
|   ├── description/
|   |   └── description.nl.md
```

### 6. Oefening op Dodona zetten

Nu moeten we deze wijzigingen committen met `git`:

```bash
$ git add .
$ git commit -m "Mijn eerste oefening"
```

Vervolgens moeten we de wijzigingen nog naar je repository pushen:

```bash
$ git push
```

Deze oefening is nu klaar.
Als alles goed ging, zul je deze oefening nu kunnen gebruiken op Dodona.
