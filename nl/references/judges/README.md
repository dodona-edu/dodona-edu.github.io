---
title: Judges
description: "Overzicht van alle judges beschikbaar op Dodona"
---

# Judges

Deze gids is geschreven voor docenten die oefeningen maken voor Dodona.

Voordat je een oefening maakt, moet je beslissen welke `judge` je wilt gebruiken.
De `judge` is het programma dat de inzendingen van leerlingen beoordeelt.
Het is vaak geschreven voor één specifieke programmeertaal, of voor een reeks programmeertalen.
Elke `judge` heeft zijn eigen configuratie-opties, we geven hieronder een link naar de relevante documentatie voor elke `judge`.
Deze judge specifieke opties moeten worden voorzien in de `evaluation` directory van de [oefening configuratie](/nl/references/exercise-directory-structure).

Gevorderde gebruikers kunnen ook hun eigen judge aanmaken, zie [deze gids](/nl/guides/creating-a-judge).

Dodona ondersteunt momenteel de volgende judges:

## TESTed
TESTed is een whitebox judge die voor meerdere programmeertalen gebruikt kan worden.
Het gebruikt een eenvoudig eigen testformaat, dat onafhankelijk is van de programmeertaal.\
**Programmeertalen:** Bash, C, C#, Haskell, Java, Javascript, Kotlin, Python\
**Aan de slag** [Documentatie](/nl/tested#oefeningen-ontwerpen-voor-dodona), [voorbeelden](https://github.com/dodona-edu/universal-judge/tree/master/exercise) \
**Gemaakt door:** [Team dodona](mailto:dodona@ugent.be)

## Python
Python/Pythia is de eerste judge die is gemaakt voor Dodona.
Het is een Python judge die eenvoudige input/output tests of meer geavanceerde doctests mogelijk maakt.\
**Programmeertalen:** Python\
**Aan de slag** [Documentatie](/nl/references/python-judge), [voorbeelden](https://github.com/dodona-edu/example-exercises/tree/master/python) \
**Gemaakt door:** [Team dodona](mailto:dodona@ugent.be)

## R
R is een judge die gebruikt kan worden voor oefeningen in de programmeertaal R.\
**Programmeertalen:** R\
**Aan de slag** [Documentatie](https://github.com/dodona-edu/judge-r), [voorbeelden](https://github.com/dodona-edu/example-exercises/tree/master/R) \
**Gemaakt door:** [Team dodona](mailto:dodona@ugent.be)

## Java
Java is judge die het JUnit4-framework gebruikt om tests op java-oefeningen uit te voeren.\
**Programmeertalen:** Java\
**Aan de slag** [Documentatie](https://github.com/dodona-edu/judge-java), [voorbeelden](https://github.com/dodona-edu/judge-java/tree/master/examples) \
**Gemaakt door:** [Team dodona](mailto:dodona@ugent.be)

## C
C is een judge die het GTester framework gebruikt om testen uit te voeren op C oefeningen.\
**Programmeertalen:** C\
**Aan de slag** [Documentatie](https://github.com/mvdcamme/C-Judge), [voorbeelden](https://github.com/mvdcamme/C-Judge/tree/master/example_exercises) \
**Gemaakt door:** [Maarten Vandercammen](mailto:mvdcamme@vub.ac.be)

## SQL
De SQL judge ondersteunt zowel query evaluatie (DML) als structurele database opbouw (DDL).\
**Programmeertalen:** SQL\
**Aan de slag** [Documentatie](https://github.com/dodona-edu/judge-sql), [voorbeelden](https://github.com/dodona-edu/example-exercises/tree/master/sql) \
**Gemaakt door:** [Brecht Willems](mailto:Brecht.Willems@UGent.be)

## Prolog
Prolog is een judge die gebruikt kan worden voor oefeningen in de prolog programmeertaal.
Het ondersteunt PLUnit, QuickCheck en eenvoudige input-outputtests.\
**Programmeertalen:** Prolog\
**Aan de slag** [Documentatie](https://github.com/dodona-edu/judge-prolog), [voorbeelden](https://github.com/dodona-edu/example-exercises/tree/master/prolog) \
**Gemaakt door:** [Team dodona](mailto:dodona@ugent.be)

## Haskell
Haskell is een judge die HUnit gebruikt om haskell-oefeningen te testen. \
**Programmeertalen:** Haskell\
**Aan de slag** [Github repo](https://github.com/dodona-edu/judge-haskell), [voorbeelden](https://github.com/dodona-edu/example-exercises/tree/master/haskell) \
**Gemaakt door:** [Team dodona](mailto:dodona@ugent.be)

## Scheme
Scheme is een judge die gebruikt kan worden voor oefeningen in de programmeertaal Scheme.\
**Programmeertalen:** Scheme\
**Aan de slag** Neem contact op met de makers voor meer informatie over deze judge.\
**Gemaakt door:** [Mathijs Saey](mailto:mathijs.saey@vub.be)

## HTML
De HTML judge beoordeelt zowel de HTML als de CSS code van een student, op basis van een modeloplossing of een checklist met criteria.\
**Programmeertalen:** HTML, CSS\
**Aan de slag** [Documentatie](https://github.com/dodona-edu/judge-html), [voorbeelden](https://github.com/dodona-edu/example-exercises/tree/master/html) \
**Gemaakt door:** [Brecht Willems](mailto:Brecht.Willems@UGent.be)

## Turtle
De Turtle judge evalueert de uitvoer van een Python turtle programma. Het berekent de overeenkomst tussen de uitvoer van de leerling en de modeloplossing. \
**Programmeertalen:** Python (Turtle)**
**Aan de slag** [Documentatie] (https://github.com/dodona-edu/judge-turtle) \
**Gemaakt door:** [Brecht Willems](mailto:Brecht.Willems@UGent.be)

## Markdown
De markdown judge is geen echte judge omdat hij geen code evalueert.
Het geeft wel de markdown code van een leerling weer en kan handig zijn om de uitvoer handmatig te evalueren in Dodona. \
**Programmeertalen:** Markdown\
**Aan de slag** [Documentatie] (https://github.com/dodona-edu/judge-markdown) \
**Gemaakt door:** [Team dodona](mailto:dodona@ugent.be)

## Javascript
Javascript is een judge die gebruikt kan worden voor oefeningen in de javascript programmeertaal.
Het is niet gedocumenteerd en heeft veel zeer usecase-specifieke implementaties.
Als je je eigen javascript oefeningen wilt maken, raden we je aan om de [TESTed judge](#tested) te gebruiken.\
**Programmeertalen:** Javascript\
**Aan de slag** [Github repo](https://github.com/dodona-edu/judge-javascript), [examples](https://github.com/dodona-edu/example-exercises/tree/master/javascript) \
**Gemaakt door:** [Team dodona](mailto:dodona@ugent.be)

## Bash
Bash is een judge die gebruikt kan worden voor oefeningen op de bash terminal.
Het is niet gedocumenteerd en heeft veel zeer usecase-specifieke implementaties.
Als u uw eigen bash-oefeningen wilt maken, raden we u aan in plaats daarvan de [TESTed judge](#tested) te gebruiken.\
**Programmeertalen:** Bash.\
**Aan de slag** [Examples](https://github.com/dodona-edu/example-exercises/tree/master/bash), neem contact op met de makers voor meer informatie over deze judge. \
**Gemaakt door:** [Team dodona](mailto:dodona@ugent.be)

## Csharp (Deprecated)
De Csharp judge is verouderd en mag alleen gebruikt worden voor oude oefeningen.
Als u uw eigen C#-oefeningen wilt maken, raden we u aan in plaats daarvan de [TESTed judge](#tested) te gebruiken.\
**Programmeertalen:** C# \
**Aan de slag** [Voorbeelden](https://github.com/dodona-edu/example-exercises/tree/master/c%23) \
**Gemaakt door:** [Team dodona](mailto:dodona@ugent.be)

## JUnit (Deprecated)
De JUnit judge is een JUnit judge voor java8 oefeningen.
Het is verouderd en mag alleen gebruikt worden voor oude oefeningen.
Als je je eigen Java-oefeningen wilt maken, raden we je aan om in plaats daarvan de [Java judge](#java) te gebruiken. \
**Programmeertalen:** Java \
**Aan de slag** [Documentatie](https://github.com/dodona-edu/judge-java8), [voorbeelden](https://github.com/dodona-edu/example-exercises/tree/master/java) \
**Gemaakt door:** [Team dodona](mailto:dodona@ugent.be)
