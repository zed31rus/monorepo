import authDB from './auth/auth.js';
import DiscordBotDB from './discordBot/db.js';
import SpotifyDB from './spotify/spotify.db.js';

class DbContainer {
	static auth = authDB;
	static discordBot = DiscordBotDB;
	static spotify = SpotifyDB;
}

export type authDb = authDB;
export type discordbotDb = DiscordBotDB;

export default DbContainer;
