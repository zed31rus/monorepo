import { AuthDBType } from '@packages/db';
import ErrorsContainer from '@shared/errors';
import BaseWebHandler from '#web/base/handler.js';
import { type Context } from 'hono';
import { type HTTPResponseError } from 'hono/types';

export default class ErrorWebHandler extends BaseWebHandler {
	errorHander(err: Error | HTTPResponseError, c: Context) {
		if (err instanceof ErrorsContainer.ApiError) {
			return c.json(
				{
					code: err.code,
					message: err.message,
				},
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				err.status as any
			);
		}

		if (err instanceof ErrorsContainer.ConfigError) {
			console.error(err);
			process.exit(1);
		}

		if (err instanceof AuthDBType.PrismaClientKnownRequestError) {
			const code = err.code as keyof typeof this.errors.prisma;

			return c.json(
				{
					error: this.errors.prisma[code].message,
				},
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				this.errors.prisma[code].status as any
			);
		}

		if (err instanceof AuthDBType.PrismaClientValidationError) {
			return c.json(
				{
					description: 'Bad request',
				},
				400
			);
		}

		console.log(err);
		return c.json(
			{
				message: 'Internal Server Error',
			},
			500
		);
	}
}
