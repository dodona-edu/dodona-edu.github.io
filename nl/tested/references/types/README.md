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
| int8             | integer  | -         | -           | `byte`       | `Byte`       | `Data.Int.Int8`    | `signed char`    | -    |
| uint8            | integer  | -         | -           | -            | `UByte`      | `Data.Word.Word8`  | `unsigned char`  | -    |
| int16            | integer  | -         | -           | `short`      | `Short`      | `Data.Int.Int16`   | `short`          | -    |
| uint16           | integer  | -         | -           | -            | `UShort`     | `Data.Word.Word16` | `unsigned short` | -    |
| int32            | integer  | -         | -           | `int`        | `Int`        | `Data.Int.Int32`   | `int`            | -    |
| uint32           | integer  | -         | -           | -            | `UInt`       | `Data.Word.Word32` | `unsigned int`   | -    |
| int64            | integer  | -         | -           | `long`       | `Long`       | `Data.Int.Int64`   | `long`           | -    |
| uint64           | integer  | -         | -           | -            | `ULong`      | `Data.Word.Word64` | `unsigned long`  | -    |
| bigint           | integer  | -         | -           | `BigInteger` | `BigInteger` | -                  | -                | -    |
| single_precision | rational | -         | -           | `float`      | `Float`      | `Float`            | `float`          | -    |
| double_precision | rational | -         | -           | `double`     | `Double`     | `Double`           | `double`         | -    |
| double_extended  | rational | -         | -           | -            | -            | -                  | `double double`  | -    |
| fixed_precision  | rational | `Decimal` | -           | `BigDecimal` | `BigDecimal` | `Decimal`          | -                | -    |
| array            | sequence | -         | -           | `array`      | `Array`      | -                  | -                | -    |
| list             | sequence | `List`    | -           | `List`       | `List`       | `                  | -                | -    |
| tuple            | sequence | `Tuple`   | -           | -            | -            | `()`¹              | -                | -    |
| char             | text     | -         | -           | `char`       | `Char`       | `Char`             | `char`           | -    |
| undefined        | nothing  | -         | `undefined` | -            | -            | -                  | -                | -    |

¹ ingebouwd type voor tuples

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
