import * as DiscordOauths from './src/oauth/discord.js';
import * as Oauths from './src/oauth.js';
import * as Accounts from './src/account.js';
import * as RabbitMqs from './src/rabbitmq.js';

export import Discord = DiscordOauths;
export import Providers = Oauths.Providers;
export import OtpTypes = Accounts.OtpTypes;
export type OauthQueues = RabbitMqs.OauthQueues;
export type MailQueues = RabbitMqs.MailQueues;
