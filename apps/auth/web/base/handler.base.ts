import MiddlewareContainer from "#web/containers/middleware.container.js";
import DtoContainer from "#web/containers/dto.container.js";
import ManagerContainer from "#web/containers/managers.container.js";
import WrapperContainer from "#web/containers/wrapper.container.js";
import { type Env } from "hono";
import { createFactory } from "hono/factory";
import WebBase from "./web.base.js";

abstract class baseHandler extends WebBase {

    constructor(
        protected readonly middleware: MiddlewareContainer,
        protected readonly wrapper: WrapperContainer,
        protected readonly dto: DtoContainer,
        protected readonly manager: ManagerContainer,
        ...webBaseArgs: WebBase.Args) {
            super(...webBaseArgs);
        }

    protected createFactory<T extends Env>() {
        return createFactory<T>();
    }
}

namespace baseHandler {
    export type Args = ConstructorParameters<typeof baseHandler>
}

export default baseHandler;