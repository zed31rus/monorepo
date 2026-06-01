import { type UserEnv } from '#web/types/Env.js';
import { createRoute, z } from '@hono/zod-openapi';
import BaseOpenAPI from '../../base/openapi.base.js';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type UsersEnv = UserEnv & {};

export default class UsersInternalOpenAPI extends BaseOpenAPI {
	getByUuid = createRoute({
		method: 'get',
		path: '/get/{uuid}',
		summary: 'Get user by UUID',
		description: 'Returns internal user data by UUID.',
		middleware: [...this.handlers.auth.withInternal()],

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
}
