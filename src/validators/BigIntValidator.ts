import type { IConstraint } from '../constraints/base/IConstraint';
import { bigintEq, bigintGe, bigintGt, bigintLe, bigintLt, bigintNe, bigintDivisibleBy } from '../constraints/BigIntConstraints';
import { ValidationError } from '../lib/errors/ValidationError';
import { Result } from '../lib/Result';
import { BaseValidator } from './imports';

export class BigIntValidator<T extends bigint> extends BaseValidator<T> {
	public lt(number: bigint): this {
		return this.addConstraint(bigintLt(number) as IConstraint<T>);
	}

	public le(number: bigint): this {
		return this.addConstraint(bigintLe(number) as IConstraint<T>);
	}

	public gt(number: bigint): this {
		return this.addConstraint(bigintGt(number) as IConstraint<T>);
	}

	public ge(number: bigint): this {
		return this.addConstraint(bigintGe(number) as IConstraint<T>);
	}

	public eq<N extends bigint>(number: N): BigIntValidator<N> {
		return this.addConstraint(bigintEq(number) as IConstraint<T>) as unknown as BigIntValidator<N>;
	}

	public ne(number: bigint): this {
		return this.addConstraint(bigintNe(number) as IConstraint<T>);
	}

	public get positive(): this {
		return this.ge(0n);
	}

	public get negative(): this {
		return this.lt(0n);
	}

	public divisibleBy(number: bigint): this {
		return this.addConstraint(bigintDivisibleBy(number) as IConstraint<T>);
	}

	public get abs(): this {
		return this.transform((value) => (value < 0 ? -value : value) as T);
	}

	public intN(bits: number): this {
		return this.transform((value) => BigInt.asIntN(bits, value) as T);
	}

	public uintN(bits: number): this {
		return this.transform((value) => BigInt.asUintN(bits, value) as T);
	}

	protected handle(value: unknown): Result<T, ValidationError> {
		return typeof value === 'bigint' //
			? Result.ok(value as T)
			: Result.err(new ValidationError('s.bigint', 'Expected a bigint primitive', value));
	}
}
