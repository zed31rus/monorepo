import BaseInstance, { type BaseInstanceArgs } from '../base/instance.js';
import SpotifyWebApi from 'spotify-web-api-node';

class SpotifyApiInstance extends BaseInstance {
	public client!: SpotifyWebApi;
	private static instance: SpotifyApiInstance | null = null;

	private constructor(...baseArgs: BaseInstanceArgs) {
		super(...baseArgs);
	}

	static async getInstance(...baseArgs: BaseInstanceArgs): Promise<SpotifyApiInstance> {
		if (!SpotifyApiInstance.instance) {
			const newInstance = new SpotifyApiInstance(...baseArgs);
			await newInstance.init();
			SpotifyApiInstance.instance = newInstance;
		}

		return SpotifyApiInstance.instance;
	}

	private async init() {
		this.client = new SpotifyWebApi({
			clientId: this.config.env.SPOTIFY_CLIENT_ID,
			clientSecret: this.config.env.SPOTIFY_CLIENT_SECRET,
			refreshToken: this.config.env.SPOTIFY_REFRESH_TOKEN,
		});
		const data = await this.client.refreshAccessToken();

		this.client.setAccessToken(data.body['access_token']);
	}
}

export default SpotifyApiInstance;
