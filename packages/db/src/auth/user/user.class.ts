import authDB from "../auth.db.js"
import GetUser from "./classes/getUser.js";
import CreateUsers from "./classes/createUser.js";
import UpdateUsers from "./classes/updateUser.js";
import z from "zod";

const PublicUserFields = ['uuid', 'nickname', 'avatar', 'createdAt'] as const;
const PersonalUserFields = [...PublicUserFields, 'login', 'email', 'allowLoginFind', 'allowEmailFind', 'emailConfirmed', 'isAdmin'] as const;

class Users {
    get = new GetUser();
    create = new CreateUsers();
    update = new UpdateUsers();


    toPublicJSON(user: authDB.User.Raw): Users.PublicUser {
        return this.select(user, PublicUserFields) as Users.PublicUser;
    }

    toPersonalJSON(user: authDB.User.Raw): Users.PersonalUser {
        return this.select(user, PersonalUserFields) as Users.PersonalUser;;
    }

    private select<T extends keyof authDB.User.Raw>(user: authDB.User.Raw, fields: readonly T[]): Pick<authDB.User.Raw, T> {
        return fields.reduce((acc, field) => {
            if (field in user) {
                acc[field] = user[field];
            }
            return acc;
        }, {} as Pick<authDB.User.Raw, T>);
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

namespace Users {
    export type PublicUser = Pick<authDB.User.Raw, typeof PublicUserFields[number]>;
    export type PersonalUser = Pick<authDB.User.Raw, typeof PersonalUserFields[number]>;
}

export default Users;
