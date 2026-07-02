import { NotificationsTypes } from '~/types/notification';

export default function getTypeColor(type: NotificationsTypes) {
	const colors = {
		[NotificationsTypes.info]: 'bg-info',
		[NotificationsTypes.error]: 'bg-error',
		[NotificationsTypes.warn]: 'bg-warn',
	};
	return colors[type] || 'bg-neutral';
}
