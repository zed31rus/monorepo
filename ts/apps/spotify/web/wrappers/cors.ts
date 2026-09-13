import BaseWebWrapper from '#web/base/wrapper.js';
import { cors } from 'hono/cors';

export default class CorsWebWrapper extends BaseWebWrapper {
	external() {
		return cors({
			origin: (origin) => {
				if (
					origin === 'https://zed31rus.ru' ||
					origin === 'http://localhost:3000' ||
					origin?.endsWith('.zed31rus.ru')
				) {
					return origin;
				}
				return null;
			},
			credentials: true,
		});
	}
}
