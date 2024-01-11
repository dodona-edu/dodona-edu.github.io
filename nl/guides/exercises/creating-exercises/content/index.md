---
title: "Oefeningen opstellen: leesactiviteit"
sidebarTitle: Leesactiviteit
order: 4
prev: true
next: true
---


# Oefeningen opstellen: leesactiviteit

Als je in de vorige stap van de handleiding de _template repository_ gebruikt hebt, bevat je repository al een oefening en leesactiviteit.
Hier zullen we nu zelf nog een leesactiviteit toevoegen.
Dit is handig om extra informatie of kleine stukken theorie te integreren in je leerpad.
De bestaande leesactiviteit kan uiteraard als voorbeeld dienen.

::: info Analoog aan een oefening
De structuur en `config.json` voor een leesactiviteit zijn identiek aan deze van een oefening.
Er zijn echter twee grote verschillen: de waarde van `type` moet ingesteld worden op `content` en alles die specifiek voor oefeningen is, mag achterwege gelaten worden.
:::

## 1. Structuur

Elke leesactiviteit in Dodona komt overeen met een bepaalde map in de repository.
Die map heeft een [vaste structuur](/nl/references/exercise-directory-structure), die we nu zullen maken.

Maak dus eerst een nieuwe map voor de oefening, die we `markdown_demo` zullen noemen.
Maak daarna, in deze nieuwe map, de map `description` aan waarin de leesactiviteit komt.
Maak daarna de map `media` aan in de map `description` waarin de afbeeldingen en andere bestanden komen.

De map voor deze leesactiviteit moet er als volgt uitzien:

```
repository/
└── markdown_demo/
   └── description/
      └── media/
```

## 2. Configuratie

Dodona eist voor elke leesactiviteiten ook een [configuratiebestand](/nl/references/exercise-config).
Dit bestand bevat metadata, die door Dodona gebruikt worden.

Maak het bestand `config.json` in de map `markdown_demo` met de volgende inhoud:

```json
{
  "description": {
    "names": {
      "en": "Markdown demo",
      "nl": "Markdown demo"
    }
  },
  "access": "private",
  "type": "content"
}
```

In dit bestand worden drie dingen gespecifieerd:

- `names`: De **namen** van de leesactiviteit zoals getoond door Dodona in het Nederlands (_nl_) en in het Engels (_en_) (in dit geval zijn beide namen hetzelfde).
- `acces`: Het **toegangsniveau** is hier _private_. We kiezen voor een private leesactiviteit omdat dit maar een handleiding is, maar we moedigen aan om je leesactiviteiten publiek (_public_) te zetten: dan kunnen andere leerkrachten er ook gebruik van maken (net zoals jij de keuze hebt uit publieke leesactiviteiten op Dodona).
- `type`: Moet ingesteld worden op `content` voor leesactiviteiten. De standaardwaarde indien afwezig is `exercise`.

Nadat je dit bestand gemaakt hebt, zal je repository er zo uitzien:

```
repository/
└── markdown_demo/
   ├── description/
   |  └── media/
   └── config.json
```

## 3. Afbeeldingen of bestanden toevoegen

Om een afbeelding toe te voegen heb je twee opties.
Ofwel verwijs je naar een afbeelding die in de map `media` staat, ofwel verwijs je naar de afbeelding via een link.
In het voorbeeld komen straks beide manieren aan bod.

Download onderstaande afbeelding met het logo van de UGent. Dit is een [directe link](https://styleguide.ugent.be/files/uploads/logo_UGent_NL_RGB_2400_kleur_witbg.png). Rechtsklik op de afbeelding en kies voor `Afbeelding opslaan...`.

![UGent logo](logo_UGent.png)

Rechtsklik op de map `media` in VS Code web en klik op `Upload...`.
Selecteer de afbeelding van op je computer en klik op `Openen`.

Verwijzen naar de afbeelding als volgt.
De code start met een uitroepingsteken (`!`) en tussen de vierkante haken zet je een beschrijving van de afbeelding.
Tussen de ronde haken staat het pad naar de afbeelding.
`![Logo van de UGent](media/logo_UGent.png)`

## 4. Inhoud

De volgende stap is de inhoud van de leesactiviteit.
Maak een bestand `description.nl.md` aan in de map `description` van de leesactiviteit, met volgende inhoud:

````markdown
# Markdown demo

## Tekstopmaak

Dit is een voorbeeldzin met woorden in *cursief*, **vet** en met variabel `result` in functie `geef_oplossing()`.

## Links en afbeeldingen

Dit is een zin waarbij [deze woorden](https://docs.dodona.be/nl/references/exercise-description/) linken naar de Dodona handleiding over Markdown.
Hieronder staat het Dodona logo afgebeeld via een link.

![Dodona logo](https://dodona.be/icon.png)

Er wordt rechtstreeks verwezen naar het logo van de UGent in de `media` map.

![UGent logo](media/logo_UGent.png)

### Populairste programmeertalen op Dodona

1. Python
2. R
3. Java

### Soorten ingenieurs

* Handelsingenieur
* Industrieel ingenieur (ing.)
* Burgerlijk ingenieur (ir.)
* Bio-ingenieur

## Wiskundige formules

Bereken de lengte van de schuine zijde van een driehoek $$c$$ met de formule $$c^2 = a^2 + b^2$$.

De oplossing kan gevonden worden met de volgende formule:
$$
c = \sqrt{a^2 + b^2}
$$

## Codefragmenten

In je oplossing, kan je deze code gebruiken: `print("text")`{:.language-python}.

```console?lang=python&prompt=>>>
>>> echo("Hello")
Hello
>>> echo("Other side")
Other side
```

```python
naam = input()
print(f"Hallo, {naam}!")
```

## Callouts

{: .callout.callout-success}
> #### Opgelet
> Dit is een belangrijk bericht.

## Quotes

Dit is geen quote.

> Dit is een quote.
````

Als je ook Engelstalige inhoud wilt maken, gebruik je de naam `description.en.md` voor het tweede bestand.
De inhoud wordt geschreven in Markdown, een redelijk eenvoudig opmaakformaat. Meer informatie over Markdown is [hier](/nl/references/exercise-description) te vinden.

Nadat je deze twee bestanden gemaakt hebt, moet je repository er zo uitzien:

```
repository/
└── markdown_demo/
   ├── description/
   |  ├── media/
   |  |  └── logo_UGent.png
   |  └── description.nl.md
   └── config.json
```

## 5. Wijzigingen opslaan

Vergeet niet om je wijzigingen te _committen_, anders gaan ze verloren!

Een voorbeeld van hoe je dit kan doen vind je [hier](/nl/guides/exercises/creating-exercises/exercise/#_5-wijzigingen-opslaan).

## 6. Leesactiviteit controleren

De leesactiviteit die je daarnet gemaakt hebt, kan je terugvinden in [jouw repository](https://dodona.be/nl/repositories/) op Dodona. Controleer de leesactiviteit. Is alles naar wens? Dan kan je bovenaan de leesactiviteit publiceren (_Deze oefening publiceren_). Je leesactiviteit is nu klaar om te gebruiken op Dodona!
