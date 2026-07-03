import type ExternalServer from '#web/servers/external.js';
import type InternalWebServer from '#web/servers/internal.js';

class WebServerContainer {
	constructor(
		public externalServer: ExternalServer,
		public internalServer: InternalWebServer
	) {}
}

export default WebServerContainer;
