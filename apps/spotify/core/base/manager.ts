import type { CoreBaseArgs } from '#core/base/core.js';
import type InstancesContainer from '#core/containers/instances.js';
import CoreBase from './core.js';

export default abstract class BaseManager extends CoreBase {
	constructor(
		protected readonly instances: InstancesContainer,
		...coreBaseArgs: CoreBaseArgs
	) {
		super(...coreBaseArgs);
	}
	protected async executeSpotify<T>(apiCall: () => Promise<T>, attempts = 2): Promise<T> {
		try {
			return await apiCall();
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			const isUnauthorized = error?.statusCode === 401 || error?.message?.includes('token');

			if (isUnauthorized && attempts > 1) {
				const refreshResponse = await this.instances.SpotifyApi.client.refreshAccessToken();

				this.instances.SpotifyApi.client.setAccessToken(
					refreshResponse.body['access_token']
				);

				return await this.executeSpotify(apiCall, attempts - 1);
			}

			throw error;
		}
	}
}

export type BaseManagerArgs = ConstructorParameters<typeof BaseManager>;
