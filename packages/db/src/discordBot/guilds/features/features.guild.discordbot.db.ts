import AddFeatureGuildDiscordBotDbCase from './cases/add.feature.guild.db.case.js';
import DeleteFeatureGuildDiscordBotDbCase from './cases/delete.feature.guild.db.case.js';

export default class FeaturesGuildDiscordBotDb {
    readonly add = new AddFeatureGuildDiscordBotDbCase();
    readonly delete = new DeleteFeatureGuildDiscordBotDbCase();
}
