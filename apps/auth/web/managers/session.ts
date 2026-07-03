import { type SessionType } from '#core/managers/session.js';
import BaseWebManager from '#web/base/manager.js';
import { type Context } from 'hono';
import { deleteCookie, setCookie } from 'hono/cookie';

export default class SessionWebManager extends BaseWebManager {
	sendSession(c: Context, refresh: SessionType['refresh']) {
		setCookie(c, 'refreshToken', refresh.token, {
			//domain: '.zed31rus.ru',
			path: '/',
			httpOnly: true,
			sameSite: 'lax',
			//secure: true,
			secure: false,
			expires: refresh.expires.atTime,
		});
	}

	deleteSession(c: Context) {
		deleteCookie(c, 'refreshToken', {
			//domain: '.zed31rus.ru',
			path: '/',
			httpOnly: true,
			sameSite: 'lax',
			//secure: true,
			secure: false,
		});
	}
}
