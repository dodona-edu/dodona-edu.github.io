---
title: "[nl] Oefeningenreeksenbeheer"
description: "Tutorial: oefeningenreeksenbeheer"
---

::: warning Sorry
For now, this page is only available in Dutch. Sorry!
:::

# Oefeningenreeksenbeheer

**Inhoudsopgave**
[[toc]]

Het leerpad van een cursus bestaat uit verschillende oefeningenreeksen die elk opnieuw bestaan uit verschillenden oefeningen. Cursusbeheerders kunnen deze reeksen aanmaken, bewerken, verwijderen en herordenen. 

## Oefeningenreeks aanmaken

Een cursusbeheerder kan onbeperkt oefeningenreeksen binnen je cursus aanmaken. Je doet dit door eerst naar de cursuspagina van de cursus te navigeren en vervolgens `Reeksen beheren` aan te klikken.

![reeksen beheren](./staff.course_manage_series_button.png)

Op deze pagina vind je rechtsboven de knop `Reeks aanmaken`.

![reeks aanmaken](./staff.course_new_series_button.png)

Je komt op een formulier terecht waarin je de volgende eigenschappen van de reeks kan instellen:

![series form](./staff.series_new.png)

* `Naam`: De naam van de oefeningenreeks. Binnen een cursus kunnen verschillende oefeningenreeksen dezelfde naam hebben, maar het is aangeraden om alle oefeningenreeksen een unieke naam te geven.

* `Deadline`: Een optionele deadline die aangeeft tot wanneer er rekening gehouden wordt met oplossingen die ingediend worden voor oefeningen van deze oefeningenreeks. Studenten kunnen na de deadline onbeperkt oplossingen blijven indienen voor oefeningen uit de oefeningenreeks en blijven daar nog steeds een beoordeling en feedback voor ontvangen. Er wordt met deze oplossingen echter geen rekening meer gehouden bij het bepalen van hun indienstatus voor oefeningen uit de oefeningenreeks.


  ::: tip Belangrijk

  De indienstatus voor studenten wordt steeds dynamisch berekend op basis van de deadline. Als de deadline wordt aangepast, dan kan het dus zijn dat de indienstatus voor een bepaalde oefening wordt aangepast. Hou hier dus rekening mee als je de deadline instelt op een vroeger tijdstip.
  :::

  Klik op het invulveld of klik op de kalenderknop om de datum en het tijdstip van de deadline in te stellen. Selecteer de deadline in de tijdzone die je hebt ingesteld in je gebruikersprofiel. Andere gebruikers krijgen de deadline te zien in de tijdzone die ze in hun gebruikersprofiel hebben ingesteld.

  ![image](./staff.series_calendar_open.png)

  Klik op de verwijderknop om een ingestelde deadline te wissen.

  ![image](./staff.series_calendar_clear.png)

* `Zichtbaarheid`: dit bepaalt of gebruikers de oefeningenreeks kunnen zien. Voor deze eigenschap kunnen de volgende waarden ingesteld worden:

  * `Open`: alle gebruikers zien de oefeningenreeks op de cursuspagina.

  * `Verborgen`: alleen cursusbeheerders zien de oefeningenreeks op de cursuspagina. Er staat een duidelijke mededeling bij om hen er op te wijzen dat andere gebruikers de oefeningenreeks niet kunnen zien. Je kan gebruikers toegang geven tot deze reeks door hun de specifieke geheime link (zie hieronder) van deze reeks door te sturen.

  * `Gesloten`: alleen cursusbeheerders zien de oefeningenreeks op de cursuspagina. Er staat een duidelijke mededeling bij om hen er op te wijzen dat andere gebruikers de oefeningenreeks daar niet kunnen zien.

  ![reeks verborgen informatie](./staff.course_series_info_message.png)

* `Geheime link`: bij het aanmaken van een verborgen oefeningenreeks wordt automatisch een geheime link gegenereerd om toegang te geven tot deze reeks. Zonder deze link kunnen gebruikers een verborgen oefeningenreeks niet zien.

  De geheime link voor een oefeningenreeks kan je onderaan de bewerk-pagina voor die reeks vinden.
  ![verborgen reeks link](./staff.series_hidden_link.png)

  Je kan eenvoudig een nieuwe geheime link genereren door op de vernieuwknop te klikken. Dit kan je bijvoorbeeld doen als je per ongeluk de link kenbaar hebt gemaakt aan iemand die ze niet zou mogen zijn. Hou er wel rekening mee dat de oude link niet meer zal werken van zodra je een nieuwe genereert.
  ![reekslink vernieuwen](./staff.series_hidden_link_reset.png)

* `Beschrijving`: een optionele beschrijving die gebruikers te zien krijgen bij de weergave van de oefeningenreeks in de cursus. Voor het opmaken van de beschrijving kan je gebruikmaken van [Markdown](../../../references/exercise-description/#markdown).

* **Geavanceerde instellingen**:

  * `Verberg de "Voortgang groep" visualisatie voor studenten`: Bij een oefening wordt de voortgang van alle gebruikers in de cursus getoond. Hierin kan je zien hoeveel studenten een oefening reeds hebben begonnen of afgewerkt. Deze visualisatie is een meerwaarde voor studenten, maar je wil ze misschien uitschakelen voor examens.

  * `Verberg leeractiviteiten`: Als de leeractiviteiten verborgen zijn, dan zal enkel de beschrijving van deze reeks getoond worden. Je kan deze instelling gebruiken om bijvoorbeeld de leerstof van de reeks vooraf beschikbaar te stellen, zonder de oefeningen en leesactiviteiten al vrij te geven.

Om de reeks aan te maken klik je op de afwerkknop in de rechterbovenhoek van het paneel `Nieuwe oefeningenreeks`. De nieuwe oefeningenreeks wordt zo aan je cursus toegevoegd.

![reeks aanmaken](./staff.series_new_submit.png)

Na het aanmaken van de reeks kom je op de bewerkingspagina terecht. Je kunt nu oefeningen aan de reeks toevoegen.

## Oefeningenreeks bewerken

Op de bewerking-pagina van een oefeningenreeks zie je een uitgebreide versie van het reeks-aanmakenpaneel waarin je naast het instellen van eigenschappen ook oefeningen kunt koppelen aan de oefeningenreeks. Je kan deze pagina bereiken op 3 manieren: automatisch na het aanmaken van een nieuwe reeks, door op het bewerken-icoontje te klikken van de reeks in het Reeksen beheren-paneel of door `Reeks bewerken` te kiezen in het reeks-actiemenu.

![reeks bewerken](./staff.series_edit.png)

Onderaan de pagina vind je de activiteiten die reeds tot deze reeks behoren en mogelijke activiteiten om eraan toe te voegen. Klik op de toevoegknop aan de rechterkant van een oefening om de oefening aan de oefeningenreeks toe te voegen.

![reeks oefening toevoegen](./staff.series_add_exercise.png)

Via de zoekbalk kan je bestaande oefeningen filteren op naam, beschikbare vertalingen, programmeertaal, labels, repository of type.

Onder de hoofding `Oefeningen in deze reeks` kan je aan de rechterkant van een oefening op de verwijderknop klikken om de oefening uit de oefeningenreeks te verwijderen.

![reeks oefening verwijderen](./staff.series_remove_exercise.png)

Versleep de verplaatsknop aan de linkerkant van de oefeningen om de volgorde van de oefeningen aan te passen. De volgorde waarin de oefeningen onder de hoofding `Oefeningen in deze reeks` gerangschikt worden, is immers ook de volgorde waarin de oefeningen weergegeven worden in de oefeningenreeks.

![oefening verplaatsen](./staff.series_move_exercise.png)

::: tip Belangrijk

We veronderstellen hier dat de oefeningen die aan de oefeningenreeks moeten gekoppeld worden reeds beschikbaar zijn in Dodona. Het opstellen, publiceren en delen van oefeningen wordt [hier](../new-exercise-repo) besproken.

:::

Klik op de afwerkknop in de rechterbovenhoek van het paneel om de bewerkingen te bewaren. Dit is enkel van toepassing op de reeks-eigenschappen. Bewerkingen op de oefeningen binnenin die reeks worden meteen automatisch opgeslagen.

![reeks bewerken opslaan](./staff.series_edit_submit.png)

## Oefeningenreeks beheren

Uiteraard is het mogelijk om een reeks te verwijderen uit een cursus. De actie vind je analoog aan het bewerken in het reeksen-beheren menu of in het reeks-actiesmenu.

![reeks verwijderen](./staff.series_delete.png)

Het kan handig zijn om reeksen in een cursus een bepaalde volgorde te geven, om ze bijvoorbeeld te sorteren volgens moeilijkheidsgraad. Standaard zullen ze gesorteerd worden in omgekeerd chronologische volgorde op basis van wanneer je ze toevoegt. Zo moeten studenten minder scrollen als ze een reeks willen maken. In het reeksen-beherenpaneel kan je in de tabel van de reeds toegevoegde reeksen ze verslepen via het icoontje aan de linkerkant.

## Het reeks-menu

Dit menu bevat een aantal handige acties die cursusbeheerders kunnen uitvoeren op een reeks. Je kan dit menu openen door te klikken op de drie bolletjes in de rechterbovenhoek van een reeks. Naast bewerken en verwijderen zijn er nog enkele mogelijkheden:

![reeks acties](./staff.series_actions_menu.png)

* `Reeks evalueren`: deze actie stelt je in staat om op een gestructureerde manier door de ingediende oplossingen van deze reeks te bladeren, bijvoorbeeld om ze te [evalueren](#oefeningenreeks-evalueren) of verbeteren.

* `Statusoverzicht`: toont een overzicht met de indienstatus van alle cursusgebruikers voor alle oefeningen uit de oefeningenreeks. De indienstatus wordt in het overzicht weergegeven met de gebruikelijke icoontjes.

 ![scoresheet](./staff.scoresheet.png)

  Klik op de naam van een cursusgebruiker om naar de overzichtpagina van de gebruiker te navigeren.

  Klik op het icoontje van een indienstatus om naar de oplossing te navigeren die gebruikt werd om de indienstatus te bepalen (als de cursusgebruiker effectief een oplossing  heeft ingediend op basis waarvan de indienstatus kon bepaald worden). Je kan in dit overzicht ook filteren op studenten die aan minstens één activiteit begonnen zijn en zoeken op naam.

* `Oplossingen van studenten exporteren`: deze actie stelt je in staat om de ingezonden oplossingen van studenten voor de oefeningen in de reeks te [exporteren](#oefeningenreeks-oplossingen-exporteren) als zip-bestand.

* `Oplossingen hertesten`: deze actie hertest alle oplossingen die cursusgebruikers ingediend hebben voor oefeningen van de oefeningenreeks. Dit kan nuttig zijn als je bijvoorbeeld een aantal testen hebt toegevoegd of aangepast en je de al ingediende oplossingen opnieuw wil testen. In de volgende sectie wordt uitgelegd hoe je een enkele oplossing kan herevalueren.

## Oplossing hertesten

Bij het hertesten van een oplossing worden alle testen opnieuw uitgevoerd zonder dat de oplossing opnieuw moet ingediend worden. Op die manier blijft het originele tijdstip van indienen behouden. Als de configuratie van de oefening aangepast werd sinds de vorige beoordeling van de oplossing, dan kan de status van de oplossing wijzigen door het herevalueren. Klik op de herhaalknop in de rechterbovenhoek van de feedbackpagina van een oplossing van een gebruiker om die oplossing te herevalueren.

![feedback evalueren](./staff.feedback_evaluate.png)

::: tip Belangrijk

Bij het herevalueren krijgen oplossingen een lagere prioriteit in de wachtrij dan oplossingen die nieuw ingediend worden. Op die manier ondervindt het beoordelen van oplossingen die gebruikers indienen minimale vertaging, maar kan het herevalueren wel langer duren.

Gebruikers krijgen geen melding van het platform als hun oplossingen geherevalueerd worden. Als je beslist om oplossingen te herevalueren, is het belangrijk om gebruikers te informeren dat er zowel wijzigingen kunnen zijn van de status van oplossingen die ze vroeger ingediend hebben als van hun indienstatus voor oefeningen in de oefeningenreeksen van de cursus.
:::

## Oefeningenreeks evalueren

Correcte testresultaten zijn geen garantie voor goede code. Daarom biedt Dodona ook ondersteuning om de oplossingen manueel te evalueren en hen van feedback te voorzien. Meer informatie hierover kan je vinden in [deze handleiding](../evaluate-series).

## Oefeningenreeks oplossingen exporteren

In het actiemenu van een reeks kan je als lesgever ook kiezen om de ingezonden code van je studenten te exporteren als een zip-bestand. Dit is bijvoorbeeld handig als je liever op papier verbetert en de code wil afdrukken.

![reeks exporteren](./staff.series_export_action.png)

Dit brengt je naar een exporteerpagina waar je eerst gevraagd wordt om de oefeningen in de reeks te selecteren waarvan je de inzendingen wenst. 
![oefeningen kiezen](./staff.series_export_exercise_choice.png)

Als je ze allemaal wenst te downloaden, dan kies je het selectievakje in de hoofding van de tabel. Daarna klik je op `Volgende stap` om verder te gaan.

Vervolgens kan je verschillende opties aanvinken die de inhoud van de export beïnvloeden. Je kan een samenvattende csv verkrijgen, kiezen of je alle oplossingen of enkel de laatste wil, of er rekening gehouden moet worden met de deadline, of de bestanden per student of per reeks gegroepeerd moeten worden en welke studenten meegerekend moeten worden. 

![export opties](./staff.series_export_options.png)

Klik op `Start export` om de download te starten. Je komt op de exportpagina die je zal verwittigen als je export klaar is. Meestal is dit binnen enkele seconden al het geval.
![export gestart](./staff.series_export_started.png)
