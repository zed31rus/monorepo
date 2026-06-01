import z from 'zod';

export default class CookieDto {
	required = {
		refresh: z.object({ refreshToken: z.string() }),
	};
	optional = {
		refresh: z.object({ refreshToken: z.string().optional() }),
	};
}
