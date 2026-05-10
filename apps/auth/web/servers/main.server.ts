import BaseServer from "#web/base/server.base.js";
import { logger } from 'hono/logger'
import { swaggerUI } from '@hono/swagger-ui';
import { serve } from "@hono/node-server";

export default class MainServer extends BaseServer {
  configureWebServer() {

    this.server.use(this.wrapper.cors.cors());

    this.server.use(logger());

    this.server.openAPIRegistry.registerComponent('securitySchemes', 'authBearer', {
      type: 'apiKey',
      in: 'Bearer',
      name: 'accessToken'
    })

    this.server.onError(this.handler.error.errorHander.bind(this.handler.error));

    this.server.route('/auth', this.module.auth.router);
    this.server.route('/account', this.module.account.router);
    this.server.route('/me', this.module.me.router);
    this.server.route('/user', this.module.users.router);
    this.server.route('/oauth2/discord', this.module.oauth.discord.router);
    this.server.doc('/doc', {
      openapi: '3.0.0',
      info: {
        version: '1.0.0',
        title: 'auth.zed31rus.ru api',
      },  
    })
    this.server.get('/doc/ui', swaggerUI({ url: '/doc' }))
  };

  startWebServer(port: number) {
    return serve({
      fetch: this.server.fetch,
      port: port
    }, (info) => {
      console.log(`http://localhost:${info.port}`)
    })
  }
}