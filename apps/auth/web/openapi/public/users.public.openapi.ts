import { type UserEnv } from '#web/types/Env.js';
import { createRoute, z } from '@hono/zod-openapi';
import BaseOpenAPI from '../../base/openapi.base.js';

type UsersEnv = UserEnv & {};

export default class UsersPublicOpenAPI extends BaseOpenAPI {
	getByUuid = createRoute({
		method: 'get',
		path: '/get/{uuid}',
		summary: 'Get user by UUID',
		description: 'Returns public user data by UUID. Does not require authentication.',

		request: {
			params: z.object({
				uuid: z.uuid(),
			}),
		},

		responses: {
			200: {
				description: 'User found',
				content: {
					'application/json': {
						schema: z.object({
							user: this.core.db.users.PublicUserSchema,
						}),
					},
				},
			},
			...this.commonResponses,
		},
	});

	getByEmail = createRoute({
		method: 'get',
		path: '/get/{email}',
		middleware: [...this.handlers.auth.withValidUser<UsersEnv>()],
		security: [{ authBearer: [] }],
		summary: 'Get user by email',
		description: 'Returns user data by email address. Requires authentication.',

		request: {
			params: z.object({
				email: z.email(),
			}),
		},

		responses: {
			200: {
				description: 'User found',
				content: {
					'application/json': {
						schema: z.object({
							user: this.core.db.users.PublicUserSchema,
						}),
					},
				},
			},
			...this.commonResponses,
		},
	});

	getByLogin = createRoute({
		method: 'get',
		path: '/get/{login}',
		middleware: [...this.handlers.auth.withValidUser<UsersEnv>()],
		security: [{ authBearer: [] }],
		summary: 'Get user by login',
		description: 'Returns user data by login. Requires authentication.',

		request: {
			params: z.object({
				login: z.string().min(3),
			}),
		},

		responses: {
			200: {
				description: 'User found',
				content: {
					'application/json': {
						schema: z.object({
							user: this.core.db.users.PublicUserSchema,
						}),
					},
				},
			},
			...this.commonResponses,
		},
	});
}
