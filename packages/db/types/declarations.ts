import type { Features } from '@zed31rus/types/features.discordBot.js';

declare global {
  namespace PrismaJson {
    type features =
      | {
          [Features.serverName]: {
            status: boolean;
            settings: {};
          };
          [Features.voice]: {
            status: boolean;
            settings: {
              channelId: string;
            };
          };
        }
      | {};
  }
}

export {};
