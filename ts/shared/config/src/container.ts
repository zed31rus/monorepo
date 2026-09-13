import EnvConfig from './configs/env.js';
import PathConfig from './configs/path.js';

export default class ConfigContainer {
	constructor(
		readonly env: EnvConfig,
		readonly path: PathConfig
	) {}

	static deps = { EnvConfig, PathConfig };
}
