import AuthMiddleware from "#web/middleware/auth.middleware.js";
import FileMiddleware from "#web/middleware/file.middleware.js";

class MiddlewareContainer {
    constructor(
        readonly auth: AuthMiddleware,
        readonly file: FileMiddleware
    ) {}
}

namespace MiddlewareContainer {
    export type Args = ConstructorParameters<typeof MiddlewareContainer>
}

export default MiddlewareContainer;