import type { IConstraint } from '../constraints/base/IConstraint';
import {
	emailRegex,
	stringIp,
	stringLengthEq,
	stringLengthGe,
	stringLengthGt,
	stringLengthLe,
	stringLengthLt,
	stringLengthNe,
	stringRegex,
	stringUrl,
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
		return this.addConstraint(stringRegex(emailRegex, 'email') as IConstraint<T>);
	}

	public url(options?: UrlOptions): this {
		return this.addConstraint(stringUrl(options) as IConstraint<T>);
	}

	public uuid(v: number | `${bigint}-${bigint}` | null = 4): this {
		// from https://stackoverflow.com/a/38191078/16893382
		const uuidRegex = new RegExp(
			`^([0-9A-F]{8}-[0-9A-F]{4}-[${v ?? '1-5'}][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}|00000000-0000-0000-0000-000000000000)$`,
			'i'
		);
		return this.addConstraint(stringRegex(uuidRegex, 'uuid') as IConstraint<T>);
	}

	public regex(regex: RegExp): this {
		return this.addConstraint(stringRegex(regex, 'regex') as IConstraint<T>);
	}

	public get ipv4(): this {
		return this.addConstraint(stringIp(4) as IConstraint<T>);
	}

	public get ipv6(): this {
		return this.addConstraint(stringIp(6) as IConstraint<T>);
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
