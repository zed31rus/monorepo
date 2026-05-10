import ManagerContainer from "#core/containers/manager.container.js";
import CoreBase from "./core.base.js";

abstract class BaseService extends CoreBase {
    constructor(
        protected readonly manager: ManagerContainer,
        ...coreBaseArgs: CoreBase.Args) {
            super(...coreBaseArgs)
        }
}

namespace BaseService {
    export type Args = ConstructorParameters<typeof BaseService>
}

export default BaseService;