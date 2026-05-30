import BaseServer from '#web/base/server.base.js';
import { logger } from 'hono/logger';
import { swaggerUI } from '@hono/swagger-ui';
import { serve } from '@hono/node-server';

export default class PublicServer extends BaseServer {
	configure() {
		this.servers.use(this.wrappers.cors.cors());

		this.servers.use(logger());

		this.servers.openAPIRegistry.registerComponent('securitySchemes', 'authBearer', {
			type: 'apiKey',
			in: 'Bearer',
			name: 'accessToken',
		});

		this.servers.onError(this.handlers.error.errorHander.bind(this.handlers.error));

		this.servers.route('/auth', this.modules.main.auth.router);
		this.servers.route('/account', this.modules.main.account.router);
		this.servers.route('/me', this.modules.main.me.router);
		this.servers.route('/user', this.modules.main.users.router);
		this.servers.route('/oauth2/discord', this.modules.main.oauth.discord.router);
		this.servers.doc('/doc', {
			openapi: '3.0.0',
			info: {
				version: '1.0.0',
				title: 'auth.zed31rus.ru api',
			},
		});
		this.servers.get('/doc/ui', swaggerUI({ url: '/doc' }));
	}

	start(port: number) {
		return serve(
			{
				fetch: this.servers.fetch,
				port: port,
			},
			(info) => {
				console.log(`http://localhost:${info.port}`);
			}
		);
	}
}
