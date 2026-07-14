/* eslint-disable @typescript-eslint/no-namespace */
import type { Features } from '@zed31rus/types';

declare global {
	namespace PrismaJson {
		type features = {
			[Features.serverName]: { status: true; settings: { name: string } } | { status: false };
			[Features.voice]: { status: true; settings: { channelId: string } } | { status: false };
		};
	}
}

export type PrismaJsonFeatures = PrismaJson.features;

export {};
