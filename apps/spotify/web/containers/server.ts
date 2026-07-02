import type ExternalServer from '#web/servers/external.js';

export default class ServerContainer {
	constructor(readonly external: ExternalServer) {}
}
