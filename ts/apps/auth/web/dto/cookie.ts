import z from 'zod';

export default class CookieWebDto {
	required = {
		refresh: z.object({ refreshToken: z.string() }),
	};
	optional = {
		refresh: z.object({ refreshToken: z.string().optional() }),
	};
}
