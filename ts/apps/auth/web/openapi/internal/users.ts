import { type UserEnv } from '#web/types/Env.js';
import { createRoute, z } from '@hono/zod-openapi';
import BaseWebOpenAPI from '../../base/openapi.js';
import { Oauth } from '@zed31rus/types';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type UsersInternalEnv = UserEnv & {};

export default class UsersInternalWebOpenAPI extends BaseWebOpenAPI {
	getByUuid = createRoute({
		method: 'post',
		path: '/uuid/{uuid}',
		summary: 'Get user by UUID',
		description: 'Returns internal user data by UUID.',
		security: [{ internalToken: [] }],
		middleware: [...this.handlers.auth.withInternal()],

		request: {
			params: z.object({
				uuid: z.uuid(),
			}),
			body: {
				content: {
					'application/json': {
						schema: z.object({
							provider: z.enum(Oauth.Providers),
						}),
					},
				},
			},
		},

		responses: {
			200: {
				description: 'User found',
				content: {
					'application/json': {
						schema: z.object({
							user: this.core.db.users.InternalUserSchema,
						}),
					},
				},
			},
			...this.commonResponses,
		},
	});
}
