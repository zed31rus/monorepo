import type { NotificationsTypes } from '~/types/notification';

export default class AppNotification extends EventTarget {
	readonly id: string = String(Math.floor(Math.random() * 1024));
	readonly content: {
		title: string;
		message: string;
		additional: string;
	};
	readonly type: NotificationsTypes;
	isAlive: boolean = true;
	action: CallbackType | null = null;

	private timeoutId: ReturnType<typeof setTimeout> | null = null;
	private duration: number;

	constructor(
		type: NotificationsTypes,
		content: { title: string; message: string; additional: string },
		action: CallbackType | null = null,
		duration: number
	) {
		super();
		this.content = content;
		this.type = type;
		this.duration = duration;
		this.action = action;

		this.start();
	}

	private start() {
		this.timeoutId = setTimeout(() => this.destroy(), this.duration);
	}

	pause() {
		if (!this.isAlive || !this.timeoutId) return;

		clearTimeout(this.timeoutId);
		this.timeoutId = null;
	}

	resume() {
		if (!this.isAlive || this.timeoutId) return;

		this.timeoutId = setTimeout(() => this.destroy(), 200);
	}

	destroy() {
		if (!this.isAlive) return;
		this.isAlive = false;

		if (this.timeoutId) {
			clearTimeout(this.timeoutId);
			this.timeoutId = null;
		}
		console.log('DESTROY');
		this.dispatchEvent(new Event('close'));
	}

	callback() {
		if (!this.isAlive || !this.action) return;

		this.action.fn();
		this.destroy();
	}
}

export type ActionType = (...args: unknown[]) => void;

export type CallbackType = {
	name: string;
	fn: ActionType;
};

export type AppNotificationType = AppNotification;
