import { defineStore } from 'pinia';
import AppNotification, { type CallbackType } from '~/composables/notifications';
import { NotificationsTypes } from '~/types/notification';

const useNotificationStore = defineStore('notificationStore', {
	state: () => ({
		items: [] as AppNotification[],
	}),
	actions: {
		async checkPermission() {
			if (typeof window === 'undefined' || !('Notification' in window)) {
				return false;
			}

			const permission = Notification.permission;
			if (permission === 'granted') return true;
			if (permission === 'denied') return false;
			const res = await Notification.requestPermission();
			if (res === 'denied' || res === 'default') return false;
			return true;
		},

		async sendNotification(
			title: string,
			options: ConstructorParameters<typeof Notification>[1]
		) {
			if (typeof window === 'undefined' || !('Notification' in window)) {
				return;
			}

			if (await this.checkPermission()) {
				new Notification(title, options);
			}
		},

		async createNotification(
			type: NotificationsTypes,
			content: { title: string; message: string; additional: string },
			action: CallbackType | null = null,
			duration: number = 3000
		) {
			await this.checkPermission();
			const notification = new AppNotification(type, content, action, duration);

			this.items.unshift(notification);
			this.sendNotification(content.title, { body: content.message });

			notification.addEventListener(
				'close',
				() => {
					const index = this.items.indexOf(notification);
					if (index !== -1) this.items.splice(index, 1);
				},
				{ once: true }
			);

			return notification;
		},
	},
});

export default useNotificationStore;
export type notificationStoreType = ReturnType<typeof useNotificationStore>;
