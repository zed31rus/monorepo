import { type UserEnv } from '#web/types/Env.js';
import BaseWebOpenAPI from '#web/base/openapi.js';
import { createRoute, z } from '@hono/zod-openapi';

type ProfileExternalEnv = UserEnv & {};

export default class MeExternalWebOpenAPI extends BaseWebOpenAPI {
	get = createRoute({
		method: 'get',
		path: '/get',
		middleware: [...this.handlers.auth.withValidUser<ProfileExternalEnv>()],
		security: [{ authBearer: [] }],
		summary: 'Get current user',
		description: 'Returns the profile data of the currently authenticated user.',

		responses: {
			200: {
				description: 'User profile returned successfully',
				content: {
					'application/json': {
						schema: z.object({
							user: this.core.db.users.PersonalUserSchema,
						}),
					},
				},
			},
			...this.commonResponses,
		},
	});
}
