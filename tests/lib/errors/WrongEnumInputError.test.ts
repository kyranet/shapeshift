import { inspect } from 'node:util';
import { WrongEnumInputError } from '../../../src';

describe('WrongEnumInputError', () => {
	const error = new WrongEnumInputError('foo', [
		['bar', 1],
		['baz', 'boo']
	]);

	test('GIVEN an instance THEN assigns fields correctly', () => {
		expect(error.message).toBe('Expected the value to be one of the following enum values:');
		expect(error.value).toBe('foo');
		expect(error.pairs).toEqual([
			['bar', 1],
			['baz', 'boo']
		]);
	});

	describe('inspect', () => {
		test('GIVEN an inspected instance THEN formats data correctly', () => {
			const content = inspect(error, { colors: false });
			const expected = [
				'WrongEnumInputError > foo', //
				'  Expected the value to be one of the following enum values:',
				'',
				'  | bar or 1',
				'  | baz or boo'
			];

			expect(content.startsWith(expected.join('\n'))).toBe(true);
		});

		test('GIVEN an inspected instance with negative depth THEN formats name only', () => {
			const content = inspect(error, { colors: false, depth: -1 });
			const expected = [
				'[WrongEnumInputError: foo]' //
			];

			expect(content.startsWith(expected.join('\n'))).toBe(true);
		});
	});

	describe('toJSON', () => {
		test('toJSON should return an object with name and property', () => {
			expect(error.toJSON()).toEqual({
				name: 'Error',
				value: 'foo',
				pairs: [
					['bar', 1],
					['baz', 'boo']
				]
			});
		});
	});
});
