import EnvConfig from "./configs/env.config.js";

export default class ConfigContainer {
    constructor(
        readonly env: EnvConfig
    ) {}

    static deps = { EnvConfig }
}