---
title: "Oefeningen opstellen: installatie"
sidebarTitle: Installatie
order: 2
prev: true
next: true
---

# Oefeningen opstellen: installatie en configuratie

In dit hoofdstuk overlopen en configureren we alle programma's en tools die nodig zijn om een oefening op te stellen.


::: info Online werken
Merk op dat we er in deze handleiding voor kiezen om met _VS Code for the Web_ te werken, een versie van VS Code die in de browser draait.
Als je lokaal aan uw oefeningen wilt werken, kan je deze gids volgen: TODO.
:::

## Browser

Aangezien je deze handleiding aan het lezen bent, heb je waarschijnlijk al een browser.
Controleer voor de zekerheid toch of je een recente versie van Chrome, Firefox of Safari (de drie browsers die Dodona ondersteunt) gebruikt.

## Lesgeversrechten op Dodona

Gewone accounts hebben op Dodona niet voldoende rechten om zelf oefeningen te kunnen maken.
Daarvoor kan je via [het formulier](https://dodona.ugent.be/nl/rights_requests/new) lesgeversrechten aanvragen voor je account.

## Repository forken

Dodona gebruikt Git-repository's om oefeningen en ander lesmateriaal te beheren.
Een repository kan meerdere oefeningen bevatten en moet aan een bepaalde structuur voldoen om gelezen te kunnen worden door Dodona.
We zullen hier een sjabloon als startpunt voor je repository gebruiken, zodat de structuur al meteen goed zit.

### Account op GitHub

We gebruiken GitHub om de repository op te slaan.
Eerst heb je een account nodig bij GitHub.
Ga naar <https://github.com/signup> om een account te maken, of gebruik je bestaande account als je die hebt.

### Repository forken

Als volgende stap moet je je persoonlijke kopie van het sjabloon maken:

1. Ga naar <https://github.com/dodona-edu/exercise-template>.
2. Klik op de knop _Use this template_.
3. Kies vervolgens de eerste optie: _Create new repository_.
   ![Template repo](./use-template-repo.png)
4. Vul de details voor de nieuwe repository in:
   1. Kies een naam voor de repository.
   2. Kies de toegang tot de repository. _Public_ betekent dat iedereen aan de oefeningen kan, dus we raden _Private_ aan.
   3. Klik op _Create repository_
   ![New repo details](./new-repo-details.png)

Nu heb je een repository waarin je je oefeningen zal opslaan.
Laat de pagina open staan, je zal haar nog nodig hebben.

### Repository toevoegen aan Dodona

Eens je lesgeversrechten op Dodona hebt, kan je je repository toevoegen aan Dodona.
Ga daarvoor eerst naar <https://dodona.ugent.be/nl/repositories/> en klik op de lichtroze knop met een plusteken (+) in.

![New repo Dodona](./add-repository.png)

Vul vervolgens de details van de repository in:

1. **Naam**: kies een unieke naam voor de repository op Dodona. Dit wordt gebruikt om de repository later terug te vinden.
2. **Clone URL**: hiervoor moet je terug naar GitHub.
   ![Clone URL](./clone-url.png)
   1. Ga naar je repository die je hierboven gemaakt hebt.
   2. Klik op de groene knop _Code_.
   3. Onder de hoofding _Clone_ zijn 3 tabbladen. Klik op het tabblad _SSH_.
   4. Kopieer de URL die verschijnt, ofwel manueel ofwel door op de knop naast de URL te klikken.
   5. Plak deze URL in het veld _Clone URL_ bij Dodona.
3. **Standaard judge**: kies hier "TESTed".
4. Klik op de roze knop bovenaan met een vinkje in.

### Webhook instellen

Dodona zal vervolgens je repository ophalen en verwerken.
Dit zal elke keer als je een aanpassing doet aan een oefening moeten gebeuren, dus moet Dodona weten wanneer er wijzigingen gebeuren.
We doen dit met behulp van een _webhook_.
Dit is een unieke URL die er voor zorgt dat Dodona je repository opnieuw zal verwerken.
Deze URL zou zichtbaar moeten zijn nadat je je repository aan Dodona hebt toegevoegd.

![webhook url](./webhook-url.png)

Deze URL moet je vervolgens toevoegen aan GitHub:

1. Ga naar je repository op GitHub.
2. Klik op het tabblad _Settings_.
3. Kies in de zijbalk de optie _Webhooks_ (die staat ergens halverwege).
4. Klik linksboven op de knop _Add webhook_.
5. Plak de URL van Dodona in het veld met als titel **Payload URL**.
6. Klik onderaan op de groene knop _Add webhook_.

![github webhook](./github-webhook.png)

Je repository is nu klaar om een oefening te schrijven.
In het volgende deel van de handleiding zullen we dan effectief de oefening schrijven.

Er zijn verschillende soorten oefeningen die ondersteund worden door Dodona.
In deze handleiding kiezen we voor een oefening met functies, maar we hebben ook handleidingen voor andere soorten oefeningen.

## VS Code gebruiken

In deze handleiding gebruiken we de webversie van VS Code.
Om deze te openen:

1. Ga naar de pagina van je repository op GitHub (als die nog open staat, des te beter).
2. Druk op <kbd>.</kbd> op je toetsenbord (op azerty-toetsenborden is dit <kbd>Shift</kbd>+<kbd>.</kbd>).
3. Na het opstarten zal er rechts onderaan een melding verschijnen over het installeren van de aanbevolen extensies.
   Doe dit.
