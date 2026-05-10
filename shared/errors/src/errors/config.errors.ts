export class ConfigError extends Error {
    constructor(
        public status: number,
        public message: string,
        public errors: any[] = []
    ) {
        super(message);
        Object.setPrototypeOf(this, ConfigError.prototype);
    }
}

export default class ConfigErrors {
    env(message = "not Authorized") {
        return new ConfigError(1, message);
    }
}