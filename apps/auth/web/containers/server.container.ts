import type ExternalServer from '#web/servers/external.server.js';
import type InternalServer from '#web/servers/internal.server.js';

class ServerContainer {
	constructor(
		public externalServer: ExternalServer,
		public internalServer: InternalServer
	) {}
}

export type ServerContainerArgs = ConstructorParameters<typeof ServerContainer>;

export default ServerContainer;
