import type { PublicUser } from '@packages/db';

export type OptionalUserEnv = {
	Variables: {
		user: PublicUser | null;
	};
};

export type UserEnv = OptionalUserEnv & {
	Variables: {
		user: PublicUser;
	};
};

export type AvatarEnv = {
	Variables: {
		avatarPath: string;
	};
};
