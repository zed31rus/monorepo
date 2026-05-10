import WebBase from "./web.base.js";

abstract class BaseWebManager extends WebBase {
    constructor(...webBaseArgs: WebBase.Args) {
        super(...webBaseArgs);
    }
}

namespace BaseWebManager {
    export type Args = ConstructorParameters<typeof BaseWebManager>
}

export default BaseWebManager;