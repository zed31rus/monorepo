import BaseWebServer from '#web/base/server.js';
import { swaggerUI } from '@hono/swagger-ui';
import { serve } from '@hono/node-server';

export default class ExternalWebServer extends BaseWebServer {
	configure() {
		this.server.use(this.wrappers.cors.external());

		this.server.openAPIRegistry.registerComponent('securitySchemes', 'authBearer', {
			type: 'http',
			scheme: 'bearer',
			bearerFormat: 'JWT',
		});

		this.server.onError(this.handlers.error.errorHandler.bind(this.handlers.error));

		this.server.route('/oauth2/discord', this.modules.external.oauth.discord.router);
		this.server.route('/auth', this.modules.external.auth.router);
		this.server.route('/account', this.modules.external.account.router);
		this.server.route('/me', this.modules.external.me.router);
		this.server.route('/user', this.modules.external.users.router);
		this.server.doc('/doc', {
			openapi: '3.0.0',
			info: {
				version: '1.0.0',
				title: 'auth.zed31rus.ru public api',
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
				this.logger.info(`externalServer started at: http://localhost:${info.port}`);
			}
		);
	}
}
