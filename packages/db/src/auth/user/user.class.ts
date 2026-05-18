import { type RawUser } from '../auth.db.js';
import GetUser from './classes/getUser.js';
import CreateUsers from './classes/createUser.js';
import UpdateUsers from './classes/updateUser.js';
import z from 'zod';

const PublicUserFields = ['uuid', 'nickname', 'avatar', 'createdAt'] as const;
const PersonalUserFields = [
    ...PublicUserFields,
    'login',
    'email',
    'allowLoginFind',
    'allowEmailFind',
    'emailConfirmed',
    'isAdmin',
] as const;

class Users {
    get = new GetUser();
    create = new CreateUsers();
    update = new UpdateUsers();

    toPublicJSON(user: RawUser): PublicUser {
        return this.select(user, PublicUserFields) as PublicUser;
    }

    toPersonalJSON(user: RawUser): PersonalUser {
        return this.select(user, PersonalUserFields) as PersonalUser;
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
}

export type PublicUser = Pick<RawUser, (typeof PublicUserFields)[number]>;
export type PersonalUser = Pick<RawUser, (typeof PersonalUserFields)[number]>;

export default Users;
