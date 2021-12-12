<div align="center">

![Sapphire Logo](https://cdn.skyra.pw/gh-assets/sapphire-banner.png)

# @sapphire/shapeshift

**ShapeShift.**

A very fast input-validation and transformer library.

[![GitHub](https://img.shields.io/github/license/sapphiredev/shapeshift)](https://github.com/sapphiredev/shapeshift/blob/main/LICENSE.md)
[![codecov](https://codecov.io/gh/sapphiredev/sapphire-shapeshift/branch/main/graph/badge.svg?token=0MSAyoZNxz)](https://codecov.io/gh/sapphiredev/shapeshift)
[![npm](https://img.shields.io/npm/v/@sapphire/shapeshift?color=crimson&logo=npm&style=flat-square)](https://www.npmjs.com/package/@sapphire/shapeshift)

</div>

# TODO

1. Find and replace all instances of `shapeshift` once we come up with a name
1. Ensure the primary branch is called `main`
1. Ensure branch protection is on
1. Disable `Packages` from being included in the repository homepage
1. Enable Codecov for the repository
1. Remove `--dry-run` from line 47 in [`continuous-delivery.yml`](.github/workflows/continuous-delivery.yml) to enable publishing to NPM
1. Remove this section from the README

## Description

Ever need the performance of very fast input-validation libraries such as [ts-json-validator](https://www.npmjs.com/package/ts-json-validator) with the powerful API of [zod](https://www.npmjs.com/package/zod)? ShapeShift got you covered!

> **Note**: ShapeShift requires Node.js v15.0.0 or higher to work.

### Basic usage

Creating a simple string schema

```typescript
import { s } from '@sapphire/shapeshift';

const mySchema = s.string;

// Parse
mySchema.parse('sapphire'); // => returns 'sapphire'
mySchema.parse(12); // throws ValidationError
```

Creating an object schema

```typescript
import { s } from '@sapphire/shapeshift';

const user = s.object({
	username: s.string
});

user.parse({ username: 'Sapphire' });
```

### Defining schemas

#### Primitives

```typescript
import { s } from '@sapphire/shapeshift';

// Primitives
s.string;
s.number;
s.bigint;
s.boolean;
s.date;

// Empty Types
s.undefined
s.null;
s.nullish; // Accepts undefined | null

// Catch-all Types
s.any;
s.unknown

// Never Type
s.never;
```

#### Literals

```typescript
s.literal('sapphire');
s.literal(12);
s.literal(420n);
s.literal(true);
s.literal(new Date(1639278160000)); // s.date.eq(1639278160000);
```

#### Strings

ShapeShift includes a handful of string-specific validations:

```typescript
s.string.lengthLt(5);
s.string.lengthLe(5);
s.string.lengthGt(5);
s.string.lengthGe(5);
s.string.lengthEq(5);
s.string.lengthNe(5);
s.string.url;          // TODO
s.string.uuid;         // TODO
s.string.regex(regex); // TODO
```

#### Numbers

ShapeShift includes a handful of number-specific validations:

```typescript
s.number.gt(5); // > 5
s.number.ge(5); // >= 5
s.number.lt(5); // < 5
s.number.le(5); // <= 5
s.number.eq(5); // === 5
s.number.ne(5); // !== 5

s.number.eq(NaN); // special case: Number.isNaN
s.number.ne(NaN); // special case: !Number.isNaN

s.number.int;     // value must be an integer
s.number.safeInt; // value must be a safe integer
s.number.finite;  // value must be finite

s.number.positive; // .ge(0)
s.number.negative; // .lt(0)

s.number.divisibleBy(5); // TODO | Divisible by 5
```

And transformations:

```typescript
s.number.abs;  // TODO | Transforms the number to an absolute number
s.number.sign; // TODO | Gets the number's sign

s.number.trunc;  // TODO | Transforms the number to the result of Math.trunc`
s.number.floor;  // TODO | Transforms the number to the result of Math.floor`
s.number.fround; // TODO | Transforms the number to the result of Math.fround`
s.number.round;  // TODO | Transforms the number to the result of Math.round`
s.number.ceil;   // TODO | Transforms the number to the result of Math.ceil`
```

#### BigInts

ShapeShift includes a handful of number-specific validations:

```typescript
s.bigint.gt(5n); // > 5n
s.bigint.ge(5n); // >= 5n
s.bigint.lt(5n); // < 5n
s.bigint.le(5n); // <= 5n
s.bigint.eq(5n); // === 5n
s.bigint.ne(5n); // !== 5n

s.bigint.positive; // .ge(0n)
s.bigint.negative; // .lt(0n)

s.bigint.divisibleBy(5n); // TODO | Divisible by 5n
```

And transformations:

```typescript
s.bigint.abs;  // TODO | Transforms the bigint to an absolute bigint

s.bigint.intN(5);  // TODO | Clamps to a bigint to a signed bigint with 5 digits, see BigInt.asIntN
s.bigint.uintN(5); // TODO | Clamps to a bigint to an unsigned bigint with 5 digits, see BigInt.asUintN
```

#### Booleans

ShapeShift includes a few boolean-specific validations:

```typescript
s.boolean.true; // value must be true
s.boolean.false; // value must be false

s.boolean.eq(true);  // s.boolean.true
s.boolean.eq(false); // s.boolean.false

s.boolean.ne(true);  // s.boolean.false
s.boolean.ne(false); // s.boolean.true
```

#### Arrays

```typescript
const stringArray = s.array(s.string);
const stringArray = s.string.array;
```

ShapeShift includes a handful of string-specific validations:

```typescript
s.string.array.lengthLt(5); // Must have less than 5 elements
s.string.array.lengthLe(5); // Must have 5 or less elements
s.string.array.lengthGt(5); // Must have more than 5 elements
s.string.array.lengthGe(5); // Must have 5 or more elements
s.string.array.lengthEq(5); // Must have exactly 5 elements
s.string.array.lengthNe(5); // Must not have exactly 5 elements
```

> **Note**: `.lengthGt` and `.lengthGe` are overloaded and change the inferred type from 1 to 10. For example, `s.string.array.lengthGe(2)`'s inferred type is `[string, string, ...string[]]` // TODO

#### Tuples // TODO

Unlike arrays, tuples have a fixed number of elements and each element can have a different type:

```typescript
const dish = s.tuple([
	s.string,     // Dish's name
	s.number.int, // Table's number
	s.date        // Date the dish was ready for delivery
]);

dish.parse(['Iberian ham', 10, new Date()]);
```

#### Objects

```typescript
// Properties are required by default:
const animal = s.object({ // TODO
	name: s.string,
	age: s.number
});
```

##### `.extend`:

You can add additional fields using either an object or an ObjectValidator, in this case, you will get a new object validator with the merged properties:

```typescript
const pet = animal.extend({ // TODO
	owner: s.string.nullish
});

const pet = animal.extend(s.object({ // TODO
	owner: s.string.nullish
}));
```

> If both schemas share keys, an error will be thrown. Please use `.omit` on the first object if you desire this behavior.

##### `.pick` / `.omit`:

Inspired by TypeScript's built-in `Pick` and `Omit` utility types, all object schemas have the aforementioned methods that return a modifier version:

```typescript
const pkg = s.object({
	name: s.string,
	description: s.string,
	dependencies: s.string.array
});

const justTheName = pkg.pick(['name']); // TODO
// s.object({ name: s.string });

const noDependencies = pkg.omit(['dependencies']); // TODO
// s.object({ name: s.string, description: s.string });
```

##### `.partial`

Inspired by TypeScript's built-in `Partial` utility type, all object schemas have the aforementioned method that makes all properties optional:

```typescript
const user = s.object({
	username: s.string,
	password: s.string
}).partial();
```

Which is the same as doing:

```typescript
const user = s.object({
	username: s.string.optional,
	password: s.string.optional
});
```

#### Unrecognized keys

By default, ShapeShift will not include keys that are not defined by the schema during parsing:

```typescript
const person = s.object({
	framework: s.string
});

person.parse({
	framework: 'Sapphire',
	awesome: true
});
// => { name: 'Sapphire' }
```

##### `.strict` // TODO

You can disallow unknown keys with `.strict`. If the input includes any unknown keys, an error will be thrown.

```typescript
const person = s.object({
	framework: s.string
}).strict;

person.parse({
	framework: 'Sapphire',
	awesome: true
});
// => throws ValidationError
```

##### `.ignore` // TODO

You can use the `.ignore` getter to reset an object schema to the default behavior (ignoring unrecognized keys).

#### Records // TODO

Record schemas are similar to objects, but validates `Record<string, T>` types, keep in mind this does not check for the keys, and cannot support validation for specific ones:

```typescript
const tags = s.record(s.string);

tags.parse({ foo: 'bar', hello: 'world' }); // => { foo: 'bar', hello: 'world' }
tags.parse({ foo: 42 });                    // => throws AggregateError
tags.parse('Hello');                        // => throws ValidateError
```

#### Unions

ShapeShift includes a built-in method for composing OR types:

```typescript
const stringOrNumber = s.union([s.string, s.number]);

stringOrNumber.parse('Sapphire'); // => 'Sapphire'
stringOrNumber.parse(42);         // => 42
stringOrNumber.parse({});         // => throws AggregateError
```

#### Enums

Enums are a convenience method that aliases `s.union(s.literal(a), s.literal(b), ...)`:

```typescript
s.enum('Red', 'Green', 'Blue');
// s.union(s.literal('Red'), s.literal('Green'), s.literal('Blue'));
```

#### Maps // TODO

```typescript
const map = s.map(s.string, s.number);
// Map<string, number>
```

#### Sets

```typescript
const set = s.set(s.number);
// Set<number>
```

#### Instances

You can use `s.instance(Class)` to check that the input is an instance of a class. This is useful to validate inputs against classes:

```typescript
class User {
	public constructor(public name: string) {}
}

const schema = s.instance(User);
schema.parse(new User('Sapphire')); // => User { name: 'Sapphire' }
schema.parse('oops' as any);        // => throws ValidatorError
```

#### Functions // TODO

You can define function schemas. This checks for whether or not an input is a function:

```typescript
s.function; // () => unknown
```

You can define arguments by passing an array as first argument, as well as the return type as second:

```typescript
s.function([s.string]); // (arg0: string) => unknown
s.function([s.string, s.number], s.string); // (arg0: string, arg1: number) => string
```

> **Note**: ShapeShift will transform the given function into one with validation on arguments and output. You can access the `.raw` property of the function to get the unchecked function.

## BaseValidator: methods and properties

All schemas in ShapeShift contain certain methods.

`.run(data: unknown): Result<T, Error>`: given a schema, you can call this method to check whether or not the input is valid. If it is, a `Result` with `success: true` and a deep-cloned value will be returned with the given constraints and transformations. Otherwise, a `Result` with `success: false` and an error is returned.

`.parse(data: unknown): T`: given a schema, you can call this method to check whether or not the input is valid. If it is, a deep-cloned value will be returned with the given constraints and transformations. Otherwise, an error is thrown.

`.transform<R>((value: T) => R): NopValidator<R>`: adds a constraint that modifies the input:

```typescript
import { s } from '@sapphire/shapeshift';

const getLength = s.string.transform((value) => value.length); // TODO
getLength.parse('Hello There'); // => 11
```

> :warning: `.transform`'s functions **must not throw**. If a validation error is desired to be thrown, `.reshape` instead.

`.reshape<R>((value: T) => Result<R, Error> | IConstraint): NopValidator<R>`: adds a constraint able to both validate and modify the input:

```typescript
import { s, Result } from '@sapphire/shapeshift';

const getLength = s.string.reshape((value) => Result.ok(value.length)); // TODO
getLength.parse('Hello There'); // => 11
```

> :warning: `.reshape`'s functions **must not throw**. If a validation error is desired to be thrown, use `Result.err(error)` instead.

`.default(value: T | (() => T))`: transform `undefined` into the given value or the callback's returned value:

```typescript
const name = s.string.default('Sapphire'); // TODO
name.parse('Hello');   // => 'Hello'
name.parse(undefined); // => 'Sapphire'
```

```typescript
const number = s.number.default(Math.random); // TODO
number.parse(12);        // => 12
number.parse(undefined); // => 0.989911985608602
number.parse(undefined); // => 0.3224350185068794
```

> :warning: The default values are not validated.

`.optional`: a convenience method that returns an union of the type with `s.undefined`.

```typescript
s.string.optional; // s.union(s.string, s.undefined)
```

`.nullable`: a convenience method that returns an union of the type with `s.nullable`.

```typescript
s.string.nullable; // s.union(s.string, s.nullable)
```

`.nullish`: a convenience method that returns an union of the type with `s.nullish`.

```typescript
s.string.nullish; // s.union(s.string, s.nullish)
```

`.array`: a convenience method that returns an ArrayValidator with the type.

```typescript
s.string.array; // s.array(s.string)
```

`.or`: a convenience method that returns an UnionValidator with the type. This method is also overridden in UnionValidator to just append one more entry.

```typescript
s.string.or(s.number);
// => s.union(s.string, s.number)

s.object({ name: s.string }).or(s.string, s.number);
// => s.union(s.object({ name: s.string }), s.string, s.number)
```

## Features

-   TypeScript friendly
-   API similar to `zod`
-   :rocket: Very fast

## Buy us some doughnuts

Sapphire Community is and always will be open source, even if we don't get donations. That being said, we know there are amazing people who may still want to donate just to show their appreciation. Thank you very much in advance!

We accept donations through Open Collective, Ko-fi, Paypal, Patreon and GitHub Sponsorships. You can use the buttons below to donate through your method of choice.

|   Donate With   |                       Address                       |
| :-------------: | :-------------------------------------------------: |
| Open Collective | [Click Here](https://sapphirejs.dev/opencollective) |
|      Ko-fi      |      [Click Here](https://sapphirejs.dev/kofi)      |
|     Patreon     |    [Click Here](https://sapphirejs.dev/patreon)     |
|     PayPal      |     [Click Here](https://sapphirejs.dev/paypal)     |

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
