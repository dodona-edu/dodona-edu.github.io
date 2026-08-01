---
title: TESTed-judge
description: "De TESTed-judge"
order: 5
---

# TESTed: one judge to rule them all

::: tip
Dit is de uitgebreide documentatie voor de TESTed-judge. Een handleiding die gericht is op leerkrachten die voor het eerst een oefening opstellen is beschikbaar in [deze handleiding](/nl/guides/exercises/).
:::

TESTed is een *educational software testing framework* (ook bekend als een *judge*) dat toelaat om oplossingen voor programmeeroefeningen te beoordelen op basis van een programmeertaalonafhankelijk testplan.
Het laat om de softwarevereisten (d.w.z. de testen) voor een oefening één keer op te stellen, terwijl oplossingen in verschillende programmeertalen beoordeeld kunnen worden.
TESTed kan als afzonderlijk tool gebruikt worden, maar is ook geïntegreerd in de elektronische leeromgeving [Dodona](https://dodona.be).

## Wanneer gebruik je TESTed?

In de eerste plaats moet TESTed de programmeertaal die u wilt gebruiken ondersteunen.
Momenteel zijn dat volgende programmeertalen:

* Bash
* C (gcc)
* C# (.NET)
* C++ (g++)
* Haskell (ghc)
* Java
* JavaScript (NodeJS)
* Kotlin
* Python
* TypeScript (NodeJS)

Voor Haskell biedt TESTed ook de variant `runhaskell` aan, die ingediende oplossingen interpreteert met `runhaskell` in plaats van ze te compileren met `ghc`.

Doordat de programmeeroefeningen die beoordeeld worden met TESTed programmeertaalonafhankelijk zijn, is TESTed het best geschikt voor volgende soorten oefeningen:

- Oefeningen op generieke concepten die in (bijna) alle programmeertalen voorkomen.
- Oefeningen waarbij de nadruk ligt op algoritmen of programmeerconcepten op hoog niveau, niet op specifieke syntaxis of constructies van bepaalde programmeertalen.

TESTed is dus minder geschikt voor oefeningen met een focus op programmeertaalspecifieke concepten of syntaxis.
Zo zal een oefening over pointers in C niet goed werken met TESTed.

## TESTed in een notendop

Beschouw een oefening "echo" met de volgende opgave:

> Schrijf een functie `echo` die steeds haar argument naar standaarduitvoer schrijft.

Eén testplan volstaat om oplossingen in elke ondersteunde programmeertaal te testen:

```yaml
- tab: "Echo"
  testcases:
     - expression: "echo('input-1')"
       stdout: "input-1"
```

Hier zijn een aantal correcte oplossingen voor deze oefening in een handvol programmeertalen:

::: code-group

```bash [Bash]
function echo {
    echo "$1"
}
```

```c [C]
#include <stdio.h>

void echo(char* wat) {
    printf("%s", wat);
}
```

```cpp [C++]
#include <iostream>

void echo(std::string wat) {
    std::cout << wat;
}
```

```haskell [Haskell]
echo = putStrLn
```

```java [Java]
class Submission {
    public static void echo(String wat) {
        System.out.println(wat);
    }
}
```

```javascript [JavaScript]
function echo(wat) {
  console.log(wat);
}
```

```kotlin [Kotlin]
fun echo(wat: String) {
    println(wat)
}
```

```python [Python]
def echo(argument):
    print(argument)
```

```csharp [C#]
using System;

class Submission
{
    public static void Echo(string content)
    {
        Console.WriteLine(content);
    }
}
```

:::

## Van start gaan

Een stapsgewijze handleiding voor het opstellen van TESTed-oefeningen voor Dodona, van het opzetten van een repository tot het schrijven van testplannen, is beschikbaar in de [handleiding oefeningen opstellen](/nl/guides/exercises/creating-exercises/introduction/).
Als u TESTed wenst te gebruiken buiten Dodona, raden we aan [deze handleiding](https://github.com/dodona-edu/universal-judge) te volgen.

Een aantal technische specificaties zijn ook beschikbaar:

- [Configuratie-opties](/nl/references/tested/exercise-config)
- [Referentie voor DSL-testplannen](/nl/references/tested/dsl) (aanbevolen)
- [Referentie voor geavanceerde testplannen](/nl/references/tested/json) (niet aanbevolen voor algemeen gebruik)
- [Gegevenstypes voor programmeertalen](/nl/references/tested/types)

Nuttige handleidingen als u aan TESTed zelf wilt werken:

- De [installatie-instructies](https://github.com/dodona-edu/universal-judge) in om TESTed lokaal uit te voeren.
- Een [handleiding over het toevoegen van een programmeertaal](/nl/references/tested/new-programming-language) (enkel in het Engels).
