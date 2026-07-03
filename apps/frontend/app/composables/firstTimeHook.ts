import useNotificationStore from '~/stores/notifications';
import { NotificationsTypes } from '~/types/notification';

export async function firstTimeHook() {
	await new Promise((resolve) => setTimeout(resolve, 1000));
	const isFirstTime = localStorage.getItem('isFirstTime');
	if (!isFirstTime) {
		const notificationStore = useNotificationStore();
		notificationStore.createNotification(NotificationsTypes.info, {
			title: 'Hello!',
			message: 'Welcome to zed31rus.ru. Hope you find something interesting here!',
			additional: 'zed31rus.ru',
		});
		localStorage.setItem('isFirstTime', 'true');
	}
}
