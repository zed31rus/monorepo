import 'i18next';
import ru from '#localisations/ru.json';

declare module 'i18next' {
	interface CustomTypeOptions {
		defaultNS: 'ru';
		resources: {
			ru: typeof ru;
		};
	}
}

export {};
