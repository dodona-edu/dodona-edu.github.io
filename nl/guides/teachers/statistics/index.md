---
title: "Statistieken en visualisaties"
description: "Handleiding: volg de activiteit van je studenten op met cursusstatistieken en reeksgrafieken"
order: 10
---

# Statistieken en visualisaties

Dodona houdt elke ingediende oplossing in je cursus bij en zet die gegevens om in een reeks grafieken. Zo zie je wanneer je studenten werken, met welke oefeningen ze worstelen en hoe ver de klas staat. Als cursusbeheerder vind je deze grafieken op twee plaatsen:

* de **statistiekenpagina van de cursus**, met grafieken over alle ingediende oplossingen in de cursus, en
* de **reeksgrafieken** op de cursuspagina, met vier gedetailleerde grafieken per oefeningenreeks.

Deze grafieken zijn enkel zichtbaar voor cursusbeheerders. De enige uitzondering is de balk `Voortgang groep` naast elke oefening, die studenten ook kunnen zien; die komt [op het einde van deze handleiding](#voortgang-groep) aan bod.

::: tip Opmerking
Al deze grafieken zijn gebaseerd op ingediende oplossingen. Een student die nooit iets indiende, komt er dus niet in voor.
:::

## De statistiekenpagina van de cursus

Bovenaan de cursuspagina zien cursusbeheerders een rij tellers die de cursus samenvatten. Klik rechts van die rij op `Meer statistieken` om de statistiekenpagina van de cursus te openen. Je kan er ook naartoe via het grafiekicoon in de navigatiebalk bovenaan de cursuspagina (`Statistieken`).

De statistiekenpagina herhaalt die tellers — `Geregistreerde gebruikers`, `Oefeningen`, `Ingediende oplossingen` en `Leesactiviteiten` — en voegt er tellers aan toe voor de [vragen](../course-management/) van je studenten: `Totaal aantal vragen`, `Onbeantwoorde vragen`, `Vragen in behandeling` en `Beantwoorde vragen`. Elke teller linkt naar de bijbehorende overzichtspagina.

Onder de tellers tonen twee grafieken wanneer de oplossingen in je cursus werden ingediend.

### Punchcard

De punchcard beantwoordt de vraag: *op welke momenten van de week werken mijn studenten?* Het is een raster met een rij per weekdag (maandag tot zondag) en een kolom per uur van de dag. Elke oplossing die ooit in de cursus werd ingediend, wordt geteld in de cel van haar dag en uur, en het bolletje in een cel wordt groter naarmate er meer oplossingen werden ingediend. De tijdstippen worden in je eigen tijdzone getoond.

**Zo lees je de grafiek**: zoek de grootste bollen. Geef je bijvoorbeeld een practicum op dinsdagvoormiddag, dan zie je doorgaans grote bollen op dinsdag tussen 10:00 en 12:00, en een tweede cluster op zondagavond als je deadlines op zondagnacht vallen. Een punchcard waar bijna alle activiteit in de uren vlak voor een wekelijkse deadline zit, vertelt je dat studenten pas op het laatste moment aan de oefeningen beginnen.

### Heatmap

De heatmap beantwoordt de vraag: *op welke dagen was er activiteit in mijn cursus?* Ze toont een kalender, gegroepeerd per academiejaar (vanaf 1 september), met een vierkantje per dag. Hoe meer oplossingen er op een dag werden ingediend, hoe donkerder het vierkantje.

**Zo lees je de grafiek**: donkere vierkantjes zijn de drukke dagen. Een donker vierkantje vlak voor elke deadline met lege weken ertussen betekent dat studenten laat beginnen; een heatmap die ook de dagen ertussen kleurt, toont een klas die gestaag werkt. De heatmap is ook een snelle manier om de impact van een toets of examen te zien: die dagen springen er meestal uit als de donkerste van het jaar.

::: info Vers berekend
Dodona berekent de gegevens achter de punchcard en de heatmap op de achtergrond. De allereerste keer dat je de statistiekenpagina van een cursus opent, kan het even duren voor de grafieken verschijnen terwijl de cijfers berekend worden. Daarna worden de resultaten gecachet en automatisch actueel gehouden.
:::

De punchcard en de heatmap bestaan ook voor een individuele student: de [overzichtspagina van een student](../user-management/#studenten-opvolgen) toont dezelfde twee grafieken, beperkt tot de oplossingen van die student.

## Reeksgrafieken op de cursuspagina

Bij elke reeks op de cursuspagina zien cursusbeheerders rechts in de titelbalk van de reeks een groep van vier extra knoppen, naast de knop voor het gewone `Reeksoverzicht`. Elke knop vervangt de lijst met oefeningen van de reeks door een grafiek over de ingediende oplossingen voor die reeks. Klik op het informatie-icoon naast de titel van de grafiek voor een korte uitleg in Dodona zelf, en gebruik de eerste knop om terug te keren naar de lijst met oefeningen.

Deze grafieken tellen enkel oplossingen van studenten (oplossingen van cursusbeheerders worden genegeerd), en enkel oplossingen die volledig verwerkt zijn. Heeft een reeks nog geen ingediende oplossingen, dan meldt Dodona `Er is niet genoeg data om een grafiek te maken.`

::: tip Opmerking
De reeksgrafieken zijn niet beschikbaar voor reeksen van het type "optioneel", omdat die geen deel uitmaken van het officiële leerpad van de cursus.
:::

### Aantal oplossingen per gebruiker

Deze vioolgrafiek toont voor elke oefening in de reeks hoeveel oplossingen studenten nodig hadden. Elke oefening krijgt een horizontale vorm: de horizontale as is het `Aantal ingediende oplossingen`, en hoe dikker de vorm op een bepaald aantal, hoe meer studenten precies zoveel oplossingen indienden voor die oefening. De as stopt bij 20; studenten met meer dan 20 oplossingen worden geteld in de categorie `20+`. Het bolletje op elke vorm markeert het gemiddelde aantal pogingen en wordt hol wanneer dat gemiddelde boven de 20 uitstijgt.

**Zo lees je de grafiek**: een oefening waar de vorm uitpuilt bij 1 of 2 oplossingen was makkelijk — de meeste studenten losten ze meteen op. Een oefening waarvan de vorm ver naar rechts uitloopt, met een gemiddelde van 8 pogingen terwijl de andere oefeningen in de reeks gemiddeld 2 halen, is waar je studenten vastzaten; die verdient misschien een extra voorbeeld in de les of een hint in de opgave.

### Verdeling van de oplossingsstatus

Dit staafdiagram toont één balk per oefening, opgedeeld volgens de status van de ingediende oplossingen: `Correct`, `Fout`, `Compilatiefout`, `Uitvoeringsfout`, `Timeout`, … Beweeg over een segment om het percentage en het exacte aantal oplossingen met die status te zien.

**Zo lees je de grafiek**: de mix van statussen vertelt je *hoe* een oefening moeilijk is. Een oefening waar de helft van de oplossingen compilatiefouten zijn, wijst op studenten die worstelen met de syntaxis, terwijl een balk vol foute oplossingen suggereert dat de logica (of de opgave zelf) het probleem is. Heeft één oefening veel meer `Timeout`-oplossingen dan de rest van de reeks, dan zijn haar tijdslimiet of verwachte efficiëntie het nakijken waard.

### Ingediende oplossingen over tijd

Deze grafiek toont wanneer studenten aan elke oefening werkten. Elke oefening krijgt een rij, de tijd loopt langs de horizontale as, en elk vierkantje stelt een tijdsinterval voor (de legende onder de grafiek toont hoe lang, bijvoorbeeld één dag). Hoe donkerder een vierkantje, hoe meer oplossingen er in dat interval voor die oefening werden ingediend; beweeg over een vierkantje voor een opsplitsing per status. Heeft de reeks een deadline, dan loopt de tijdlijn tot aan de deadline. Gebruik de velden `Startdatum` en `Einddatum` boven de grafiek om in te zoomen op een kortere periode, bijvoorbeeld één practicumsessie.

**Zo lees je de grafiek**: dit is de heatmap op reeksniveau. Een rij die enkel donker kleurt in de vierkantjes vlak voor de deadline betekent dat die oefening tot het laatste moment bleef liggen. Je ziet ook of studenten de reeks in volgorde doorlopen: kleuren de bovenste rijen vroeg in de periode en de onderste later, dan volgen ze je beoogde leerpad.

### Gebruikers met minstens één correcte oplossing

Deze grafiek toont per oefening een lijn met het percentage studenten dat de oefening op elk moment al correct had opgelost, gebaseerd op de eerste correcte oplossing van elke student. Het percentage is relatief ten opzichte van het aantal geregistreerde studenten in de cursus. Klik op de verticale as om te wisselen tussen een volledige schaal van 0 tot 100% en een schaal ingezoomd op de data. Heeft de reeks een deadline, dan loopt de tijdlijn tot aan de deadline.

**Zo lees je de grafiek**: elke lijn zou richting 100% moeten klimmen naarmate de deadline nadert. Een lijn die blijft hangen op 60% vertelt je dat 40% van je studenten die oefening nooit heeft opgelost. De lijnen vergelijken onthult ook het tempo: een lijn die pas in de laatste dagen begint te stijgen, terwijl de andere oefeningen al vroeg werden opgelost, markeert de oefening die studenten uitstelden — vaak de moeilijkste van de reeks.

## Voortgang groep

Naast elke oefening op de cursuspagina toont de kolom `Voortgang groep` een balkje met het aandeel geregistreerde cursusgebruikers dat aan de oefening begon (in het grijs) en het aandeel dat ze correct oploste (in kleur). Beweeg over het balkje voor de exacte aantallen. Bij leesactiviteiten toont het balkje hoeveel gebruikers de activiteit lazen.

In tegenstelling tot alle bovenstaande grafieken kunnen studenten deze visualisatie ook zien: zo kunnen ze inschatten hoe ze het doen ten opzichte van de rest van de klas. Wil je ze liever niet aan studenten tonen — bijvoorbeeld tijdens een toets of examen — dan kan je ze per reeks uitschakelen met de instelling `Verberg de "Voortgang groep" visualisatie voor studenten`, beschreven bij de [reeksinstellingen](../series-settings/#geavanceerde-instellingen). Cursusbeheerders blijven de kolom zien; een oogicoon naast de kolomtitel geeft dan aan dat ze verborgen is voor studenten.
