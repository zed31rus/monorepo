import 'i18next';
import ru from '#localisations/ru.json';
import enUs from '#localisations/en-Us.json';

declare module 'i18next' {
	interface CustomTypeOptions {
		defaultNS: 'ru';
		resources: {
			ru: typeof ru;
			'en-US': typeof enUs;
		};
	}
}

export {};
