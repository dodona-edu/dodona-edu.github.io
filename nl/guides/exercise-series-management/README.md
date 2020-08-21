---
title: Oefeningenreeksenbeheer
description: "Tutorial: oefeningenreeksenbeheer"
---

<h1 id="oefeningenreeks"></h1>
Het [leerpad](/nl/course-manangement#leerpad) van een [cursus](/nl/course-management#cursus) bestaat uit verschillende [oefeningenreeksen](#oefeningenreeks) die elk opnieuw bestaan uit verschillenden [oefeningen](/nl/for-students#oefening). [Cursusbeheerders](/nl/course-management#cursusbeheerder) kunnen deze reeksen [aanmaken](#reeks-aanmaken), [bewerken](#reeks-bewerken), [verwijderen](#reeks-verwijderen) en [herordenen](#reeks-herordenen). 

::: tip 
Al deze acties kunnen ook uitgevoerd worden op de oefeningen in een reeks. Deze kan je terugvinden in het [reeks-bewerken](#reeks-bewerken) menu.
:::

## Oefeningenreeks aanmaken

Een cursusbeheerder kan onbeperkt oefeningenreeksen aanmaken. Als cursusbeheerder kan je doen door naar de cursuspagina van de [cursus](/nl/course-management#cursus) te [navigeren](/nl/course-management#cursus-navigeren). Op deze pagina dien je <span class="guilabel">Reeksen beheren</span> aan te klikken.

[todo reeksen beheren]()

Op deze pagina vind je rechtsboven de knop <span class="guilabel">Reeks aanmaken</span>.
[todo nieuwe reeks knop]()

Je komt op een formulier terecht waarin je de volgende eigenschappen van de reeks kan instellen:

<h1 id="oefeningenreeks-eigenschappen"></h1>

<span class="guilabel">Naam</span>

> Een naam om naar de reeks te verwijzen.
> Binnen een [leerpad](/nl/course-management#leerpad) kunnen verschillende oefeningenreeksen dezelfde naam
> hebben. Het is echter aangeraden om alle oefeningenreeksen van het
> leerpad een unieke naam te geven.

<span class="guilabel">Deadline</span>

> Een optionele deadline die aangeeft tot wanneer er rekening gehouden
> wordt met [oplossingen](/nl/for-students#oplossing) die
> [ingediend](/nl/for-students#oplossing-indienen) worden
> voor [oefeningen](/nl/for-students#oefening) uit de
> oefeningenreeks.
> Cursusgebruikers kunnen na de deadline onbeperkt oplossingen blijven indienen voor oefeningen uit de oefeningenreeks en blijven daar nog steeds een beoordeling en feedback voor ontvangen. Er wordt met deze oplossingen echter geen rekening meer gehouden bij het bepalen van hun [indienstatus](/nl/for-students#oefeningenreeks-oefening-indienstatus) voor oefeningen uit de oefeningenreeks.
>
> Zonder deadline wordt er bij het bepalen van de [indienstatus](/nl/for-students#oefeningenreeks-oefening-indienstatus) van cursusgebruikers blijvend rekening gehouden met
> [oplossingen](/nl/for-students#oplossing) die ze
> [indienen](/nl/for-students#oplossing-indienen) voor
> [oefeningen](/nl/for-students#oefening) uit de
> [oefeningenreeks](#oefeningenreeks)
>
> ::: tip Belangrijk
>
> Als de [deadline](/nl/for-students#oefeningenreeks-deadline) aangepast wordt dan krijgen
> [cursusgebruikers](/nl/course-management#cursusgebruiker)
> meteen ook een
> [indienstatus](/nl/for-students#oefeningenreeks-oefening-indienstatus) voor [oefeningen](#oefening) uit de [oefeningenreeks](#oefeningenreeks) die aangepast is aan de nieuwe deadline.
> :::
>
> Klik op het invulveld of druk op de kalenderknop om de datum en het
> tijdstip van de deadline in te stellen. Selecteer de deadline in de
> [tijdzone](/nl/for-students#gebruikersprofiel-tijdzone)
> die je hebt
> [ingesteld](/nl/for-students#persoonlijke-voorkeuren-instellen) in je
> [gebruikersprofiel](/nl/for-students#gebruikersprofiel).
> Andere gebruikers krijgen de deadline te zien in de tijdzone die ze in hun gebruikersprofiel hebben ingesteld.
>
> ![image](images/staff.course_series_calendar_open.nl.png)
>
> Druk op de verwijderknop om een ingestelde deadline te wissen.
>
> ![image](images/staff.course_series_calendar_clear.nl.png)

<span class="guilabel">Zichtbaarheid</span>

> De zichtbaarheid bepaalt of gebruikers de
> [oefeningenreeks](#oefeningenreeks)
> kunnen zien. Voor deze eigenschap kunnen de volgende waarden ingesteld worden:
>
><span class="guilabel" id="oefeningenreeks-open">Open</span>
>
> > Alle gebruikers zien de oefeningenreeks in het
> > [leerpad](/nl/course-management#leerpad).
>
><span class="guilabel" id="oefeningenreeks-verborgen">Verborgen</span>
>
> > Alleen [cursusbeheerders](/nl/course-management#cursusbeheerder) zien de
> > [oefeningenreeks](#oefeningenreeks) in
> > het [leerpad](/nl/course-management#leerpad). Er staat een
> > duidelijke mededeling bij om hen er op te wijzen dat andere
> > gebruikers de oefeningenreeks enkel kunnen zien als ze de
> > [geheime link](#oefeningenreeks-geheime-link) gebruiken. Er is ook een link aanwezig om deze instelling snel te veranderen.
> >
> > ![image](images/staff.course_series_hidden_info.nl.png)
>
><span class="guilabel" id="oefeningenreeks-gesloten">Gesloten</span>
>
> > Alleen [cursusbeheerders](#cursusbeheerder) zien de
> > [oefeningenreeks](#oefeningenreeks) in
> > het [leerpad](#leerpad). Er staat een
> > duidelijke mededeling bij om hen er op te wijzen dat andere
> > gebruikers de oefeningenreeks daar niet kunnen zien. Er is ook een link aanwezig om deze instelling snel te veranderen.
> >
> > ![image](images/staff.course_series_closed_info.nl.png)

<span class="guilabel" id="oefeningenreeks-geheime-link">Geheime link</span>


> Bij het [aanmaken](#oefeningenreeks-aanmaken) van een
> [oefeningenreeks](#oefeningenreeks)
> wordt automatisch een **token** gegenereerd als afschermingsmechanisme van [verborgen](#oefeningenreeks-verborgen) oefeningenreeksen. Zonder dit token kunnen gebruikers een
> verborgen oefeningenreeks niet zien in het leerpad. Als ze rechtstreeks naar de oefeningenreeks proberen te navigeren, dan zien ze enkel een melding dat ze geen toegangsrechten hebben voor de oefeningenreeks.
>
> ![image](images/student.hidden_series_denied_message.nl.png)
>
> Gebruikers kunnen een
> [verborgen](#oefeningenreeks-verborgen)
> [oefeningenreeks](#oefeningenreeks)
> enkel zien als ze gebruikmaken van de **geheime link** voor de cursus.
> De geheime link bevat het [token](#oefeningenreeks-geheime-link) waarmee ze de oefeningenreeks ook te zien krijgen als die verborgen werd.
>
> ![image](images/staff.series_hidden_link.nl.png)
>
> Als [cursusbeheerder](#cursusbeheerder) krijg je de verantwoordelijkheid om de [geheime link](#oefeningenreeks-geheime-link) enkel te delen met andere gebruikers die de [oefeningenreeks](#oefeningenreeks) mogen zien. Druk op de kopieerknop naast de geheime link om de geheime link naar het klembord te kopiëren.
>
> ![image](images/staff.series_hidden_link_copy.nl.png)
>
> <span id="oefeningenreeks-geheime-link-vernieuwen"></span>
> Druk op de vernieuwknop naast de
> [geheime link](#oefeningenreeks geheime link) om de
> [oefeningenreeks](#oefeningenreeks)
> opnieuw te [verbergen](#oefeningenreeks-verborgen) nadat de geheime link gedeeld werd. Daardoor wordt een
> nieuw [token](#oefeningenreeks-geheime-link)
> gegenereerd en wordt het oude token onbruikbaar gemaakt. De geheime
> link wordt meteen ook aangepast aan het nieuwe token.
>
> ![image](images/staff.series_hidden_link_reset.nl.png)

<span class="guilabel">Beschrijving</span>


> Een optionele beschrijving die gebruikers te zien krijgen bij de
> weergave van de oefeningenreeks in het
> [leerpad](/nl/course-management#leerpad). Voor het opmaken
> van de beschrijving kan je gebruikmaken van
> [Markdown](/nl/course-management#beschrijving-markdown).

Druk op de afwerkknop in de rechterbovenhoek van het paneel
<span class="guilabel">Nieuwe oefeningenreeks</span> om de nieuwe
[oefeningenreeks](#oefeningenreeks)
effectief aan het [leerpad](/nl/course-management#leerpad)
[toe te voegen](#oefeningenreeks-toevoegen).

![image](images/staff.course_series_new_submit.nl.png)

Na het afwerken navigeer je naar de
[bewerkingspagina](#oefeningenreeks-bewerken) van
de [oefeningenreeks](#oefeningenreeks). Daarbij zie je
bovenaan een melding dat de nieuwe oefeningenreeks
toegevoegd werd. In het [leerpad](/nl/course-management#leerpad) wordt deze reeks bovenaan toegevoegd. Op die manier worden de oefeningenreeksen van het leerpad in omgekeerde chronologische volgorde (eerste oefeningenreeks onderaan) weergegeven op de [cursuspagina](/nl/course-management#cursuspagina).

# Oefeningenreeks bewerken

Op deze pagina kan je de [eigenschappen](#oefeningenreeks-eigenschappen) van een reeks bewerken en leeractiviteiten toevoegen. Je kan deze pagina bereiken op 3 manieren: automatisch na het aanmaken van een nieuwe reeks, door op het bewerken-icoontje te drukken van de reeks in het Reeksen beheren-paneel of door <span class="guilabel">Reeks bewerken</span> te kiezen in het reeks-actiesmenu.

<h1 id="leeractiviteiten toevoegen"></h1>

Onderaan de pagina vind je de activiteiten die reeds tot deze reeks behoren en mogelijke activiteiten om eraan toe te voegen. Dit doe je door te klikken op het toevoegen- of verwijderen-icoontje aan de rechterkant van een oefening. Via de zoekbalk kan je bestaande oefeningen filteren op naam, beschikbare vertalingen, programmeertaal, labels, [repository](#todo-repository) of type.

# Oefeningenreeks verwijderen

# Oefeningenreeks herordenen
