import nodemailer from 'nodemailer';

export default class MailManager {
	private static instance?: MailManager;
	private transporter = nodemailer.createTransport({
		host: 'smtp.example.com',
		port: 587,
		secure: false,
		auth: {
			user: process.env.SMTP_USER,
			pass: process.env.SMTP_PASS,
		},
	});

	private constructor() {}

	public static Create() {
		if (this.instance) {
			return this.instance;
		}

		const instance = new MailManager();
		return instance;
	}

	public SendMessage(message: string) {}
}
