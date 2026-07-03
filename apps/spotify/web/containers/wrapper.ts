import type CorsWebWrapper from '#web/wrappers/cors.js';
import type RateLimiterWebWrapper from '#web/wrappers/rateLimiter.js';

export default class WebWrapperContainer {
	constructor(
		readonly rateLimiter: RateLimiterWebWrapper,
		readonly cors: CorsWebWrapper
	) {}
}
