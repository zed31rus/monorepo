import EnvConfig from './configs/env.js';

export default class ConfigContainer {
	constructor(readonly env: EnvConfig) {}

	static deps = { EnvConfig };
}
