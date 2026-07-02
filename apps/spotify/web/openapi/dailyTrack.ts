import BaseOpenAPI from '#web/base/openapi.js';
import { createRoute, z } from '@hono/zod-openapi';

export default class DailyTrackOpenAPI extends BaseOpenAPI {
	get = createRoute({
		method: 'get',
		path: '/get',
		description: 'Returns the data of the current daily spotify track.',

		responses: {
			200: {
				description: 'Returns the raw response from the Spotify Web API.',
				content: {
					'application/json': {
						schema: z.any(),
					},
				},
			},
			...this.commonResponses,
		},
	});
}
