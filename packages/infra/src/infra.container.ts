import DiscordOauthInfra from "./discord/oauth.discord.infra.js";
import RabbitMqInfra from "./rabbitmq/rabbitmq.infra.js";

export default class InfraContainer {
    constructor(
        readonly rabbitmq: RabbitMqInfra,
        readonly oauth: {
            discord: DiscordOauthInfra
        }
    ) {}

    static deps = { RabbitMqInfra, oauth: { discord: DiscordOauthInfra } }
}