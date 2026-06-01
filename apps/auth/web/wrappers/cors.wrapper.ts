import BaseWrapper, { type BaseWrapperArgs } from '#web/base/wrapper.base.js';
import { cors } from 'hono/cors';

export default class CorsWrapper extends BaseWrapper {
	constructor(...baseArgs: BaseWrapperArgs) {
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
