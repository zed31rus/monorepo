import { zValidator } from '@hono/zod-validator';
import { type ValidationTargets } from 'hono';
import { ZodObject } from 'zod';
import BaseWebWrapper, { type BaseWebWrapperArgs } from '#web/base/wrapper.js';

export default class ValidatorWebWrapper extends BaseWebWrapper {
	constructor(...baseArgs: BaseWebWrapperArgs) {
		super(...baseArgs);
	}

	validate<T extends ZodObject, Target extends keyof ValidationTargets>(
		target: Target,
		schema: T
	) {
		return zValidator(target, schema, (result, c) => {
			if (!result.success) {
				console.log(result.error);
				return c.json(
					{
						success: false,
					},
					400
				);
			}
		});
	}
}
