---
title: Cursusbeheer
description: "Tutorial: cursusbeheer"
---


Een **cursus** wordt
[opgebouwd](#leerpad-uitstippelen) als een
[leerpad](#leerpad) met
[oefeningen](/nl/for-students#oefening) die gebundeld
worden in **oefeningenreeksen**. De opeenvolging van oefeningenreeksen impliceert een mogelijke volgorde waarin de oefeningen kunnen
[opgelost](/nl/for-students#solution) worden.


Een [lesgever](/nl/user-management#teacher) kan onbeperkt
[cursussen](#cursus)
[aanmaken](#cursus-aanmaken) en wordt
automatisch ook de eerste
[cursusbeheerder](#cursusbeheerder) van
die cursussen. Als cursusbeheerder kan hij andere
[cursusgebruikers](#cursusgebruikers)
[aanduiden](#cursusbeheerders-aanduiden)
om samen met hem de cursus te beheren. Hij kan echter geen cursussen
beheren waarvoor hij geen cursusbeheerder is.

Een [cursusbeheerder](#cursusbeheerder) [stippelt](#leerpad-uitstippelen) voor de [cursus](#cursus) een [leerpad](#leerpad) uit met [oefeningenreeksen](#oefeningenreeks) waaraan [oefeningen](/nl/for-students#oefening) [gekoppeld](#oefeningen-koppelen) worden. Voor elke oefeningenreeks kan hij een [deadline](#oefeningenreeks-deadline) [instellen](#oefeningenreeks-eigenschappen-instellen) die aangeeft tot wanneer er rekening gehouden wordt met [oplossingen](/nl/for-students#oplossing) die
[ingediend](/nl/for-students#oplossing-indienen) worden
voor de oefeningen uit de oefeningenreeks.
[Cursusgebruikers](#cursusgebruikers)
kunnen na de deadline echter onbeperkt oplossingen blijven indienen voor de oefeningen uit de oefeningenreeks en blijven daar nog steeds feedback voor ontvangen.

# Cursus aanmaken

Als [lesgever](/nl/user-management#lesgever) kan je een
nieuwe [cursus](#cursus) aanmaken door op
de knop <span class="guilabel">CURSUS AANMAKEN<span> te drukken
in de rechterbovenhoek van het
[cursusoverzicht](#cursusoverzicht).

![create course](./create-course.png)

Om een nieuwe [cursus](#cursus) aan te maken, zijn er twee opties. Ofwel vertrek je vanaf een reeds bestaande cursus, ofwel maak je een volledige nieuwe cursus aan.

![new course menu](./new-course-menu.png)

Druk op <span class="guilabel">Dodona<span> in de
[navigatiebalk](/nl/for-students#navigatiebalk) om het
aanmaken van de [cursus](#cursus) te
annuleren.

Als je vertrekt vanaf een bestaande [cursus](#cursus), dan moet je deze selecteren in de tabel. Via de zoekbalk kan je filteren om snel de gewenste cursus te vinden. Klik het bolletje in de linkerkolom aan om je keuze te bevestigen.

![choose existing course](./choose-existing-course.png)

Vervolgens moet je aangeven welke elementen van de [cursus](#cursus) je wil overnemen. De reeksstructuur wordt altijd gekopieerd. Je kan dan nog kiezen of je de oefeningen, de deadlines en de begeleiders wil overnemen. Ten slotte kan je ook andere instellingen kiezen.

<span class="guilabel">Zet de gekopieerde reeksen op verborgen</span>:  dit is zeer handig als je elke week een nieuwe reeks zichtbaar wil maken zonder ze eerst onzichtbaar te moeten maken.

## Cursuseigenschappen instellen
Bij beide keuzes moet je kiezen welke eigenschappen je cursus heeft. Deze worden vooraf ingevuld met de waarden van de gekopieerde [cursus](#cursus) indien deze optie gekozen werd. Volgende [eigenschappen](#cursuseigenschappen) kunnen ingesteld worden.

![image](./course-properties.png)

::: {#cursuseigenschappen}
Voor een `cursus <cursus>`{.interpreted-text role="ref"} kunnen de
volgende eigenschappen ingesteld worden:
:::

::: {#cursus naam}
`Naam`{.interpreted-text role="guilabel"}
:::

> Een naam voor de `cursus <cursus>`{.interpreted-text role="ref"}.
> Verschillende curssen kunnen dezelfde naam hebben. Het is echter
> aangeraden om cursussen zoveel mogelijk een unieke naam te geven.

::: {#cursus lesgever}
`Lesgevers`{.interpreted-text role="guilabel"}
:::

> De namen van de lesgevers van de `cursus <cursus>`{.interpreted-text
> role="ref"}. Gebruik een komma om namen te scheiden als er meerdere
> lesgevers zijn.

::: {#cursus academiejaar}
`Academiejaar`{.interpreted-text role="guilabel"}
:::

> Het academiejaar waarin de `cursus <cursus>`{.interpreted-text
> role="ref"} wordt aangeboden. Gebruik het formaat `jjjj-jjjj` om
> ervoor te zorgen dat de cursus correct gesorteerd wordt op de
> `startpagina <startpagina>`{.interpreted-text role="ref"} en in het
> `cursusoverzicht <cursusoverzicht>`{.interpreted-text role="ref"}.



::: {#cursus zichtbaarheid}
`Zichtbaarheid`{.interpreted-text role="guilabel"}
:::

> De zichtbaarheid bepaalt of
> `niet-geregistreerde <cursus registreren>`{.interpreted-text
> role="ref"} gebruikers de `cursus <cursus>`{.interpreted-text
> role="ref"} kunnen zien. Voor deze eigenschap kunnen de volgende
> waarden ingesteld worden:
>
> ::: {#cursus zichtbaar}
> `Zichtbaar`{.interpreted-text role="guilabel"}
> :::
>
> > Alle gebruikers zien de `cursus <cursus>`{.interpreted-text
> > role="ref"} in het
> > `cursusoverzicht <cursusoverzicht>`{.interpreted-text role="ref"}.
> > Ze kunnen ook naar de
> > `cursuspagina <cursuspagina>`{.interpreted-text role="ref"}
> > navigeren en zich daar eventueel voor de cursus
> > `registreren <cursus registreren>`{.interpreted-text role="ref"}.
>
> ::: {#cursus verborgen}
> `Verborgen`{.interpreted-text role="guilabel"}
> :::
>
> > Alleen `cursusbeheerders <cursusbeheerder>`{.interpreted-text
> > role="ref"} zien de `cursus <cursus>`{.interpreted-text role="ref"}
> > in het `cursusoverzicht <cursusoverzicht>`{.interpreted-text
> > role="ref"} en op hun `startpagina <startpagina>`{.interpreted-text
> > role="ref"}. Er staat een icoontje bij om hen er op te wijzen dat
> > andere gebruikers de cursus daar niet kunnen zien.
> >
> > ![image](images/staff.courses_hidden_course.nl.png)
> >
> > Alleen `geregistreerde <cursus registreren>`{.interpreted-text
> > role="ref"} gebruikers kunnen naar de
> > `cursuspagina <cursuspagina>`{.interpreted-text role="ref"}
> > navigeren. `Cursusbeheerders <cursusbeheerder>`{.interpreted-text
> > role="ref"} zien een duidelijke mededeling op de cursuspagina om hen
> > er op te wijzen dat niet-geregistreerde gebruikers niet naar de
> > cursuspagina kunnen navigeren en zich enkel voor de
> > `cursus <cursus>`{.interpreted-text role="ref"} kunnen registreren
> > als ze de
> > `registratielink <cursus registratielink>`{.interpreted-text
> > role="ref"} gebruiken.
> >
> > ![image](images/staff.hidden_course_message.nl.png)
> >
> > ![image](images/student.hidden_course_unregistered_link_message.nl.png)

::: {#cursus registratie}
::: {#cursus registratieprocedure}
`Registratieprocedure`{.interpreted-text role="guilabel"}
:::
:::

> De registratieprocedure bepaalt of en hoe gebruikers zich voor de
> `cursus <cursus>`{.interpreted-text role="ref"} kunnen
> `registreren <cursus registreren>`{.interpreted-text role="ref"}. Voor
> deze eigenschap kunnen de volgende waarden ingesteld worden:
>
> ::: {#cursus open}
> `Open`{.interpreted-text role="guilabel"}
> :::
>
> > Gebruikers kunnen zich voor de `cursus <cursus>`{.interpreted-text
> > role="ref"} `registreren <cursus registreren>`{.interpreted-text
> > role="ref"} zonder expliciete goedkeuring van een
> > `cursusbeheerder <cursusbeheerder>`{.interpreted-text role="ref"}.
>
> ::: {#cursus gemodereerd}
> `Gemodereerd`{.interpreted-text role="guilabel"}
> :::
>
> > Gebruikers kunnen een
> > `registratieverzoek <registratieverzoek>`{.interpreted-text
> > role="ref"}
> > `indienen <registratieverzoek indienen>`{.interpreted-text
> > role="ref"} voor de `cursus <cursus>`{.interpreted-text role="ref"}
> > maar zijn pas `geregistreerd <cursus registreren>`{.interpreted-text
> > role="ref"} als een
> > `cursusbeheerder <cursusbeheerder>`{.interpreted-text role="ref"}
> > hun registratieverzoek heeft
> > `goedgekeurd <registratieverzoek goedkeuren>`{.interpreted-text
> > role="ref"}.
>
> ::: {#cursus gesloten}
> `Gesloten`{.interpreted-text role="guilabel"}
> :::
>
> > Gebruikers kunnen zich niet meer voor de
> > `cursus <cursus>`{.interpreted-text role="ref"}
> > `registreren <cursus registreren>`{.interpreted-text role="ref"}.
>
> ::: {.important}
> ::: {.admonition-title}
> Important
> :::
>
> Als je de registratieprocedure aanpast dan blijven bestaande
> `registraties <cursus registreren>`{.interpreted-text role="ref"} voor
> de `cursus <cursus>`{.interpreted-text role="ref"} gelden en blijven
> `registratieverzoeken <registratieverzoek>`{.interpreted-text
> role="ref"} voor de cursus openstaan. Je moet zelf de bestaande
> `registratiestatus <cursusgebruiker registratiestatus>`{.interpreted-text
> role="ref"} van `cursusgebruikers <cursusgebruiker>`{.interpreted-text
> role="ref"}
> `aanpassen <cursusgebruiker registratiestatus aanpassen>`{.interpreted-text
> role="ref"}.
> :::

::: {#cursus beschrijving}
`Beschrijving`{.interpreted-text role="guilabel"}
:::

> Een optionele beschrijving die bovenaan de
> `cursuspagina <cursuspagina>`{.interpreted-text role="ref"} wordt
> weergegeven. Voor het opmaken van de beschrijving kan je gebruikmaken
> van `Markdown <beschrijving markdown>`{.interpreted-text role="ref"}.
>
> ::: {#beschrijving markdown}
> ::: {.tip}
> ::: {.admonition-title}
> Tip
> :::
>
> De beschrijving van eigenschappen die aangeduid worden met het
> Markdown-logo kan geschreven worden met behulp van
> [Markdown](https://en.wikipedia.org/wiki/Markdown). Dodona maakt voor
> de weergave van Markdown gebruik van
> [kramdown](https://kramdown.gettalong.org) waardoor heel wat
> uitbreidingen van de standaard Markdown ondersteund worden.
> :::
> :::

::: {#cursus token}
::: {#cursus registratielink}
`Registratielink`{.interpreted-text role="guilabel"}
:::
:::

> Bij het `aanmaken <cursus aanmaken>`{.interpreted-text role="ref"} van
> een `cursus <cursus>`{.interpreted-text role="ref"} wordt automatisch
> een **token** gegenereerd als afschermingsmechanisme van
> `verborgen <cursus verborgen>`{.interpreted-text role="ref"}
> cursussen. Zonder dit token kunnen
> `niet-geregistreerde <cursus registreren>`{.interpreted-text
> role="ref"} gebruikers de
> `cursuspagina <cursuspagina>`{.interpreted-text role="ref"} van een
> `verborgen <cursus verborgen>`{.interpreted-text role="ref"} cursus
> niet zien en zich daar dus ook niet registreren. Als ze toch naar de
> cursus proberen te navigeren, dan zien ze enkel een melding dat ze
> niet de geen toegangsrechten hebben voor de cursus.
>
> ![image](images/student.hidden_course_unregistered_denied_message.nl.png)
>
> ::: {#cursus registratielink gebruiken}
> Gebruikers kunnen zich enkel
> `registreren <cursus registreren>`{.interpreted-text role="ref"} voor
> een `verborgen <cursus verborgen>`{.interpreted-text role="ref"}
> `cursus <cursus>`{.interpreted-text role="ref"} als ze gebruikmaken
> van de **registratielink** voor de cursus. De registratielink bevat
> het `token <cursus token>`{.interpreted-text role="ref"} dat hen
> toegang geeft tot de cursus. Bovendien navigeren
> `niet-geregistreerde <cursus registreren>`{.interpreted-text
> role="ref"} gebruikers niet rechtstreeks naar de
> `cursuspagina <cursuspagina>`{.interpreted-text role="ref"}, maar
> worden ze verzocht om zich voor de cursus te registreren als de
> `registratieprocedure <cursus registratieprocedure>`{.interpreted-text
> role="ref"} dat toelaat.
> :::
>
> ![image](images/student.hidden_course_unregistered_link_message.nl.png)
>
> ::: {#cursus registratielink kopiëren}
> De `registratielink <cursus registratielink>`{.interpreted-text
> role="ref"} heeft dus als voordeel dat gebruikers de
> `cursus <cursus>`{.interpreted-text role="ref"} niet zelf moeten
> `zoeken <cursus navigeren>`{.interpreted-text role="ref"} in het
> `cursusoverzicht <cursusoverzicht>`{.interpreted-text role="ref"} en
> dat ze meteen een verzoek krijgen om zich voor de cursus te
> `registreren <registreren>`{.interpreted-text role="ref"} als ze dat
> nog niet gedaan hadden. Als
> `cursusbeheerder <cursusbeheerder>`{.interpreted-text role="ref"}
> krijg je de verantwoordelijkheid om de registratielink enkel te delen
> met niet-geregistreerde gebruikers die zich voor een
> `verborgen <cursus verborgen>`{.interpreted-text role="ref"} cursus
> mogen registreren. Druk op de kopieerknop naast de registratielink om
> de registratielink naar het klembord te kopiëren.
> :::
>
> ![image](images/staff.hidden_course_registration_link.nl.png)
>
> ::: {#cursus token vernieuwen}
> ::: {#cursus registratielink vernieuwen}
> Druk op de vernieuwknop naast de
> `registratielink <cursus registratielink>`{.interpreted-text
> role="ref"} om de `cursus <cursus>`{.interpreted-text role="ref"}
> opnieuw te `verbergen <cursus verborgen>`{.interpreted-text
> role="ref"} nadat de registratielink gedeeld werd. Daardoor wordt een
> nieuw `token <cursus token>`{.interpreted-text role="ref"} gegenereerd
> en wordt het oude token onbruikbaar gemaakt. De registratielink wordt
> meteen ook aangepast aan het nieuwe token.
> :::
> :::
>
> ![image](images/staff.registration_link_renew.nl.png)
>
> De `registratielink <cursus registratielink>`{.interpreted-text
> role="ref"} wordt ook weergegeven op de
> `cursuspagina <cursuspagina>`{.interpreted-text role="ref"}.
>
> ![image](images/staff.registration_link.nl.png)
>
> ::: {#registratielink kopiëren}
> Druk op de kopieerknop naast de
> `registratielink <cursus registratielink>`{.interpreted-text
> role="ref"} om de registratielink naar het klembord te kopiëren.
> :::
>
> ![image](images/staff.registration_link_copy.nl.png)

Druk op de afwerkknop in de rechterbovenhoek van het paneel
`Nieuwe cursus`{.interpreted-text role="guilabel"} om het
`aanmaken <cursus aanmaken>`{.interpreted-text role="ref"} van een
`cursus <cursus>`{.interpreted-text role="ref"} met de opgegeven
`eigenschappen <cursuseigenschappen>`{.interpreted-text role="ref"}
effectief door te voeren.

![image](images/staff.new_course_submit.nl.png)

Na het aanmaken van de nieuwe cursus navigeer je naar de
`cursuspagina <cursuspagina>`{.interpreted-text role="ref"}, waar je
kunt vaststellen dat je automatisch
`geregistreerd <cursus registreren>`{.interpreted-text role="ref"} bent
als `cursusgebruiker <cursusgebruiker>`{.interpreted-text role="ref"} en
dat je `aangeduid <cursusbeheerders aanduiden>`{.interpreted-text
role="ref"} bent als
`cursusbeheerder <cursusbeheerder>`{.interpreted-text role="ref"}.

![image](images/staff.created_course.nl.png)

# Cursus bewerken
-----------------------

::: {#cursuseigenschappen aanpassen}
Als `cursusbeheerder <cursusbeheerder>`{.interpreted-text role="ref"}
kan je de `eigenschappen <cursuseigenschappen>`{.interpreted-text
role="ref"} van een `cursus <cursus>`{.interpreted-text role="ref"}
aanpassen door op de bewerkknop te drukken in de rechterbovenhoek van de
`cursuspagina <cursuspagina>`{.interpreted-text role="ref"}.
:::

![image](images/staff.course_edit_button.nl.png)

::: {#cursuseigenschappen aanpassen annuleren}
Druk op de `cursus <cursus>`{.interpreted-text role="ref"} in de
`navigatiebalk <navigatiebalk>`{.interpreted-text role="ref"} om het
aanpassen te annuleren.
:::

![image](images/staff.course_edit_cancel.nl.png)

::: {#cursuseigenschappen aanpassen afwerken}
Druk na het aanpassen op de afwerkknop in de rechterbovenhoek van het
paneel om de nieuwe
`cursuseigenschappen <cursuseigenschappen>`{.interpreted-text
role="ref"} effectief in te stellen.
:::

![image](images/staff.course_edit_submit_link.nl.png)

Na het afwerken navigeer je terug naar de
`cursuspagina <cursuspagina>`{.interpreted-text role="ref"} waar de
nieuwe `cursuseigenschappen <cursuseigenschappen>`{.interpreted-text
role="ref"} onmiddellijk van toepassing zijn.

![image](images/staff.course_after_edit.nl.png)

# Leerpad uitstippelen
-------------------------------------------------------------

Als `cursusbeheerder <cursusbeheerder>`{.interpreted-text role="ref"}
kan je voor de `cursus <cursus>`{.interpreted-text role="ref"} een
**leerpad** uitstippelen. Het leerpad wordt op de
`cursuspagina <cursuspagina>`{.interpreted-text role="ref"} weergegeven
onder de hoofding `Oefeningenreeksen`{.interpreted-text
role="guilabel"}. Aan het leerpad kan je
`oefeningenreeksen <oefeningenreeks>`{.interpreted-text role="ref"}
`toevoegen <oefeningenreeks toevoegen>`{.interpreted-text role="ref"}
waaraan je `oefeningen <oefening>`{.interpreted-text role="ref"} kunt
`koppelen <oefeningenreeks oefeningen koppelen>`{.interpreted-text
role="ref"}.

# Oefeningenreeks toevoegen

Druk in het `leerpad <leerpad>`{.interpreted-text role="ref"} op de knop
`REEKS AANMAKEN`{.interpreted-text role="guilabel"} om een nieuwe
oefeningenreeks aan het leerpad toe te voegen.

![image](images/staff.course_series_new_link.nl.png)

::: {#oefeningenreeks eigenschappen instellen}
In het paneel `Nieuwe oefeningenreeks`{.interpreted-text
role="guilabel"} kan je de
`eigenschappen <oefeningenreeks eigenschappen>`{.interpreted-text
role="ref"} van de nieuwe
`oefeningenreeks <oefeningenreeks>`{.interpreted-text role="ref"}
instellen.
:::

![image](images/staff.course_series_new.nl.png)

::: {#oefeningenreeks eigenschappen instellen annuleren}
Druk op de `cursus <cursus>`{.interpreted-text role="ref"} in de
`navigatiebalk <navigatiebalk>`{.interpreted-text role="ref"} om het
`toevoegen <oefeningenreeks toevoegen>`{.interpreted-text role="ref"}
van de oefeningenreeks te annuleren.
:::

![image](images/staff.course_series_new_cancel.nl.png)

::: {#oefeningenreeks eigenschappen}
Voor een `oefeningenreeks <oefeningenreeks>`{.interpreted-text
role="ref"} kunnen de volgende eigenschappen ingesteld worden:
:::

::: {#oefeningenreeks naam}
`Naam`{.interpreted-text role="guilabel"}
:::

> Een naam voor de `oefeningenreeks <oefeningenreeks>`{.interpreted-text
> role="ref"}. Binnen een `leerpad <leerpad>`{.interpreted-text
> role="ref"} kunnen verschillende oefeningenreeksen dezelfde naam
> hebben. Het is echter aangeraden om alle oefeningenreeksen van het
> leerpad een unieke naam te geven.

::: {#oefeningenreeks deadline}
`Deadline`{.interpreted-text role="guilabel"}
:::

> Een optionele deadline die aangeeft tot wanneer er rekening gehouden
> wordt met `oplossingen <oplossing>`{.interpreted-text role="ref"} die
> `ingediend <oplossing indienen>`{.interpreted-text role="ref"} worden
> voor `oefeningen <oefening>`{.interpreted-text role="ref"} uit de
> `oefeningenreeks <oefeningenreeks>`{.interpreted-text role="ref"}.
> `Cursusgebruikers <cursusgebruiker>`{.interpreted-text role="ref"}
> kunnen na de deadline onbeperkt oplossingen blijven indienen voor
> oefeningen uit de oefeningenreeks en blijven daar nog steeds een
> beoordeling en feedback voor ontvangen. Er wordt met deze oplossingen
> echter geen rekening meer gehouden bij het bepalen van hun
> `indienstatus <oefeningenreeks oefening indienstatus>`{.interpreted-text
> role="ref"} voor oefeningen uit de oefeningenreeks.
>
> Zonder deadline wordt er bij het bepalen van de
> `indienstatus <oefeningenreeks oefening indienstatus>`{.interpreted-text
> role="ref"} van `cursusgebruikers <cursusgebruiker>`{.interpreted-text
> role="ref"} blijvend rekening gehouden met
> `oplossingen <oplossing>`{.interpreted-text role="ref"} die ze
> `indienen <oplossing indienen>`{.interpreted-text role="ref"} voor
> `oefeningen <oefening>`{.interpreted-text role="ref"} uit de
> `oefeningenreeks <oefeningenreeks>`{.interpreted-text role="ref"}
>
> ::: {.important}
> ::: {.admonition-title}
> Important
> :::
>
> Als de `deadline <oefeningenreeks deadline>`{.interpreted-text
> role="ref"} aangepast wordt dan krijgen
> `cursusgebruikers <cursusgebruiker>`{.interpreted-text role="ref"}
> meteen ook een
> `indienstatus <oefeningenreeks oefening indienstatus>`{.interpreted-text
> role="ref"} voor `oefeningen <oefening>`{.interpreted-text role="ref"}
> uit de `oefeningenreeks <oefeningenreeks>`{.interpreted-text
> role="ref"} die aangepast is aan de nieuwe deadline.
> :::
>
> Klik op het invulveld of druk op de kalenderknop om de datum en het
> tijdstip van de deadline in te stellen. Selecteer de deadline in de
> `tijdzone <gebruikersprofiel tijdzone>`{.interpreted-text role="ref"}
> die je hebt
> `ingesteld <persoonlijke voorkeuren instellen>`{.interpreted-text
> role="ref"} in je
> `gebruikersprofiel <gebruikersprofiel>`{.interpreted-text role="ref"}.
> Andere gebruikers krijgen de deadline te zien in de tijdzone die ze in
> hun gebruikersprofiel hebben ingesteld.
>
> ![image](images/staff.course_series_calendar_open.nl.png)
>
> Druk op de verwijderknop om een ingestelde deadline te wissen.
>
> ![image](images/staff.course_series_calendar_clear.nl.png)

::: {#oefeningenreeks zichtbaarheid}
`Zichtbaarheid`{.interpreted-text role="guilabel"}
:::

> De zichtbaarheid bepaalt of gebruikers de
> `oefeningenreeks <oefeningenreeks>`{.interpreted-text role="ref"}
> kunnen zien. Voor deze eigenschap kunnen de volgende waarden ingesteld
> worden:
>
> ::: {#oefeningenreeks open}
> `Open`{.interpreted-text role="guilabel"}
> :::
>
> > Alle gebruikers zien de oefeningenreeks in het
> > `leerpad <leerpad>`{.interpreted-text role="ref"}.
>
> ::: {#oefeningenreeks verborgen}
> `Verborgen`{.interpreted-text role="guilabel"}
> :::
>
> > ::: {#oefeningenreeks verborgen weergave}
> > Alleen `cursusbeheerders <cursusbeheerder>`{.interpreted-text
> > role="ref"} zien de
> > `oefeningenreeks <oefeningenreeks>`{.interpreted-text role="ref"} in
> > het `leerpad <leerpad>`{.interpreted-text role="ref"}. Er staat een
> > duidelijke mededeling bij om hen er op te wijzen dat andere
> > gebruikers de oefeningenreeks enkel kunnen zien als ze de
> > `geheime link <oefeningenreeks geheime link>`{.interpreted-text
> > role="ref"} gebruiken.
> > :::
> >
> > ![image](images/staff.course_series_hidden_info.nl.png)
>
> ::: {#oefeningenreeks gesloten}
> `Gesloten`{.interpreted-text role="guilabel"}
> :::
>
> > ::: {#oefeningenreeks gesloten weergave}
> > Alleen `cursusbeheerders <cursusbeheerder>`{.interpreted-text
> > role="ref"} zien de
> > `oefeningenreeks <oefeningenreeks>`{.interpreted-text role="ref"} in
> > het `leerpad <leerpad>`{.interpreted-text role="ref"}. Er staat een
> > duidelijke mededeling bij om hen er op te wijzen dat andere
> > gebruikers de oefeningenreeks daar niet kunnen zien.
> > :::
> >
> > ![image](images/staff.course_series_closed_info.nl.png)

::: {#oefeningenreeks token}
::: {#oefeningenreeks geheime link}
`Geheime link`{.interpreted-text role="guilabel"}
:::
:::

> Bij het `toevoegen <oefeningenreeks toevoegen>`{.interpreted-text
> role="ref"} van een
> `oefeningenreeks <oefeningenreeks>`{.interpreted-text role="ref"}
> wordt automatisch een **token** gegenereerd als afschermingsmechanisme
> van `verborgen <oefeningenreeks verborgen>`{.interpreted-text
> role="ref"} oefeningenreeksen. Zonder dit token kunnen gebruikers een
> `verborgen <oefeningenreeks verborgen>`{.interpreted-text role="ref"}
> oefeningenreeks niet zien in het leerpad. Als ze rechtstreeks naar de
> oefeningenreeks proberen te navigeren, dan zien ze enkel een melding
> dat ze geen toegangsrechten hebben voor de oefeningenreeks.
>
> ![image](images/student.hidden_series_denied_message.nl.png)
>
> ::: {#oefeningenreeks geheime link gebruiken}
> Gebruikers kunnen een
> `verborgen <oefeningenreeks verborgen>`{.interpreted-text role="ref"}
> `oefeningenreeks <oefeningenreeks>`{.interpreted-text role="ref"}
> enkel zien als ze gebruikmaken van de **geheime link** voor de cursus.
> De geheime link bevat het
> `token <oefeningenreeks token>`{.interpreted-text role="ref"} waarmee
> ze de oefeningenreeks ook te zien krijgen als die verborgen werd.
> :::
>
> ![image](images/staff.series_hidden_link.nl.png)
>
> ::: {#oefeningenreeks geheime link kopiëren}
> Als `cursusbeheerder <cursusbeheerder>`{.interpreted-text role="ref"}
> krijg je de verantwoordelijkheid om de
> `geheime link <oefeningenreeks geheime link>`{.interpreted-text
> role="ref"} enkel te delen met andere gebruikers die de
> `oefeningenreeks <oefeningenreeks>`{.interpreted-text role="ref"}
> mogen zien. Druk op de kopieerknop naast de geheime link om de geheime
> link naar het klembord te kopiëren.
> :::
>
> ![image](images/staff.series_hidden_link_copy.nl.png)
>
> ::: {#oefeningenreeks token vernieuwen}
> ::: {#oefeningenreeks geheime link vernieuwen}
> Druk op de vernieuwknop naast de
> `geheime link <oefeningenreeks geheime link>`{.interpreted-text
> role="ref"} om de
> `oefeningenreeks <oefeningenreeks>`{.interpreted-text role="ref"}
> opnieuw te `verbergen <oefeningenreeks verborgen>`{.interpreted-text
> role="ref"} nadat de geheime link gedeeld werd. Daardoor wordt een
> nieuw `token <oefeningenreeks token>`{.interpreted-text role="ref"}
> gegenereerd en wordt het oude token onbruikbaar gemaakt. De geheime
> link wordt meteen ook aangepast aan het nieuwe token.
> :::
> :::
>
> ![image](images/staff.series_hidden_link_reset.nl.png)

::: {#oefeningenreeks beschrijving}
`Beschrijving`{.interpreted-text role="guilabel"}
:::

> Een optionele beschrijving die gebruikers te zien krijgen bij de
> weergave van de oefeningenreeks in het
> `leerpad <leerpad>`{.interpreted-text role="ref"}. Voor het opmaken
> van de beschrijving kan je gebruikmaken van
> `Markdown <beschrijving markdown>`{.interpreted-text role="ref"}.

Druk op de afwerkknop in de rechterbovenhoek van het paneel
`Nieuwe oefeningenreeks`{.interpreted-text role="guilabel"} om de nieuwe
`oefeningenreeks <oefeningenreeks>`{.interpreted-text role="ref"}
effectief aan het `leerpad <leerpad>`{.interpreted-text role="ref"}
`toe te voegen <oefeningenreeks toevoegen>`{.interpreted-text
role="ref"}.

![image](images/staff.course_series_new_submit.nl.png)

Na het afwerken navigeer je naar de
`weergave <oefeningenreeks weergeven>`{.interpreted-text role="ref"} van
de `oefeningenreeks <oefeningenreeks>`{.interpreted-text role="ref"} in
het `leerpad <leerpad>`{.interpreted-text role="ref"}. Daarbij zie je
dat de nieuwe oefeningenreeks aan de bovenkant van het leerpad
toegevoegd werd. Op die manier worden de oefeningenreeksen van het
leerpad in omgekeerde chronologische volgorde (eerste oefeningenreeks
onderaan) weergegeven op de
`cursuspagina <cursuspagina>`{.interpreted-text role="ref"}.

### Oefening aan reeks toevoegen

Je ziet nu een uitgebreide versie van het paneel waarin je naast het
`instellen <oefeningenreeks eigenschappen instellen>`{.interpreted-text
role="ref"} van
`eigenschappen <oefeningenreeks eigenschappen>`{.interpreted-text
role="ref"} ook oefeningen kunt koppelen aan de
`oefeningenreeks <oefeningenreeks>`{.interpreted-text role="ref"}. Onder
de hoofding `Oefeningen toevoegen`{.interpreted-text role="guilabel"}
staat een overzicht van alle beschikbare oefeningen en onder de hoofding
`Oefeningen in deze reeks`{.interpreted-text role="guilabel"} staat een
overzicht van alle oefeningen die aan de oefeningenreeks gekoppeld
werden.

::: {.important}
::: {.admonition-title}
Important
:::

We veronderstellen hier dat de `oefeningen <oefening>`{.interpreted-text
role="ref"} die aan de
`oefeningenreeks <oefeningenreeks>`{.interpreted-text role="ref"} moeten
gekoppeld worden reeds beschikbaar zijn in Dodona. Het opstellen,
publiceren en delen van `oefeningen <oefening>`{.interpreted-text
role="ref"} wordt besproken in `oefeningen beheren`{.interpreted-text
role="ref"}.
:::

::: {#oefeningenoverzicht}
::: {#oefeningenreeks oefeningen zoeken}
Onder de hoofding `Oefeningen toevoegen`{.interpreted-text
role="guilabel"} kan je de zoekbalk gebruiken om te zoeken naar
specifieke `oefeningen <oefening>`{.interpreted-text role="ref"} op
basis van een naam of een padnaam. Hierbij wordt gezocht in alle
beschikbare vertalingen voor de naam van de oefeningen.
:::
:::

![image](images/staff.series_search_exercises.nl.png)

::: {#oefeningenreeks oefening toevoegen}
Druk op de toevoegknop aan de rechterkant van een
`oefening <oefening>`{.interpreted-text role="ref"} om de oefening aan
de `oefeningenreeks <oefeningenreeks>`{.interpreted-text role="ref"} toe
te voegen.
:::

![image](images/staff.series_add_exercise.nl.png)

::: {#oefeningenreeks oefening verwijderen}
Onder de hoofding `Oefeningen in deze reeks`{.interpreted-text
role="guilabel"} kan je aan de rechterkant van een
`oefening <oefening>`{.interpreted-text role="ref"} op de verwijderknop
drukken om de oefening uit de
`oefeningenreeks <oefeningenreeks>`{.interpreted-text role="ref"} te
verwijderen.
:::

![image](images/staff.series_remove_exercise.nl.png)

::: {#oefeningenreeks oefeningen herschikken}
Versleep de verplaatsknop aan de linkerkant van de
`oefeningen <oefening>`{.interpreted-text role="ref"} om de volgorde van
de oefeningen aan te passen. De volgorde waarin de oefeningen onder de
hoofding `Oefeningen in deze reeks`{.interpreted-text role="guilabel"}
gerangschikt worden, is immers ook de volgorde waarin de oefeningen
`weergegeven <oefeningenreeks weergeven>`{.interpreted-text role="ref"}
worden in de oefeningenreeks.
:::

![image](images/staff.series_move_exercise.nl.png)

::: {#oefeningenreeks oefeningen afwerken}
Druk op de afwerkknop in de rechterbovenhoek van het paneel om de
koppeling van `oefeningen <oefening>`{.interpreted-text role="ref"} aan
de `oefeningenreeks <oefeningenreeks>`{.interpreted-text role="ref"} af
te werken.
:::

![image](images/staff.series_edit_submit.nl.png)

Na het afwerken navigeer je terug naar de
`oefeningenreeks <oefeningenreeks>`{.interpreted-text role="ref"} in het
`leerpad <leerpad>`{.interpreted-text role="ref"}, waar je kunt
vaststellen dat de nieuwe koppeling van de
`oefeningen <oefening>`{.interpreted-text role="ref"} meteen van
toepassing is.

### Oefeningenreeks beheren

::: {#oefeningenreeks menu cursusbeheerder}
In het `menu <oefeningenreeks menu>`{.interpreted-text role="ref"} van
een `oefeningenreeks <oefeningenreeks>`{.interpreted-text role="ref"}
staan enkele bijkomende opties die corresponderen met acties die
voorbehouden zijn voor
`cursusbeheerders <cursusbeheerder>`{.interpreted-text role="ref"}.
:::

::: {#oefeningenreeks bewerken}
::: {#oefeningenreeks eigenschappen aanpassen}
`Reeks bewerken`{.interpreted-text role="guilabel"}
:::
:::

> Toont een pagina waarop de
> `eigenschappen <oefeningenreeks eigenschappen>`{.interpreted-text
> role="ref"} en de
> `koppeling <oefeningenreeks oefeningen koppelen>`{.interpreted-text
> role="ref"} van `oefeningen <oefening>`{.interpreted-text role="ref"}
> kunnen aangepast worden.
>
> ![image](images/staff.series_edit.nl.png)
>
> ::: {#oefeningenreeks eigenschappen aanpassen annuleren}
> Druk op de `oefeningenreeks <oefeningenreeks>`{.interpreted-text
> role="ref"} in de `navigatiebalk <navigatiebalk>`{.interpreted-text
> role="ref"} om het aanpassen te annuleren.
> :::
>
> ![image](images/staff.series_edit_cancel.nl.png)
>
> ::: {#oefeningenreeks eigenschappen aanpassen afwerken}
> Druk na het aanpassen op de afwerkknop in de rechterbovenhoek van het
> paneel om de nieuwe
> `eigenschappen <oefeningenreeks eigenschappen>`{.interpreted-text
> role="ref"} effectief in te stellen.
> :::
>
> ![image](images/staff.series_edit_submit.nl.png)
>
> Na het
> `aanpassen <oefeningenreeks eigenschappen aanpassen>`{.interpreted-text
> role="ref"} navigeer je terug naar de
> `oefeningenreeks <oefeningenreeks>`{.interpreted-text role="ref"} in
> het `leerpad <leerpad>`{.interpreted-text role="ref"}, waar de nieuwe
> `eigenschappen <oefeningenreeks eigenschappen>`{.interpreted-text
> role="ref"} onmiddellijk van toepassing zijn.

::: {#oefeningenreeks verwijderen}
`Reeks verwijderen`{.interpreted-text role="guilabel"}
:::

> Verwijdert de `oefeningenreeks <oefeningenreeks>`{.interpreted-text
> role="ref"} uit het `leerpad <leerpad>`{.interpreted-text role="ref"}.

::: {#oefeningenreeks geheime link gebruiken cursusbeheerder}
`Geheime link`{.interpreted-text role="guilabel"}
:::

> Gebruikt de
> `geheime link <oefeningenreeks geheime link>`{.interpreted-text
> role="ref"} om naar de
> `oefeningenreeks <oefeningenreeks>`{.interpreted-text role="ref"} te
> `navigeren <oefeningenreeks geheime link gebruiken>`{.interpreted-text
> role="ref"}.

::: {#oefeningenreeks statusoverzicht}
::: {#oefeningenreeks statusoverzicht weergeven}
`Statusoverzicht`{.interpreted-text role="guilabel"}
:::
:::

> Toont een overzicht met de
> `indienstatus <oefeningenreeks oefening indienstatus>`{.interpreted-text
> role="ref"} van alle
> `cursusgebruikers <cursusgebruiker>`{.interpreted-text role="ref"}
> voor alle `oefeningen <oefening>`{.interpreted-text role="ref"} uit de
> `oefeningenreeks <oefeningenreeks>`{.interpreted-text role="ref"}. De
> indienstatus wordt in het overzicht weergegeven met de gebruikelijke
> `icoontjes <oefeningenreeks oefening indienstatus icoontje>`{.interpreted-text
> role="ref"}.
>
> ![image](images/staff.scoresheet.nl.png)
>
> Druk op de naam van een
> `cursusgebruiker <cursusgebruiker>`{.interpreted-text role="ref"} om
> naar de `profielpagina <profielpagina>`{.interpreted-text role="ref"}
> van de gebruiker te navigeren.
>
> ![image](images/staff.scoresheet_user_link.nl.png)
>
> Druk op het
> `icoontje <oefeningenreeks oefening indienstatus icoontje>`{.interpreted-text
> role="ref"} van een
> `indienstatus <oefeningenreeks oefening indienstatus>`{.interpreted-text
> role="ref"} om naar de `oplossing <oplossing>`{.interpreted-text
> role="ref"} te navigeren die gebruikt werd om de
> `indienstatus <oefeningenreeks oefening indienstatus>`{.interpreted-text
> role="ref"} te bepalen (als de cursusgebruiker effectief een oplossing
> heeft `ingediend <oplossing indienen>`{.interpreted-text role="ref"}
> op basis waarvan de indienstatus kon bepaald worden).
>
> ![image](images/staff.scoresheet_status_icon.nl.png)

::: {#oefeningenreeks oplossingen herevalueren}
`Oplossingen herevalueren`{.interpreted-text role="guilabel"}
:::

> `Herevalueert <oplossing herevalueren>`{.interpreted-text role="ref"}
> alle `oplossingen <oplossing>`{.interpreted-text role="ref"} die
> `cursusgebruikers <cursusgebruiker>`{.interpreted-text role="ref"}
> `ingediend <oplossing indienen>`{.interpreted-text role="ref"} hebben
> voor `oefeningen <oefening>`{.interpreted-text role="ref"} van de
> `oefeningenreeks <oefeningenreeks>`{.interpreted-text role="ref"}.

# Cursusgebruikers beheren}
------------------------------------------------

Als `cursusbeheerder <cursusbeheerder>`{.interpreted-text role="ref"}
krijg je toegang tot alle **cursusgebruikers**. Dit zijn de gebruikers
die ooit voor de cursus
`geregistreerd <cursus registreren>`{.interpreted-text role="ref"}
geweest zijn of die ooit een
`registratieverzoek <registratieverzoek>`{.interpreted-text role="ref"}
voor de cursus ingediend hebben. Je kunt hun
`gebruikersprofiel <gebruikersprofiel>`{.interpreted-text role="ref"}
`bekijken <cursusgebruikers navigeren>`{.interpreted-text role="ref"},
hun `gebruikersaccount <gebruikersaccount>`{.interpreted-text
role="ref"} `overnemen <gebruikersaccount overnemen>`{.interpreted-text
role="ref"}, hun
`registratiestatus <cursusgebruiker registratiestatus>`{.interpreted-text
role="ref"}
`aanpassen <cursusgebruiker registratiestatus aanpassen>`{.interpreted-text
role="ref"} en `cursusbeheerders <cursusbeheerder>`{.interpreted-text
role="ref"} `aanduiden <cursusbeheerders aanduiden>`{.interpreted-text
role="ref"}.

### Navigeren naar cursusgebruikers

Aan de onderkant van de `cursuspagina <cursuspagina>`{.interpreted-text
role="ref"} zie je onder de hoofding `Gebruikers`{.interpreted-text
role="guilabel"} een overzicht waarin alle
`cursusgebruikers <cursusgebruiker>`{.interpreted-text role="ref"}
opgelijst worden met hun gebruikersnaam, naam, emailadres en
`voortgangsstatistieken <cursusgebruiker voortgangsstatistieken>`{.interpreted-text
role="ref"}.

![image](images/staff.course_users.nl.png)

::: {#cursus beheersrechten icoontje}
::: {#cursusgebruiker voortgangsstatistieken}
:::
:::

Het `zoeken <gebruiker zoeken>`{.interpreted-text role="ref"},
`selecteren <gebruiker selecteren>`{.interpreted-text role="ref"} en
`bewerken <gebruikersprofiel bewerken>`{.interpreted-text role="ref"}
van `cursusgebruikers <cursusgebruiker>`{.interpreted-text role="ref"}
verloopt op dezelfde manier als in het
`gebruikersoverzicht <gebruikersoverzicht>`{.interpreted-text
role="ref"}.

### Registratiestatus aanpassen

In het `overzicht <cursusgebruikersoverzicht>`{.interpreted-text
role="ref"} van alle
`cursusgebruikers <cursusgebruiker>`{.interpreted-text role="ref"}
worden de cursusgebruikers in tabs gegroepeerd volgens hun
**registratiestatus** voor de `cursus <cursus>`{.interpreted-text
role="ref"}.

`Geregistreerd`{.interpreted-text role="guilabel"}

> Alle `cursusgebruikers <cursusgebruiker>`{.interpreted-text
> role="ref"} die momenteel
> `geregistreerd <cursus registreren>`{.interpreted-text role="ref"}
> zijn.

`Uitgeschreven`{.interpreted-text role="guilabel"}

> Alle `cursusgebruikers <cursusgebruiker>`{.interpreted-text
> role="ref"} die ooit
> `geregistreerd <cursus registreren>`{.interpreted-text role="ref"}
> waren, maar die ondertussen
> `uitgeschreven <cursus uitschrijven>`{.interpreted-text role="ref"}
> zijn.

`Op de wachtlijst`{.interpreted-text role="guilabel"}

> Alle `cursusgebruikers <cursusgebruiker>`{.interpreted-text
> role="ref"} waarvoor er nog een
> `registratieverzoek <registratieverzoek>`{.interpreted-text
> role="ref"} openstaat dat wacht op
> `afhandeling <registratieverzoeken afhandelen>`{.interpreted-text
> role="ref"} van een
> `cursusbeheerder <cursusbeheerder>`{.interpreted-text role="ref"}.

::: {#registratieverzoek afkeuren}
::: {#registratieverzoek goedkeuren}
::: {#registratieverzoeken afhandelen}
Elke tab heeft eigen actieknoppen aan de rechterkant van de
cursusgebruikers waarmee je hun
`registratiestatus <cursusgebruiker registratiestatus>`{.interpreted-text
role="ref"} kunt aanpassen.
:::
:::
:::

  tab                                                         knop                                                       actie
  ----------------------------------------------------------- ---------------------------------------------------------- --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  `Geregistreerd`{.interpreted-text role="guilabel"}          ![image](images/staff_registration_icons/unregister.png)   cursusgebruiker uitschrijven uit de cursus
  `Uitgeschreven`{.interpreted-text role="guilabel"}          ![image](images/staff_registration_icons/register.png)     cursusgebruiker terug registreren voor de cursus
  `Registratieverzoeken`{.interpreted-text role="guilabel"}   ![image](images/staff_registration_icons/approve.png)      goedkeuren van het `registratieverzoek <registratieverzoek>`{.interpreted-text role="ref"} dat door de gebruiker werd `ingediend <registratieverzoek indienen>`{.interpreted-text role="ref"}, waardoor de gebruiker `geregistreerd <cursus registreren>`{.interpreted-text role="ref"} wordt voor de cursus
  `Registratieverzoeken`{.interpreted-text role="guilabel"}   ![image](images/staff_registration_icons/decline.png)      afkeuren van het `registratieverzoek <registratieverzoek>`{.interpreted-text role="ref"} dat door de gebruiker werd `ingediend <registratieverzoek indienen>`{.interpreted-text role="ref"}, waardoor de gebruiker `uitgeschreven <cursus uitschrijven>`{.interpreted-text role="ref"} wordt uit de cursus

### Aanduiden van cursusbeheerders {#cursusbeheerders aanduiden}

::: {#cursusbeheerder}
Een **cursusbeheerder** is een
`geregistreerde <cursus registreren>`{.interpreted-text role="ref"}
`cursusgebruiker <cursusgebruiker>`{.interpreted-text role="ref"} met
beheersrechten voor de `cursus <cursus>`{.interpreted-text role="ref"}.
Een `lesgever <lesgever>`{.interpreted-text role="ref"} die een nieuwe
cursus aanmaakt wordt er automatisch voor geregistreerd en wordt er
meteen ook de eerste cursusbeheerder van. Lesgever hebben voor het
beheren van cursussen echter geen bijkomende rechten ten opzichte van
andere `cursusbeheerders`{.interpreted-text role="ref"} en kunnen ook
geen cursussen beheren waarvoor ze geen cursusbeheerder zijn.
:::

::: {#cursusbeheerder icoontje}
In de tab `Geregistreerd`{.interpreted-text role="guilabel"} van het
`overzicht <cursusgebruikersoverzicht>`{.interpreted-text role="ref"}
met alle `cursusgebruikers <cursusgebruiker>`{.interpreted-text
role="ref"} kan je de cursusbeheerders herkennen aan het icoontje in de
linkermarge.
:::

![image](images/staff.course_users_admin.nl.png)

In de tab kan je de volgende actieknoppen gebruiken om cursusbeheerders
aan te duiden:

  knop                                                              actie
  ----------------------------------------------------------------- -------------------------------------------------------------------------------------
  ![image](images/staff_registration_icons/make_course_admin.png)   cursusgebruiker zonder beheersrechten voor de cursus promoveren tot cursusbeheerder
  ![image](images/staff_registration_icons/make_student.png)        cursusbeheerder degraderen tot cursusgebruiker zonder beheersrechten voor de cursus

::: {.important}
::: {.admonition-title}
Important
:::

Een `cursusbeheerder <cursusbeheerder>`{.interpreted-text role="ref"}
die zich `uitschrijft <cursus uitschrijven>`{.interpreted-text
role="ref"} uit een `cursus <cursus>`{.interpreted-text role="ref"}
verliest zijn status van cursusbeheerder.

Om ervoor te zorgen dat een cursus altijd minstens één cursusbeheerder
heeft, kan de laatste cursusbeheerder zich niet uitschrijven en kan hij
zichzelf ook niet degraderen tot cursusgebruiker zonder beheersrechten
voor de cursus.

Na het aanmaken van een cursus kan een lesgever zich uitschrijven als
hij andere cursusbeheerders aangeduid heeft. Hij kan door andere
cursusbeheerders ook gedegradeerd worden tot cursusgebruiker zonder
beheersrechten voor de cursus.
:::

Beheren van oplossingen {#oplossingen beheren}
-----------------------

Als `cursusbeheerder <cursusbeheerder>`{.interpreted-text role="ref"}
krijg je toegang tot alle `oplossingen <oplossing>`{.interpreted-text
role="ref"} die de
`cursusgebruikers <cursusgebruiker>`{.interpreted-text role="ref"}
`ingediend <oplossing indienen>`{.interpreted-text role="ref"} hebben in
de `cursus <cursus>`{.interpreted-text role="ref"}. Je kunt de
oplossingen `herevalueren <oplossing herevalueren>`{.interpreted-text
role="ref"} en er zijn verschillende plaatsen op de
`cursuspagina <cursuspagina>`{.interpreted-text role="ref"} waar je een
overzicht kunt krijgen van (een deel van) de oplossingen.

### Herevalueren van een oplossing {#oplossing herevalueren}

Bij het herevalueren van een oplossing wordt het
`beoordelingsproces <oplossing beoordelingsproces>`{.interpreted-text
role="ref"} opnieuw uitgevoerd zonder dat de oplossing opnieuw moet
`ingediend <oplossing indienen>`{.interpreted-text role="ref"} worden.
Op die manier blijft het originele
`tijdstip <oplossing tijdstip>`{.interpreted-text role="ref"} van
indienen behouden. Als de configuratie van de
`oefening <oefening>`{.interpreted-text role="ref"} aangepast werd sinds
de vorige beoordeling van de oplossing, dan kan de
`status <oplossing status>`{.interpreted-text role="ref"} van de
oplossing wijzigen door het herevalueren.

::: {.important}
::: {.admonition-title}
Important
:::

Bij het `herevalueren <oplossing herevalueren>`{.interpreted-text
role="ref"} krijgen `oplossingen <oplossing>`{.interpreted-text
role="ref"} een lagere prioriteit in de
`wachtrij <oplossing wachtrij>`{.interpreted-text role="ref"} dan
oplossingen die nieuw `ingediend <oplossing indienen>`{.interpreted-text
role="ref"} worden. Op die manier ondervindt het beoordelen van
oplossingen die gebruikers indienen minimale vertaging, maar kan het
herevalueren wel langer duren.
:::

::: {.important}
::: {.admonition-title}
Important
:::

Gebruikers krijgen geen melding van het platform als hun
`oplossingen <oplossing>`{.interpreted-text role="ref"}
`geherevalueerd <oplossing herevalueren>`{.interpreted-text role="ref"}
worden. Als je beslist om oplossingen te herevalueren, is het belangrijk
om gebruikers te informeren dat er zowel wijzigingen kunnen zijn van de
`status <oplossing status>`{.interpreted-text role="ref"} van
`oplossingen <oplossing>`{.interpreted-text role="ref"} die ze vroeger
`ingediend <oplossing indienen>`{.interpreted-text role="ref"} hebben
als van hun
`indienstatus <oefeningenreeks oefening indienstatus>`{.interpreted-text
role="ref"} voor `oefeningen <oefening>`{.interpreted-text role="ref"}
in de `oefeningenreeksen <oefeningenreeks>`{.interpreted-text
role="ref"} van de cursus.
:::

Druk op de herhaalknop in de rechterbovenhoek van de
`feedbackpagina <feedbackpagina>`{.interpreted-text role="ref"} om een
`oplossing <oplossing>`{.interpreted-text role="ref"} te
`herevalueren <oplossing herevalueren>`{.interpreted-text role="ref"}.

![image](images/staff.feedback_evaluate.nl.png)

### Navigeren naar oplossingen {#cursusbeheerder oplossingen navigeren}

Elk overzicht met `oplossingen <oplossing>`{.interpreted-text
role="ref"} die in de `cursus <cursus>`{.interpreted-text role="ref"}
ingediend werden, bevat voor
`cursusbeheerders <cursusbeheerder>`{.interpreted-text role="ref"} de
oplossingen van alle
`cursusgebruikers <cursusgebruiker>`{.interpreted-text role="ref"}.
Daarom heeft het overzicht een extra kolom met de naam van de gebruiker
die de `oplossing <oplossing>`{.interpreted-text role="ref"} heeft
`ingediend <oplossing indienen>`{.interpreted-text role="ref"}. Druk op
de naam van de gebruiker om naar het
`gebruikersprofiel <gebruikersprofiel>`{.interpreted-text role="ref"} te
navigeren.

![image](images/staff.exercise_submissions_user_link.nl.png)

Als je zoekt naar specifieke `oplossingen <oplossing>`{.interpreted-text
role="ref"} met de zoekbalk aan de bovenkant van het
`overzicht <cursusbeheerder oplossingen overzicht>`{.interpreted-text
role="ref"}, dan wordt ook gezocht op de
`naam <persoonsgegevens>`{.interpreted-text role="ref"} van gebruikers.

![image](images/staff.exercise_submissions_search.nl.png)

::: {#cursusbeheerder oplossingen overzicht menu}
Het overzicht heeft voor
`cursusbeheerders <cursusbeheerder>`{.interpreted-text role="ref"} ook
een `menu <oefeningenreeks menu>`{.interpreted-text role="ref"} met
filters en acties die voor hen voorbehouden zijn:
:::

::: {#cursusbeheerder oplossingen overzicht filter recentste correcte}
`Meest recente correcte oplossing per gebruiker`{.interpreted-text
role="guilabel"} (filter)
:::

> Beperkt het overzicht tot de meest recente correcte oplossing per
> gebruiker.

::: {#cursusbeheerder oplossingen herevalueren}
`Oplossingen herevalueren`{.interpreted-text role="guilabel"} (actie)
:::

> Herevalueert alle `oplossingen <oplossing>`{.interpreted-text
> role="ref"} uit het overzicht.
