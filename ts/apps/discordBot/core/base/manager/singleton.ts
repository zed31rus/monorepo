import BaseManager, { type BaseManagerArgs } from './base.js';

abstract class BaseSingletonManager extends BaseManager {
	constructor(...botBaseArgs: BaseSingletonManagerArgs) {
		super(...botBaseArgs);
	}

	static async create<T extends BaseSingletonManager>(
		this: new (...args: BaseManagerArgs) => T,
		...baseManagerArgs: BaseManagerArgs
	): Promise<T> {
		const manager = new this(...baseManagerArgs);
		await manager.init();
		return manager;
	}

	abstract init(): Promise<void>;
}

export type BaseSingletonManagerArgs = Parameters<typeof BaseSingletonManager.create>;

export default BaseSingletonManager;
