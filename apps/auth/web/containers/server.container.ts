import MainServer from "#web/servers/main.server.js";

class ServerContainer {
    constructor(
        public mainServer: MainServer
    ) {}
}

namespace ServerContainer {
    export type Args = ConstructorParameters<typeof ServerContainer>
}

export default ServerContainer;