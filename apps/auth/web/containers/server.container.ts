import PublicServer from '#web/servers/public.server.js';

class ServerContainer {
	constructor(public mainServer: PublicServer) {}
}

export type ServerContainerArgs = ConstructorParameters<typeof ServerContainer>;

export default ServerContainer;
