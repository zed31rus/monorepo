import BaseService from '#core/base/service.js';
import { projectDir } from '#root/start.js';
import type { PublicUser } from '@packages/db';
import path from 'node:path';
import fs from 'node:fs';

export default class FileService extends BaseService {
	async saveAvatar(user: PublicUser, avatar: File) {
		const avatarArrayBuffer = await avatar.arrayBuffer();

		const fileName = `${user.uuid}${path.extname(avatar.name)}`;
		const publicDirPath = this.config.env.PUBLIC_DIR_PATH;
		const avatarsPublicPathDir = this.config.env.AVATARS_PUBLIC_DIR_PATH;
		const avatarAbsolutePath = path.join(
			projectDir,
			publicDirPath,
			avatarsPublicPathDir,
			fileName
		);

		await fs.promises.writeFile(avatarAbsolutePath, Buffer.from(avatarArrayBuffer));
	}
}
