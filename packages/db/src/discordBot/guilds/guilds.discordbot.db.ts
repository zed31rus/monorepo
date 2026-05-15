import CreateGuildDbCase from "./cases/create.guild.discordbot.db.case.js";
import DeleteGuildDbCase from "./cases/delete.guild.discordbot.db.case.js";
import GetGuildDbCase from "./cases/get.guild.discordbot.db.case.js";
import FeaturesGuildDiscordBotDb from "./features/features.guild.discordbot.db.js";

export default class GuildsDiscordBotDb {
    readonly features = new FeaturesGuildDiscordBotDb();
    readonly create = new CreateGuildDbCase();
    readonly delete = new DeleteGuildDbCase();
    readonly get = new GetGuildDbCase();
}