import BaseServer from '#web/base/server.base.js';
import { serve } from '@hono/node-server';

export default class InternalServer extends BaseServer {
	configureWebServer() {}
	startWebServer(port: number) {
		return serve(
			{
				fetch: this.servers.fetch,
				port: port,
			},
			(info) => {
				this.logger.info(`internalServer started at: http://localhost:${info.port}`);
			}
		);
	}
}
