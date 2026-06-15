import { type RawUser } from '../auth.db.js';
import GetUser from './cases/getUser.db.case.js';
import CreateUsers from './cases/createUser.db.case.js';
import UpdateUsers from './cases/updateUser.db.case.js';
import z from 'zod';

const publicUserFields = ['uuid', 'nickname', 'avatar', 'createdAt'] as const;
const personalUserFields = [
	...publicUserFields,
	'login',
	'email',
	'allowLoginFind',
	'allowEmailFind',
	'emailConfirmed',
	'isAdmin',
] as const;
const internalUserFields = [...personalUserFields, 'updatedAt', 'oauthAccounts'] as const;

class Users {
	get = new GetUser();
	create = new CreateUsers();
	update = new UpdateUsers();

	toPublicJSON(user: RawUser): PublicUser {
		return this.select(user, publicUserFields) as PublicUser;
	}

	toPersonalJSON(user: RawUser): PersonalUser {
		return this.select(user, personalUserFields) as PersonalUser;
	}

	toInternalJSON(user: RawUser): InternalUser {
		return this.select(user, internalUserFields) as InternalUser;
	}

	private select<T extends keyof RawUser>(user: RawUser, fields: readonly T[]): Pick<RawUser, T> {
		return fields.reduce(
			(acc, field) => {
				if (field in user) {
					acc[field] = user[field];
				}
				return acc;
			},
			{} as Pick<RawUser, T>
		);
	}

	PublicUserSchema = z.object({
		uuid: z.string(),
		nickname: z.string(),
		avatar: z.string().nullable(),
		createdAt: z.date(),
	});

	PersonalUserSchema = this.PublicUserSchema.extend({
		login: z.string(),
		email: z.email(),
		allowLoginFind: z.boolean(),
		allowEmailFind: z.boolean(),
		emailConfirmed: z.boolean(),
		isAdmin: z.boolean(),
	});

	InternalUserSchema = this.PersonalUserSchema.extend({
		updatedAt: z.date(),
	});
}

export type PublicUser = Pick<RawUser, (typeof publicUserFields)[number]>;
export type PersonalUser = Pick<RawUser, (typeof personalUserFields)[number]>;
export type InternalUser = Pick<RawUser, (typeof internalUserFields)[number]>;

export default Users;
