import ApiErrors, { ApiError } from './errors/api.js';
import ConfigErrors, { ConfigError } from './errors/config.js';
import InternalErrors, { InternalError } from './errors/internal.js';
import PrismaErrors from './errors/prisma.js';

class ErrorsContainer {
	constructor(
		readonly api: ApiErrors,
		readonly config: ConfigErrors,
		readonly prisma: PrismaErrors,
		readonly internal: InternalErrors
	) {}

	static deps = { ApiErrors, ConfigErrors, PrismaErrors, InternalErrors };
	static ApiError = ApiError;
	static ConfigError = ConfigError;
	static InternalError = InternalError;
}

export default ErrorsContainer;
