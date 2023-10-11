---
title: Activiteiten
---

# FAQ: Activiteiten

[[toc]]

## Wat is een concept activiteit?
Een concept activiteit is een activiteit waarvan de 'draft' vlag (boolean) op true staat. Deze boolean wordt zowel bijgehouden in het [configuratiebestand van de oefening](/nl/references/exercise-config) als in de database. Voor alle nieuwe oefeningen wordt de conceptstatus automatisch op true gezet (vergelijkbaar met de sleutel die aan de interne gegevens wordt toegevoegd). Voor bestaande oefeningen wordt de conceptvlag op false gezet in de database, maar deze waarde wordt niet toegevoegd aan het configuratiebestand.

Het idee is dat een activiteit in conceptmodus blijft totdat de maker deze handmatig goedkeurt met behulp van de Dodona UI of het configuratiebestand.

## Wat is het doel van concept activiteiten?
Concept activiteiten dienen verschillende doelen.

### Klutter vermijden
Concept activiteiten zijn alleen zichtbaar voor repository-eigenaren en cursusbeheerders voor cursussen met de activiteit. Dit voorkomt dat er meerdere kopieën van onze voorbeeldoefeningen in de wereldwijde database aanwezig zijn.

### Reduceer vals-positieve foutmeldingen
De Dodona-beheerders worden op de hoogte gebracht van ernstige fouten (`interne fout`) tijdens de uitvoering van een inzending. Wanneer een leraar een nieuwe oefening maakt en experimenteert met het toevoegen van tests, komen deze fouten vaak voor. Hierdoor negeren de Dodona-beheerders deze berichten vaak, waardoor echte problemen onopgemerkt blijven. Wanneer een oefening nog in conceptmodus is, zullen we de Dodona-beheerders niet langer op de hoogte stellen.

### Verbeterde vindbaarheid
Wanneer je een nieuwe oefening aan Dodona toevoegt, is het niet altijd gemakkelijk om die oefening te vinden en zelf te proberen. We zullen nu alle conceptoefeningen van een gebruiker op de startpagina vermelden, waardoor deze gemakkelijker te vinden zijn.