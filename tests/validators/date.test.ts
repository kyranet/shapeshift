import { ConstraintError, s, ValidationError } from '../../src';

describe('DateValidator', () => {
	const predicate = s.date;

	test('GIVEN a date THEN returns the given value', () => {
		const date = new Date();
		expect(predicate.parse(date)).toBe(date);
	});

	test.each(['abc', '', null, undefined])('GIVEN a non-date THEN throws ValidationError', (input) => {
		expect(() => predicate.parse(input)).toThrow(new ValidationError('DateValidator', 'Expected a Date', input));
	});

	describe('Comparator', () => {
		const date = new Date('2022-02-01');
		const datesInFuture = [new Date('2022-03-01'), new Date('2023-01-01')];
		const datesInPast = [new Date('2022-01-01'), new Date('2020-01-01')];
		describe('lt', () => {
			const ltPredicate = s.date.lt(date);

			test.each(datesInPast)('GIVEN %s THEN returns given value', (value) => {
				expect(ltPredicate.parse(value)).toBe(value);
			});

			test.each(datesInFuture)('GIVEN %s THEN throws ConstraintError', (value) => {
				expect(() => ltPredicate.parse(value)).toThrow(
					new ConstraintError('s.date.lt', 'Invalid Date value', value, 'expected < 2022-01-01')
				);
			});
		});

		describe('le', () => {
			const lePredicate = s.date.le(date);

			test.each([...datesInPast, date])('GIVEN %s THEN returns given value', (value) => {
				expect(lePredicate.parse(value)).toBe(value);
			});

			test.each(datesInFuture)('GIVEN %s THEN throws ConstraintError', (value) => {
				expect(() => lePredicate.parse(value)).toThrow(
					new ConstraintError('s.date.le', 'Invalid Date value', value, 'expected <= 2022-01-01')
				);
			});
		});

		describe('gt', () => {
			const gtPredicate = s.date.gt(date);

			test.each(datesInFuture)('GIVEN %s THEN returns given value', (value) => {
				expect(gtPredicate.parse(value)).toBe(value);
			});

			test.each(datesInPast)('GIVEN %s THEN throws ConstraintError', (value) => {
				expect(() => gtPredicate.parse(value)).toThrow(
					new ConstraintError('s.date.gt', 'Invalid Date value', value, 'expected > 2022-01-01')
				);
			});
		});

		describe('ge', () => {
			const gePredicate = s.date.ge(date);

			test.each([date, ...datesInFuture])('GIVEN %s THEN returns given value', (value) => {
				expect(gePredicate.parse(value)).toBe(value);
			});

			test.each(datesInPast)('GIVEN %s THEN throws ConstraintError', (value) => {
				expect(() => gePredicate.parse(value)).toThrow(
					new ConstraintError('s.date.ge', 'Invalid Date value', value, 'expected >= 2022-01-01')
				);
			});
		});

		describe('eq', () => {
			const eqPredicate = s.date.eq(date);

			test('GIVEN date THEN returns given value', () => {
				expect(eqPredicate.parse(date)).toBe(date);
			});

			test.each([...datesInPast, ...datesInFuture])('GIVEN %s THEN throws ConstraintError', (value) => {
				expect(() => eqPredicate.parse(value)).toThrow(
					new ConstraintError('s.date.eq', 'Invalid Date value', value, 'expected = 2022-01-02')
				);
			});
		});

		describe('ne', () => {
			const nePredicate = s.date.ne(date);

			test.each([...datesInPast, ...datesInFuture])('GIVEN %s THEN returns given value', (value) => {
				expect(nePredicate.parse(value)).toBe(value);
			});

			test('GIVEN date THEN throws ConstraintError', () => {
				expect(() => nePredicate.parse(date)).toThrow(new ConstraintError('s.date.ne', 'Invalid Date value', date, 'expected != 2022-01-02'));
			});
		});
	});
});
