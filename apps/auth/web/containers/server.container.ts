import MainServer from '#web/servers/main.server.js';

class ServerContainer {
	constructor(public mainServer: MainServer) {}
}

export type ServerContainerArgs = ConstructorParameters<typeof ServerContainer>;

export default ServerContainer;
