---
title: User management
description: "Tutorial: user management"
---

# User management

All **users** can [sign in](/en/for-students#sign-in) and manage their [user profile](/en/for-students#user-profile). Some actions on Dodona require more [privileges](#privileges). For this reason, we use three roles: [students](#students), [teachers](#teachers) and [admins](#admins). These roles can be [assigned](#assign-roles) to users, for instance a teacher can appoint another teacher.

::: tip

You can see that you are a [teacher](#teachers) when you can see the **management menu** (menu <span class="guilabel">Admin</span>) left of the [user menu](/en/for-students#user-menu) at the right side of the [navigation drawer](/en/for-students#navigation-drawer).

![image](./staff.admin_menu.en.png)
:::

::: tip Important

We divide the [enrolled](/en/for-students#course-register) members of a [course](/en/course-management#course) in [students](#students) and
[course managers](/en/course-management#course-manager) depending on the [management rights](#management-rights)they have been granted for the course. Only course managers can manage a course. The 
[managing](/en/course-management#managing-course-users) of 
[course users](/en/course-management#course-user) and [appointing](/en/course-management#appointing-course-managers) course managers is discussed in [course management](/en/course-management).
:::

## Navigating to a user

As a [teacher](#teachers), you navigate to 
Als [lesgever](#lesgevers) navigeer je naar
het [gebruikersoverzicht](#gebruikersoverzicht) door <span class="guilabel">Gebruikers</span>te
selecteren in het [beheersmenu](#beheersmenu) aan de rechterkant van de
[navigatiebalk](/en/for-students#navigatiabalk).

![admin menu users](./staff.admin_menu_users.en.png)

## Gebruikersoverzicht
In het **gebruikersoverzicht** worden de gebruikersnaam, de naam, het
emailadres en
[voortgangsstatistieken](#voortgangsstatistieken) opgelijst uit het
[gebruikersprofiel](/en/for-students#gebruikersprofiel)
van alle gebruikers. Voor de naam van elke [lesgever](#lesgevers) en [beheerder](#beheerders)
staat een
[icoontje](#gebruikers-beheersrechten-icoontje) dat correspondeert met de
[beheersrechten](#beheersrechten) die aan
de gebruiker [toegewezen](#beheersrechten-instellen) werden.

![image](./staff.users.en.png)

## Gebruiker zoeken
Gebruik de zoekbalk bovenaan het
[gebruikersoverzicht](#gebruikersoverzicht) om te zoeken naar specifieke gebruikers op basis van een
gebruikersnaam, een naam of een emailadres.

![image](./staff.users_filtered.en.png)

## Gebruiker selecteren
Druk op een gebruikersnaam om naar de
[profielpagina](/en/for-students#profielpagina) van de
gebruiker te [navigeren](#gebruiker-navigeren).

![image](./staff.users_filtered_link.en.png)

## Gebruiker voortgangsstatistieken
De **voortgangsstatistieken** van een gebruiker bestaan uit twee
getallen $c/i$. Daarbij staat $i$ voor het aantal
[oefeningen](/en/for-students#oefening) waarvoor de
gebruiker minstens één [oplossing](/en/for-students#oplossing) heeft [ingediend](/en/for-students#oplossing-indienen) en $c$ voor het aantal oefeningen waarvoor de gebruiker
minstens één *correcte* oplossing heeft ingediend.


## Gebruikersprofiel bewerken


Als [lesgever](#lesgevers) kan je het
[gebruikersprofiel](/en/for-students#gebruikersprofiel)
van [studenten](#studenten) en andere
lesgevers bewerken. Druk daarvoor op de bewerkknop in de
rechterbovenhoek van de
[profielpagina](/en/for-students#profielpagina) van de
gebruiker.

![image](./staff.user_edit_link.en.png)

Als alternatief kan je in het
[gebruikersoverzicht](#gebruikersoverzicht) ook drukken op de bewerkknop aan de rechterkant van een
gebruiker om onmiddellijk het
[gebruikersprofiel](/en/for-students#gebruikersprofiel)
van de gebruiker te bewerken.

![image](./staff.users_filtered_edit_link.en.png)

## Instellen van beheersrechten

Om sommige acties te kunnen uitvoeren op Dodona heb je bijkomende
**beheersrechten** nodig. Als [lesgever](#lesgevers) kan je aan de eigenschap <span class="guilabel">Rechten</span> op de [profielpagina](/en/for-students#profielpagina) van een gebruiker zien welke beheersrechten de gebruiker
heeft.

![image](./staff.user_edit_permission.en.png)

## Gebruiker beheersrechten icoontje
Aan gebruikers kunnen de volgende
[beheersrechten](#beheersrechten)
toegekend worden:

 | naam                                          | icoontje                                |permissies|
 | ----------------------------------------------|-----------------------------------------|----------|
 | <span class="guilabel">Student</span>|   *geen*|                                  [studenten](#studenten) kunnen hun [gebruikersprofiel](/en/for-students#gebruikersprofiel) [bewerken](/en/for-students#gebruikersprofiel-bewerken), kunnen zich [registreren](/en/for-students#cursus-registreren) voor [cursussen](/en/course-management#cursus) en kunnen [oplossingen](/en/for-students#oplossing) [indienen](/en/for-students#oplossing-indienen) voor [oefeningen](/en/for-students#oefening)|
 |<span class="guilabel">Staff</span>|     ![image](../../../images/role_icons/staff.png)|   [lesgevers](#lesgevers) krijgen alle permissies van [studenten](#studenten) en kunnen bovendien ook lesgevers aanduiden, het [gebruikersprofiel](/en/for-students#gebruikersprofiel) van studenten en lesgevers [bewerken](/en/for-students#gebruikersprofiel-bewerken), [cursussen](/en/course-management#cursus) [aanmaken](/en/course-management#cursus-aanmaken), [oefeningen](/en/for-students#oefening) [toevoegen](/en/course-management#oefening-toevoegen) en [judges](/en/for-students#judge) [toevoegen](/en/creating-a-judge)|
 |<span class="guilabel">Zeus</span>|      ![image](../../../images/role_icons/zeus.png)|    [beheerders](#beheerders) krijgen alle permissies van [lesgevers](#lesgevers) en cursusbeheerders en kunnen bovendien ook alle [beheersrechten](#beheersrechten) (inclusief cursusbeheerders) toewijzen, het [gebruikersprofiel](/en/for-students#gebruikersprofiel) van alle gebruikers [bewerken](/en/for-students#gebruikersprofiel-bewerken), alle [cursussen](/en/course-management#cursus) [bewerken](/en/course-management#cursus-bewerken), alle [oefeningen](/en/for-students#oefening) [bewerken](/en/course-management#oefening-bewerken) en alle [judges](/en/for-students#judge) [bewerken](/en/judges#judge-bewerken)

### Studenten
Een gebruiker waarvoor de
[beheersrechten](#beheersrechten)
ingesteld zijn op <span class="guilabel">Student</span> noemen we
een **student**. 
### Lesgevers
Een gebruiker waarvoor de [beheersrechten](#beheersrechten) ingesteld zijn
op <span class="guilabel">Staff</span> noemen we een
**lesgever**.
### Beheerders
Een gebruiker waarvoor de [beheersrechten](#beheersrechten) ingesteld zijn
op <span class="guilabel">Zeus</span> noemen we een
**beheerder**.

## Beheersrechten instellen
Als je het [gebruikersprofiel](/en/for-students#gebruikersprofiel) van een gebruiker
[bewerkt](/en/for-students#gebruikersprofiel-bewerken) dan
kan je daar de [beheersrechten](#beheersrechten) van de gebruiker instellen. Als
[lesgever](#lesgevers) kan je enkel de
beheersrechten <span class="guilabel">Student</span> en
<span class="guilabel">Staff</span> toekennen aan gebruikers
(inclusief jezelf). Op die manier kan je een gebruiker promoveren tot
lesgever of degraderen tot [student](#studenten).
:::

![image](./staff.user_edit_permission.en.png)

::: tip Belangrijk

Als je jezelf als [lesgever](#lesgevers)
degradeert tot [student](#studenten), dan
kan je jezelf daarna niet terug promoveren tot lesgever.
:::

## Gebruikersaccount overnemen

Als [lesgever](#lesgevers) kan je tijdelijk
de [gebruikersaccount](/en/for-students#gebruikersaccount)
van een [student](#studenten) overnemen.
Daardoor krijg je de gepersonaliseerde versie van Dodona te zien door de
ogen van de student. Dit kan interessant zijn voor het beantwoorden van
vragen over iets wat een student waarneemt in Dodona of over een actie
die ze in Dodona wil uitvoeren. Bovendien laat het je ook toe om zelf
acties uit te voeren in naam van de student, zoals het
[registreren](/en/for-students#cursus-registreren) voor
een [cursus](/en/course-management#cursus) of het
[indienen](/en/for-students#oplossing-indienen) van een
[oplossing](/en/for-students#oplossing) voor een
[oefening](/en/for-students#oefening).

![image](./staff.impersonating.en.png)

::: tip Belangrijk

Als je [registreert](/en/for-students#cursus-registreren)
voor een [cursus](/en/course-management#cursus) of een
[oplossing](/en/for-students#oplossing)
[indient](/en/for-students#oplossing-indienen) voor een
[oefening](/en/for-students#oefening) terwijl je de
[gebruikersaccount](/en/for-students#gebruikersaccount)
van een [student](#studenten) aan het
[overnemen](#gebruikersaccount-overnemen)
bent, dan hebben deze acties hetzelfde effect alsof ze door de student
zelf zouden uitgevoerd worden. Wees je er dus van bewust of je deze
acties in naam van de student wilt uitvoeren of dat je eerst wilt
[terugkeren](#eigen-gebruikersaccount-herstellen) naar je eigen gebruikersaccount om daarna de acties onder
eigen naam uit te voeren.
:::

Druk op de knop <span class="guilabel">Account overnemen</span>
op de [profielpagina](/en/for-students#profielpagina) van
een student om zijn/haar
[gebruikersaccount](/en/for-students#gebruikersaccount)
tijdelijk
[over](#gebruikersaccount-overnemen).

![image](./staff.user_impersonate_link.en.png)

Als alternatief kan je de
[gebruikersaccount](/en/for-students#gebruikersaccount)
van een student ook tijdelijk overnemen door in het
[gebruikersoverzicht](#gebruikersoverzicht) aan de rechterkant van een student te drukken op de
actieknop voor het
[overnemen](#gebruikersaccount-overnemen)
van gebruikersaccounts.

![image](./staff.users_filtered_impersonate_link.en.png)

### Eigen gebruikersaccount herstellen
Terwijl je de [gebruikersaccount](/en/for-students#gebruikersaccount) van een [student](#studenten)
aan het [overnemen](#gebruikersaccount-overnemen) bent, wordt bovenaan elke pagina een mededeling getoond om
je daaraan te herinneren. De mededeling bevat een link waarmee je kunt
terugkeren naar je eigen gebruikersaccount.
:::

![image](./staff.stop_impersonating_link.en.png)
