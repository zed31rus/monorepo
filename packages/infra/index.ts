import InfraContainer from './src/container.js';
import {
	type DiscordOauthTokenReply as DOTR,
	type DiscordOauthExchangeReply as DOER,
} from './src/discord/oauth.js';
import { type DiscordUsersMeReply as DUMR } from './src/discord/users.js';
import { type RabbitQueues as RFAQ } from './src/rabbitmq/rabbitmq.js';

export default InfraContainer;

export type DiscordOauthTokenReply = DOTR;
export type DiscordOauthExchangeReply = DOER;
export type DiscordUsersMeReply = DUMR;
export type RabbitFromAuthQueues = RFAQ;
