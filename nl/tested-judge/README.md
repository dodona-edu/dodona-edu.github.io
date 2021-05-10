---
title: TESTed judge
description: "TESTed judge"
---

# TESTed: one judge to rule them all

TESTed is een *educational software testing framework* dat toelaat om 
oplossingen van een programmeeroefening te testen op basis van een
programmeertaal-onafhankelijk testplan. Dat betekent dat je de vereisten waaraan
oplossingen voor de oefening moeten voldoen slechts één keer moet vastleggen,
terwijl je toch oplossingen in verschillende programmeertalen automatisch kunt 
laten controleren. TESTed kan als afzonderlijke tool gebruikt worden, maar
integreert ook met de elektronische leeromgeving Dodona.

## Waarom TESTed?
Waarom zou je TESTed gebruiken om oefening aan te bieden?

TESTed kan gebruikt worden om een oefening in één programmeertaal aan te bieden
om de volgende redenen:
- Er bestaat geen specifieke judge voor de programmeertaal die je wenst te
  ondersteunen. Het is eenvoudig om TESTed uit te breiden met een
  [nieuwe programmeertaal](configure-new-programming-language) (het
  implementeren van een specifieke judge voor die programmeertaal is complexer).
- De testplannen kunnen eenvoudig beschreven worden met behulp van de
  [domeinspecifieke taal](dsl/).

TESTed kan ook gebruikt worden om een oefening in meerdere programmeertalen aan
te bieden om de volgende redenen:
- De oefening bevat enkel concepten die in (quasi) elke programmeertaal terug
  te vinden zijn.
- De nadruk van een oefening is gericht op het implementeren van algoritmen en
  niet op een specifieke programmeertaal, bijvoorbeeld het gebruik in de
  cursussen _Algoritmes en datastructuren_ en _Discrete algoritmen_.
- Om een oefening in meerdere programmeertalen aan te bieden hoeft er slechts
  één testplan te worden opgesteld.
  Daarnaast kan er ook gebruik gemaakt worden van [sjablonen voor de
  oefeningsbeschrijvingen](template-description/). Hierdoor moet er slechts
  eenmaal een beschrijving opgesteld worden, die dan per programmeertaal
  geïnstantieerd kan worden.

## Ondersteunde programmeertalen

Op dit moment ondersteunt **TESTed** de volgende programmeertalen:

* Bash 5.0.3
* C (gcc 8.3.0)
* Haskell (ghc 8.4.4)
* Java 11
* JavaScript (NodeJS v14)
* Kotlin 1.4.10
* Python 3.9

## Dodona programmeeroefeningen

In deze paragraaf zullen we beschrijven hoe een oefening voor Dodona aangeboden
kan worden met behulp van TESTed.

### 1. Git repository aanmaken

Als je oefeningen wil publiceren in Dodona, dan moet je ze opstellen in een Git
repository die aan Dodona gekoppeld is. Meerdere oefeningen kunnen vanuit
dezelfde repository gepubliceerd worden. Meer info hierover vind je in de
handleiding die beschrijft hoe je een
[nieuwe repository met oefeningen](../guides/teachers/new-exercise-repo)
aanmaakt voor Dodona.

### 2. Vaste mapstructuur

Dodona gebruikt een
[vaste map-structuur](../references/exercise-directory-structure) voor het
opstellen van programmeeroefeningen. Elk map in de Git repository met een
bestand `config.json` wordt door Dodona beschouwd als een leeractiviteit
die in het leerplatform moet gepubliceerd worden. In dat configuratiebestand
wordt onder andere vastgelegd welke judge aan de oefening gekoppeld wordt.

```
+-- oefening
|   +-- config.json           # configuratiebestand voor oefening
|   +-- evaluation            #
|   |   +-- testplan.yaml     # DSL-testplan
|   +-- description           #
|   |   +-- description.nl.md # Markdown beschrijving van oefening in het Nederlands
|   |   +-- description.en.md # Markdown beschrijving van oefening in het Engels
:   :   :
```

### 3. Judge configureren

Het configuren van een oefening volgt de algemene regels voor het
[configuratiebestand van een oefening](../references/exercise-config).
Daarnaast heeft TESTed enkele [specifieke opties](exercise-config).
Waaronder het verplichte veld `evaluation.testplan` welke de naam van het
testplanbestand bevat, welke zich in de `evaluation` map van de oefening
bevinden moet..

### 4. Testplan opstellen

TESTed ondersteunt een [domeinspecifieke taal](dsl) (DSL) om op een
eenvoudige manier testplannen te kunnen opstellen. In de meeste gevallen is dit
ook de aangewezen manier om testplannen op te stellen. TESTed ondersteunt ook
meer [geavanceerde testplannen](json) die meer flexibiliteit bieden maar ook
een stuk complexer zijn.

Het testplan van een programmeeroefening moet in de map `evaluation` geplaatst
worden. Bovenstaande map-structuur voor het sjabloon heeft bijvoorbeeld een
DSL-testplan `testplan.yaml`, waarvan de extensie verraadt dat het is opgesteld
in YAML.

## Documentatie

* [Configuratie-opties voor TESTed](exercise-config)
* [DSL-testplannen](dsl)
* [JSON-testplannen](json)
* [Sjabloonbeschrijvingen](template-description)
* [Meertalige programmeeroefeningen](template-exercise)

## Nieuwe programmeertaal toevoegen

TESTed is zo ontworpen dat je relatief eenvoudig de ondersteuning voor 
bijkomende programmeertalen kunt configureren. Hoe dit moet staat uitgebreid
beschreven in [deze handleiding](configure-new-programming-language). Aarzel
niet om ons te [contacteren](mailto:dodona@ugent.be) als je de configuratie van een
nieuwe programmeertaal wilt opzetten.
