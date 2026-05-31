import { createRoute, z } from '@hono/zod-openapi';
import BaseOpenAPI from '#web/base/openapi.base.js';
import { type UserEnv } from '#web/types/Env.js';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type AuthEnv = UserEnv & {};

export default class AuthExternalOpenAPI extends BaseOpenAPI {
	register = createRoute({
		method: 'post',
		path: '/register',
		summary: 'Register',
		description: 'Creates a new user account with the provided credentials.',

		request: {
			body: {
				content: {
					'application/json': {
						schema: z.object({
							login: z.string().min(3).max(20),
							email: z.email(),
							password: z.string().min(8),
							nickname: z.string().min(2).max(30),
						}),
					},
				},
			},
		},

		responses: {
			200: {
				description: 'User successfully registered',
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

	login = createRoute({
		method: 'post',
		path: '/login',
		summary: 'Login',
		description: 'Authenticates the user and sets session cookies.',
		request: {
			body: {
				content: {
					'application/json': {
						schema: z.object({
							email: z.email(),
							password: z.string().min(8),
						}),
					},
				},
			},
		},

		responses: {
			200: {
				description: 'Successfully authenticated',
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

	refresh = createRoute({
		method: 'post',
		path: '/refresh',
		summary: 'Refresh tokens',
		description:
			'Issues new access and refresh tokens using the existing refresh token cookie.',

		request: {
			cookies: this.dtos.cookie.required.refresh,
		},

		responses: {
			200: {
				description: 'Tokens successfully refreshed',
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

	logout = createRoute({
		method: 'post',
		path: '/logout',
		summary: 'Logout',
		description: 'Invalidates the current session and clears session cookies.',

		request: {
			cookies: this.dtos.cookie.optional.refresh,
		},

		responses: {
			200: {
				description: 'Successfully logged out',
				content: {
					'application/json': {
						schema: z.object({}),
					},
				},
			},
			...this.commonResponses,
		},
	});
}
