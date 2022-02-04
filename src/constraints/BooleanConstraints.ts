import { ConstraintError } from '../lib/errors/ConstraintError';
import { Result } from '../lib/Result';
import type { IConstraint } from './base/IConstraint';

export type BooleanConstraintName = `s.boolean.${boolean}`;

export const booleanTrue: IConstraint<boolean, true> = {
	run(input: boolean) {
		return input //
			? Result.ok(input)
			: Result.err(new ConstraintError('s.boolean.true', 'Invalid boolean value', input, 'true'));
	}
};

export const booleanFalse: IConstraint<boolean, false> = {
	run(input: boolean) {
		return input //
			? Result.err(new ConstraintError('s.boolean.false', 'Invalid boolean value', input, 'false'))
			: Result.ok(input);
	}
};
