import AccountModule from "#web/modules/account.module.js";
import AuthModule from "#web/modules/auth.module.js";
import MeModule from "#web/modules/me.module.js";
import DiscordOauthModule from "#web/modules/oauth/discord.oauth.module.js";
import UsersModule from "#web/modules/users.module.js";

class ModuleContainer {
    constructor(
        readonly account: AccountModule,
        readonly auth: AuthModule,
        readonly me: MeModule,
        readonly users: UsersModule,
        readonly oauth: {
            discord: DiscordOauthModule
        }
    ) {}
}

namespace ModuleContainer {
    export type Args = ConstructorParameters<typeof ModuleContainer>
}

export default ModuleContainer