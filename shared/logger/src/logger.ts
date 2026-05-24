import winston from 'winston';
import BaseLogger from './base.logger.js';

class Logger extends BaseLogger {
	private mainLogger: winston.Logger;
	appLogger: winston.Logger;

	constructor(appName: string) {
		super();
		this.mainLogger = winston.createLogger({
			level: 'info',
			format: winston.format.combine(
				winston.format.errors({ stack: true }),
				winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' })
			),
			transports: [new winston.transports.Console()],
		});

		this.appLogger = this.mainLogger.child({ app: appName });
	}

	static appLogger = winston.createLogger().child({ app: '' });
}

export type AppLogger = InstanceType<typeof Logger>['appLogger'];

export default Logger;
