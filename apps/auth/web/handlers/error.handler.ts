import { AuthDBType } from '@packages/db';
import ErrorsContainer from '@shared/errors';
import baseHandler from '#web/base/handler.base.js';
import { type Context } from 'hono';
import { type HTTPResponseError } from 'hono/types';
import jsonwebtoken from 'jsonwebtoken';
const { JsonWebTokenError, TokenExpiredError } = jsonwebtoken;

export default class ErrorHandler extends baseHandler {
	errorHander(err: Error | HTTPResponseError, c: Context) {
		if (err instanceof ErrorsContainer.ApiError) {
			if (err.status == 401) this.manager.session.deleteSession(c);

			return c.json(
				{
					message: err.message,
					errors: err.errors,
				},
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				err.status as any
			);
		}

		if (err instanceof TokenExpiredError) {
			this.manager.session.deleteSession(c);
			return c.json({ message: 'Token expired' }, 401);
		}

		if (err instanceof JsonWebTokenError) {
			return c.json({ message: 'Invalid token' }, 401);
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
