---
title: Dodona PyCharm plugin
description: "De Dodona PyCharm plugin"
---

# Dodona PyCharm plugin

Als je programmeert in een IDE van JetBrains, zoals bijvoorbeeld [PyCharm](https://www.jetbrains.com/pycharm/), dan kan je gebruik maken van de Dodona plugin om eenvoudig en snel in te dienen. 

## 1. Een API token aanmaken
Voor je de plugin kan installeren moet je eerst een API token aanmaken op de Dodona website. Via zo'n token kan PyCharm in jouw naam indienen zonder dat je je wachtwoord moet delen. Om een token aan te maken volg je [dit stappenplan](/nl/guides/creating-an-api-token). Hou het aangemaakte token bij, je zal het straks eenmalig in de plugin moeten invoeren.

## 2. De plugin installeren

Je kan de plugin direct installeren vanuit PyCharm. Je opent hiervoor eerst het `File`-menu en klikt vervolgens op `Settings...`.

![settings](./settings.png =250x)

In het `Plugins`-menu selecteer je vervolgens de `Marketplace` tab. Hier zoek je naar **Dodona**. Vervolgens kies je `Install` en `Restart`.

![install plugin](./install_plugin.png)

Je kan de plugin ook direct vanaf de JetBrains website installeren. Surf hiervoor naar [https://plugins.jetbrains.com/plugin/11166-dodona](https://plugins.jetbrains.com/plugin/11166-dodona), klik vervolgens op de blauwe knop `Install to IDE` en kies dan voor `PyCharm`.

## 3. Een nieuwe oefening starten

PyCharm moet natuurlijk weten bij welke oefening hij je oplossing moet indienen. De eenvoudigste manier om dit te doen is door rechts te klikken op een bestaande map of project in PyCharm. In het menu dat verschijnt kies je bij `New` voor `Dodona Exercise`.

![new exercise](./new_exercise.png)

Bij het aanmaken van je eerste oefening zal PyCharm je om je API token vragen. Plak hier de API token die je daarnet aangemaakt hebt in de eerste stap.

Vervolgens krijg je normaal een lijstje van al je Dodona cursussen te zien. Kies hier achtereenvolgens voor de juiste cursus, oefeningenreeks en oefening. Er zal nu automatisch een bestand aangemaakt worden waarin je je oplossing kan plaatsen.

De eerste regel van dit bestand bevat in commentaar de link naar de betreffende oefening. PyCharm gebruikt deze regel om voor de juiste oefening in te dienen, verwijder deze dus niet. Als je `ctrl` (of `cmd` op mac) ingedrukt houdt terwijl je op deze link klikt, dan zal de oefeningbeschrijving openen in een nieuw browservenster.

![link to exercise](./link.png)

## 4. Een oplossing indienen

Eenmaal je de oefening hebt opgelost kan je eenvoudig indienen. Rechtsboven je editor zou een knop met een blauw vinkje moeten staan. Deze knop zal je code uploaden naar Dodona en de automatische testen starten.

![submit to dodona](./check_mark.png)

Na enkele seconden zou het resultaat rechtsonder je editor moeten verschijnen. Als je op `More details` klikt, dan opent het resultaat in een nieuw browservenster. Als je opnieuw wil indienen, dan klik je gewoon opnieuw op het blauwe vinkje. Je kunt zo vaak indienen als je wenst.

![correct solution](./correct_solution.png)
![incorrect solution](./incorrect_solution.png)
