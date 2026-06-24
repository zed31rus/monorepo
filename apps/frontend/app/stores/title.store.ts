import { defineStore } from 'pinia';
import useNotificationStore from './notifications.store';

const useTitleStore = defineStore('title', {
	state: () => ({
		currentPageTitle: '',
	}),
	actions: {
		init() {
			const notificationsStore = useNotificationStore();

			useHead({
				title: () => {
					if (notificationsStore.items.length > 0)
						return `(${notificationsStore.items.length}) zed31rus | ${this.currentPageTitle}`;
					else return `zed31rus | ${this.currentPageTitle}`;
				},
			});
		},
		setCurrentPageTitle(title: string) {
			this.currentPageTitle = title;
		},
		setDynamicTitle() {},
	},
});

export default useTitleStore;
