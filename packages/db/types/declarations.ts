import type { Features } from '@zed31rus/types/features.discordBot.js';

declare global {

  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace PrismaJson {
    type features = {
      [Features.serverName]: {
        status: boolean;
        settings: object;
      };
      [Features.voice]: {
        status: boolean;
        settings: {
          channelId: string;
        };
      };
    };
  }
}

export type PrismaJsonFeatures = PrismaJson.features

export {};
