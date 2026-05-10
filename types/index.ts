import * as DiscordOauths from './src/oauth/discord.js';
import * as Oauths from './src/oauth.js';
import * as Accounts from './src/account.js';
import * as RabbitMqs from './src/rabbitmq.js';

class Types {
    
}

namespace Types {
    
    export namespace Oauth {
        export import Discord = DiscordOauths
        export import Providers = Oauths.Providers
    }

    export namespace Account {
        export import OtpTypes = Accounts.OtpTypes
    }

    export namespace RabbitMq {
        export type OauthQueues = RabbitMqs.OauthQueues;
        export type MailQueues = RabbitMqs.MailQueues
    }

}

export default Types