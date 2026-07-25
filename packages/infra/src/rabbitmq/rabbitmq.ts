import amqp from 'amqplib';
import BaseInfra, { type BaseInfraArgs } from '../base.js';

export enum RabbitExchanges {
	authEvents = 'auth.events',
}

export enum RabbitEvents {
	oauthRegisteredNewUser = 'oauth.registered.newUser',
}

export enum RabbitQueues {
	discordBot = 'discord.bot',
}

export interface RabbitMessages {
	[RabbitEvents.oauthRegisteredNewUser]: [uuid: string];
}

export interface MessageControl {
	ack: () => void;
	nack: (requeue?: boolean) => void;
}

export default class RabbitMqInfra extends BaseInfra {
	private static instance: RabbitMqInfra | null = null;
	private initPromise: Promise<void>;

	private connection!: amqp.ChannelModel;

	private constructor(...baseArgs: BaseInfraArgs) {
		super(...baseArgs);
		this.initPromise = this.init();
	}

	static getInstance(...baseArgs: BaseInfraArgs) {
		if (!RabbitMqInfra.instance) {
			RabbitMqInfra.instance = new RabbitMqInfra(...baseArgs);
		}

		return RabbitMqInfra.instance;
	}

	private async init() {
		this.connection = await amqp.connect(this.config.env.AMQP_URL);
	}

	private async getChannel() {
		await this.initPromise;

		return this.connection.createChannel();
	}

	async send<K extends keyof RabbitMessages>(event: K, ...data: RabbitMessages[K]) {
		const channel = await this.getChannel();

		await channel.assertExchange(RabbitExchanges.authEvents, 'topic', {
			durable: true,
		});

		channel.publish(RabbitExchanges.authEvents, event, Buffer.from(JSON.stringify(data)), {
			persistent: true,
		});

		await channel.close();
	}

	async on<K extends keyof RabbitMessages>(
		queueName: RabbitQueues,
		event: K,
		onMessage: (data: RabbitMessages[K], control: MessageControl) => Promise<void> | void
	) {
		const channel = await this.getChannel();

		await channel.assertExchange(RabbitExchanges.authEvents, 'topic', {
			durable: true,
		});

		await channel.assertQueue(queueName, {
			durable: true,
		});

		await channel.bindQueue(queueName, RabbitExchanges.authEvents, event);

		await channel.consume(
			queueName,
			async (msg) => {
				if (!msg) return;

				let settled = false;

				const control: MessageControl = {
					ack: () => {
						if (settled) return;

						settled = true;
						channel.ack(msg);
					},

					nack: (requeue = true) => {
						if (settled) return;

						settled = true;
						channel.nack(msg, false, requeue);
					},
				};

				const data = JSON.parse(msg.content.toString()) as RabbitMessages[K];

				await onMessage(data, control);
			},
			{
				noAck: false,
			}
		);
	}
}
