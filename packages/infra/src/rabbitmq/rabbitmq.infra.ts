import amqp from 'amqplib';
import BaseInfra from '../infra.base.js';

export enum RabbitMqQueues {

    oauthRegisteredNewUser = 'oauthRegisteredNewUser'

};

export default class RabbitMqInfra extends BaseInfra {
    private static instance: RabbitMqInfra | null = null;
    private initPromise: Promise<void>;

    private connection!: amqp.ChannelModel;
    private oauthChannel!: amqp.Channel;

    private constructor(...baseArgs: BaseInfra.Args) {
        super(...baseArgs);
        this.initPromise = this.init();
    }

    static getInstance(...baseArgs: BaseInfra.Args) {
        if (!RabbitMqInfra.instance) {
            RabbitMqInfra.instance = new RabbitMqInfra(...baseArgs);
        }
        return RabbitMqInfra.instance;
    }

    private async init() {
        this.connection = await amqp.connect(this.config.env.AMQP_URL);
        this.oauthChannel = await this.connection.createChannel();
        await this.oauthChannel.assertQueue(RabbitMqQueues.oauthRegisteredNewUser, {
            durable: true,
        });
    }

    async sendOauthRegistered(data: any) {
        await this.initPromise;
        this.oauthChannel.sendToQueue(
            RabbitMqQueues.oauthRegisteredNewUser,
            Buffer.from(JSON.stringify(data)),
            { persistent: true }
        );
    }
}