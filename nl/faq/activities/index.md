---
title: Activiteiten
---

# FAQ: Activiteiten

[[toc]]

## Wat is een conceptactiviteit?
Een concept activiteit is een activiteit waarvan de 'draft' vlag (boolean) op true staat. Deze boolean wordt zowel bijgehouden in het [configuratiebestand van de oefening](/nl/references/exercise-config) als in de database. Voor alle nieuwe oefeningen wordt de conceptstatus automatisch op true gezet (vergelijkbaar met de sleutel die aan de interne gegevens wordt toegevoegd). Voor bestaande oefeningen wordt de conceptvlag op false gezet in de database, maar deze waarde wordt niet toegevoegd aan het configuratiebestand.

Het idee is dat een activiteit in conceptmodus blijft totdat de maker deze handmatig goedkeurt met behulp van Dodona of rechtstreeks het configuratiebestand aanpast.

## Wat is het doel van concept activiteiten?
Concept activiteiten dienen verschillende doelen.

### Verwarring vermijden
Concept activiteiten zijn alleen zichtbaar voor repository-eigenaren en cursusbeheerders voor cursussen met de activiteit. Dit voorkomt dat er meerdere kopieën van onze voorbeeldoefeningen in de centrale database aanwezig zijn.

### Minder valspositieve foutmeldingen
De Dodona-beheerders worden op de hoogte gebracht van interne fouten tijdens de uitvoering van een oplossing. Wanneer een lesgever een nieuwe oefening maakt en experimenteert met het toevoegen van tests, komen deze fouten vaak voor. Hierdoor negeren de Dodona-beheerders deze berichten vaak, waardoor echte problemen onopgemerkt blijven. Wanneer een oefening nog in conceptmodus is, krijgen de Dodona-beheerders geen melding van interne fouten.

### Verbeterde vindbaarheid
Wanneer je een nieuwe oefening aan Dodona toevoegt, is het niet altijd gemakkelijk om die oefening te vinden en zelf te proberen. Alle jouw conceptoefeningen staan op de startpagina vermeld, waardoor deze gemakkelijker te vinden zijn.