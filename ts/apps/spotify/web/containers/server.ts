import type ExternalWebServer from '#web/servers/external.js';

export default class WebServerContainer {
	constructor(readonly external: ExternalWebServer) {}
}
