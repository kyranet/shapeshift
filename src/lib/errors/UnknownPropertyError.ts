import { inspect, type InspectOptionsStylized } from 'node:util';
import { BaseError, customInspectSymbolStackLess } from './BaseError';

export class UnknownPropertyError extends BaseError {
	public readonly property: PropertyKey;
	public readonly value: unknown;

	public constructor(property: PropertyKey, value: unknown) {
		super('Unknown property received');

		this.property = property;
		this.value = value;
	}

	public toJSON() {
		return {
			name: this.name,
			property: this.property,
			value: this.value
		};
	}

	protected [customInspectSymbolStackLess](depth: number, options: InspectOptionsStylized): string {
		if (depth < 0) {
			return options.stylize('[UnknownPropertyError]', 'special');
		}

		const newOptions = { ...options, depth: options.depth === null ? null : options.depth! - 1, compact: true };

		const padding = `\n  ${options.stylize('|', 'undefined')} `;
		const given = inspect(this.value, newOptions).replaceAll('\n', padding);

		const header = `${options.stylize('UnknownPropertyError', 'special')} > ${options.stylize(this.property.toString(), 'string')}`;
		const message = options.stylize(this.message, 'regexp');
		const givenBlock = `\n  ${options.stylize('Received:', 'regexp')}${padding}${given}`;
		return `${header}\n  ${message}\n${givenBlock}`;
	}
}
