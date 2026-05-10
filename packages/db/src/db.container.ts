import authDBs from "./auth/auth.db.js";
import DiscordBotDBs from "./discordBot/discordbot.db.js";

class DbContainer {
    constructor(
        readonly auth: authDBs,
        readonly discordBot: DiscordBotDBs
    ) {}

    static deps = { authDB: authDBs, discordbotDB: DiscordBotDBs }
}

namespace DbContainer {
    export import authDB = authDBs
    export import discordbotDB = DiscordBotDBs
}

export default DbContainer

