---
title: Data type support
description: "The various data types supported by TESTed"
sidebarDepth: 0
---

# Data type support in TESTed

::: tip Hint
These data are sourced from the language modules in TESTed.
They contain the most up-to-date data on data type support.
:::

This reference lists which types are used in the various programming languages and how they map to the TESTed data types.

## Basic types

In the first column, we list the TESTed data type, followed by a column for each programming language.

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

¹ depending on the value  
² the built-in list type

## Advanced types

The first column shows the name of the advanced type (below the table are some definitions of these types).
The second column indicates what the basic type is of the advanced type.

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

¹ built-in tuple type

Below are some definitions of the types:

- `intN` - signed integers, at least `N` bits; e.g. `int16` must have at least 16 bits
- `uintN` - unsigned integers, at least `N` bits
- `bigint` - arbitrary precision integers
- `single_precision` - IEEE 754 single precision real number
- `double_precision` - IEEE 754 double precision real number
- `double_extended` - IEEE 754 double extended precision real number
- `fixed_precision` - fixed precision real number
- `array` - continuous piece of memory for elements of a fixed size. The difference with list is best explained in Java.
- `list` - ordered sequence of elements, where duplicates are allowed
- `tuple` - read-only, immutable list
- `char` - a single character
- `undefined` - separate from null, as in JavaScript
