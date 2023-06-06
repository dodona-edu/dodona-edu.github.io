---
title: Ondersteuning gegevenstypes
description: "De verschillende gegevenstypes ondersteund door TESTed"
order: 5
---

# Ondersteuning voor gegevenstypes

Deze referentie geeft een overzicht van alle gegevenstypes in TESTed (basistypes en geavanceerde types).
Ze legt ook uit hoe de verschillende types zich vertalen naar de programmeertalen die momenteel door TESTed ondersteund worden.

## Basistypes

Basistypes stellen abstracte gegevenstypes voor, zoals integers, maar niet specifieke implementaties ervan, zoals een _unsigned 8-bit integer_.
Ze worden gebruikt als het standaardtype voor een concept in een programmeertaal, maar elke programmeertaal kan meerdere types hebben voor eenzelde basistype.

TESTed supports the following basic types:

- `integer`: een integer
- `real`: een reëel getal number
- `boolean`: een Booleaanse waarde
- `text`: tekstuele gegevens (bv. strings)
- `sequence`: een geordende reeks waarden
- `set`: een ongeordende verzameling unieke waarden
- `map`: een verzameling van sleutel-waardeparen
- `nothing`: een voorstelling voor "niets", dus geen waarde
- `any`: eender welk gegevenstype. **Opmerking**: u kunt dit niet gebruiken in testplannen. Het wordt enkel gebruikt om onbekende returnwaarden aan te duiden.

Onderstaande tabel geeft een overzicht van alle basistypes die ondersteund worden door TESTed.
In de eerste kolom staan de gegevenstypes van TESTed, gevolgd door een kolom voor elke programmeertaal.

| TESTed   | Python  | JavaScript | Java          | Kotlin    | Haskell   | C        | Bash   |
|----------|---------|------------|---------------|-----------|-----------|----------|--------|
| integer  | `int`   | `number`   | `int`/`long`¹ | `Int`     | `Int`     | `int`    | -      |
| real     | `float` | `number`   | `double`      | `Double`  | `Double`  | `double` | -      |
| boolean  | `bool`  | `boolean`  | `boolean`     | `Boolean` | `Bool`    | `bool`   | -      |
| text     | `str`   | `String`   | `String`      | `String`  | `String`  | `char*`  | `text` |
| sequence | `list`  | `array`    | `List`        | `List`    | `[]`²     | -        | -      |
| set      | `set`   | `Set`      | `Set`         | `Set`     | -         | -        | -      |
| map      | `dict`  | `object`   | `Map`         | `Map`     | -         | -        | -      |
| nothing  | `None`  | `null`     | `null`        | `null`    | `Nothing` | `void`   | -      |

¹ afhankelijk van de waarde  
² het ingebouwde type voor lijsten

## Geavanceerde types

Geavanceerde types stellen specifieke implementaties van gegevenstypes voor, zoals een _unsigned 8-bit integer_.
Elk geavanceerd type komt overeen met hoogstens één type in een programmeertaal, en sommige programmeertalen hebben geen ondersteuning voor bepaalde types.

Momenteel ondersteunt TESTed volgende types:

- `int8`: 8-bit integers (signed)
- `uint8`: 8-bit natuurlijke getallen (unsigned)
- `int16`: 16-bit integers (signed)
- `uint16`: 16-bit natuurlijke getallen (unsigned)
- `int32`: 32-bit integers (signed)
- `uint32`: 32-bit natuurlijke getallen (unsigned)
- `int64`: 64-bit integers (signed)
- `uint64`: 64-bit natuurlijke getallen (unsigned)
- `bigint`: integers zonder onder- en bovengrens (signed)
- `single_precision` - IEEE 754 enkele precisie zwevendekommagetal
- `double_precision` - IEEE 754 dubbele precisie zwevendekommagetal
- `double_extended` - IEEE 754 "double extended" precisie zwevendekommagetal
- `fixed_precision` - vastekommagetal
- `array`: een _mutable_ reeks met vaste grootte
- `list`: een _mutable_ reeks met veranderlijke grootte
- `tuple`: een _immutable_ reeks
- `char`: één teken
- `undefined`: gebruikt voor talen die een verschil hebben tussen `null` en `undefined`, zoals in JavaScript

Onderstaande tabel geeft een overzicht van alle geavanceerde types die ondersteund worden door TESTed.
De eerste kolom bevat alle geavanceerde types, de tweede kolom toont wat het basistype van dit type is.
De andere kolommen tonen de overeenkomstige types in de verschillende programmeertalen.
De uitleg over de gebruikte symbolen in deze kolommen staat onder de tabel.

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
| single_precision | real     | +         | +           | `float`      | `Float`      | `Float`            | `float`          | -    |
| double_precision | real     | +         | +           | `double`     | `Double`     | `Double`           | `double`         | -    |
| double_extended  | real     | +         | +           | +            | +            | -                  | `double double`  | -    |
| fixed_precision  | rational | `Decimal` | -           | `BigDecimal` | `BigDecimal` | -                  | -                | -    |
| array            | sequence | +         | +           | `array`      | `Array`      | -                  | -                | -    |
| list             | sequence | `List`    | +           | `List`       | `List`       | `[]`²              | -                | -    |
| tuple            | sequence | `Tuple`   | +           | +            | +            | `()`¹              | -                | -    |
| char             | text     | +         | +           | `char`       | `Char`       | `Char`             | `char`           | +    |
| undefined        | nothing  | +         | `undefined` | +            | +            | +                  | +                | -    |

¹ ingebouwd type voor tuple  
² ingebouwd type voor list

Een plusteken (+) betekent dat de programmeertaal **beperkte ondersteuning** heeft voor het gegevenstype.
Dit betekent vaak dat er geen eigen type bestaat in de programmeertaal, maar dat oefeningen die het type gebruiken wel opgelost kunnen worden in de taal, doordat TESTed terugvalt op het basistype.
Laten we tuples als voorbeeld nemen.
Veel programmeertalen hebben geen rechtstreekse ondersteuning voor types, maar oefeningen die ervan gebruik maken kunnen opgelost worden voor het basistype (`sequence`) te gebruiken.
Een oefening met tuples kan in Java bijvoorbeeld opgelost worden door `List` te gebruiken.

Een minteken (-) betekent dat de programmeertaal **geen ondersteuning** heeft voor het type.
Dit betekent dat oefeningen die dergelijke types gebruikt niet oplosbaar zullen zijn in die programmeertaal.
Zo zal een oefening die vastekommagetallen gebruikt niet oplosbaar zijn in JavaScript.
