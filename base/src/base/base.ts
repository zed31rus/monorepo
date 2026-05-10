import type ConfigContainer from "@shared/config";
import type ErrorsContainer from "@shared/errors";
import type Logger from "@shared/logger";

abstract class Base {
    constructor(
        readonly config: ConfigContainer,
        readonly errors: ErrorsContainer,
        readonly logger: Logger.appLogger
    ) {

    }
}

namespace Base {
    export type Args = ConstructorParameters<typeof Base>
}

export default Base;