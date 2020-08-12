---
title: Repository bestandenstructuur
description: "Repository bestandenstructuur Dodona"
---

# Repository bestandenstructuur

Een repository bevat alle folders en bestanden waaruit een vak bestaat. We verwachten dat deze folders volgende structuur hebben:

- **Een `dirconfig.json` bestand**: dit bestand bevat de globale [oefeningenconfiguratie](/nl/references/exercise-config). Deze configuratie zal samengevoegd worden met het `config.json`-bestand in een oefeningenfolder. De waarden in dit bestand kunnen overschreven worden door deze in de configuratiebestanden van de kindfolders.
- **Een folder `public`**: deze folder bevat bestanden die relevant zijn voor de hele cursus of reeks:
Hier kan je afbeeldingen of andere zaken toevoegen waar je naar kan refereren vanuit een cursusbeschrijving of een reeksbeschrijving. De URL van deze bestanden vind je op de pagina van de repository op Dodona. Dit zijn publieke bestanden, dus ze mogen geen confidentiële informatie bevatten.
- **Een folder `media`**: deze folder bevat media-bestanden die gebruikt kunnen worden in alle oefeningenbeschrijvingen binnen deze repository. Dodona zal automatisch terugvallen op deze folder indien er in een beschrijving gerefereerd wordt naar een media-item dat niet gevonden wordt in de media-folder van die specifieke oefening.
- **Optioneel meerdere `oefening`folders**: deze folders bevatten de informatie voor de individuele oefeningen. Voor meer informatie betreffende hun structuur, gelieve de pagina met de [oefeningenfolderstructuur](/nl/references/exercise-directory-structure).

Dodona negeert andere bestanden en folders. Je kan dus zorgeloos andere bestanden toevoegen (bijvoorbeeld bestanden met de oplossing voor je oefeningen) or een eigen oefeningenhiërarchie maken. Het enige dat niet is toegelaten is oefeningenfolders binnen elkaar plaatsen.

## Voorbeeld van een geldige repository-structuur

```
+-- README.md                      # Beschrijft de repository
+-- public                         # Bevat bestanden die behoren tot het vak of reeksen
|   +-- CodersApprentice.png       # Een voorbeeldafbeelding die hergebruikt kan worden doorheen het vak
+-- media                          # Bevat bestanden die gebruikt kunnen worden bij elke oefening
|   +-- RedBlackTree.png           # Een voorbeeldafbeelding indien er meerdere oefeningen zijn over rood-zwartbomen
+-- dirconfig.json                 # Gedeeld configuratiebstand voor alle oefeningen in kindfolders
+-- week01                         # We kunnen oefeningen groeperen per week
|   +-- intsum                     # Korte name voor deze oefening
|   |   +-- config.json            # Configuratie voor deze oefening
|   |   +-- evaluation             #
|   |   |   +-- intsum_test.hs     # Een Haskell testbestand
|   |   +-- description            #
|   |   |   +-- description.nl.md  # De beschrijving in het Nederlands
|   |   |   +-- description.en.md  # De beschrijving in het Engels
|   |   |   +-- media              #
|   |   |   |   +-- some_image.png # Een afbeelding die enkel gebruikt wordt in de beschrijving van deze oefening
|   |   |   +-- boilerplate        #
|   |   |       +-- boilerplate    # Standaard (hier Nederlands?) boilerplate code
|   |   |       +-- boilerplate.en # Engelse boilerplate code
|   |   `-- workdir                # Huidige werkfolder voor de code van de student
|   |       +-- intlines.txt       # Een bestand beschikbaar voor de student
|   :
:
```