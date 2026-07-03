import BaseWebOpenAPI from '#web/base/openapi.js';
import { type OptionalUserEnv } from '#root/web/types/Env.js';
import { createRoute, z } from '@hono/zod-openapi';

type DiscordOauthExternalEnv = OptionalUserEnv & {};

export default class DiscordOauthExternalWebOpenAPI extends BaseWebOpenAPI {
	callback = createRoute({
		method: 'get',
		path: '/callback',
		middleware: [this.middlewares.auth.withOptionalUser<DiscordOauthExternalEnv>()],
		summary: 'Discord OAuth callback',
		description:
			'Handles the Discord OAuth2 callback. Authenticates or links the Discord account to an existing user if already logged in.',

		request: {
			query: z.object({
				code: z.string(),
			}),
		},

		responses: {
			200: {
				description: 'Successfully authenticated via Discord',
				content: {
					'application/json': {
						schema: z.object({
							user: this.core.db.users.PersonalUserSchema,
							accessToken: z.string(),
							expires: z.date(),
						}),
					},
				},
			},
			...this.commonResponses,
		},
	});
}
