import CoreBase from "./core.base.js";

abstract class BaseManager extends CoreBase {
    constructor(
        ...coreBaseArgs: CoreBase.Args
    ) {
            super(...coreBaseArgs)
        }
}

namespace BaseManager {
    export type Args = ConstructorParameters<typeof BaseManager>
}

export default BaseManager;