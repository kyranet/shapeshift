import { s, ValidationError } from '../../src';

describe('RecordValidator', () => {
	const value = { foo: 'bar', fizz: 'buzz' };
	const predicate = s.record(s.string);

	test('GIVEN a non-record THEN throws ValidationError', () => {
		expect(() => predicate.parse(false)).toThrow(new ValidationError('RecordValidator', 'Expected a record', false));
	});

	test('GIVEN null THEN throws ValidationError', () => {
		expect(() => predicate.parse(null)).toThrow(new ValidationError('RecordValidator', 'Expected the value to not be null', null));
	});

	test('GIVEN a matching record THEN returns a record', () => {
		expect(predicate.parse(value)).toStrictEqual(value);
	});

	test('GIVEN a non-matching record THEN throws AggregateError', () => {
		expect(() => predicate.parse({ foo: 1, fizz: true })).toThrow(
			new AggregateError(
				[
					new ValidationError('StringValidator', 'Expected a string primitive', 1),
					new ValidationError('StringValidator', 'Expected a string primitive', true)
				],
				'Failed to validate at least one entry'
			)
		);
	});
});
