import { PublicUser } from "#coreLib/selector/user.selector";

export type OptionalUserEnv = {
    Variables: {
        user: PublicUser | null;
    }
};

export type UserEnv = OptionalUserEnv & {
    Variables: {
        user: PublicUser;
    }
};

export type AvatarEnv = {
    Variables: {
        avatarPath: string
    }
}

