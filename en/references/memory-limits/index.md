---
title: Memory limits
description: "How Dodona determines the memory limit of an evaluation"
order: 7
---

# Memory limits

Every submission on Dodona is evaluated in a container with a memory limit. This page explains how Dodona determines that limit, how much memory each judge really needs, and why setting a limit below the default causes problems that are very hard to recognise.

The `memory_limit` key itself is documented in the [exercise config reference](/en/references/exercise-config/).

::: tip In short
You almost never need to set `memory_limit`. The default already covers every judge on Dodona. If your exercise sets a value that is lower than the default, remove it.
:::

## How the limit is determined

Dodona builds the memory limit in layers. Each layer overrides the previous one:

1. **The base default of Dodona**: 256 MB.
2. **The value of the judge**, if the judge sets one.
3. **The `dirconfig.json` files** of your repository, from the root of the repository down to the directory of the exercise.
4. **The `config.json` of the exercise** itself.

The resulting value is clamped between 10 MB and 1000 MB. A value outside that range is replaced by the nearest bound.

## The limits that apply today

Most judges do not set a memory limit and use the base default. These judges set their own value:

| Judge | Memory limit |
| --- | --- |
| Haskell | 512 MB |
| Scheme | 512 MB |
| R | 256 MB |
| TESTed | 512 MB, except 750 MB for Kotlin and 1000 MB for Haskell |
| every other judge | 256 MB (the base default) |

## How much memory a judge needs

The table below lists what one evaluation actually uses. Each number is the peak memory of a single evaluation on a production worker, measured in the worst case where the files of the judge were not already in memory.

| Judge | Peak memory |
| --- | --- |
| Python (`judge-pythia`) | 50 MB |
| Bash | 29 MB |
| HTML | 46 MB |
| Prolog | 52 MB |
| SQL | 133 MB |
| Java | more than 100 MB |
| C# | 162 MB |
| R | 155 MB |
| Scheme | 220 MB |
| Haskell | 250 MB |

Exercises that use TESTed need somewhat more, because TESTed generates and compiles test code:

| Programming language in TESTed | Peak memory |
| --- | --- |
| Python | 105 MB |
| C# | 215 MB |
| C++ | 300 MB |
| Kotlin | 433 MB |

Every one of these values is comfortably below the limit that applies to it. For a normal exercise you therefore do not need to set anything.

## Why a lower limit is unreliable

The limit covers everything the evaluation reads, not just the program of your student. Starting a judge means loading the runtime of the programming language, so the compiler, the interpreter and the standard library, plus the judge itself. All of that counts against the same limit. In practice, an evaluation needs about two to three times as much memory as the code of the student uses on its own.

When the total does not fit inside the limit, the evaluation is usually **not** stopped with an error. The system throws out the files of the judge to make room, and then has to read those same files back from disk, over and over. The student still gets the correct verdict, but the evaluation takes three to twenty times longer, and nothing in the feedback mentions the memory limit.

Whether this happens also depends on what the worker machine was doing just before. If another student recently submitted a solution for the same judge, the files of that judge are still in memory and the evaluation is fast. If not, the evaluation is slow. The same exercise with the same solution can therefore be fast for one student and slow for another.

These are measurements of correct solutions that only differ in their memory limit:

* A correct Haskell solution took 50 seconds at 100 MB and ran into the time limit. At 500 MB the same solution took 3.7 seconds.
* A Java `hello world` took 20.3 seconds at 100 MB on a worker that had not run Java recently, and 6.3 seconds on a worker that had.
* A Kotlin exercise on TESTed took 108 seconds at 300 MB and 13 seconds at 500 MB.

::: warning A limit that is too low can also break the feedback
In one of the Haskell evaluations at 100 MB, the output of the judge was truncated without any error. The student saw an incomplete feedback table and got no explanation for it.
:::

## Can I use the memory limit to test memory efficiency?

No. The memory limit does not measure how efficiently your student wrote their solution.

The limit is dominated by the runtime of the programming language, not by the data of the student. For most judges, the compiler, the interpreter and the standard library account for the majority of the memory that is used, so the difference between an efficient and an inefficient solution disappears in the noise. On top of that, the result depends on the state of the worker: the same solution passes or fails depending on which exercises other students happened to submit just before.

What does work:

* **Test the efficiency in your test suite.** If your exercise is about efficiency, then test that explicitly, for example by testing the solution on a large input and checking the result of that. That gives your student a clear message instead of a slow evaluation.

## When you do need a higher limit

Raising the limit is the right choice if your exercise genuinely needs more memory than the judge provides by default, for example because the evaluation loads a large data set. You set the limit in bytes in the `config.json` of the exercise:

```json
{
  "evaluation": {
    "memory_limit": 750000000
  }
}
```

The maximum is 1000 MB. Keep in mind that a worker runs several evaluations at the same time, so a high limit is not free: it reduces the number of submissions Dodona can evaluate at the same time. Only raise the limit for the exercises that need it, not for a whole repository.

## We are removing limits that are too low

The base default used to be lower, and the examples in our documentation used to contain an explicit `memory_limit`. Because of that, a lot of exercises copied a value that is below what their judge needs. Dodona is now removing those explicit limits from the affected repositories, because the default already covers every judge.

If you did not deliberately choose a value, you do not need a `memory_limit` in your config. If you did deliberately choose a value because your exercise needs more memory, that value stays.

Do you have questions about the memory limit of one of your exercises? Feel free to contact us at <a href="mailto:support@dodona.be">support@dodona.be</a>.
