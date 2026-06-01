import BaseServer from '#web/base/server.base.js';
import { serve } from '@hono/node-server';
import { swaggerUI } from '@hono/swagger-ui';

export default class InternalServer extends BaseServer {
	configure() {
		this.server.use(this.wrappers.cors.internal());

		this.server.openAPIRegistry.registerComponent('securitySchemes', 'internalToken', {
			type: 'apiKey',
			in: 'header',
			name: 'X-Internal-Token',
		});

		this.server.onError(this.handlers.error.errorHander.bind(this.handlers.error));

		this.server.route('/users', this.modules.internal.users.router);
		this.server.doc('/doc', {
			openapi: '3.0.0',
			info: {
				version: '1.0.0',
				title: 'auth.zed31rus.ru internal api',
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
