---
title: Repository bestandenstructuur
description: "Repository bestandenstructuur Dodona"
---

# Repository bestandenstructuur

Een repository bevat alle mappen en bestanden waaruit een cursus bestaat. We verwachten dat deze mappen volgende structuur hebben:

- **Een `dirconfig.json` bestand**: dit bestand bevat de globale [oefeningenconfiguratie](/nl/references/exercise-config). Deze configuratie zal samengevoegd worden met het `config.json`-bestand in een oefeningenmap. De waarden in dit bestand kunnen overschreven worden door deze in de configuratiebestanden van de kindmappen.
- **Een map `public`**: deze map bevat bestanden die relevant zijn voor de hele cursus of reeks:
Hier kan je afbeeldingen of andere zaken toevoegen waar je naar kan refereren vanuit een cursusbeschrijving of een reeksbeschrijving. De URL van deze bestanden vind je op de pagina van de repository op Dodona. Dit zijn publieke bestanden, dus ze mogen geen confidentiële informatie bevatten.
- **Een map `media`**: deze map bevat media-bestanden die gebruikt kunnen worden in alle oefeningenbeschrijvingen binnen deze repository. Dodona zal automatisch terugvallen op deze map indien er in een beschrijving gerefereerd wordt naar een media-item dat niet gevonden wordt in de `media`-map van die specifieke oefening.
- **Optioneel meerdere `oefening`mappen**: deze mappen bevatten de informatie voor de individuele oefeningen. Voor meer informatie betreffende hun structuur, gelieve de pagina met de [oefeningenmap-structuur](/nl/references/exercise-directory-structure).

Dodona negeert andere bestanden en mappen. Je kan dus zorgeloos andere bestanden toevoegen (bijvoorbeeld bestanden met de oplossing voor je oefeningen) or een eigen oefeningenhiërarchie maken. Het enige dat niet is toegelaten is oefeningenmappen binnen elkaar plaatsen.

## Voorbeeld van een geldige repository-structuur

```
+-- README.md                      # Beschrijft de repository
+-- public                         # Bevat bestanden die behoren tot het vak of reeksen
|   +-- CodersApprentice.png       # Een voorbeeldafbeelding die hergebruikt kan worden doorheen het vak
+-- media                          # Bevat bestanden die gebruikt kunnen worden bij elke oefening
|   +-- RedBlackTree.png           # Een voorbeeldafbeelding indien er meerdere oefeningen zijn over rood-zwartbomen
+-- dirconfig.json                 # Gedeeld configuratiebstand voor alle oefeningen in kindmappen
+-- week01                         # We kunnen oefeningen groeperen per week
|   +-- intsum                     # Korte naam voor deze oefening
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
|   |   `-- workdir                # Huidige werkmap voor de code van de student
|   |       +-- intlines.txt       # Een bestand beschikbaar voor de student
|   :
:
```