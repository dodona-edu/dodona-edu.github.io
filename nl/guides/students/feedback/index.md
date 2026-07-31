---
title: "Feedback begrijpen"
description: "Referentie: statussen van oplossingen en de structuur van de feedback van de judge"
order: 5
---

# Feedback begrijpen
Op de feedbackpagina staat gedetailleerde **feedback** over een oplossing die je ingediend hebt voor een oefening. Zo snel mogelijk na het indienen wordt de oplossing automatisch beoordeeld door een judge die aan de oefening gekoppeld is. Als motivatie van zijn beoordeling voorziet de judge gedetailleerde feedback over de oplossing, die je kan gebruiken om je oplossing te corrigeren of verder te verfijnen. Deze pagina legt uit wat de verschillende statussen betekenen en hoe de gedetailleerde feedback van de judge gestructureerd is. Hoe je naar oefeningen navigeert en oplossingen indient, vind je bij [Oefeningen oplossen](../exercises/).

![Pagina met feedback over correcte oplossing](./student.exercise_feedback_correct_page.png)

## De feedbackpagina

Aan de bovenkant van de feedbackpagina staan de volgende gegevens over de oplossing:

- `Opgave`: De **naam** van de oefening waarvoor de oplossing werd ingediend. Klik op de naam om naar de oefeningpagina te navigeren.

- `Cursus`: De **naam van de cursus** waarbinnen de oplossing werd ingediend. Klik op de naam om naar de cursuspagina te navigeren. Dit informatieveld ontbreekt als de oplossing niet binnen de context van een cursus werd ingediend.

- `Ingediend`: Het **tijdstip** waarop de oplossing werd ingediend. Dit tijdstip wordt op een gebruiksvriendelijke manier weergegeven, bijvoorbeeld *ongeveer 2 uur geleden*. Als je de cursor boven het tijdstip plaatst dan krijg je de gedetailleerde weergave van het tijdstip te zien.

- `Status`: De **status** die Dodona of de judge aan de oplossing heeft toegekend. Met elke status correspondeert een **icoontje** dat in elke oplijsting van de oplossing wordt weergegeven. De betekenis van elke status vind je [hieronder](#mogelijke-statussen).

- `Samenvatting`: Korte samenvatting van het resultaat die de judge aan de oplossing heeft toegekend.

## Mogelijke statussen

Betekenis van de mogelijke statussen die aan een oplossing kunnen toegekend worden:

| status               | icoontje             | betekenis            |
|----------------------|----------------------|----------------------|
| `In de wachtrij…` | ![In de wachtrij](../../../../images/submission_icons/queued.png) | oplossing staat in de wachtrij |
| `Aan het uitvoeren...` | ![Aan het uitvoeren](../../../../images/submission_icons/running.png) | oplossing wordt momenteel beoordeeld door de judge |
| `Correct` | ![Correct](../../../../images/submission_icons/correct.png) | alle testen zijn geslaagd |
| `Fout` | ![Fout](../../../../images/submission_icons/wrong.png) | logische fout opgeworpen tijdens het uitvoeren van minstens één test |
| `Uitvoeringsfout` | ![Uitvoeringsfout](../../../../images/submission_icons/runtime_error.png) | onverwachte fout opgeworpen tijdens het uitvoeren van minstens één test |
| `Timeout` | ![Tijdslimiet overschreden](../../../../images/submission_icons/time_limit_exceeded.png) | tijdslimiet vastgelegd voor de oefening werd overschreden tijdens het testen; kan wijzen op slechte performantie of een oneindige lus. |
| `Geheugenfout` | ![Geheugenlimiet overschreden](../../../../images/submission_icons/memory_limit_exceeded.png) | geheugenlimiet vastgelegd voor de oefening werd overschreden tijdens het uitvoeren van minstens één test |
| `Compilatiefout` | ![Compilatiefout](../../../../images/submission_icons/compilation_error.png) | oplossing bevat grammaticale fouten |
| `Interne fout` | ![Interne fout](../../../../images/submission_icons/internal_error.png) | judge is gecrasht tijdens het beoordelen van de oplossing; oorzaak van fout ligt dus niet bij de oplossing maar bij het falen van de judge |

Hoe lager de status in bovenstaande tabel wordt opgelijst, hoe zwaarder het soort fout dat ermee correspondeert.

::: tip
Je indienstatus voor een oefening *binnen een cursus* (correct, deadline gemist, ...) is een ander concept: die is gebaseerd op je laatst ingediende oplossing vóór de deadline van de oefeningenreeks. Je vindt er alles over bij [Cursussen op Dodona](../courses/#indienstatus).
:::

## Feedbacktabs

Onder de korte samenvatting staat meer gedetailleerde feedback die de judge kan uitgesplitst hebben over meerdere *tabs*. Naast de naam van een tab kan aan de rechterkant een *badge* staan met daarin een getal. Het getal geeft aan hoeveel fouten de judge gevonden heeft bij het uitvoeren van de testen waarover hij rapporteert onder de tab.

![Feedback over foute oplossing](./student.exercise_feedback_incorrect_tab.png)

De laatste tab heeft altijd de naam `Code` en bevat de broncode van de oplossing. Op bepaalde plaatsen in de broncode kan de judge opmerkingen toegevoegd hebben (bijvoorbeeld over de programmeerstijl) die ook kunnen motiveren waarom hij een bepaalde status aan de oplossing toegekend heeft.

![Voorbeeld van een linter-fout](./student.exercise_lint_error.png)

::: tip Tip

In de tab `Code` op de feedbackpagina kan je de broncode van de oplossing niet wijzigen. Je moet hiervoor op de bewerkknop klikken in de rechterbovenhoek van de feedbackpagina. De broncode van de oplossing waar je op dat moment naar kijkt wordt dan ingeladen in de editor. Daar kan je de broncode bewerken en daarna eventueel opnieuw indienen.
:::

## Testen, testgevallen en contexten

Per tab rapporteert de judge over individuele **testen** waaraan hij de broncode onderworpen heeft. Daarbij worden gerelateerde testen gegroepeerd in een **testgeval** en worden testgevallen die van elkaar afhankelijk zijn gegroepeerd in een **context**.

![Feedback over correcte oplossing](../exercises/student.exercise_feedback_correct_tab.png)

Visueel worden alle testgevallen van een context met elkaar verbonden via een dunne verticale lijn aan de linkerkant. De kleur van die lijn geeft aan of de judge de volledige context beoordeelt als geslaagd (groene lijn) of als niet geslaagd (rode lijn).

Aan de rechterkant van de dunne verticale lijn worden de testgevallen van de context onder elkaar weergegeven. De beschrijving van een testgeval wordt weergegeven binnen een rechthoek met lichtgrijze achtergrondkleur die over de volledige breedte loopt. In de rechterbovenhoek van die rechthoek staat een gekleurd symbool dat aangeeft of de judge het volledige testgeval beoordeelt als geslaagd (groen vinkje) of als niet geslaagd (rood kruisje).

Als de judge binnen een testgeval rapporteert over individuele testen, dan worden die opgelijst onder de rechthoek met lichtgrijze achtergrond waarin de beschrijving van het testgeval staat. Om visueel onderscheid te maken met de weergave van het testgeval, wordt elke test weergegeven met een kleine marge links en rechts. De weergave van een test bestaat zelf uit de volgende optionele componenten die onder elkaar worden weergegeven:

-   Een beschrijving van de uitgevoerde test. Deze beschrijving wordt weergegeven binnen een rechthoek met dezelfde lichtgrijze achtergrondkleur als bij de beschrijving van een testgeval.

-   Een tekstuele vergelijking tussen een verwachte waarde en een waarde die gegenereerd werd aan de hand van de oplossing. Als minstens één van beide waarden uit meerdere regels bestaat, dan worden de overeenkomstige regels tegenover elkaar uitgelijnd. Identieke overeenkomstige regels worden weergegeven met een transparante achtergrondkleur. Als overeenkomstige regels van elkaar verschillen dan worden ze weergegeven met een lichtgekleurde achtergrondkleur (groen voor de verwachte waarde en rood voor de gegenereerde waarde). Individuele karakters die verschillen binnen overeenkomstige regels worden weergegeven met een donkerder achtergrondkleur (groen voor de verwachte waarde en rood voor de gegenereerde waarde).

-   Algemene feedback over de uitgevoerde test. Voor deze feedback heeft de judge alle vrijheid wat betreft de vormgeving, waardoor hij zowel tekstuele als grafische feedback kan aanleveren.
    ![Feedback tabblad](./student.exercise_feedback_incorrect_tab.png)

    ![Visuele feedback gemaximaliseerd](./student.exercise_feedback_visual.nl.png)
