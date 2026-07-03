import CorsWebWrapper from '#web/wrappers/cors.js';
import RateLimiterWebWrapper from '#web/wrappers/rateLimiter.js';
import ValidatorWebWrapper from '#web/wrappers/validator.js';

class WebWrapperContainer {
	constructor(
		readonly validator: ValidatorWebWrapper,
		readonly rateLimiter: RateLimiterWebWrapper,
		readonly cors: CorsWebWrapper
	) {}
}

export default WebWrapperContainer;
