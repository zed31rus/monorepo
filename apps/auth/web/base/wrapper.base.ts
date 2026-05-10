import WebBase from "./web.base.js";

abstract class BaseWrapper extends WebBase {
    constructor(...webBaseArgs: WebBase.Args) {
        super(...webBaseArgs);
    }
}

namespace BaseWrapper {
    export type Args = ConstructorParameters<typeof BaseWrapper>
}

export default BaseWrapper;

