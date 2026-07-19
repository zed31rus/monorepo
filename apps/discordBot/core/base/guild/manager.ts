import BaseManager, { type BaseManagerArgs } from '#core/base/manager.js';

export default abstract class BaseGuildManager extends BaseManager {
	constructor(
		readonly guildId: string,
		...baseManagerArgs: BaseManagerArgs
	) {
		super(...baseManagerArgs);
	}
}

export type BaseGuildManagerArgs =
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	ConstructorParameters<typeof BaseGuildManager> extends [any, ...infer Rest] ? Rest : [];
