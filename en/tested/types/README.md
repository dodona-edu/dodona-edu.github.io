---
title: Data type support
description: "The various data types supported by TESTed"
---

# Data type support in TESTed

::: tip Up-to-date information
These data are sourced from the language modules in TESTed.
They contain the most up-to-date information on data type support.
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

¹ built-in tuple type  
² built-in list type

A "+" (plus sign) indicates that the programming language has limited supported (`reduced`).
This often means there is no distinct type available in the language, but exercises using this type can still be solved in that language.
An example is tuples: multiple languages have no tuple type, but exercises using tuples can still be solved by using the basic type (`sequence`).
For example, an exercise using tuples will be solvable in Java by using a list.

A "-" (minus sign) means that the programming language has no support (`unsupported`).
This means exercises using those types will not be solvable in the programming language.
For example, JavaScript does not support `fixed precision`,
meaning exercises using this type will not be solvable in JavaScript.

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
