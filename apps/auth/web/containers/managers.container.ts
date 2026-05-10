import SessionWebManager from "#root/web/managers/session.manager.js";

class WebManagerContainer {
    constructor(
        readonly session: SessionWebManager,
    ) {}
}

namespace WebManagerContainer {
    export type Args = ConstructorParameters<typeof WebManagerContainer>
}

export default WebManagerContainer;