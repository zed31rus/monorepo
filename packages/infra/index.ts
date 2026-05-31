import InfraContainer from './src/infra.container.js';
import {
	type DiscordOauthTokenReply as DOTR,
	type DiscordOauthExchangeReply as DOER,
} from './src/discord/oauth.discord.infra.js';
import { type DiscordUsersMeReply as DUMR } from './src/discord/users.discord.infra.js';
import { type RabbitFromAuthQueues as RFAQ } from './src/rabbitmq/rabbitmq.infra.js';

export default InfraContainer;

export type DiscordOauthTokenReply = DOTR;
export type DiscordOauthExchangeReply = DOER;
export type DiscordUsersMeReply = DUMR;
export type RabbitFromAuthQueues = RFAQ;
