import Base from "@zed31rus/base";
import coreContainer from "#root/core/containers/index.container.js";

abstract class WebBase extends Base {
    constructor(
        readonly core: typeof coreContainer,
    ) {
        super(core.configs, core.errors, core.logger);
    }
}

namespace WebBase {
    export type Args = ConstructorParameters<typeof WebBase>
}

export default WebBase