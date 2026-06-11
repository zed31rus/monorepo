import winston from 'winston';
import BaseLogger from './base.logger.js';

class Logger extends BaseLogger {
	public appLogger: winston.Logger;

	constructor(appName: string) {
		super();

		const mainLogger = winston.createLogger({
			level: 'info',
			format: winston.format.combine(
				winston.format.errors({ stack: true }),
				winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
				winston.format.printf(({ timestamp, level, message, app, stack }) => {
					return `[${timestamp}] [${app}] ${level}: ${stack || message}`;
				})
			),
			transports: [new winston.transports.Console()],
		});

		this.appLogger = mainLogger.child({ app: appName });
	}
}

export type AppLogger = winston.Logger;

export default Logger;
