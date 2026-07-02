import type CorsWrapper from '#web/wrappers/cors.js';
import type RateLimiterWrapper from '#web/wrappers/rateLimiter.js';

export default class WrapperContainer {
	constructor(
		readonly rateLimiter: RateLimiterWrapper,
		readonly cors: CorsWrapper
	) {}
}
