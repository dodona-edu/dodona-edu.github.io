---
title: "Oefeningen oplossen"
description: "Tutorial: oefeningen oplossen"
order: 4
---

# Oefeningen oplossen
Alle informatie zodat je als student kan navigeren naar oefeningen of oplossingen, oplossingen kan indienen en vragen kan stellen over je code. Wat de feedback op een oplossing betekent, wordt in detail uitgelegd bij [Feedback begrijpen](../feedback/).

## Navigeren naar een oefening

Oefeningen op Dodona kunnen ofwel voorkomen in een cursus, ofwel daarbuiten.

- Oefeningen die tot een cursus behoren, kan je vinden door de pagina van een cursus te bezoeken.
    ![Reekskaart met de oefeningentabel gemarkeerd](./course-exercise-selection-nl.png)
- Oefeningen die niet tot een cursus behoren, kan je vinden door het [activiteitenoverzicht](https://dodona.be/nl/activities/) te bezoeken dat een lijst bevat van alle oefeningen.

::: tip Tip
Op je startpagina kan je een lijst vinden van de vijf laatste oefeningen waar je het laatst oplossingen voor ingediend hebt over alle cursussen heen. Zo kan je op een snelle manier een oefening waar je recent op hebt gewerkt selecteren door op de naam van de oefening te klikken.

![Kaart Recente oefeningen op de startpagina](./recent-exercises-nl.png)

:::

Op elke oefeningenpagina staat bovenaan een paneel met de naam en de beschrijving van de oefening. De weergave van deze componenten is afhankelijk van de geselecteerde taal. Als bij het opstellen van de oefening een vertaling voorzien werd van de naam en de beschrijving in de geselecteerde taal, dan zullen deze componenten van de oefening ook in die taal weergegeven worden.

![Oefeningpagina met de beschrijvingskaart en daaronder het indienpaneel met de code-editor en de indienknop](./exercise-page-nl.png)

::: tip

Als je een actie aan het uitvoeren bent op een oefening dan verschijnt de naam van de oefening naast `Dodona` aan de linkerkant van de navigatiebalk, eventueel voorafgegaan door de naam van de cursus en de naam van de oefeningenreeks waaruit je de oefening geselecteerd hebt. Door in de navigatiebalk op de naam van de oefening te klikken, navigeer je naar de oefeningpagina. Door in de navigatiebalk op de naam van de oefeningenreeks te klikken, navigeer je naar de oefeningenreeks op de cursuspagina. Door in de navigatiebalk op de naam van de cursus te klikken, navigeer je naar de cursuspagina.

![Broodkruimelnavigatie bij oefening, alle drie de niveaus gemarkeerd in de navigatiebalk](./exercise-breadcrumb-nl.png)
:::

## Indienen van een oplossing

Onder het paneel met de beschrijving van de oefening vind je het *indienpaneel*. In de koptekst staat de naam van de oefening en, in de rechterbovenhoek, een knop met je aantal ingediende oplossingen voor deze oefening (bijvoorbeeld `1 oplossing`). De *code-editor* is altijd zichtbaar in dit paneel: plaats de broncode van je oplossing in de editor en klik rechtsonder op de knop `Indienen` om ze in te dienen. Zoals de balk onderaan het paneel je eraan herinnert: **je kan zo vaak indienen als je wil, en er wordt enkel rekening gehouden met je laatst ingediende oplossing**. Bij elke oplossing wordt [automatische feedback](../feedback/) door de judge gegeven die je kan gebruiken om je oplossing te corrigeren of verder te verfijnen.

![Indienpaneel met een lege editor en de gemarkeerde indienknop](./handin-editor-nl.png)

Bij Python-oefeningen opent de knop `Naar sandbox` naast de indienknop [de Python-sandbox](../scratchpad/), waarin je je code in de browser kan uitvoeren en debuggen voor je ze indient.

::: tip Deadlines
Als de deadline van de oefeningenreeks minder dan vijf minuten veraf is, verschijnt er boven de editor een melding met de exacte deadline. Is de deadline al verstreken, dan waarschuwt de melding je dat je nog kan indienen, maar dat er met je oplossingen mogelijk geen rekening meer gehouden wordt.
:::

::: tip Gebruik een IDE

Alhoewel je perfect kan programmeren in de editor op Dodona zelf, raden we niet aan om alle oefeningen hierin op te lossen. In plaats daarvan adviseren we om een [Integrated Development Environment](https://nl.wikipedia.org/wiki/Integrated_development_environment) (IDE) te gebruiken. IDE's geven namelijk meer ondersteuning tijdens het schrijven, uitvoeren, testen en debuggen van broncode. Op die manier leer je je programmeervaardigheden generiek in te zetten om andere problemen aan te pakken dan enkel de oefeningen uit Dodona.

Bovendien is er een plugin voorzien voor de JetBrains IDE's zoals [IntelliJ](https://www.jetbrains.com/idea/), [PyCharm](https://www.jetbrains.com/pycharm/), en [WebStorm](https://www.jetbrains.com/webstorm/specials/webstorm/webstorm.html). Ook voor [**Visual Studio Code**](https://code.visualstudio.com/) is een extensie voorzien. Programmeurs die met die IDE's werken kunnen hun oplossingen rechtstreeks in Dodona indienen met behulp van die tool. Zonder die tool moet je je code kopiëren en plakken in de editor op Dodona en op de indienknop klikken. Instructies vind je [hier voor PyCharm](/nl/faq/ide-plugins/#hoe-installeer-ik-de-pycharm-plugin) en [hier voor VS Code](/nl/faq/ide-plugins/#hoe-installeer-ik-de-vs-code-extensie).
:::

Nadat je op `Indienen` geklikt hebt, wordt je oplossing in een wachtrij geplaatst en beoordeeld door de judge; de indienknop toont de voortgang (`Bezig met indienen…`, `Evalueren…`). Meestal duurt dit maar enkele seconden. Zodra de judge klaar is, verschijnt de gedetailleerde [feedback](../feedback/) in het indienpaneel zelf, op de plaats van de editor. Een balk bovenaan het paneel toont de status van de oplossing (bijvoorbeeld `Correct` of `Fout`) met een korte samenvatting en het tijdstip van indienen.

![Indienpaneel dat de feedback voor een correcte oplossing toont, met de statusbalk en de knop Deze oplossing bewerken](./handin-feedback-nl.png)

Het beoordelen loopt gewoon door terwijl je naar iets anders kijkt. Open je een eerdere oplossing in de indiengeschiedenis, of klik je op `Bewerken en herindienen`, terwijl je laatste oplossing nog beoordeeld wordt, dan blijft het paneel tonen wat je geopend hebt. Bovenaan het indienpaneel verschijnt dan de melding `Nieuw resultaat!` met de status van je nieuwe oplossing; klik in die melding op `Bekijk resultaat` om de feedback ervan te openen. De melding verdwijnt zodra je het resultaat opent of een nieuwe oplossing indient.

Vanuit de feedback kan je meteen verder werken aan je code: klik op `Deze oplossing bewerken` (of op `Bewerken en herindienen` onderaan het paneel) om de code van de getoonde oplossing terug in de editor te laden. Had je nog niet-ingediende wijzigingen in de editor staan, dan keer je met de knop `Terug naar editor` terug naar de editor zoals je die achterliet.

Als je terugkeert naar een oefening waarvoor je al eerder hebt ingediend, dan bevat de editor automatisch de code van je laatst ingediende oplossing. Een infomelding boven de editor, `We hebben jouw laatste oplossing ingeladen in de editor.`, vertelt je dat dit gebeurd is. Begin je liever opnieuw? De knop naast die melding zet de voorbeeldcode van de oefening terug (`Zet de voorbeeldcode terug`) of maakt, als de oefening geen voorbeeldcode heeft, de editor leeg (`Maak de editor leeg`).

![Infomelding boven de editor dat de laatste oplossing werd ingeladen, met de knop Maak de editor leeg](./handin-preloaded-nl.png)

## Navigeren naar een oplossing

Je kan op Dodona op verschillende manieren naar je ingediende oplossingen navigeren. Voor elke manier zullen de oplossingen door Dodona op een andere manier gegroepeerd worden. Hieronder volgen de twee belangrijkste manieren:

- Je kan al jouw oplossingen van één oefening bekijken in de *indiengeschiedenis* van die oefening: klik op de knop met je aantal ingediende oplossingen (bijvoorbeeld `2 oplossingen`) in de rechterbovenhoek van het indienpaneel. De oplossingen worden opgelijst in omgekeerde chronologische volgorde (meest recente bovenaan), met voor elke oplossing haar nummer, status, een korte samenvatting van de [feedback](../feedback/) en het tijdstip van indienen. Vóór elke oplossing staat ook een [icoontje](../feedback/#mogelijke-statussen) dat overeenkomt met haar status. Klik op een oplossing om haar feedback in het indienpaneel te bekijken.

![Geopende indiengeschiedenis met een lijst van oplossingen en hun statussen](./submission-history-nl.png)

- Je kan alle oplossingen die je ooit hebt ingediend zien door in het gebruikersmenu in de navigatiebalk op `Mijn oplossingen` te klikken.

![Geopend gebruikersmenu met Mijn oplossingen gemarkeerd](./user-menu-my-submissions-nl.png)

Een oplossingenoverzicht bevat het oplossingsnummer, het tijdstip van indienen, de status en een korte samenvatting van de feedback voor elke oplossing. Vóór elke oplossing staat ook nog een [icoontje](../feedback/#mogelijke-statussen) dat overeenkomt met de status van de oplossing. In het overzicht worden je oplossingen altijd opgelijst in omgekeerde chronologische volgorde (meest recente bovenaan).

![Overzicht van alle oplossingen met zoekveld, statusfilter en een tabel met oplossingen](./my-submissions-nl.png)

Je kan een oplossing selecteren door in een oplossingenoverzicht op het pijltje te klikken aan rechterkant van de oplossing. Hierdoor navigeer je naar de feedbackpagina met de gedetailleerde feedback over de oplossing. Dezelfde pagina wordt getoond als je op het oplossingsnummer klikt.

![Overzicht van alle oplossingen met het pijltje van de eerste rij gemarkeerd](./my-submissions-open-nl.png)

## Je resultaat bekijken

Of je de feedback nu bekijkt in het indienpaneel of op de feedbackpagina van een oplossing, ze bevat altijd dezelfde gedetailleerde **feedback** over je oplossing. Bovenaan zie je de **status** die de judge aan je oplossing heeft toegekend (bijvoorbeeld `Correct` of `Fout`) en een korte samenvatting van het resultaat. Daaronder rapporteert de judge in detail over alle testen waaraan je oplossing onderworpen werd, en in de tab `Code` zie je je broncode met eventuele opmerkingen van de judge.

De betekenis van elke status en de manier waarop de gedetailleerde feedback gestructureerd is, worden uitgelegd bij [Feedback begrijpen](../feedback/).

## Vragen stellen
::: tip Opmerking
Deze functie is enkel beschikbaar als je lesgever ze heeft ingeschakeld.
:::

![Code tabblad met de knop "Stel een vraag over je code" en een roze bubbel per regel](./ask-question-button-nl.png)
Nadat je je oplossing hebt ingediend, kan je op drie manieren een vraag stellen. Bovenaan de ingediende code kan je een algemene vraag stellen door op `Stel een vraag over je code` te klikken. Daarnaast kan je links van het regelnummer op de roze cirkel klikken een vraag stellen bij een specifieke regel code. Je kan ook een stuk code selecteren en dan hierover vragen stellen via diezelfde knop.

![Animatie vraag stellen](./ask-question-nl.gif)

Typ in het tekstvak de vraag die je aan de lesgever wil stellen. Je kan Markdown gebruiken om je tekst extra opmaak te geven. Klik als laatste op `Vraag stellen`.

::: tip Ondersteuning voor Markdown

Je kan met Markdown extra opmaak toevoegen door:

- asterisken (\*) rond woorden te zetten om het schuin weer te geven. \*schuine tekst\* wordt bijvoorbeeld weergegeven als *schuine tekst*.
- twee asterisken (\**) rond woorden te zetten om het in het vet weer te geven. \*\*vette tekst\*\* wordt bijvoorbeeld weergegeven als **vette tekst**.
- backticks (\`) rond een stukje code te zetten. \`Variabelen\` wordt bijvoorbeeld weergegeven als `Variabelen`.

Bekijk hier [alle mogelijkheden van Markdown](/nl/references/exercise-description/#markdown).
:::

![Opmerking van een lesgever op een regel code, met het Reageer-veld eronder](./question-reply-nl.png)

Daarnaast kan je ook reageren op een bestaande vraag van jezelf of op een opmerking van een lesgever. Klik hiervoor op `Reageer` onder de vraag of opmerking. Typ je reactie in het tekstvak en klik op `Reageer`.
