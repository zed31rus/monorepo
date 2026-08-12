import BaseLib, { type BaseLibArgs } from '../../base.js';
import { type i18n, type Resource, createInstance } from 'i18next';

export default class I18n extends BaseLib {
	private instance: i18n;

	private constructor(...baseLibArgs: BaseLibArgs) {
		super(...baseLibArgs);
		this.instance = createInstance();
	}

	static async create(locales: Resource, ...baseLibArgs: BaseLibArgs) {
		const i18n = new I18n(...baseLibArgs);
		await i18n.init(locales);
		return i18n;
	}

	async init(locales: Resource) {
		await this.instance.init({
			fallbackLng: 'en',
			resources: locales,
			defaultNS: 'translation',
		});
	}

	t(...args: Parameters<i18n['t']>) {
		return this.instance.t(...args);
	}
}
