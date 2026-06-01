import BaseHandler from '#web/base/handler.base.js';
import { type AvatarEnv } from '#web/types/Env.d.js';
import { type PublicUser } from '@packages/db';

export default class FileHandler extends BaseHandler {
	public ValidAvatar<T extends AvatarEnv>(params: { user: PublicUser }) {
		return this.createFactory<T>().createHandlers(
			this.wrappers.validator.validate('form', this.dto.file.avatarSchema),
			this.middlewares.file.withAvatar<T>(params.user)
		);
	}
}
