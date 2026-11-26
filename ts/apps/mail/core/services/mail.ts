import type { ReactNode } from 'react';

export default class MailService {
	async sendMailTo(from: string, to: string, mail: ReactNode, { ...args }) {}
}
