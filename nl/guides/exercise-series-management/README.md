---
title: Oefeningenreeksenbeheer
description: "Tutorial: oefeningenreeksenbeheer"
---

# Oefeningenreeksenbeheer

**Inhoudsopgave**
[[toc]]

Het [leerpad](/nl/course-manangement#leerpad) van een cursus bestaat uit verschillende [oefeningenreeksen](#oefeningenreeks) die elk opnieuw bestaan uit verschillenden oefeningen. Cursusbeheerders kunnen deze reeksen aanmaken, bewerken, verwijderen en herordenen. 

::: tip 

Al deze acties kunnen ook uitgevoerd worden op de oefeningen in een reeks. Deze kan je terugvinden in het [reeks-bewerken](#oefeningenreeks-bewerken) menu.

:::

## Oefeningenreeks aanmaken

Een cursusbeheerder kan onbeperkt oefeningenreeksen aanmaken. Als cursusbeheerder kan je doen door naar de cursuspagina van de cursus te navigeren. Op deze pagina dien je `Reeksen beheren` aan te klikken.

![reeksen beheren](./staff.course_manage_series_button.png)

Op deze pagina vind je rechtsboven de knop `Reeks aanmaken`.

![reeks aanmaken](./staff.course_new_series_button.png)

Druk op de naam van de cursus in de [navigatiebalk](../for-students#navigatiebalk) om het aanmaken van de oefeningenreeks te annuleren.

![reeks aanmaken onderbreken](./staff.series_new_cancel.png)

Je komt op een formulier terecht waarin je de volgende eigenschappen van de reeks kan instellen:

![series form](./staff.series_new.png)

* `Naam`

  Een naam om naar de reeks te verwijzen. Binnen een [leerpad](../course-management#leerpad) kunnen verschillende oefeningenreeksen dezelfde naam hebben. Het is echter aangeraden om alle oefeningenreeksen van het leerpad een unieke naam te geven.

* `Deadline`

  Een optionele [deadline](../for-students#oefeningenreeks-deadline) die aangeeft tot wanneer er rekening gehouden wordt met oplossingen die ingediend worden voor oefeningen uit de oefeningenreeks.Cursusgebruikers kunnen na de deadline onbeperkt oplossingen blijven indienen voor oefeningen uit de oefeningenreeks en blijven daar nog steeds een beoordeling en feedback voor ontvangen. Er wordt met deze oplossingen echter geen rekening meer gehouden bij het bepalen van hun [indienstatus](../for-students#oefeningenreeks-oefening-indienstatus) voor oefeningen uit de oefeningenreeks. Anders gebeurt dit wel.


::: tip Belangrijk

Als de deadline aangepast wordt dan krijgen cursusgebruikers meteen ook een indienstatus voor oefeningen uit de oefeningenreeks die aangepast is aan de nieuwe deadline.
:::

  Klik op het invulveld of druk op de kalenderknop om de datum en het tijdstip van de deadline in te stellen. Selecteer de deadline in de [tijdzone](../for-students#gebruikersprofiel-tijdzone) die je hebt ingesteld in je gebruikersprofiel. Andere gebruikers krijgen de deadline te zien in de tijdzone die ze in hun gebruikersprofiel hebben ingesteld.

  ![image](./staff.series_calendar_open.png)

  Druk op de verwijderknop om een ingestelde deadline te wissen.

  ![image](./staff.series_calendar_clear.png)

* `Zichtbaarheid`

  De zichtbaarheid bepaalt of gebruikers de oefeningenreeks kunnen zien. Voor deze eigenschap kunnen de volgende waarden ingesteld worden:

  * `Open`
   
    Alle gebruikers zien de oefeningenreeks in het leerpad.

  * `Verborgen`

    Alleen cursusbeheerders zien de oefeningenreeks in het leerpad. Er staat een duidelijke mededeling bij om hen er op te wijzen dat andere gebruikers de oefeningenreeks enkel kunnen zien als ze de [geheime link](#oefeningenreeks-geheime-link) gebruiken. Er is ook een link aanwezig om deze instelling snel te veranderen.
  * `Gesloten`

    Alleen cursusbeheerders zien de oefeningenreeks in het leerpad. Er staat een duidelijke mededeling bij om hen er op te wijzen dat andere gebruikers de oefeningenreeks daar niet kunnen zien. Er is ook een link aanwezig om deze instelling snel te veranderen.

 ![reeks verborgen informatie](./staff.course_series_info_message.png)

* `Geheime link`

  Bij het aanmaken van een oefeningenreeks wordt automatisch een token gegenereerd als afschermingsmechanisme van verborgen oefeningenreeksen. Zonder dit token kunnen gebruikers een verborgen oefeningenreeks niet zien in het leerpad. Als ze rechtstreeks naar de oefeningenreeks proberen te navigeren, dan zien ze enkel een melding dat ze geen toegangsrechten hebben voor de oefeningenreeks.

  ![verborgen reeks toegang geweigerd](./student.hidden_series_denied_message.png)
  
  Gebruikers kunnen een verborgen oefeningenreeks enkel zien als ze gebruikmaken van de geheime link voor de reeks. De geheime link bevat het token waarmee ze de oefeningenreeks ook te zien krijgen als die verborgen werd.

  ![verborgen reeks link](./staff.series_hidden_link.png)

   Als cursusbeheerder krijg je de verantwoordelijkheid om de geheime link enkel te delen met andere gebruikers die de oefeningenreeks mogen zien. Druk op de kopieerknop naast de geheime link om de geheime link naar het klembord te kopiëren.

  ![reekslink kopiëren](./staff.series_hidden_link_copy.png)

  Druk op de vernieuwknop naast de geheime link om de oefeningenreeks opnieuw te verbergen nadat de geheime link gedeeld werd. Daardoor wordt een nieuw token gegenereerd en wordt het oude token onbruikbaar gemaakt. De geheime link wordt meteen ook aangepast aan het nieuwe token.

  ![reekslink vernieuwen](./staff.series_hidden_link_reset.png)

* `Beschrijving`

  Een optionele beschrijving die gebruikers te zien krijgen bij de weergave van de oefeningenreeks in het leerpad. Voor het opmaken van de beschrijving kan je gebruikmaken van [Markdown](../course-management#Markdown).

Druk op de afwerkknop in de rechterbovenhoek van het paneel `Nieuwe oefeningenreeks` om de nieuwe oefeningenreeks
effectief aan het leerpad toe te voegen.

![image](./staff.series_new_submit.png)

Na het afwerken navigeer je naar de bewerkingspagina van de oefeningenreeks. Daarbij zie je bovenaan een melding dat de nieuwe oefeningenreeks
toegevoegd werd. In het leerpad wordt deze reeks bovenaan toegevoegd. Op die manier worden de oefeningenreeksen van het leerpad in omgekeerde chronologische volgorde (eerste oefeningenreeks onderaan) weergegeven op de cursuspagina.

## Oefeningenreeks bewerken

Op de bewerkingspagina van een oefeningenreeks zie je een uitgebreide versie van het reeks-aanmakenpaneel waarin je naast het
instellen van eigenschappen ook oefeningen kunt koppelen aan de oefeningenreeks. Je kan deze pagina bereiken op 3 manieren: automatisch na het aanmaken van een nieuwe reeks, door op het bewerken-icoontje te drukken van de reeks in het Reeksen beheren-paneel of door `Reeks bewerken` te kiezen in het reeks-actiesmenu.

![reeks bewerken](./staff.series_edit.png)

Druk op de oefeningenreeks in de [navigatiebalk](../for-students#navigatiebalk) om het aanpassen te annuleren.

![reeks bewerken stoppen](./staff.series_edit_cancel.png)

Onderaan de pagina vind je de activiteiten die reeds tot deze reeks behoren en mogelijke activiteiten om eraan toe te voegen. Druk op de toevoegknop aan de rechterkant van een oefening om de oefening aan de oefeningenreeks toe te voegen.

![reeks oefening toevoegen](./staff.series_add_exercise.png)

Onder de hoofding `Oefeningen in deze reeks` kan je aan de rechterkant van een oefening op de verwijderknop drukken om de oefening uit de oefeningenreeks te verwijderen.

![reeks oefening verwijderen](./staff.series_remove_exercise.png)

Versleep de verplaatsknop aan de linkerkant van de oefeningen om de volgorde van de oefeningen aan te passen. De volgorde waarin de oefeningen onder de hoofding `Oefeningen in deze reeks` gerangschikt worden, is immers ook de volgorde waarin de oefeningen weergegeven worden in de oefeningenreeks.

![oefening verplaatsen](./staff.series_move_exercise.png)

Via de zoekbalk kan je bestaande oefeningen filteren op naam, beschikbare vertalingen, programmeertaal, labels, repository of type.

![oefeningen zoeken](./staff.series_search_exercises.png)

::: tip Belangrijk

We veronderstellen hier dat de oefeningen die aan de oefeningenreeks moeten gekoppeld worden reeds beschikbaar zijn in Dodona. Het opstellen, publiceren en delen van oefeningen wordt [hier](/nl/new-exercise-repo) besproken.

:::

Druk op de afwerkknop in de rechterbovenhoek van het paneel om de bewerkingen te bewaren. Dit is enkel van toepassing op de reeks-eigenschappen. Bewerkingen op de oefeningen binnenin die reeks worden meteen automatisch opgeslagen.

![reeks bewerken opslaan](./staff.series_edit_submit.png)

Na het afwerken navigeer je terug naar de oefeningenreeks in het leerpad, waar je kunt vaststellen dat de nieuwe eigenschappen van de reeks meteen van toepassing zijn.


## Oefeningenreeks verwijderen

Uiteraard is het mogelijk om een reeks te verwijderen uit een cursus. De actie vind je analoog aan het bewerken in het reeksen-beheren menu of in het reeks-actiesmenu.

![reeks verwijderen](./staff.series_delete.png)

## Oefeningenreeks herordenen

Het kan handig zijn om reeksen in een cursus een bepaalde volgorde te geven, om ze bijvoorbeeld te sorteren volgens moeilijkheidsgraad. Standaard zullen ze gesorteerd worden in omgekeerd chronologische volgorde op basis van wanneer je ze toevoegt. Zo moeten studenten minder scrollen als ze een reeks willen maken. In het [reeksen-beherenpaneel](#oefeningenreeks-aanmaken) kan je in de tabel van de reeds toegevoegde reeksen ze verslepen via het icoontje aan de linkerkant.

## Oefeningenreeks beheren

Dit menu bevat een aantal handige acties die cursusbeheerders kunnen uitvoeren op een reeks. Naast bewerken en verwijderen zijn er nog enkele mogelijkheden:

![reeks acties](./staff.series_actions_menu.png)

* `Reeks evalueren`

  Deze actie stelt je in staat om op een gestructureerde manier de oplossingen van studenten voor de reeks te [evalueren](#oefeningenreeks-evalueren).

* `Statusoverzicht`

  Toont een overzicht met de indienstatus van alle cursusgebruikers voor alle oefeningen uit de oefeningenreeks. De indienstatus wordt in het overzicht weergegeven met de gebruikelijke [icoontjes](../for-students#oefeningenreeks-oefening-indienstatus-icoontje).

 ![scoresheet](./staff.scoresheet.png)

  Druk op de naam van een cursusgebruiker om naar de [cursusoverzichtspagina](../user-management#cursusoverzichtspagina) van de gebruiker te navigeren.

  ![scoresheet gebruikerslink](./staff.scoresheet_user_link.png)

  Druk op het icoontje van een indienstatus om naar de oplossing te navigeren die gebruikt werd om de indienstatus te bepalen (als de cursusgebruiker effectief een oplossing  heeft ingediend op basis waarvan de indienstatus kon bepaald worden). Je kan in dit overzicht ook filteren op studenten die aan minstens één activiteit begonnen zijn en zoeken op naam.

  ![scoresheet status](./staff.scoresheet_status_icon.png)

* `Oplossingen van studenten exporteren`

  Deze acties stelt je in staat om de ingezonden oplossingen van studenten voor de oefeningen in de reeks te [exporteren](#oefeningenreeks-oplossingen-exporteren).

* `Oplossingen hertesten`

  Herevalueert alle oplossingen die cursusgebruikers ingediend hebben voor oefeningen van de oefeningenreeks. Dit kan nuttig zijn als een fout opgemerkt wordt in de automatische tests en de oplossingen opnieuw gecontroleerd moeten worden.

## Oplossing herevalueren

Bij het herevalueren van een oplossing wordt het [beoordelingsproces](../for-students#oplossing-beoordelingsproces) opnieuw uitgevoerd zonder dat de oplossing opnieuw moet ingediend worden. Op die manier blijft het originele tijdstip van indienen behouden. Als de configuratie van de oefening aangepast werd sinds de vorige beoordeling van de oplossing, dan kan de status van de oplossing wijzigen door het herevalueren.

::: tip Belangrijk

Bij het herevalueren krijgen oplossingen een lagere prioriteit in de [wachtrij](../for-students#oplossing-wachtrij) dan oplossingen die nieuw ingediend worden. Op die manier ondervindt het beoordelen van oplossingen die gebruikers indienen minimale vertaging, maar kan het herevalueren wel langer duren.

Gebruikers krijgen geen melding van het platform als hun oplossingen geherevalueerd worden. Als je beslist om oplossingen te herevalueren, is het belangrijk om gebruikers te informeren dat er zowel wijzigingen kunnen zijn van de status van oplossingen die ze vroeger ingediend hebben als van hun indienstatus voor oefeningen in de oefeningenreeksen van de cursus.

:::

Druk op de herhaalknop in de rechterbovenhoek van de  [feedbackpagina](../for-students#feedbackpagina) om een oplossing te herevalueren.

![feedback evalueren](./staff.feedback_evaluate.png)


## Oefeningenreeks evalueren

Correcte testresultaten zijn geen garantie voor goede code. Daarom biedt Dodona ook ondersteuning om de [oplossingen](../for-students#oplossing) te evalueren en hen van feedback te voorzien. Om een evaluatie te starten, open je als lesgever het oefeningenreeks-actiesmenu.

![reeks-acties](./staff.series_actions_menu.png)

Vervolgens selecteer je `Reeks evalueren`.
![reeks evalueren](./staff.series_evaluate.png)

Je wordt gebracht naar de volgende pagina waar je gebruikers kan selecteren om te evalueren.  Er zijn ook handige knoppen om snel een bepaalde categorie gebruikers te selecteren. Uiteraard kan je ook via de zoekbalk filteren op gebruikers via hun naam, labels, ... .
![select users](./staff.series_evaluate_select_users.png)

Na de nodige gebruikers gekozen te hebben, kan je de evaluate starten. 
![start evaluation](./staff.series_evaluate_start.png)

Je wordt nu automatisch door de evaluatie geleid, waarbij Dodona bijhoudt welke gebruikers je reeds geëvalueerd hebt. Je kan de ingediende code van annotaties voorzien: opmerkingen over de code, wat goed is en wat beter kan. Deze feedback wordt niet automatisch vrijgegeven, dit kan je op het einde van de evaluatie voor alle gebruikers tegelijkertijd doen via de knop `Feedback vrijgeven`. Je kan deze feedback ook weer verbergen via dezelfde knop.

![feedback vrijgen](./staff.series_evaluate_release_feedback.png)

In het detailoverzicht zie je de status van de gekozen gebruikers voor de oefeningen in de reeks. Het icoontje bestaat uit twee delen. De tekstballon geeft aan dat je deze oplossing reeds geëvalueerd hebt als het een vinkje bevat. Het balkje eronder gebruikt een kleurencode voor de status van de oefening: rood voor fout, groen voor correct en grijs voor niet ingediend.
![detailoverzicht](./staff.series_evaluate_detail_overview.png)

Je kan klikken op deze icoontjes om de bijhorende indiening te evalueren.
![feedback geven](./staff.series_evaluate_goto_give_feedback.png)

Je komt op een evalueerpagina terecht van de gebruiker waar je dus de code zelf van feedback kan voorzien. Dit kan op een lijn-per-lijnbasis. De gebruiker zal na het vrijgeven een melding krijgen, waarna hij de feedback kan bekijken.
![annotaties geven](./staff.series_evaluate_give_feedback.png)

In de rechterbovenhoek vind je navigatie-opties om efficiënt de indieningen te overlopen. De knop `Volgende` brengt je naar een volgende niet-afgewerkte indiening. Daar staan ook opties om het evalueerproces te versnellen en vereenvoudigen. Zo kan je reeds afgewerkte oplossingen overslaan en de huidige oefening automatisch als afgewerkt markeren als je op `Volgende` drukt. 

Eronder vind je je voortgang voor de huidige oefening en kan je ook navigeren naar de oplossingen van de huidige gebruiker voor andere oefeningen die in de reeks zitten.
![andere oefeningen gebruiker](./staff.series_evaluate_feedback_row.png)

Via de navigatiebalk bovenaan kan je makkelijk terugkeren naar de evaluatiepagina.
![terugkeren](./staff.series_evaluate_return.png)

Je kan een reeks slechts één keer evalueren. Dit hoef je echter niet in één stuk te doen, je kan later terugkeren naar de evaluatie via het reeks-actiesmenu, waar nu `Evaluatie bekijken` staat.

![evaluatie bekijken](./staff.series_actions_check_evaluation.png)

Je kan een bestaande evaluatie ook verwijderen. De gegeven feedback zal ook verdwijnen.
![evaluatie verwijderen](./staff.series_evaluate_delete.png)


## Oefeningenreeks oplossingen exporteren

In het actiesmenu van een reeks kan je als lesgever ook kiezen om de ingezonden code van je studenten te exporteren. Dit is handig als je liever op papier verbetert.
![reeks exporteren](./staff.series_export_action.png)

Dit brengt je naar een exporteerpagina waar je eerst gevraagd wordt om de oefeningen in de reeks te selecteren waarvan je de inzendingen wenst. 
![oefeningen kiezen](./staff.series_export_exercise_choice.png)

Als je ze allemaal wenst te downloaden, dan kies je het bovenste selectievakje. Daarna klik je op `Volgende stap` om verder te gaan.
![volgende stap](./staff.series_export_exercises_chosen.png)


Vervolgens kan je verschillende opties aanvinken die de inhoud van de export beïnvloeden. Je kan een samenvattende csv verkrijgen, kiezen of je alle oplossingen of enkel de laatste wil, of er rekening gehouden moet worden met de deadline, of de bestanden per student of per reeks gegroepeerd moeten worden en welke studenten meegerekend moeten worden. 

![export opties](./staff.series_export_options.png)

Klik op `Start export` om de download te starten.
![start export](./staff.series_export_start.png)

Je komt op de exportpagina die je zal verwittigen als je export klaar is, want dit kan even duren.
![export gestart](./staff.series_export_started.png)



