---
title: Gebruikersbeheer
description: "Tutorial: gebruikersbeheer"
---

# Gebruikersbeheer

Alle **gebruikers** kunnen zich
[aanmelden](#aanmelden) en hun
[gebruikersprofiel](#profiel) beheren. Voor sommige acties heb je echter bijkomende
[beheersrechten](#beheersrechten) nodig.
Onder gebruikers onderscheiden we daarom
[studenten](#studenten),
[lesgevers](#lesgevers) en
[beheerders](#beheerders) afhankelijk van
de beheersrechten die aan hen
[toegewezen](#beheersrechten-instellen)
werden. Als lesgever kan je zelf ook andere lesgevers aanduiden.

::: tip

Je herkent dat je [lesgever](#lesgevers) bent als je het **beheersmenu** (menu <span class="guilabel">Admin</span>) ziet staan links van het
[gebruikersmenu](/nl/for-students#gebruikersmenu) aan de
rechterkant van de [navigatiebalk](/nl/for-students#navigatiebalk).

![image](./staff.admin_menu.nl.png)
:::

::: tip Belangrijk

Onder de [geregistreerde](/nl/for-students#cursus-registreren) gebruikers van een [cursus](/nl/course-management#cursus) onderscheiden we studenten en
[cursusbeheerders](/nl/course-management#cursusbeheerder
afhankelijk van de [beheersrechten](#beheersrechten) die ze gekregen hebben voor de cursus. Enkel
cursusbeheerders kunnen een cursus beheren. Het
[beheren](/nl/course-management#cursusgebruikers-beheren) van
[cursusgebruikers](/nl/course-management/cursusgebruiker) en
het [aanduiden](/nl/course-management/cursusbeheerders-aanduiden) van cursusbeheerders wordt behandeld in
[cursus beheren](/nl/course-management).
:::

## Navigeren naar een gebruiker

Als [lesgever](#lesgevers) navigeer je naar
het [gebruikersoverzicht](#gebruikersoverzicht) door <span class="guilabel">Gebruikers</span>te
selecteren in het [beheersmenu](#beheersmenu) aan de rechterkant van de
[navigatiebalk](/nl/for-students#navigatiabalk).

![admin menu users](./staff.admin_menu_users.nl.png)

## Gebruikersoverzicht
In het **gebruikersoverzicht** worden de gebruikersnaam, de naam, het
emailadres en
[voortgangsstatistieken](#voortgangsstatistieken) opgelijst uit het
[gebruikersprofiel](/nl/for-students#gebruikersprofiel)
van alle gebruikers. Voor de naam van elke [lesgever](#lesgevers) en [beheerder](#beheerders)
staat een
[icoontje](#gebruikers-beheersrechten-icoontje) dat correspondeert met de
[beheersrechten](#beheersrechten) die aan
de gebruiker [toegewezen](#beheersrechten-instellen) werden.

![image](./staff.users.nl.png)

## Gebruiker zoeken
Gebruik de zoekbalk bovenaan het
[gebruikersoverzicht](#gebruikersoverzicht) om te zoeken naar specifieke gebruikers op basis van een
gebruikersnaam, een naam of een emailadres.

![image](./staff.users_filtered.nl.png)

## Gebruiker selecteren
Druk op een gebruikersnaam om naar de
[profielpagina](/nl/for-students#profielpagina) van de
gebruiker te [navigeren](#gebruiker-navigeren).

![image](./staff.users_filtered_link.nl.png)

## Gebruiker voortgangsstatistieken
De **voortgangsstatistieken** van een gebruiker bestaan uit twee
getallen $c/i$. Daarbij staat $i$ voor het aantal
[oefeningen](/nl/for-students#oefening) waarvoor de
gebruiker minstens één [oplossing](/nl/for-students#oplossing) heeft [ingediend](/nl/for-students#oplossing-indienen) en $c$ voor het aantal oefeningen waarvoor de gebruiker
minstens één *correcte* oplossing heeft ingediend.


## Gebruikersprofiel bewerken


Als [lesgever](#lesgevers) kan je het
[gebruikersprofiel](/nl/for-students#gebruikersprofiel)
van [studenten](#studenten) en andere
lesgevers bewerken. Druk daarvoor op de bewerkknop in de
rechterbovenhoek van de
[profielpagina](/nl/for-students#profielpagina) van de
gebruiker.

![image](./staff.user_edit_link.nl.png)

Als alternatief kan je in het
[gebruikersoverzicht](#gebruikersoverzicht) ook drukken op de bewerkknop aan de rechterkant van een
gebruiker om onmiddellijk het
[gebruikersprofiel](/nl/for-students#gebruikersprofiel)
van de gebruiker te bewerken.

![image](./staff.users_filtered_edit_link.nl.png)

## Instellen van beheersrechten

Om sommige acties te kunnen uitvoeren op Dodona heb je bijkomende
**beheersrechten** nodig. Als [lesgever](#lesgevers) kan je aan de eigenschap <span class="guilabel">Rechten</span> op de [profielpagina](/nl/for-students#profielpagina) van een gebruiker zien welke beheersrechten de gebruiker
heeft.

![image](./staff.user_edit_permission.nl.png)

## Gebruiker beheersrechten icoontje
Aan gebruikers kunnen de volgende
[beheersrechten](#beheersrechten)
toegekend worden:

 | naam                                          | icoontje                                |permissies|
 | ----------------------------------------------|-----------------------------------------|----------|
 | <span class="guilabel">Student</span>|   *geen*|                                  [studenten](#students) kunnen hun [gebruikersprofiel](/nl/for-students#gebruikersprofiel) [bewerken](/nl/for-students#gebruikersprofiel-bewerken), kunnen zich [registreren](/nl/for-students#cursus-registreren) voor [cursussen](/nl/course-management#cursus) en kunnen [oplossingen](/nl/for-students#oplossing) [indienen](/nl/for-students#oplossing-indienen) voor [oefeningen](/nl/for-students#oefening)|
 |<span class="guilabel">Staff</span>|     ![image](../../../images/role_icons/staff.png)|   [lesgevers](#lesgevers) krijgen alle permissies van [studenten](#studenten) en kunnen bovendien ook lesgevers aanduiden, het [gebruikersprofiel](/nl/for-students#gebruikersprofiel) van studenten en lesgevers [bewerken](/nl/for-students#gebruikersprofiel-bewerken), [cursussen](/nl/course-management#cursus) [aanmaken](/nl/course-management#cursus-aanmaken), [oefeningen](/nl/for-students#oefening) [toevoegen](/nl/course-management#oefening-toevoegen) en [judges](/nl/for-students#judge) [toevoegen](/nl/creating-a-judge)|
 |<span class="guilabel">Zeus</span>|      ![image](../../../images/role_icons/zeus.png)|    [beheerders](#beheerders) krijgen alle permissies van [lesgevers](#lesgevers) en cursusbeheerders en kunnen bovendien ook alle [beheersrechten](#beheersrechten) (inclusief cursusbeheerders) toewijzen, het [gebruikersprofiel](/nl/for-students#gebruikersprofiel) van alle gebruikers [bewerken](/nl/for-students#gebruikersprofiel-bewerken), alle [cursussen](/nl/course-management#cursus) [bewerken](/nl/course-management#cursus-bewerken), alle [oefeningen](/nl/for-students#oefening) [bewerken](/nl/course-management#oefening-bewerken) en alle [judges](/nl/for-students#judge) [bewerken](/nl/judges#judge-bewerken)

::: {#student}
::: {#lesgever}
::: {#beheerder}
Een gebruiker waarvoor de
`beheersrechten <beheersrechten>`{.interpreted-text role="ref"}
ingesteld zijn op `Student`{.interpreted-text role="guilabel"} noemen we
een **student**. Een gebruiker waarvoor de beheersrechten ingesteld zijn
op `Staff`{.interpreted-text role="guilabel"} noemen we een
**lesgever**. Een gebruiker waarvoor de beheersrechten ingesteld zijn op
`Zeus`{.interpreted-text role="guilabel"} noemen we een **beheerder**.
:::
:::
:::

## Beheersrechten instellen
Als je het `gebruikersprofiel <gebruikersprofiel>`{.interpreted-text
role="ref"} van een gebruiker
`bewerkt <gebruikersprofiel bewerken>`{.interpreted-text role="ref"} dan
kan je daar de `beheersrechten <beheersrechten>`{.interpreted-text
role="ref"} van de gebruiker instellen. Als
`lesgever <lesgever>`{.interpreted-text role="ref"} kan je enkel de
beheersrechten `Student`{.interpreted-text role="guilabel"} en
`Staff`{.interpreted-text role="guilabel"} toekennen aan gebruikers
(inclusief jezelf). Op die manier kan je een gebruiker promoveren tot
lesgever of degraderen tot `student <student>`{.interpreted-text
role="ref"}.
:::

![image](./staff.user_edit_permission.nl.png)

::: {.important}
::: {.admonition-title}
Important
:::

Als je jezelf als `lesgever <lesgever>`{.interpreted-text role="ref"}
degradeert tot `student <student>`{.interpreted-text role="ref"}, dan
kan je jezelf daarna niet terug promoveren tot lesgever.
:::

Overnemen van een gebruikersaccount {#gebruikersaccount overnemen}
-----------------------------------

Als `lesgever <lesgever>`{.interpreted-text role="ref"} kan je tijdelijk
de `gebruikersaccount <gebruikersaccount>`{.interpreted-text role="ref"}
van een `student <student>`{.interpreted-text role="ref"} overnemen.
Daardoor krijg je de gepersonaliseerde versie van Dodona te zien door de
ogen van de student. Dit kan interessant zijn voor het beantwoorden van
vragen over iets wat een student waarneemt in Dodona of over een actie
die ze in Dodona wil uitvoeren. Bovendien laat het je ook toe om zelf
acties uit te voeren in naam van de student, zoals het
`registreren <cursus registreren>`{.interpreted-text role="ref"} voor
een `cursus <cursus>`{.interpreted-text role="ref"} of het
`indienen <oplossing indienen>`{.interpreted-text role="ref"} van een
`oplossing <oplossing>`{.interpreted-text role="ref"} voor een
`oefening <oefening>`{.interpreted-text role="ref"}.

![image](./staff.impersonating.nl.png)

::: {.important}
::: {.admonition-title}
Important
:::

Als je `registreert <cursus registreren>`{.interpreted-text role="ref"}
voor een `cursus <cursus>`{.interpreted-text role="ref"} of een
`oplossing <oplossing>`{.interpreted-text role="ref"}
`indient <oplossing indienen>`{.interpreted-text role="ref"} voor een
`oefening <oefening>`{.interpreted-text role="ref"} terwijl je de
`gebruikersaccount <gebruikersaccount>`{.interpreted-text role="ref"}
van een `student <student>`{.interpreted-text role="ref"} aan het
`overnemen <gebruikersaccount overnemen>`{.interpreted-text role="ref"}
bent, dan hebben deze acties hetzelfde effect alsof ze door de student
zelf zouden uitgevoerd worden. Wees je er dus van bewust of je deze
acties in naam van de student wilt uitvoeren of dat je eerst wilt
`terugkeren <eigen gebruikersaccount herstellen>`{.interpreted-text
role="ref"} naar je eigen gebruikersaccount om daarna de acties onder
eigen naam uit te voeren.
:::

Druk op de knop `Account overnemen`{.interpreted-text role="guilabel"}
op de `profielpagina <profielpagina>`{.interpreted-text role="ref"} van
een student om haar
`gebruikersaccount <gebruikersaccount>`{.interpreted-text role="ref"}
tijdelijk
`over te nemen <gebruikersaccount overnemen>`{.interpreted-text
role="ref"}.

![image](./staff.user_impersonate_link.nl.png)

Als alternatief kan je de
`gebruikersaccount <gebruikersaccount>`{.interpreted-text role="ref"}
van een student ook tijdelijk overnemen door in het
`gebruikersoverzicht <gebruikersoverzicht>`{.interpreted-text
role="ref"} aan de rechterkant van een student te drukken op de
actieknop voor het
`overnemen <gebruikersaccount overnemen>`{.interpreted-text role="ref"}
van gebruikersaccounts.

![image](./staff.users_filtered_impersonate_link.nl.png)

::: {#eigen gebruikersaccount herstellen}
Terwijl je de `gebruikersaccount <gebruikersaccount>`{.interpreted-text
role="ref"} van een `student <student>`{.interpreted-text role="ref"}
aan het `overnemen <gebruikersaccount overnemen>`{.interpreted-text
role="ref"} bent, wordt bovenaan elke pagina een mededeling getoond om
je daaraan te herinneren. De mededeling bevat een link waarmee je kunt
terugkeren naar je eigen gebruikersaccount.
:::

![image](./staff.stop_impersonating_link.nl.png)
