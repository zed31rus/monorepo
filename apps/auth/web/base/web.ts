import Base from '@zed31rus/base';
import coreContainer from '#core/containers/index.js';

abstract class WebBase extends Base {
	constructor(protected readonly core: typeof coreContainer) {
		super(core.configs, core.logger, core.errors);
	}
}

export type WebBaseArgs = ConstructorParameters<typeof WebBase>;

export default WebBase;
