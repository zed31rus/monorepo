import Base, { type BaseArgs } from '@zed31rus/base';
import type LibContainer from '@packages/libs';
import type InfraContainer from '@packages/infra';
import type DbContainer from '@packages/db';

abstract class CoreBase extends Base {
	constructor(
		protected readonly db: InstanceType<(typeof DbContainer)['spotify']>,
		protected readonly libs: LibContainer,
		protected readonly infra: InfraContainer,
		...baseArgs: BaseArgs
	) {
		super(...baseArgs);
	}
}

export type CoreBaseArgs = ConstructorParameters<typeof CoreBase>;

export default CoreBase;
