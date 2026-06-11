import amqp from 'amqplib';
import BaseInfra, { type BaseInfraArgs } from '../infra.base.js';

export enum RabbitMqQueues {
	oauthRegisteredNewUser = 'oauthRegisteredNewUser',
}

export default class RabbitMqInfra extends BaseInfra {
	private static instance: RabbitMqInfra | null = null;
	private initPromise: Promise<void>;

	private connection!: amqp.ChannelModel;
	private oauthChannel!: amqp.Channel;

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
		this.oauthChannel = await this.connection.createChannel();
		await this.oauthChannel.assertQueue(RabbitMqQueues.oauthRegisteredNewUser, {
			durable: true,
		});
	}

	async send<K extends keyof RabbitQueues>(queue: K, ...data: RabbitQueues[K]) {
		await this.initPromise;
		const payload = Array.isArray(data) ? data : [data];

		this.oauthChannel.sendToQueue(queue, Buffer.from(JSON.stringify(payload)), {
			persistent: true,
		});
	}

	async on<K extends keyof RabbitQueues>(
		queueName: K,
		onMessage: (...data: RabbitQueues[K]) => Promise<void> | void
	) {
		await this.initPromise;

		await this.oauthChannel.assertQueue(queueName, { durable: true });

		await this.oauthChannel.consume(
			queueName,
			async (msg) => {
				if (!msg) return;

				try {
					const data: RabbitQueues[K] = JSON.parse(msg.content.toString());

					await onMessage(...data);

					this.oauthChannel.ack(msg);
				} catch (error) {
					this.logger.error(`Ошибка обработки очереди ${queueName}:`, error);
					this.oauthChannel.nack(msg, false, true);
				}
			},
			{ noAck: false }
		);
	}
}

export interface RabbitQueues {
	oauthRegisteredNewUser: [uuid: string];
}
