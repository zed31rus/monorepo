import type { Features } from '@zed31rus/types';

declare global {
	// eslint-disable-next-line @typescript-eslint/no-namespace
	namespace PrismaJson {
		type features = {
			[Features.serverName]: { status: true; settings: { name: string } } | { status: false };
			[Features.voice]: { status: true; settings: { channelId: string } } | { status: false };
		};
	}
}

export type PrismaJsonFeatures = PrismaJson.features;

export {};
