import DtoContainer from "#web/containers/dto.container.js";
import WrapperContainer from "#web/containers/wrapper.container.js";
import WebManagerContainer from "#web/containers/managers.container.js";
import { type Env } from "hono";
import { createFactory } from "hono/factory";
import WebBase from "./web.base.js";

abstract class baseMiddleware extends WebBase {

    constructor(
        protected readonly dto: DtoContainer,
        protected readonly wrappers: WrapperContainer,
        protected readonly webManagers: WebManagerContainer,
        ...webBaseArgs: WebBase.Args) {
            super(...webBaseArgs);
        }

    protected createFactory<T extends Env>() {
        return createFactory<T>();
    }
}

namespace baseMiddleware {
    export type Args = ConstructorParameters<typeof baseMiddleware>
}

export default baseMiddleware;