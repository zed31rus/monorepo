import type SpotifyApiInstance from '../instances/spotify.js';

export default class InstancesContainer {
	constructor(readonly SpotifyApi: SpotifyApiInstance) {}
}
