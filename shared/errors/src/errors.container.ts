import ApiErrors from "./errors/api.errors.js";
import ConfigErrors from "./errors/config.errors.js";
import PrismaErrors from "./errors/prisma.errors.js";
import { ApiError } from "./errors/api.errors.js";
import { ConfigError } from "./errors/config.errors.js";

class ErrorsContainer {
    constructor(
        readonly api: ApiErrors,
        readonly config: ConfigErrors,
        readonly prisma: PrismaErrors
    ){}

    static deps = { ApiErrors, ConfigErrors, PrismaErrors }
    static ApiError = ApiError;
    static ConfigError = ConfigError;
}


export default ErrorsContainer;