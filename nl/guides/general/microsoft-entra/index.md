---
title: "Dodona toelaten in Microsoft Entra ID"
description: "Voor IT-beheerders: de Microsoft-applicatie van Dodona nakijken en toelaten in je eigen Microsoft Entra-tenant."
order: 2
---

# Dodona toelaten in Microsoft Entra ID

Deze pagina is bedoeld voor de IT-beheerders van een school, hogeschool of universiteit. Ze bevat alles wat je nodig hebt om de Microsoft-applicatie van Dodona na te kijken en toe te laten in je eigen Microsoft Entra-tenant, zodat je gebruikers zich op Dodona kunnen aanmelden met hun institutionele Microsoft-account.

Studenten en lesgevers hebben niets van deze pagina nodig. Zij melden zich gewoon aan op [dodona.be](https://dodona.be) en kiezen daar hun instelling.

## Over Dodona

<!--@include: ../../_what-is-dodona.md-->

Dodona wordt ontwikkeld en beheerd door Dodona Learning Technologies BV.

## Waarom je hier terechtkomt

Dodona gebruikt Microsoft Entra ID (vroeger Azure AD) om gebruikers aan te melden met hun institutionele Microsoft 365-account. Sommige instellingen beperken aan welke externe applicaties hun gebruikers toestemming mogen geven. In dat geval blokkeert Microsoft de aanmelding, en moet iemand van je IT-dienst de Dodona-applicatie eerst expliciet toelaten voor je gebruikers binnen geraken.

::: warning We gebruiken nu onze eigen app-registratie

Tot voor kort verliep het aanmelden op Dodona met een Microsoft-account via een app-registratie die beheerd werd door de Universiteit Gent. Dodona heeft nu een eigen app-registratie, degene die hieronder beschreven staat.

Als je instelling de vorige applicatie expliciet toeliet, geldt die goedkeuring niet automatisch voor de nieuwe. Je moet ook deze applicatie toelaten.
:::

## De app-registratie

| | |
| --- | --- |
| Weergavenaam | `Dodona` |
| Toepassings-ID (client) | `060c642b-473b-4423-a9f6-dfc67066deb6` |
| Uitgever | Dodona Learning Technologies |
| Domein van de uitgever | `dodona.be` |
| Ondersteunde accounttypes | Accounts in elke organisatiemap (multitenant) en persoonlijke Microsoft-accounts |
| Omleidings-URI | `https://dodona.be/users/auth/microsoft/callback` |

De applicatie is [publisher verified](https://learn.microsoft.com/en-us/entra/identity-platform/publisher-verification-overview) bij Microsoft. Microsoft heeft dus geverifieerd dat Dodona Learning Technologies de organisatie is die de applicatie publiceert. Je herkent dat aan het blauwe `Verified`-label op het toestemmingsscherm en op de pagina van de applicatie in het Microsoft Entra-beheercentrum.

## Welke machtigingen Dodona vraagt

Dodona vraagt drie **gedelegeerde** machtigingen op Microsoft Graph, en verder niets:

- `openid`: de gebruiker aanmelden en een ID-token ontvangen. Dit is de machtiging die single sign-on überhaupt mogelijk maakt.
- `email`: het primaire e-mailadres van de aangemelde gebruiker lezen.
- `profile`: het basisprofiel van de aangemelde gebruiker lezen, zoals de naam.

Dat zijn de drie [OpenID Connect-scopes](https://learn.microsoft.com/en-us/entra/identity-platform/scopes-oidc) die Microsoft zelf beschrijft als het minimum om te kunnen aanmelden. Alle drie zitten ze in de categorie die **geen** toestemming van een beheerder vereist.

::: tip Dodona doet geen enkele oproep naar de Microsoft Graph API

Dodona roept de Microsoft Graph API nooit aan. De machtigingen hierboven dienen er enkel voor dat Microsoft een ID-token uitreikt wanneer iemand zich aanmeldt. Dodona leest een handvol [claims](https://learn.microsoft.com/en-us/entra/identity-platform/id-token-claims-reference) uit dat token en gooit het token daarna weg:

- `oid` en `tid`: de onveranderlijke identificatoren van de gebruiker en van je tenant. Dodona gebruikt die om een terugkerende gebruiker te herkennen en om het account aan je instelling te koppelen.
- `email`, `given_name`, `family_name`, `preferred_username` en `name`: het e-mailadres en de naam van de gebruiker, om het Dodona-profiel in te vullen.

Dat is de volledige lijst. Er is geen achtergrondproces, en niets waarmee Dodona je directory zou kunnen bevragen.
:::

Concreet betekent dat:

- Dodona ontvangt, bewaart of vraagt nooit het Microsoft-wachtwoord van de gebruiker. Het aanmelden gebeurt volledig op de aanmeldpagina's van Microsoft zelf.
- Dodona vraagt geen toegang tot e-mail, bestanden, agenda's, Teams of gegevens uit je directory.
- Dodona heeft geen toegang tot iets in je tenant buiten de aanmelding zelf.

Wat Dodona doet met de persoonsgegevens die het ontvangt, staat in ons [gegevensbeleid](https://dodona.be/nl/data/).

## De applicatie toelaten

Wat op jou van toepassing is, hangt af van de toestemmingsinstellingen van je tenant. Beheerderstoestemming voor de hele organisatie is de meest voorspelbare optie, en degene die we meestal vragen. De labels tussen backticks hieronder zijn de Engelstalige benamingen uit het Microsoft Entra-beheercentrum.

### De applicatie nakijken in je tenant

Zodra minstens één van je gebruikers geprobeerd heeft zich aan te melden, verschijnt de Dodona-applicatie in je tenant onder `Enterprise applications` in het [Microsoft Entra-beheercentrum](https://entra.microsoft.com). Zoek op `Dodona`, of filter op het toepassings-ID hierboven als je meerdere resultaten krijgt. Microsoft documenteert dit in [View enterprise applications](https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/view-applications-portal).

Op de pagina `Permissions` van de applicatie zie je precies welke machtigingen gevraagd en toegekend zijn.

### Beheerderstoestemming geven voor de hele organisatie

Als je toestemming geeft namens je organisatie, krijgen je gebruikers zelf nooit een toestemmingsscherm te zien. Dat doe je vanaf de pagina `Permissions` van de applicatie onder `Enterprise applications`, zoals beschreven in [Grant tenant-wide admin consent to an application](https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/grant-admin-consent).

Staat de applicatie nog niet in je tenant, dan kan je de toestemmingsflow ook rechtstreeks starten. Open de volgende URL terwijl je aangemeld bent met een account dat namens je organisatie toestemming mag geven, en vervang `{tenant}` door je tenant-ID of door een van je geverifieerde domeinnamen:

```
https://login.microsoftonline.com/{tenant}/adminconsent?client_id=060c642b-473b-4423-a9f6-dfc67066deb6
```

Toestemming geven vereist een rol zoals `Cloud Application Administrator` of `Privileged Role Administrator`.

### Je instellingen voor gebruikerstoestemming

Als je liever geen toestemming geeft namens iedereen, kunnen je gebruikers dat zelf doen, afhankelijk van de instelling voor gebruikerstoestemming van je tenant. Je vindt die onder `Enterprise applications` > `Consent and permissions` > `User consent settings`, gedocumenteerd in [Configure how users consent to applications](https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/configure-user-consent).

- `Allow user consent for apps`: je gebruikers kunnen zelf toestemming geven aan Dodona en je hoeft niets te doen.
- `Allow user consent for apps from verified publishers, for selected permissions`: Dodona is publisher verified en voldoet dus aan het eerste deel van deze policy. De gevraagde machtigingen moeten daarnaast in je tenant als `low impact` geklasseerd staan. Is dat niet zo, voeg dan `openid`, `email` en `profile` toe aan je [permission classifications](https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/configure-permission-classifications), of geef beheerderstoestemming.
- `Do not allow user consent`: een beheerder moet toestemming geven. Geef ofwel beheerderstoestemming zoals hierboven beschreven, ofwel schakel je de [admin consent workflow](https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/configure-admin-consent-workflow) in, zodat gebruikers vanuit de aanmeldflow zelf een goedkeuring kunnen aanvragen.

### Beperken wie zich mag aanmelden

De applicatie toelaten verplicht je niet om ze voor iedereen open te zetten. Je kan `Assignment required` instellen op de applicatie en daarna enkel de gebruikers of groepen toewijzen die zich op Dodona mogen aanmelden, zoals beschreven in [Assign users and groups to an application](https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/assign-user-or-group-access-portal). Let op: applicaties die toewijzing vereisen hebben altijd beheerderstoestemming nodig, ook als je instellingen voor gebruikerstoestemming gebruikers anders zelf zouden laten beslissen.

## Nog vragen?

Blijft het aanmelden mislukken nadat je de applicatie toegelaten hebt, of heb je iets nodig dat hier niet staat (een verwerkersovereenkomst, een bijkomende veiligheidsvragenlijst, een andere omleidings-URI voor een testopstelling)? Gebruik dan het contactformulier op [dodona.be/nl/contact](https://dodona.be/nl/contact). We helpen je graag verder, en alle opmerkingen en suggesties zijn meer dan welkom.

Voor algemene vragen over accounts op Dodona kan je terecht bij de [FAQ over accounts en instellingen](/nl/faq/accounts/).
