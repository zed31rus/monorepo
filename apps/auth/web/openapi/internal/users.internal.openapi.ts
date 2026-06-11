import { type UserEnv } from '#web/types/Env.js';
import { createRoute, z } from '@hono/zod-openapi';
import BaseOpenAPI from '../../base/openapi.base.js';
import { OauthProviders } from '@zed31rus/types';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type UsersInternalEnv = UserEnv & {};

export default class UsersInternalOpenAPI extends BaseOpenAPI {
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
							provider: z.enum(OauthProviders),
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
