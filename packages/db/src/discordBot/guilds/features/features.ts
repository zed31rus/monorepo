import CreateFeatureGuildDiscordBotDbCase from './cases/create.js';
import DeleteFeatureGuildDiscordBotDbCase from './cases/delete.js';

export default class FeaturesGuildDiscordBotDb {
	readonly create = new CreateFeatureGuildDiscordBotDbCase();
	readonly delete = new DeleteFeatureGuildDiscordBotDbCase();
}
