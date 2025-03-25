---
title: Data type support
description: "The various data types supported by TESTed"
order: 4
---
# Data type support

This reference gives an overview of all TESTed data types (basic and advanced)
and how they map to the data types in the programming languages that are currently supported by TESTed.

## Basic types

Basic types represent abstract data types such as integers,
not specific implementations thereof like unsigned 8-bit integers.
They are used as the default data type for a concept in a specific programming language,
but each programming language can have multiple data types for one basic type.

TESTed supports the following basic types:

- `integer`: an integer
- `real`: a real number
- `boolean`: a Boolean value
- `text`: textual data (e.g. strings)
- `sequence`: an ordered sequence of values
- `set`: an unordered collection of unique values
- `map`: a collection of key-value pairs
- `nothing`: a representation of "nothing", meaning no value
- `any`: any data type. **Note**: You cannot use this type in test suites. It is only used to indicate unknown types of return values.

The following table gives an overview of basic types supported by TESTed.
The first column contains all basic types,
and the other columns contain the mapping to the data types of the programming languages currently supported by TESTed.

| TESTed   | Python  | JavaScript | Java          | Kotlin    | Haskell   | C        | Bash   | C++             |
|----------|---------|------------|---------------|-----------|-----------|----------|--------|-----------------|
| integer  | `int`   | `number`   | `int`/`long`¹ | `Int`     | `Int`     | `int`    | -      | `std::intmax_t` |
| real     | `float` | `number`   | `double`      | `Double`  | `Double`  | `double` | -      | `double`        |
| boolean  | `bool`  | `boolean`  | `boolean`     | `Boolean` | `Bool`    | `bool`   | -      | `bool`          |
| text     | `str`   | `String`   | `String`      | `String`  | `String`  | `char*`  | `text` | `std::string`   |
| sequence | `list`  | `array`    | `List`        | `List`    | `[]`²     | -        | -      | `std::vector`   |
| set      | `set`   | `Set`      | `Set`         | `Set`     | -         | -        | -      | `std::set`      |
| map      | `dict`  | `object`   | `Map`         | `Map`     | -         | -        | -      | `std::map`      |
| nothing  | `None`  | `null`     | `null`        | `null`    | `Nothing` | `void`   | -      | `void`          |

¹ depending on the value  
² the built-in list type

## Advanced types

Advanced types represent specific implementations of data types, like unsigned 8-bit integers.
Each advanced type corresponds to at most one data type in a programming language,
and some programming languages will not have support for specific implementations.

Currently, the following types are supported by TESTed:

- `int8`: 8-bit integers (signed)
- `uint8`: 8-bit natural numbers (unsigned)
- `int16`: 16-bit integers (signed)
- `uint16`: 16-bit natural numbers (unsigned)
- `int32`: 32-bit integers (signed)
- `uint32`: 32-bit natural numbers (unsigned)
- `int64`: 64-bit integers (signed)
- `uint64`: 64-bit natural numbers (unsigned)
- `bigint`: integers without upper and lower limit (signed)
- `single_precision` - IEEE 754 single precision real number
- `double_precision` - IEEE 754 double precision real number
- `double_extended` - IEEE 754 double extended precision real number
- `fixed_precision` - fixed precision real number
- `array`: a mutable fixed-size sequence
- `list`: a mutable variable-size sequence
- `tuple`: an immutable sequence
- `char`: a single character
- `undefined`: used for languages that make a distinction between `null` (with basic type nothing) and `undefined`, as in JavaScript

The following table gives an overview of advanced types supported by TESTed.
The first column contains all advanced types,
and the second column contains their corresponding basic type.
The other columns contain the mapping to the data types of the programming languages currently supported by TESTed.
An explanation of the symbols used in the table follows after the table itself.

| TESTed           | Basic    | Python    | JavaScript  | Java         | Kotlin       | Haskell            | C                | Bash | C++             |
|------------------|----------|-----------|-------------|--------------|--------------|--------------------|------------------|------|-----------------|
| int8             | integer  | +         | +           | `byte`       | `Byte`       | `Data.Int.Int8`    | +                | -    | `std::int8_t`   |
| uint8            | integer  | +         | +           | +            | `UByte`      | `Data.Word.Word8`  | +                | -    | `std::uint8_t`  |
| int16            | integer  | +         | +           | `short`      | `Short`      | `Data.Int.Int16`   | `short`          | -    | `std::int16_t`  |
| uint16           | integer  | +         | +           | +            | `UShort`     | `Data.Word.Word16` | `unsigned short` | -    | `std::uint16_t` |
| int32            | integer  | +         | +           | `int`        | `Int`        | `Data.Int.Int32`   | `int`            | -    | `std::int32_t`  |
| uint32           | integer  | +         | +           | +            | `UInt`       | `Data.Word.Word32` | `unsigned int`   | -    | `std::uint32_t` |
| int64            | integer  | +         | +           | `long`       | `Long`       | `Data.Int.Int64`   | `long`           | -    | `std::int64_t`  |
| uint64           | integer  | +         | +           | +            | `ULong`      | `Data.Word.Word64` | `unsigned long`  | -    | `std::uint64_t` |
| bigint           | integer  | `int`     | `BigInt`    | `BigInteger` | `BigInteger` | `Integer`          | -                | -    | `std::intmax_t` |
| single_precision | real     | +         | +           | `float`      | `Float`      | `Float`            | `float`          | -    | `float`         |
| double_precision | real     | +         | +           | `double`     | `Double`     | `Double`           | `double`         | -    | `double`        |
| double_extended  | real     | +         | +           | +            | +            | -                  | `double double`  | -    | `long double`   |
| fixed_precision  | rational | `Decimal` | -           | `BigDecimal` | `BigDecimal` | -                  | -                | -    | -               |
| array            | sequence | +         | +           | `array`      | `Array`      | -                  | -                | -    | `std::vector`   |
| list             | sequence | `List`    | +           | `List`       | `List`       | `[]`²              | -                | -    | `std::list`     |
| tuple            | sequence | `Tuple`   | +           | +            | +            | `()`¹              | -                | -    | `std::tuple`    |
| char             | text     | +         | +           | `char`       | `Char`       | `Char`             | `char`           | +    | `char`          |
| undefined        | nothing  | +         | `undefined` | +            | +            | +                  | +                | -    | +               |

¹ built-in tuple type  
² built-in list type

A plus sign (+) indicates that the programming language has **limited support** (`reduced`) for the data type.
This often means that the programming language does not support a separate data type,
but exercises using this type can still be solved in that language by using the basic type as a fallback.
Let's use tuples as an example.
Many programming languages do not have direct support for tuples,
but exercises using tuples can still be solved by using the corresponding basic type (sequence).
For example, an exercise using a `tuple` can be solved in Java by using a `List`.

A minus sign (-) means that the programming language has **no support** (`unsupported`) for the data type.
This means that exercises using a data type that is not supported in a programming language, can not be solved in that language.
For example, exercises using a fixed precision type can not be solved in JavaScript that does not support this data type.
