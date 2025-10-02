---
title: Nieuwe oefeningenrepository
description: "Tutorial: een nieuwe repository met oefeningen maken"
order: 5
---

# Een nieuwe repository met oefeningen maken

Dodona gebruikt git repositories om oefeningen en ander lesmateriaal te beheren. Een repository kan meerdere oefeningen bevatten en moet aan een [bepaalde structuur](/nl/references/repository-directory-structure) voldoen om gelezen te kunnen worden door Dodona.

## 1. Een Git repository aanmaken

Een eerste stap is om een git repository aan te maken. Je kan dit eenvoudig doen op [github.com](https://github.com). Daarnaast ondersteunen we ook [Gitlab](https://gitlab.com). Eenmaal aangemaakt kan je je repository toevoegen aan Dodona.

## 2. Je repository aan Dodona toevoegen

Als je lesgeversrechten op Dodona hebt, dan verschijnt in de linker navigatiebalk een link `Repositories` die je naar een [overzicht van jouw repositories op Dodona](https://dodona.be/nl/repositories/) brengt. Om een nieuwe repository toe te voegen, klik je op de grote plus-knop bovenaan de pagina.

![repository toevoegen](./add-repository.png)

In het formulier om de repository toe te voegen kies je een unieke naam voor je repository binnen Dodona. Geef vervolgens de "clone URL" in die je kan vinden op de GitHub pagina van je repository. Zorg ervoor dat je de SSH link van GitHub kopieert en niet de HTTPS variant. Kies tot slot de standaard judge die je wil gebruiken voor oefeningen in deze repository.

![github clone url](./github-clone-url.png)

Voordat je op de toevoeg-knop klikt, moet je er eerst voor zorgen dat de Dodona server zowel lees- als schrijfrechten heeft op je repository met oefeningen. We hebben deze schrijftoegang nodig om eenvoudig de oefeningen te kunnen bewerken via de webinterface.

- Op github.com voeg je eenvoudig de gebruiker [dodona-server](https://github.com/dodona-server) toe aan je repository. Zodra wij de uitnodiging accepteren (binnen het half uur), kan je aan de slag. De acceptatie gebeurt automatisch, maar kan tot een half uur duren. Duurt het toch langer, [neem dan contact op met Team Dodona](https://dodona.be/nl/contact).
- Op github.ugent.be voeg je [SA-GitHubDodona](https://github.ugent.be/SA-GitHubDodona) toe.
- Op gitlab.com gebruik je [dodona-server](https://gitlab.com/dodona-server).
- Host je op een eigen GitLab server, maak dan zelf een gebruiker voor Dodona aan en gebruik onze [publieke ssh sleutel](/dodona.pub).
 
![github gebruiker toevoegen](./github-add-collab.png)

Je kan op de Dodona website het toevoegen van de repository nu finaliseren.

## 3. De webhook instellen

Om je oefeningen up-to-date te houden, moet Dodona weten wanneer je wijzigingen aanbrengt. We doen dit met behulp van een _webhook_. Dit is een unieke URL die er voor zorgt dat Dodona je repository opnieuw zal verwerken. Deze URL zou zichtbaar moeten zijn nadat je je repository aan Dodona hebt toegevoegd.

![webhook url](./webhook-url.png)

Deze URL moet je vervolgens toevoegen aan GitHub. Dit doe je door op GitHub naar de instellingen van je repository te gaan en vervolgens op `Webhooks` te klikken in de navigatiebalk. Klik vervolgens op de `Add webhook`-knop en geef de URL in die je van Dodona gekregen hebt. Gebruik voor de rest de standaardinstellingen en klik op `Add webhook`.

![github webhook](./github-webhook.png)

## 4. Lesmateriaal aanmaken

Je bent nu helemaal klaar om oefeningen en lesmateriaal toe te voegen aan je repository. Als alles goed gaat, dan zouden ze automatisch moeten verschijnen op Dodona.

Voor meer informatie over het maken van oefeningen in je repository, bekijk de [repository directory structure](/nl/references/repository-directory-structure) referentie.
Het specifieke formaat van de tests voor je oefeningen hangt af van je gekozen judge. Je vindt een overzicht van alle ondersteunde judges, met links naar hun documentatie, op de [judge overview](/nl/references/judges).
