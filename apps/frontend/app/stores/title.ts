import { defineStore } from 'pinia';
import useNotificationStore from './notifications';

const useTitleStore = defineStore('title', {
	state: () => ({
		currentPageTitle: '',
	}),
	actions: {
		init() {
			const notificationsStore = useNotificationStore();

			useHead({
				title: () => {
					const count = notificationsStore.items.length;
					const title = this.currentPageTitle;

					return `${count ? `(${count}) ` : ''}zed31rus.ru${title ? ` | ${title}` : ''}`;
				},
			});
		},
		setCurrentPageTitle(title: string) {
			this.currentPageTitle = title;
		},
	},
});

export default useTitleStore;
