---
title: Ondersteuning gegevenstypes
description: "De verschillende gegevenstypes ondersteund door TESTed"
sidebarDepth: 0
---

# Ondersteuning voor gegevenstypes in TESTed

::: tip Hint
Deze data werden verzameld van de programmeertaalmodules in TESTed.
Zij bevatten de meest recente data over de gegevenstypes.
:::

Deze referentiegids toont welke gegevenstypes in verschillende programmeertalen gebruikt worden en hoe ze overeenkomen met de gegevenstypes van TESTed.

## Basistypes

In de eerste kolom staan de gegevenstypes van TESTed, gevolgd door een kolom voor elke programmeertaal.

| TESTed   | Python  | JavaScript | Java          | Kotlin    | Haskell   | C        | Bash   |
|----------|---------|------------|---------------|-----------|-----------|----------|--------|
| integer  | `int`   | `number`   | `int`/`long`¹ | `Int`     | `Int`     | `int`    | -      |
| rational | `float` | `number`   | `double`      | `Double`  | `Double`  | `double` | -      |
| boolean  | `bool`  | `boolean`  | `boolean`     | `Boolean` | `Bool`    | `bool`   | -      |
| text     | `str`   | `String`   | `String`      | `String`  | `String`  | `char*`  | `text` |
| sequence | `list`  | `array`    | `List`        | `List`    | `[]`²     | -        | -      |
| set      | `set`   | `Set`      | `Set`         | `Set`     | -         | -        | -      |
| map      | `dict`  | `object`   | `Map`         | `Map`     | -         | -        | -      |
| nothing  | `None`  | `null`     | `null`        | `null`    | `Nothing` | `void`   | -      |

¹ afhankelijk van de waarde  
² het ingebouwde type voor lijsten

## Geavanceerde types

De eerste kolom toont de naam van het geavanceerde type (onder de tabel staan een aantal definities van deze types).
De tweede kolom toont wat het basistype van dit type is.

| TESTed           | Basic    | Python    | JavaScript  | Java         | Kotlin       | Haskell            | C                | Bash |
|------------------|----------|-----------|-------------|--------------|--------------|--------------------|------------------|------|
| int8             | integer  | +         | +           | `byte`       | `Byte`       | `Data.Int.Int8`    | +                | -    |
| uint8            | integer  | +         | +           | +            | `UByte`      | `Data.Word.Word8`  | +                | -    |
| int16            | integer  | +         | +           | `short`      | `Short`      | `Data.Int.Int16`   | `short`          | -    |
| uint16           | integer  | +         | +           | +            | `UShort`     | `Data.Word.Word16` | `unsigned short` | -    |
| int32            | integer  | +         | +           | `int`        | `Int`        | `Data.Int.Int32`   | `int`            | -    |
| uint32           | integer  | +         | +           | +            | `UInt`       | `Data.Word.Word32` | `unsigned int`   | -    |
| int64            | integer  | +         | +           | `long`       | `Long`       | `Data.Int.Int64`   | `long`           | -    |
| uint64           | integer  | +         | +           | +            | `ULong`      | `Data.Word.Word64` | `unsigned long`  | -    |
| bigint           | integer  | `int`     | `BigInt`    | `BigInteger` | `BigInteger` | `Integer`          | -                | -    |
| single_precision | rational | +         | +           | `float`      | `Float`      | `Float`            | `float`          | -    |
| double_precision | rational | +         | +           | `double`     | `Double`     | `Double`           | `double`         | -    |
| double_extended  | rational | +         | +           | +            | +            | -                  | `double double`  | -    |
| fixed_precision  | rational | `Decimal` | -           | `BigDecimal` | `BigDecimal` | -                  | -                | -    |
| array            | sequence | +         | +           | `array`      | `Array`      | -                  | -                | -    |
| list             | sequence | `List`    | +           | `List`       | `List`       | `[]`²              | -                | -    |
| tuple            | sequence | `Tuple`   | +           | +            | +            | `()`¹              | -                | -    |
| char             | text     | +         | +           | `char`       | `Char`       | `Char`             | `char`           | +    |
| undefined        | nothing  | +         | `undefined` | +            | +            | +                  | +                | -    |

¹ ingebouwd type voor tuples

Een "+" (plusteken) betekent dat de programmeertaal beperkte ondersteuning heeft (`reduced`).
Dit betekent vaak dat er geen eigen type bestaat in de programmeertaal, maar dat oefeningen die het type gebruiken wel gemaakt kunnen worden in de taal.
Een voorbeeld zijn tuples: heel wat talen hebben er geen eigen type voor, maar de oefeningen kunnen wel opgelost worden door het basistype (een `sequence`) te gebruiken.
Een oefening die tuples gebruikt zal bijvoorbeeld in Java ook oplosbaar zijn, omdat lijsten aanvaard worden.

Een "-" (minteken) betekent dat de programmeertaal geen ondersteuning heeft (`unsupported`).
Dit betekent dat een oefening die dergelijke types gebruikt niet oplosbaar zal zijn in de programmeertaal.
Zo zal JavaScript geen `fixed_precision` ondersteunen, dus oefeningen die dat nodig hebben zullen niet opgelost kunnen worden in JavaScript.

Dit zijn de definities van de types:

- `intN` - signed integers, minstens `N` bits; bv. `int16` moest minstens 16 bits hebben
- `uintN` - unsigned integers, minstens `N` bits
- `bigint` - integers van arbitraire grootte
- `single_precision` - IEEE 754 enkele precisie
- `double_precision` - IEEE 754 dubbele precisie
- `double_extended` - IEEE 754 dubbele extended precisie
- `fixed_precision` - vastekommagetal
- `array` - aaneengesloten stuk geheugen met vaste grootte voor elementen
- `list` - geordende reeks elementen, waarbij dubbels toegelaten zijn
- `tuple` - niet-wijzigbare lijst
- `char` - een enkel teken
- `undefined` - anders dan `null`, zoals in JavaScript
