import { type UserEnv } from '#web/types/Env.js';
import BaseOpenAPI from '#web/base/openapi.base.js';
import { createRoute, z } from '@hono/zod-openapi';

type ProfileEnv = UserEnv & {};

export default class MePublicOpenAPI extends BaseOpenAPI {
	get = createRoute({
		method: 'get',
		path: '/get',
		middleware: [...this.handlers.auth.withValidUser<ProfileEnv>()],
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
