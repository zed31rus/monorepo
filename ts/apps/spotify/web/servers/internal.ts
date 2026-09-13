import BaseWebServer from '#web/base/server.js';
import { serve } from '@hono/node-server';
import { swaggerUI } from '@hono/swagger-ui';

export default class ExternalWebServer extends BaseWebServer {
	configure() {
		this.server.use(this.wrappers.cors.external());

		this.server.onError(this.handlers.error.errorHander.bind(this.handlers.error));

		this.server.doc('/doc', {
			openapi: '3.0.0',
			info: {
				version: '1.0.0',
				title: 'spotify.zed31rus.ru internal api',
			},
		});
		this.server.get('/doc/ui', swaggerUI({ url: '/doc' }));
	}
	start(port: number) {
		return serve(
			{
				fetch: this.server.fetch,
				port: port,
			},
			(info) => {
				this.logger.info(`internalServer started at: http://localhost:${info.port}`);
			}
		);
	}
}
