import SettingsFeatureGuildDiscordBotDbCase from './cases/settings.js';
import StatusFeatureGuildDiscordBotDbCase from './cases/status.js';

export default class FeaturesGuildDiscordBotDb {
	readonly settings = new SettingsFeatureGuildDiscordBotDbCase();
	readonly status = new StatusFeatureGuildDiscordBotDbCase();
}
