import { CombinedPropertyError, ConstraintError, s, ValidationError } from '../../src';

describe('ArrayValidator', () => {
	const predicate = s.string.array;

	test('GIVEN an array THEN returns an array', () => {
		expect(predicate.parse(['Hello', 'there'])).toEqual(['Hello', 'there']);
	});

	test('GIVEN a non-array THEN throws ValidationError', () => {
		expect(() => predicate.parse('Hello there')).toThrow(new ValidationError('ArrayValidator', 'Expected an array', 'Hello there'));
	});

	const invalidArray = [[123], [true], [{}], [[]], [null]];

	test.each([invalidArray])('GIVEN an array with value %s other than string THEN throws CombinedPropertyError', (input) => {
		expect(() => predicate.parse(input)).toThrow(
			new CombinedPropertyError([[invalidArray.indexOf(input), new ValidationError('StringValidator', 'Expected a string primitive', input)]])
		);
	});

	describe('Comparators', () => {
		describe('length', () => {
			const lengthPredicate = s.string.array.lengthEq(2);

			test.each([[['Hello', 'there']]])('GIVEN %p THEN returns given value', (value) => {
				expect(lengthPredicate.parse(value)).toEqual(value);
			});

			test.each<any[]>([[[], ['Hello']]])('GIVEN %p THEN throws ConstraintError', (value) => {
				expect(() => lengthPredicate.parse(value)).toThrow(
					new ConstraintError('s.array(T).lengthEq', 'Invalid Array length', value, 'expected length 2')
				);
			});
		});

		describe('lengthLt', () => {
			const lengthLtPredicate = s.string.array.lengthLt(2);

			test.each([[['Hello']]])('GIVEN %p THEN returns given value', (value) => {
				expect(lengthLtPredicate.parse(value)).toEqual(value);
			});

			test.each<any[]>([
				[
					['Hello', 'there'],
					['foo', 'bar', 'baaz']
				]
			])('GIVEN %p THEN throws ConstraintError', (value) => {
				expect(() => lengthLtPredicate.parse(value)).toThrow(
					new ConstraintError('s.array(T).lengthLt', 'Invalid Array length', value, 'expected.length < 2')
				);
			});
		});

		describe('lengthLe', () => {
			const lengthLePredicate = s.string.array.lengthLe(2);

			test.each<any[]>([[['Hello'], ['Hello', 'there']]])('GIVEN %p THEN returns given value', (value) => {
				expect(lengthLePredicate.parse(value)).toEqual(value);
			});

			test.each<any[]>([[['foo', 'bar', 'baaz']]])('GIVEN %p THEN throws ConstraintError', (value) => {
				expect(() => lengthLePredicate.parse(value)).toThrow(
					new ConstraintError('s.array(T).lengthLe', 'Invalid Array length', value, 'expected.length <= 2')
				);
			});
		});

		describe('lengthGt', () => {
			const lengthGtPredicate = s.string.array.lengthGt(2);

			test.each([[['foo', 'bar', 'baaz']]])('GIVEN %p THEN returns given value', (value) => {
				expect(lengthGtPredicate.parse(value)).toEqual(value);
			});

			test.each<any[]>([[['Hello'], []]])('GIVEN %p THEN throws ConstraintError', (value) => {
				expect(() => lengthGtPredicate.parse(value)).toThrow(
					new ConstraintError('s.array(T).lengthGt', 'Invalid Array length', value, 'expected.length > 2')
				);
			});
		});

		describe('lengthGe', () => {
			const lengthGePredicate = s.string.array.lengthGe(2);

			test.each<any[]>([
				[
					['Hello', 'there'],
					['foo', 'bar', 'baaz']
				]
			])('GIVEN %p THEN returns given value', (value) => {
				expect(lengthGePredicate.parse(value)).toEqual(value);
			});

			test.each<any[]>([[[], ['foo']]])('GIVEN %p THEN throws ConstraintError', (value) => {
				expect(() => lengthGePredicate.parse(value)).toThrow(
					new ConstraintError('s.array(T).lengthGe', 'Invalid Array length', value, 'expected.length >= 2')
				);
			});
		});

		describe('lengthNe', () => {
			const lengthNotEqPredicate = s.string.array.lengthNe(2);

			test.each<any[]>([[['foo', 'bar', 'baaz'], ['foo']]])('GIVEN %p THEN returns given value', (value) => {
				expect(lengthNotEqPredicate.parse(value)).toEqual(value);
			});

			test.each<any[]>([
				[
					['Hello', 'there'],
					['foo', 'bar']
				]
			])('GIVEN %p THEN throws ConstraintError', (value) => {
				expect(() => lengthNotEqPredicate.parse(value)).toThrow(
					new ConstraintError('s.array(T).lengthNe', 'Invalid Array length', value, 'expected.length != 2')
				);
			});
		});
	});

	test('GIVEN clone THEN returns similar instance', () => {
		const arrayPredicate = s.string.array;
		// @ts-expect-error Test clone
		const clonePredicate = arrayPredicate.clone();

		expect(clonePredicate).toBeInstanceOf(arrayPredicate.constructor);
		expect(clonePredicate.parse(['Hello There'])).toStrictEqual(arrayPredicate.parse(['Hello There']));
	});
});
