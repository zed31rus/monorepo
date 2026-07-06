import { type SessionType } from '#core/managers/session.js';
import BaseWebManager from '#web/base/manager.js';
import { type Context } from 'hono';
import { deleteCookie, setCookie } from 'hono/cookie';

export default class SessionWebManager extends BaseWebManager {
	sendSession(c: Context, session: SessionType) {
		setCookie(c, 'refreshToken', session.refresh.token, {
			//domain: '.zed31rus.ru',
			path: '/',
			httpOnly: true,
			sameSite: 'lax',
			//secure: true,
			secure: false,
			expires: session.refresh.expires.atTime,
		});

		setCookie(c, 'accessToken', session.access.token, {
			//domain: '.zed31rus.ru',
			path: '/',
			httpOnly: false,
			sameSite: 'lax',
			//secure: true,
			secure: false,
			expires: session.access.expires.atTime,
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

		deleteCookie(c, 'accessToken', {
			//domain: '.zed31rus.ru',
			path: '/',
			httpOnly: false,
			sameSite: 'lax',
			//secure: true,
			secure: false,
		});
	}
}
