---
title: Repository bestandenstructuur
description: "Repository bestandenstructuur Dodona"
order: 4
---

# Repository bestandenstructuur

Een repository bevat alle mappen en bestanden waaruit een cursus bestaat. We verwachten dat deze mappen volgende structuur hebben:

- **Een `dirconfig.json` bestand**: dit bestand bevat de globale [oefeningenconfiguratie](/nl/references/exercise-config). Deze configuratie zal samengevoegd worden met het `config.json`-bestand in een oefeningenmap. De waarden in dit bestand kunnen overschreven worden door deze in de configuratiebestanden van de kindmappen.
- **Een map `public`**: deze map bevat bestanden die relevant zijn voor de hele cursus of reeks:
Hier kan je afbeeldingen of andere zaken toevoegen waar je naar kan refereren vanuit een cursusbeschrijving of een reeksbeschrijving. De URL van deze bestanden vind je op de pagina van de repository op Dodona. Dit zijn publieke bestanden, dus ze mogen geen confidentiële informatie bevatten.
- **Een map `media`**: deze map bevat media-bestanden die gebruikt kunnen worden in alle oefeningenbeschrijvingen binnen deze repository. Dodona zal automatisch terugvallen op deze map indien er in een beschrijving gerefereerd wordt naar een media-item dat niet gevonden wordt in de `media`-map van die specifieke oefening.
- **Optioneel meerdere `oefening`mappen**: deze mappen bevatten de informatie voor de individuele oefeningen. Voor meer informatie betreffende hun structuur, gelieve de pagina met de [oefeningenmap-structuur](/nl/references/exercise-directory-structure).
- **Optioneel een `.dodonaignore` bestand**: dit bestand somt de paden op die Dodona niet mag kopiëren uit je repository. Zie [bestanden uitsluiten met `.dodonaignore`](#bestanden-uitsluiten-met-dodonaignore) hieronder.

Dodona negeert andere bestanden en mappen. Je kan dus zorgeloos andere bestanden toevoegen (bijvoorbeeld bestanden met de oplossing voor je oefeningen) of een eigen oefeningenhiërarchie maken. Het enige dat niet is toegelaten is oefeningenmappen binnen elkaar plaatsen.

## Bestanden uitsluiten met `.dodonaignore`

Alles in je repository wordt naar Dodona gekopieerd wanneer je pusht. Voeg een `.dodonaignore` bestand toe aan de hoofdmap van je repository om bepaalde paden buiten te houden. Het werkt zoals een `.gitignore`, alleen blijven de bestanden gewoon in je git-repository staan en worden ze enkel weggehouden van Dodona. Dat is handig voor materiaal waar het platform niets aan heeft, zoals voorbeeldoplossingen, grote testbestanden of gegenereerde bestanden.

Elke lijn is één padpatroon:

```
oplossingen/
*.pyc
/scratch/
```

Een patroon zonder schuine streep vooraan komt overal in de repository overeen, een patroon dat met een schuine streep begint enkel in de hoofdmap van de repository, en een schuine streep achteraan beperkt het patroon tot mappen. Het `.dodonaignore` bestand zelf wordt ook nooit gekopieerd.

Het bestand wordt bij elke synchronisatie gelezen, dus een `.dodonaignore` toevoegen of aanpassen heeft effect bij je volgende push: paden die eerder wel gekopieerd werden, worden dan ook uit Dodona verwijderd. Verwijder je een patroon weer, dan komen die bestanden terug bij de push daarna.

::: warning Behoud de bestanden die Dodona nodig heeft
Een patroon dat te breed is, zoals een niet-verankerde `tests` of een verdwaalde `*`, sluit ook bestanden uit die Dodona nodig heeft om oplossingen te verbeteren. Voor judge-repositories wordt dit gecontroleerd: een `.dodonaignore` die `config.json` of `run` zou uitsluiten laat de synchronisatie mislukken, en de laatst werkende versie blijft staan. De beheerder van de repository krijgt een e-mail wanneer een synchronisatie mislukt.
:::

## Voorbeeld van een geldige repository-structuur

::: tip Voorbeelden
Neem een kijkje in de [voorbeeldoefeningenrepository](https://github.com/dodona-edu/example-exercises) en [voorbeeldcursus](https://dodona.be/en/courses/358/) om een voorbeeld te vinden van hoe een geldige repository-structuur gebruikt wordt.
:::

```
+-- README.md                      # Beschrijft de repository
+-- .dodonaignore                  # Optioneel: paden die niet naar Dodona gekopieerd worden
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
|   |   +-- preparation            # Een (optionele) map die je kan gebruiken om bestanden in op te slaan die je hebt gebruikt tijdens het maken van de oefening
|   |   `-- workdir                # Huidige werkmap voor de code van de student
|   |       +-- intlines.txt       # Een bestand beschikbaar voor de student
|   :
:
```
