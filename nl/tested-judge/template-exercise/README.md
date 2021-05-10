---
title: "Oefeningssjabloon TESTed"
description: "Tutorial: Oefeningssjabloon TESTed"
---
::: warning Opmerking
Deze handleiding legt uit hoe je TESTed kunt gebruiken om programmeeroefeningen 
op te stellen in Dodona, waarvoor oplossingen kunnen ingediend worden in 
meerdere programmeertalen.

Ga naar [???]() als je TESTed wil gebruiken om programmeeroefeningen op te 
stellen in Dodona waarvoor enkel oplossingen moeten ingediend worden voor één
specifieke programmeertaal.
:::

# TESTed: programmeeroefeningen voor meerdere programmeertalen

TESTed is een **meertalige judge** die toelaat om een testplan op te stellen 
voor een programmeeroefening, waarmee oplossingen in meerdere programmeertalen 
kunnen beoordeeld worden. Het testplan wordt dus onafhankelijk opgesteld van een 
specifieke programmeertaal. Daardoor kan er automatisch feedback gegeven worden 
op de oefening, ongeacht de programmeertaal waarin een oplossing geschreven is. 

De meertaligheid is uiteraard beperkt tot de [lijst van programmeertalen](../) 
die TESTed ondersteunt. Maar als er later nieuwe programmeertalen geconfigureerd 
worden, dan kan TESTed meteen ook feedback geven voor oplossingen in die 
programmeertaal zonder dat het testplan van de oefening moet aangepast worden.

Niet alle programmeertalen ondersteunen dezelfde taalconstructies. TESTed 
ondersteunt gangbare taalconstructies die in de meeste programmeertalen 
teruggevonden worden. Als een testplan taalconstructies gebruikt die niet 
ondersteund wordt in een bepaalde programmeertaal, dan zal TESTed automatisch 
detecteren dat het voor dat testplan geen feedback kan geven op oplossingen in 
die programmeertaal.

## TESTed en Dodona 

In Dodona is er momenteel een één-op-één relatie tussen een programmeeroefening
en een programmeertaal. Als je dus in Dodona dezelfde oefening wil aanbieden 
voor meerdere programmeertalen, dan moet je voor elke programmeertaal een 
afzonderlijke versie van de oefening maken.

Deze handleiding legt uit hoe je op basis van één sjabloon met een testplan voor 
TESTed, automatisch afzonderlijke versies kan genereren voor een selectie van de 
programmeertalen die door TESTed ondersteund worden.

## 1. Git repository aanmaken

Als je oefeningen wil publiceren in Dodona, dan moet je ze opstellen in een Git 
repository die aan Dodona gekoppeld is. Meerdere oefeningen kunnen vanuit 
dezelfde repository gepubliceerd worden. Meer info hierover vind je in de 
handleiding die beschrijft hoe je een 
[nieuwe repository met oefeningen](../../guides/teachers/new-exercise-repo)
aanmaakt voor Dodona.

## 2. Map-structuur van het sjabloon

Dodona gebruikt een 
[vaste map-structuur](../../references/exercise-directory-structure) voor het
opstellen van programmeeroefeningen. Elk map in de Git repository met een 
bestand `config.json` wordt door Dodona beschouwd als een leeractiviteit
die in het leerplatform moet gepubliceerd worden. In dat configuratiebestand
wordt onder andere vastgelegd welke judge aan de oefening gekoppeld wordt.

We willen in eerste instantie geen programmeeroefening maken, maar een sjabloon 
waarmee we straks automatisch oefeningen voor verschillende programmeertalen 
zullen genereren. Dat sjabloon gebruikt ook de vaste map-structuur van Dodona, 
op één belangrijk detail na. Het bestand `config.json` wordt vervangen door een 
bestand `config.template.json`, zodat Dodona het sjabloon zelf niet als een 
oefening zal beschouwen. De map-structuur voor het sjabloon ziet er minimaal als 
volgt uit:

```
+-- sjabloon/oefening/map
|   +-- config.template.json       # configuratiebestand voor oefening
|   +-- evaluation                 #
|   |   +-- testplan.yaml          # DSL-testplan
|   +-- description                #
|   |   +-- description.nl.md.mako # sjabloon voor beschrijving van oefening in het Nederlands en in Markdown
|   |   +-- description.en.md.mako # sjabloon voor beschrijving van oefening in het Engels en in Markdown
:   :   :
```

## 2. Sjabloon configureren

Het configuratiebestand `config.template.json` van een sjabloon heeft dezelfde
inhoud als het 
[configuratiebestand van een oefening](../../references/exercise-config) 
(`config.json`), behalve dat er geen programmeertaal moet ingesteld worden. Het 
configuratiebestand ziet er bijvoorbeeld als volgt uit:

```json
{
  "access": "private",
  "description": {
    "names": {
      "en": "My exercise",
      "nl": "Mijn oefening"
    }
  },
  "evaluation": {
    "handler": "TESTed",
    "memory_limit": 500000000,
    "plan_name": "testplan.yaml"
  },
  "labels": []
}
```

Daarin zien we dat TESTed ingesteld werd als de judge (`evalaution.handler`) 
voor het beoordelen van ingediende oplossingen. Dit zal gebeuren op basis van
een testplan (`evaluation.testplan`) dat beschreven wordt in het bestand
(`testplan.yaml`). TESTed zal automatisch controleren of er voor het testplan
een oefening kan gegenereerd worden voor een specifieke programmeertaal.

Het `description`-veld met de Nederlandstalige en Engelstalige namen van de 
leeractiviteit zijn verplichte velden voor Dodona. Als TESTed op basis van het 
sjabloon een oefening genereert voor een specifieke programmeertaal, dan zal het
volledige configuratiebestand overgenomen worden als `config.json`, zal de
programmeertaal ingesteld worden via het vereiste veld `programming_language`, 
en zal de naam van de programmeertaal tussen ronde haakjes toegevoegd worden 
aan de naam van de oefening (voorafgegaan door een spaties). Voor de 
programmeertaal Java zal het voorbeeld configuratiebestand er dan als volgt 
uitzien:

```json
{
  "access": "private",
  "description": {
    "names": {
      "en": "My exercise (java)",
      "nl": "Mijn oefening (java)"
    }
  },
  "programming_language": "java",
  "evaluation": {
    "handler": "TESTed",
    "memory_limit": 500000000,
    "plan_name": "testplan.yaml"
  },
  "labels": []
}
```

## 3. Testplan opstellen

Het testplan van een programmeeroefening moet in de map `evaluation` geplaatst 
worden. TESTed gebruikt testplannen die onafhankelijk van een programmeertaal
opgesteld worden, waardoor een testplan rechtstreeks vanuit een sjabloon naar de 
gegenereerde oefeningen kan gekopieerd worden.

TESTed ondersteunt een [domeinspecifieke taal](../dsl) (DSL) om op een 
eenvoudige manier testplannen te kunnen opstellen. In de meeste gevallen is dit 
ook de aangewezen manier om testplannen op te stellen. TESTed ondersteunt ook 
meer [geavanceerde testplannen](../json) die meer flexibiliteit bieden maar ook 
een stuk complexer zijn.

Bovenstaande map-structuur voor het sjabloon heeft bijvoorbeeld een DSL-testplan
`testplan.yaml`, waarvan de extensie verraadt dat het is opgesteld in YAML.

## 4. Sjabloon voor beschrijving

De beschrijving van een programmeeroefening komt in een bestand dat begint met
`description` en dat in de map `description` geplaatst wordt. 

Qua internationalisering is Dodona zowel in het Nederlands als in het Engels 
beschikbaar. Als je in de beschrijving onderscheid wil maken tussen deze twee
talen, dan maak je twee bestanden. Het bestand met de Nederlandstalige 
beschrijving gebruikt de extensie `.nl` en het bestand met de Engelstalige
beschrijving gebruikt de extensie `.en`. Als een beschrijving niet moet inspelen
op de taalinstelling van Dodona, dan gebruik je geen specifieke taal-extensie.

Daarnaast heb je ook de keuze om de beschrijving op te stellen in Markdown 
(extensie `.md`) of in HTML (extensie `.html`).

::: tip Tip
Meer informatie over het opstellen van de beschrijving van een oefening vind je
in [deze handleiding](../../references/exercise-description). Als je nog een
keuze moet maken tussen Markdown of HTML, dan is Markdown veruit het 
eenvoudigste om mee te werken.
:::

Bij het opstellen van een oefening die in meerdere programmeertalen moet kunnen
opgelost worden, past de beschrijving zich idealiter ook aan aan de gekozen
programmeertaal. Deze aanpassing zit hem bijvoorbeeld in de gebruikte 
**conventie voor namen** (bv. *snake case* vs. *camel case*), de gebruikte 
**terminologie voor gegevenstypes** (bv. in Python spreekt men bv. van een 
*dictionary* (`dict`), waar men in Java spreekt van een hashmap (`HashMap`) of 
in JavaScript van een map (`Map`)), of de gebruikte **grammatica voor 
voorbeeldcode**.

TESTed laat toe om een [Mako sjabloon](../template-description) voor de 
beschrijving van een oefening op te stellen. Op basis daarvan kan TESTed dan 
automatisch de beschrijving genereren voor een specifieke programmeertaal. Als
je dit wenst te gebruiken, dan geef je het bestand met de beschrijving een extra
extensie `.mako`. Zo bevat het bestand `description.nl.md.mako` het sjabloon van
de Nederlandstalige beschrijving van een oefening in Markdown. 

Merk op dat het gebruik van Mako sjablonen een optie is: je kan ook nog altijd 
kiezen om de beschrijving van een programmeeroefening voor meerdere 
programmeertalen rechtstreeks in Markdown of HTML te schrijven, als het niet 
nodig blijkt om de beschrijving aan te passen aan de programmeertaal.

## 5. Programmeeroefeningen genereren

::: warning Opmerking
Dat we op basis van het sjabloon nog afzonderlijke oefeningen moeten genereren
voor elke programmeertaal, is een rechtstreeks gevolg van het feit dat Dodona
op dit ogenblik nog geen ondersteuning biedt om gebruikers te laten kiezen in
welke programmeertaal ze een programmeeroefeningen zullen oplossen. Als Dodona
dit in de toekomst wel zou mogelijk maken, dan wordt deze stap zelfs overbodig.
:::

Met het sjabloon dat je in vorige stappen opgesteld hebt, kan je nu automatisch 
Dodona-oefeningen genereren voor een selectie van programmeertalen. Daarvoor 
gebruik je een Python-script uit de 
[git repository](https://github.com/dodona-edu/universal-judge) van TESTed.
Dit script kan op de volgende manier uitgevoerd worden in de root directory van
de repository:

```shell
$ python3 -m tested.instantiate_exercise <sjabloon> <oefening>
```

Dit script gebruikt het sjabloon in de map `<sjabloon>` om per geselecteerde
programmeertaal een oefening te genereren in de map 
`<sjabloon>/<programmeertaal>`. Het script heeft de volgende opties:

- `-i`, `--programming_languages_included`: Lijst van programmeertalen waarvoor 
  een oefening mag gegenereerd worden als het testplan dit toelaat. Standaard
  zijn dit alle programmeertalen die TESTed ondersteunt.
- `-e`, `--programming_languages_excluded`: Lijst van programmeertalen waarvoor 
  geen oefening mag gegenereerd mag worden. Standaard is dit een lege lijst.
- `-n`, `--i18n`: Natuurlijke taal die standaard gebruikt wordt voor het
  genereren van beschrijvingen uit Mako sjablonen als de taal niet kan afgeleid 
  worden uit de bestandsextensie. Mogelijke argumenten zijn `en` (Engels; 
  standaardwaarde) en`nl` (Nederlands).
- `-H`, `--human_readable`: Een JSON-testplan dat gegenereerd wordt uit een 
  DSL-testplan zal zo leesbaar mogelijk opgemaakt worden.
- `-b`, `--backup_descriptions`: Bewaar de originele beschrijvingen uit de map
  `description` van het sjabloon in een map `description.bak` van een 
  gegenereerde oefening.
