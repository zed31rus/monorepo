import { AuthDBType } from '@packages/db';
import ErrorsContainer from '@shared/errors';
import BaseWebHandler from '#web/base/handler.js';
import { type Context } from 'hono';
import { type HTTPResponseError } from 'hono/types';
import { type ContentfulStatusCode } from 'hono/utils/http-status';
import jsonwebtoken from 'jsonwebtoken';

const { JsonWebTokenError, TokenExpiredError } = jsonwebtoken;

export default class ErrorWebHandler extends BaseWebHandler {
	errorHandler(err: Error | HTTPResponseError, c: Context) {
		const path = c.req.path;
		const method = c.req.method;

		if (err instanceof ErrorsContainer.ApiError) {
			this.logger.warn('API error', {
				code: err.code,
				status: err.status,
				message: err.message,
				path,
				method,
			});

			if (err.status === 401) this.managers.session.deleteSession(c);

			return c.json(
				{ code: err.code, message: err.message },
				err.status as ContentfulStatusCode
			);
		}

		if (err instanceof TokenExpiredError) {
			this.logger.info('Token expired', { path, method });
			this.managers.session.deleteSession(c);
			return c.json({ message: 'Token expired' }, 401);
		}

		if (err instanceof JsonWebTokenError) {
			this.logger.warn('Invalid token', {
				message: err.message,
				path,
				method,
			});
			return c.json({ message: 'Invalid token' }, 401);
		}

		if (err instanceof ErrorsContainer.ConfigError) {
			this.logger.error('Config error, shutting down', {
				message: err.message,
				stack: err.stack,
			});
			process.exit(1);
		}

		if (err instanceof AuthDBType.PrismaClientKnownRequestError) {
			const known = this.errors.prisma[err.code as keyof typeof this.errors.prisma];

			if (known) {
				this.logger.warn('Prisma known error', {
					code: err.code,
					status: known.status,
					message: known.message,
					path,
					method,
				});

				return c.json({ error: known.message }, known.status as ContentfulStatusCode);
			}

			this.logger.error('Unhandled Prisma error code', {
				code: err.code,
				message: err.message,
				meta: err.meta,
				path,
				method,
			});
			return c.json({ message: 'Internal Server Error' }, 500);
		}

		if (err instanceof AuthDBType.PrismaClientValidationError) {
			this.logger.warn('Prisma validation error', {
				message: err.message,
				path,
				method,
			});
			return c.json({ description: 'Bad request' }, 400);
		}

		this.logger.error('Unhandled error', {
			message: err.message,
			stack: err.stack,
			path,
			method,
		});
		return c.json({ message: 'Internal Server Error' }, 500);
	}
}
