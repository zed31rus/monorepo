import BaseLib, { type BaseLibArgs } from '../../base.js';
import { type i18n, type Resource, createInstance } from 'i18next';

export default class I18n extends BaseLib {
	instance: i18n;
	t: i18n['t'];

	private constructor(...baseLibArgs: BaseLibArgs) {
		super(...baseLibArgs);
		this.instance = createInstance();
		this.t = this.instance.t;
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
}
