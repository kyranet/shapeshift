import { ExpectedConstraintError } from '../lib/errors/ExpectedConstraintError';
import { Result } from '../lib/Result';
import type { IConstraint } from './base/IConstraint';
import { Comparator, eq, ge, gt, le, lt, ne } from './util/operators';

export type BigIntConstraintName = `s.bigint.${'lt' | 'le' | 'gt' | 'ge' | 'eq' | 'ne' | 'divisibleBy'}`;

function bigintComparator(comparator: Comparator, name: BigIntConstraintName, expected: string, number: bigint): IConstraint<bigint> {
	return {
		run(input: bigint) {
			return comparator(input, number) //
				? Result.ok(input)
				: Result.err(new ExpectedConstraintError(name, 'Invalid bigint value', input, expected));
		}
	};
}

export function bigintLt(value: bigint): IConstraint<bigint> {
	const expected = `expected < ${value}n`;
	return bigintComparator(lt, 's.bigint.lt', expected, value);
}

export function bigintLe(value: bigint): IConstraint<bigint> {
	const expected = `expected <= ${value}n`;
	return bigintComparator(le, 's.bigint.le', expected, value);
}

export function bigintGt(value: bigint): IConstraint<bigint> {
	const expected = `expected > ${value}n`;
	return bigintComparator(gt, 's.bigint.gt', expected, value);
}

export function bigintGe(value: bigint): IConstraint<bigint> {
	const expected = `expected >= ${value}n`;
	return bigintComparator(ge, 's.bigint.ge', expected, value);
}

export function bigintEq(value: bigint): IConstraint<bigint> {
	const expected = `expected === ${value}n`;
	return bigintComparator(eq, 's.bigint.eq', expected, value);
}

export function bigintNe(value: bigint): IConstraint<bigint> {
	const expected = `expected !== ${value}n`;
	return bigintComparator(ne, 's.bigint.ne', expected, value);
}

export function bigintDivisibleBy(divider: bigint): IConstraint<bigint> {
	const expected = `expected % ${divider}n === 0n`;
	return {
		run(input: bigint) {
			return input % divider === 0n //
				? Result.ok(input)
				: Result.err(new ExpectedConstraintError('s.bigint.divisibleBy', 'BigInt is not divisible', input, expected));
		}
	};
}
