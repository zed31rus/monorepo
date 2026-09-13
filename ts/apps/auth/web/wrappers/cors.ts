import BaseWebWrapper, { type BaseWebWrapperArgs } from '#web/base/wrapper.js';
import { cors } from 'hono/cors';

export default class CorsWebWrapper extends BaseWebWrapper {
	constructor(...baseArgs: BaseWebWrapperArgs) {
		super(...baseArgs);
	}

	external() {
		return cors({
			origin: (origin) => {
				if (
					!origin ||
					origin == 'https://zed31rus.ru' ||
					origin.endsWith('.zed31rus.ru') ||
					origin == 'http://localhost:3000'
				) {
					return origin;
				}
				return null;
			},
			credentials: true,
		});
	}

	internal() {
		return cors({
			origin: (origin) => {
				if (origin) {
					return null;
				}
			},
		});
	}
}
