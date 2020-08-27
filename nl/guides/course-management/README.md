---
title: Cursusbeheer
description: "Tutorial: cursusbeheer"
---
Een **cursus** wordt
opgebouwd als een
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

Een [cursusbeheerder](#cursusbeheerder) stippelt voor de [cursus](#cursus) een [leerpad](#leerpad) uit met [oefeningenreeksen](#oefeningenreeks) waaraan [oefeningen](/nl/for-students#oefening) [gekoppeld](#oefeningen-koppelen) worden. Voor elke oefeningenreeks kan hij een [deadline](#oefeningenreeks-deadline) [instellen](#oefeningenreeks-eigenschappen-instellen) die aangeeft tot wanneer er rekening gehouden wordt met [oplossingen](/nl/for-students#oplossing) die
[ingediend](/nl/for-students#oplossing-indienen) worden
voor de oefeningen uit de oefeningenreeks.
[Cursusgebruikers](#cursusgebruikers)
kunnen na de deadline echter onbeperkt oplossingen blijven indienen voor de oefeningen uit de oefeningenreeks en blijven daar nog steeds feedback voor ontvangen.

## Cursus aanmaken

Als [lesgever](/nl/user-management#lesgever) kan je een
nieuwe [cursus](#cursus) aanmaken door op
de knop <span class="guilabel">CURSUS AANMAKEN</span> te drukken
in de rechterbovenhoek van het
[cursusoverzicht](#cursusoverzicht).

![create course](./staff.courses_new_link.png)

Om een nieuwe [cursus](#cursus) aan te maken, zijn er twee opties. Ofwel vertrek je vanaf een reeds bestaande cursus, ofwel maak je een volledige nieuwe cursus aan.

![new course menu](./staff.course_new_options.png)

Druk op <span class="guilabel">Dodona</span> in de
[navigatiebalk](/nl/for-students#navigatiebalk) om het
aanmaken van de [cursus](#cursus) te
annuleren.

Als je vertrekt vanaf een bestaande [cursus](#cursus), dan moet je deze selecteren in de tabel. Via de zoekbalk kan je filteren om snel de gewenste cursus te vinden. Klik het bolletje in de linkerkolom aan om je keuze te bevestigen.

![choose existing course](./staff.course_new_copy.png)

Vervolgens moet je aangeven welke elementen van de [cursus](#cursus) je wil overnemen. De reeksstructuur wordt altijd gekopieerd. Je kan dan nog kiezen of je de oefeningen, de deadlines en de begeleiders wil overnemen. Ten slotte kan je ook andere instellingen kiezen.

<span class="guilabel">Zet de gekopieerde reeksen op verborgen</span>:  dit is zeer handig als je elke week een nieuwe reeks zichtbaar wil maken zonder ze eerst onzichtbaar te moeten maken.

## Cursuseigenschappen instellen
Bij beide keuzes moet je kiezen welke eigenschappen je cursus heeft. Deze worden vooraf ingevuld met de waarden van de gekopieerde [cursus](#cursus) indien deze optie gekozen werd. Volgende [eigenschappen](#cursuseigenschappen) kunnen ingesteld worden.

![image](./staff.course_new_empty.png)

<span class="guilabel">Naam</span>


> Een naam voor de [cursus](#cursus).
> Verschillende curssen kunnen dezelfde naam hebben. Het is echter
> aangeraden om cursussen zoveel mogelijk een unieke naam te geven.

<span class="guilabel">Lesgevers</span>

> De namen van de lesgevers van de [cursus](#cursus). Gebruik een komma om namen te scheiden als er meerdere lesgevers zijn.

<span class="guilabel">Academiejaar</span>

> Het academiejaar waarin de [cursus](#cursus) wordt aangeboden. Gebruik het formaat `jjjj-jjjj` om
> ervoor te zorgen dat de cursus correct gesorteerd wordt op de
> [startpagina](/nl/for-students#startpagina) en in het
> [cursusoverzicht](#cursusoverzicht).

<span class="guilabel">Zichtbaarheid</span>

> De zichtbaarheid bepaalt of [niet-geregistreerde](/nl/for-students#cursus-registreren) gebruikers de [cursus](#cursus) kunnen zien. Voor deze eigenschap kunnen de volgende waarden ingesteld worden:
>
> 
> <span class="guilabel">Zichtbaar</span>
>
>
> > Alle gebruikers zien de [cursus](#cursus) in het
> > [cursusoverzicht](#cursusoverzicht).
> > Ze kunnen ook naar de
> > [cursuspagina](/nl/for-students#cursuspagina)
> > navigeren en zich daar eventueel voor de cursus
> > [registreren](/nl/for-students#cursus-registreren).
>
> <span class="guilabel">Verborgen</span>
>
> > Alleen [cursusbeheerders](#cursusbeheerder) zien de [cursus](#cursus) in het [cursusoverzicht](#cursusoverzicht) en op hun [startpagina](/nl/for-students#startpagina). Er staat een icoontje bij om hen er op te wijzen dat andere gebruikers de cursus daar niet kunnen zien. Dit icoontje is ook te vinden op de [cursuspagina](/nl/for-students#cursuspagina) zelf. Enkel geregistreerde gebruikers kunnen naar deze pagina navigeren. Andere gebruikers kunnen zich enkel voor de cursus registreren als ze de [registratielink](#registratielink) gebruiken.
> >
> > ![image](./staff.courses_hidden_course.png)

<span class="guilabel">Registratieprocedure</span>

> De registratieprocedure bepaalt of en hoe gebruikers zich voor de
> [cursus](#cursus) kunnen [registreren](/nl/for-students#cursus-registreren). Voor
> deze eigenschap kunnen de volgende waarden ingesteld worden:
>
> <span class="guilabel">Open</span>
>
> > Gebruikers kunnen zich voor de [cursus](#cursus) [registreren](/nl/for-students#cursus-registreren) zonder expliciete goedkeuring van een [cursusbeheerder](#cursusbeheerder).
>
> <span class="guilabel">Gemodereerd</span>
>
> > Gebruikers kunnen een
> > [registratieverzoek](/nl/for-students#registratieverzoek)
> > [indienen](/nl/for-students#registratieverzoek-indienen) voor de [cursus](#cursus)
> > maar zijn pas [geregistreerd](/nl/for-students#cursus-registreren) als een
> > [cursusbeheerder](#cursusbeheerder)
> > hun registratieverzoek heeft
> > [goedgekeurd](#registratieverzoek-goedkeuren).
>
> <span class="guilabel">Gesloten</span>
>
> > Gebruikers kunnen zich niet meer voor de
> > [cursus](#cursus) [registreren](/nl/for-students#cursus-registreren).
>
> ::: tip Belangrijk
>
> Als je de registratieprocedure aanpast dan blijven bestaande
> [registraties](/nl/for-students#cursus-registreren) voor
> de [cursus](#cursus) gelden en blijven
> [registratieverzoeken](/nl/for-students#registratieverzoek) voor de cursus openstaan. Je moet zelf de bestaande
> [registratiestatus](#registratiestatus) van [cursusgebruikers](#cursusgebruikers)
> [aanpassen](#registratiestatus-aanpassen).
> :::

<span class="guilabel">Beschrijving</span>

> Een optionele beschrijving die bovenaan de
> [cursuspagina](#<cursuspagina>) wordt
> weergegeven. Voor het opmaken van de beschrijving kan je gebruikmaken van Markdown.

>
> ::: tip
> <h1 id="beschrijving-markdown"></h1>

> De beschrijving van eigenschappen die aangeduid worden met het
> Markdown-logo kan geschreven worden met behulp van
> [Markdown](https://en.wikipedia.org/wiki/Markdown). Dodona maakt voor
> de weergave van Markdown gebruik van
> [kramdown](https://kramdown.gettalong.org) waardoor heel wat
> uitbreidingen van de standaard Markdown ondersteund worden.
> :::

<span class="guilabel">Registratielink</span>

> Bij het [aanmaken](#cursus-aanmaken) van
> een [cursus](#cursus) wordt automatisch
> een **token** gegenereerd als afschermingsmechanisme van
> [verborgen](#cursus-verbergen)
> cursussen. Zonder dit token kunnen [niet-geregistreerde](/nl/for-students#cursus-registreren) gebruikers de
> [cursuspagina](#cursuspagina) van een verborgen cursus
> niet zien en zich daar dus ook niet registreren. Als ze toch naar de
> cursus proberen te navigeren, dan zien ze enkel een melding dat ze
> niet de geen toegangsrechten hebben voor de cursus.
>
> ![image](./student.hidden_course_unregistered_denied_message.png)
>
> Als lesgever ben je verantwoordelijk om de registratielink te delen met je studenten. Zij kunnen zich dan registreren op de cursuspagina waar ze terecht komen via de link. Deze link bevat immers het geheime token dat hen toegang verleent.
>
> ![image](./student.hidden_course_unregistered_link_message.png)
>

<h1 id="cursus-registratielink-kopiëren"></h1>

> De [registratielink](#registratielink) heeft dus als voordeel dat gebruikers de
> [cursus](#cursus) niet zelf moeten
> [zoeken](/nl/for-students#cursus-navigeren) in het
> [cursusoverzicht](/nl/for-students#cursusoverzicht) en
> dat ze meteen een verzoek krijgen om zich voor de cursus te
> [registreren](/nl/for-students#cursus-registreren) als ze dat
> nog niet gedaan hadden. Als
> [cursusbeheerder](#cursusbeheerder)
> krijg je de verantwoordelijkheid om de registratielink enkel te delen
> met niet-geregistreerde gebruikers die zich voor een
> [verborgen](#cursus-verborgen) cursus
> mogen registreren. Druk op de kopieerknop naast de registratielink om
> de registratielink naar het klembord te kopiëren. 
>
> ![image](./staff.hidden_course_registration_link.png)
>
> Druk op de vernieuwknop naast de [registratielink](#registratielink) om de [cursus](#cursus)
> opnieuw te [verbergen](#cursus-verborgen) nadat de registratielink gedeeld werd. Daardoor wordt een
> nieuw [token](#cursus-token) gegenereerd en wordt het oude token onbruikbaar gemaakt. De registratielink wordt
> meteen ook aangepast aan het nieuwe token.
>
> ![image](./staff.hidden_course_registration_link_renew.png)
>
> De [registratielink](#cursus-registratielink) wordt ook weergegeven op de
> cursus-bewerkenpagina.
>
> ![image](./staff.hidden_course_registration_link.png)

Druk op de afwerkknop in de rechteronderhoek van de pagina
<span class="guilabel">CURSUS AANMAKENs</span> om het
[aanmaken](#cursus-aanmaken) van een
[cursus](#cursus) met de opgegeven
[eigenschappen](#cursus-eigenschappen)
effectief door te voeren.

![image](./staff.course_new_submit.png)

Na het aanmaken van de nieuwe cursus navigeer je naar de
[cursuspagina](#cursuspagina), waar je
kunt vaststellen dat je automatisch
[geregistreerd](/nl/for-students#cursus-registreren) bent
als [cursusgebruiker](#cursusgebruiker) en
dat je [aangeduid](#cursusbeheerders-aanduiden) bent als
[cursusbeheerder](#cursusbeheerder).

![cursus aangemaakt](./staff.course_created.png)

# Cursus navigeren

Je kan de [cursuspagina](#cursuspagina) van een [cursus](#cursus) bereiken op verschillende manieren. Vanaf de landingspagina kan je cursussen zoeken door te klikken op <span class="guilabel">Meer cursussen</span>. Vanop eender welke pagina kan je via het hamburgermenu in de linkerbovenhoek snelkoppelingen vinden naar jouw cursusssen onder het tabblad <span class="guilabel">Cursussen</span> en de cursus-zoekenpagina via het gelijknamige knopje on het tabblad <span class="guilabel">Admin</span>. Op de zoeken-pagina kan je filteren op naam van de cursus en op het instituut waartoe de cursus behoort. Ten slotte dien je enkel nog de gewenste cursus aan te klikken om op de cursuspagina terecht te komen.

![gefilterde cursussen](./staff.courses_filtered.png)

# Cursus bewerken

<span id="cursuseigenschappen-aanpassen"></span>
Als [cursusbeheerder](#cursusbeheerder)
kan je de [eigenschappen](#cursuseigenschappen) van een [cursus](#cursus)
aanpassen door op het bewerken-icoontje te drukken bovenaan de
[cursuspagina](#cursuspagina).

![image](./staff.course_edit_button.png)

Druk op de [cursus](#cursus) in de
[navigatiebalk](/nl/for-students#navigatiebalk) om het
aanpassen te annuleren.

![image](./staff.course_edit_cancel.png)

Druk na het aanpassen op de afwerkknop in de rechterbovenhoek van het
paneel om de nieuwe
[cursuseigenschappen](#cursuseigenschappen) effectief in te stellen. 
Alternatief kan je ook op de <span class="guilabel">AANPASSEN</span> drukken onderaan het paneel.

Na het afwerken navigeer je terug naar de
[cursuspagina](#cursuspagina) waar de
nieuwe [cursuseigenschappen](#cursuseigenschappen) onmiddellijk van toepassing zijn.

![image](./staff.course_after_edit.png)


# Leerpad
Als [cursusbeheerder](#cursusbeheerder)
kan je voor de [cursus](#cursus) een
**leerpad** uitstippelen. Het leerpad wordt op de
[cursuspagina](#cursuspagina) weergegeven
onder de hoofding <span class="guilabel">Oefeningenreeksen</span>.
 Aan het leerpad kan je [oefeningenreeksen](/nl/exercise-series-management#oefeningenreeks)
[toevoegen](/nl/exercise-series-mangement#oefeningenreeks-toevoegen)
waaraan je [oefeningen](#oefening) kunt koppelen.

# Oefeningenreeks toevoegen

Druk in het [leerpad](#leerpad) op de knop
<span class="guilabel">Reeksen beheren</span> om een nieuwe oefeningenreeks aan het leerpad toe te voegen. Voor meer details, zie [oefeningenreeksen beheren](/nl/exercise-series-management).


## Cursusgebruikers beheren

Als [cursusbeheerder](#cursusbeheerder)
krijg je toegang tot alle **cursusgebruikers**. Dit zijn de gebruikers
die ooit voor de cursus
[geregistreerd](/nl/for-students#cursus-registreren)
geweest zijn of die ooit een
[registratieverzoek](/nl/for-students#registratieverzoek)
voor de cursus ingediend hebben. Je kunt hun
[gebruikersprofiel](/nl/for-students#gebruikersprofiel)
[bekijken](#cursusgebruikers navigeren), hun
[registratiestatus](#cursusgebruiker-registratiestatus)
[aanpassen](#cursusgebruiker-registratiestatus-aanpassen) en [cursusbeheerders](#cursusbeheerder) [aanduiden](#cursusbeheerders aanduiden).

### Navigeren naar cursusgebruikers

Aan de onderkant van de [cursuspagina](#cursuspagina) zie je onder de hoofding <span class="guilabel">Gebruikers</span> een overzicht waarin alle
[cursusgebruikers](#cursusgebruiker)
opgelijst worden met hun gebruikersnaam, naam, emailadres en
[voortgangsstatistieken](/nl/user-management#voortgangsstatistieken).

![image](./staff.course_users.png)

Het [zoeken](/nl/user-management#gebruiker-zoeken) en
[selecteren](/nl/user-management#gebruiker-selecteren)
van [cursusgebruikers](#cursusgebruiker)
verloopt op dezelfde manier als in het
[gebruikersoverzicht](/nl/user-management#gebruikersoverzicht).

### Registratiestatus aanpassen

In het [overzicht](#cursusgebruikersoverzicht) van alle
[cursusgebruikers](#cursusgebruiker)
worden de cursusgebruikers in tabs gegroepeerd volgens hun
**registratiestatus** voor de [cursus](#cursus).

<span class="guilabel">Geregistreerd</span>

> Alle [cursusgebruikers](#cursusgebruiker) die momenteel
> [geregistreerd](/nl/for-students#cursus-registreren) zijn.

<span class="guilabel">Uitgeschreven</span>

> Alle [cursusgebruikers](#cursusgebruiker) die ooit
> [geregistreerd](/nl/for-students#cursus-registreren)
> waren, maar die ondertussen
> [uitgeschreven](/nl/for-students#cursus-uitschrijven) zijn.

<span class="guilabel">Op de wachtlijst</span>

> Alle [cursusgebruikers](#cursusgebruiker) waarvoor er nog een
> [registratieverzoek](/nl/for-students#registratieverzoek) openstaat dat wacht op
> [afhandeling](#registratieverzoeken-afhandelen) van een
> [cursusbeheerder](#cursusbeheerder).


### Registratieverzoeken afhandelen

Elke tab heeft eigen actieknoppen aan de rechterkant van de
cursusgebruikers waarmee je hun
[registratiestatus](#cursusgebruiker-registratiestatus) kunt aanpassen.


|tab                                                 |knop                    |actie |
-----------------------------------------------------|------------------------|------| 
<span class="guilabel">Geregistreerd</span>|          ![image](../../../images/staff_registration_icons/unregister.png) |  cursusgebruiker uitschrijven uit de cursus|
<span class="guilabel">Uitgeschreven</span>|          ![image](../../../images/staff_registration_icons/register.png)|     cursusgebruiker terug registreren voor de cursus|
<span class="guilabel">Registratieverzoeken</span>|   ![image](../../../images/staff_registration_icons/approve.png)|     goedkeuren van het [registratieverzoek](#registratieverzoek) dat door de gebruiker werd [ingediend](/nl/for-students#registratieverzoek-indienen), waardoor de gebruiker [geregistreerd](/nl/for-students#cursus-registreren) wordt voor de cursus|
<span class="guilabel">Registratieverzoeken</span>|   ![image](../../../images/staff_registration_icons/decline.png)|      afkeuren van het [registratieverzoek](#registratieverzoek) dat door de gebruiker werd [ingediend](/nl/for-students#registratieverzoek-indienen), waardoor de gebruiker [uitgeschreven](/nl/for-students#cursus-uitschrijven) wordt uit de cursus|

### Cursusbeheerders aanduiden

<h1 id="cursusbeheerder"></h1>

Een **cursusbeheerder** is een
[geregistreerde](/nl/for-students#cursus-registreren)
[cursusgebruiker](#cursusgebruiker) met
beheersrechten voor de [cursus](#cursus).
Een [lesgever](/nl/user-management#lesgever) die een nieuwe
cursus aanmaakt wordt er automatisch voor geregistreerd en wordt er
meteen ook de eerste cursusbeheerder van. Lesgever hebben voor het
beheren van cursussen echter geen bijkomende rechten ten opzichte van
andere cursusbeheerders en kunnen ook
geen cursussen beheren waarvoor ze geen cursusbeheerder zijn.

In de tab <span class="guilabel">Geregistreerd</span> van het [overzicht](#cursusgebruikersoverzicht)
met alle [cursusgebruikers](#cursusgebruiker) kan je de cursusbeheerders herkennen aan het icoontje in de
linkermarge.

![image](./staff.course_users_admin.png)

In de tab kan je de volgende actieknoppen gebruiken om cursusbeheerders
aan te duiden:

|knop                                                              |actie                                                                                |
|------------------------------------------------------------------|-------------------------------------------------------------------------------------|
![image](../../../images/staff_registration_icons/make_course_admin.png)    |cursusgebruiker zonder beheersrechten voor de cursus promoveren tot cursusbeheerder  |
![image](../../../images/staff_registration_icons/make_student.png)         |cursusbeheerder degraderen tot cursusgebruiker zonder beheersrechten voor de cursus  |

::: tip Belangrijk

Een [cursusbeheerder](#cursusbeheerder)
die zich [uitschrijft](/nl/for-students#cursus-uitschrijven) uit een [cursus](#cursus)
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

## Navigeren naar oplossingen

Als cursusbeheerder kan je een overzicht met [oplossingen](/nl/for-students#oplossing) die in de [cursus](#cursus)
ingediend werden, verkrijgen door te drukken op <span class="guilabel">Ingediende oplossingen</span> in de navigatiebalk.
![cursus oplossingen link](./staff.course_submissions_link.png).
Het overzicht bevat alle benodige informatie per inzending, zoals de naam van de gebruiker en de naam van de oefening, inclusief filters voor deze waarden. Ook de status, het tijdstip en een link naar de inzending zijn aanwezig.
![filter submissions](./staff.course_submissions_filter.png)

![filtered submissions](./staff.course_submissions_filtered.png)


<h1 id="cursusbeheerder-oplossingen-overzicht-menu"></h1>

Het overzicht heeft voor
[cursusbeheerders](#cursusbeheerder) ook
een [menu](/nl/for-students#oefeningenreeks-menu) met
filters en acties die voor hen voorbehouden zijn:

<span class="guilabel" id="cursusbeheerder-oplossingen-overzicht-filter-recentste-correcte">
Meest recente correcte oplossing per gebruiker
</span> (filter)

> Beperkt het overzicht tot de meest recente correcte oplossing per
> gebruiker.

<span class="guilabel">
Oplossingen herevalueren</span>
(actie)

> [Herevalueert](/nl/exercise-series-management#oplossing-herevalueren) alle [oplossingen](/nl/for-students#oplossing) uit het overzicht.
