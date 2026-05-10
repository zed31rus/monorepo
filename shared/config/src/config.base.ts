import ErrorsContainer from "@shared/errors"

abstract class BaseConfig {
    constructor(
        readonly errors: ErrorsContainer
    ) {}
}

namespace BaseConfig {
    export type Args = ConstructorParameters<typeof BaseConfig>
}

export default BaseConfig;