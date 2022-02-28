import type { IConstraint } from '../constraints/base/IConstraint';
import {
	stringEmail,
	stringIp,
	stringLengthEq,
	stringLengthGe,
	stringLengthGt,
	stringLengthLe,
	stringLengthLt,
	stringLengthNe,
	stringRegex,
	stringUrl,
	stringUuid,
	StringUuidOptions,
	type UrlOptions
} from '../constraints/StringConstraints';
import { ValidationError } from '../lib/errors/ValidationError';
import { Result } from '../lib/Result';
import { BaseValidator } from './imports';

export class StringValidator<T extends string> extends BaseValidator<T> {
	public lengthLt(length: number): this {
		return this.addConstraint(stringLengthLt(length) as IConstraint<T>);
	}

	public lengthLe(length: number): this {
		return this.addConstraint(stringLengthLe(length) as IConstraint<T>);
	}

	public lengthGt(length: number): this {
		return this.addConstraint(stringLengthGt(length) as IConstraint<T>);
	}

	public lengthGe(length: number): this {
		return this.addConstraint(stringLengthGe(length) as IConstraint<T>);
	}

	public lengthEq(length: number): this {
		return this.addConstraint(stringLengthEq(length) as IConstraint<T>);
	}

	public lengthNe(length: number): this {
		return this.addConstraint(stringLengthNe(length) as IConstraint<T>);
	}

	public get email(): this {
		return this.addConstraint(stringEmail() as IConstraint<T>);
	}

	public url(options?: UrlOptions): this {
		return this.addConstraint(stringUrl(options) as IConstraint<T>);
	}

	public uuid(options?: StringUuidOptions): this {
		return this.addConstraint(stringUuid(options) as IConstraint<T>);
	}

	public regex(regex: RegExp): this {
		return this.addConstraint(stringRegex(regex) as IConstraint<T>);
	}

	public get ipv4(): this {
		return this.ip(4);
	}

	public get ipv6(): this {
		return this.ip(6);
	}

	public ip(version?: 4 | 6): this {
		return this.addConstraint(stringIp(version) as IConstraint<T>);
	}

	protected handle(value: unknown): Result<T, ValidationError> {
		return typeof value === 'string' //
			? Result.ok(value as T)
			: Result.err(new ValidationError('StringValidator', 'Expected a string primitive', value));
	}
}
