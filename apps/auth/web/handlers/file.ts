import BaseWebHandler from '#web/base/handler.js';
import { type AvatarEnv } from '#web/types/Env.js';
import { type PublicUser } from '@packages/db';

export default class FileWebHandler extends BaseWebHandler {
	public ValidAvatar<T extends AvatarEnv>(params: { user: PublicUser }) {
		return this.createFactory<T>().createHandlers(
			this.wrappers.validator.validate('form', this.dto.file.avatarSchema),
			this.middlewares.file.withAvatar<T>(params.user)
		);
	}
}
