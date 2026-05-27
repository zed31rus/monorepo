import BaseModule from '#web/base/module.base.js';
import type { UserEnv } from '#web/types/Env.js';

export type UsersInternalEnv = UserEnv & {};

export default class UsersInternalModule extends BaseModule<UsersInternalEnv> {
	protected init() {}
}
