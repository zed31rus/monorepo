import type PlaylistService from '../services/playlist.js';

export default class ServicesContainer {
	constructor(readonly playlist: PlaylistService) {}
}
