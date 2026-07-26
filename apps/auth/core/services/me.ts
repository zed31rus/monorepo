import BaseService from '#core/base/service.js';
import { projectDir } from '#root/start.js';
import path from 'node:path';
import fs from 'node:fs';
import { type PersonalUser, type PublicUser } from '@packages/db';

export default class MeService extends BaseService {
	async get(publicUser: PublicUser): Promise<{ user: PersonalUser }> {
		const rawUser = await this.db.users.get.orThrow.byPublicUser(this.db.client, publicUser);
		const personalUser = this.db.users.toPersonalJSON(rawUser);
		return { user: personalUser };
	}

	async updateNickname(publicUser: PublicUser, newNickName: PublicUser['nickname']) {
		const rawUser = await this.db.users.get.orThrow.byPublicUser(this.db.client, publicUser);
		const newRawUser = await this.db.users.update.setNickname(
			this.db.client,
			rawUser,
			newNickName
		);
		const newPersonalUser = this.db.users.toPersonalJSON(newRawUser);
		return { user: newPersonalUser };
	}

	async updateEmailFind(publicUser: PublicUser, allowEmailFind: PersonalUser['allowEmailFind']) {
		const rawUser = await this.db.users.get.orThrow.byPublicUser(this.db.client, publicUser);
		const newRawUser = await this.db.users.update.setAllowEmailFind(
			this.db.client,
			rawUser,
			allowEmailFind
		);
		const newPersonalUser = this.db.users.toPersonalJSON(newRawUser);
		return { user: newPersonalUser };
	}

	async updateLoginFind(publicUser: PublicUser, allowLoginFind: PersonalUser['allowLoginFind']) {
		const rawUser = await this.db.users.get.orThrow.byPublicUser(this.db.client, publicUser);
		const newRawUser = await this.db.users.update.setAllowLoginFind(
			this.db.client,
			rawUser,
			allowLoginFind
		);
		const newPersonalUser = this.db.users.toPersonalJSON(newRawUser);
		return { user: newPersonalUser };
	}

	async updateAvatar(publicUser: PublicUser, avatar: File) {
		const avatarArrayBuffer = await avatar.arrayBuffer();

		const fileName = `${publicUser.uuid}${path.extname(avatar.name)}`;
		const publicDirPath = this.config.env.PUBLIC_DIR_PATH;
		const avatarsPublicPathDir = this.config.env.AVATARS_PUBLIC_DIR_PATH;
		const avatarAbsolutePath = path.join(
			projectDir,
			publicDirPath,
			avatarsPublicPathDir,
			fileName
		);

		await fs.promises.writeFile(avatarAbsolutePath, Buffer.from(avatarArrayBuffer));

		const rawUser = await this.db.users.get.orThrow.byPublicUser(this.db.client, publicUser);

		const newRawUser = await this.db.users.update.setAvatar(this.db.client, rawUser, fileName);

		const newPersonalUser = this.db.users.toPersonalJSON(newRawUser);

		return { user: newPersonalUser };
	}
}
