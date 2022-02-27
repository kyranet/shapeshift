import { s } from '../../src';

describe('BaseValidator', () => {
	describe('Nullable', () => {
		const nullablePredicate = s.string.nullable;

		test('GIVEN a null THEN returns null', () => {
			expect<string | null>(nullablePredicate.parse(null)).toBe(null);
		});

		test('GIVEN a string THEN returns a string', () => {
			expect(nullablePredicate.parse('Hello There')).toBe('Hello There');
		});
	});

	describe('Nullish', () => {
		const nullishPredicate = s.string.nullish;

		test('GIVEN a null THEN returns null', () => {
			expect<string | undefined | null>(nullishPredicate.parse(null)).toBe(null);
		});

		test('GIVEN a undefined THEN returns undefined', () => {
			expect(nullishPredicate.parse(undefined)).toBe(undefined);
		});

		test('GIVEN a string THEN returns a string', () => {
			expect(nullishPredicate.parse('Hello There')).toBe('Hello There');
		});
	});
});
