import Base, { type BaseArgs } from '@zed31rus/base';
import DBContainer from '@packages/db';
import type LibContainer from '@packages/libs';
import type InfraContainer from '@packages/infra';

abstract class CoreBase extends Base {
	constructor(
		protected readonly db: InstanceType<typeof DBContainer>['auth'],
		protected readonly libs: LibContainer,
		protected readonly infra: InfraContainer,
		...baseArgs: BaseArgs
	) {
		super(...baseArgs);
	}
}

export type CoreBaseArgs = ConstructorParameters<typeof CoreBase>;

export default CoreBase;
