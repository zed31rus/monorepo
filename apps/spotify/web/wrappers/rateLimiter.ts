import { getConnInfo } from '@hono/node-server/conninfo';
import { rateLimiter } from 'hono-rate-limiter';
import BaseWrapper, { type BaseWrapperArgs } from '#web/base/wrapper.js';

export default class RateLimiterWrapper extends BaseWrapper {
	constructor(...baseArgs: BaseWrapperArgs) {
		super(...baseArgs);
	}

	limit(windowMs: number, limit: number) {
		return rateLimiter({
			windowMs: windowMs,
			limit: limit,
			keyGenerator: (c) => {
				const forwarded = c.req.header('x-forwarded-for');
				if (forwarded) {
					return forwarded.split(',')[0].trim();
				}

				const realIp = c.req.header('x-real-ip') ?? c.req.header('cf-connecting-ip');

				if (realIp) return realIp.trim();

				return getConnInfo(c).remote.address ?? 'unknown';
			},
		});
	}
}
