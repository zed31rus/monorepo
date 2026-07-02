import CreateGuildDbCase from './cases/create.js';
import DeleteGuildDbCase from './cases/delete.js';
import GetGuildDbCase from './cases/get.js';
import FeaturesGuildDiscordBotDb from './features/features.js';

export default class GuildsDiscordBotDb {
	readonly features = new FeaturesGuildDiscordBotDb();
	readonly create = new CreateGuildDbCase();
	readonly delete = new DeleteGuildDbCase();
	readonly get = new GetGuildDbCase();
}
