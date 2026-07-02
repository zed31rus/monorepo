export class ConfigError extends Error {
	constructor(
		public status: number,
		public message: string
	) {
		super(message);
		Object.setPrototypeOf(this, ConfigError.prototype);
	}
}

export default class ConfigErrors {
	env(message = 'no env variable') {
		return new ConfigError(1, message);
	}
}
