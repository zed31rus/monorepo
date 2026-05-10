import Base from "@zed31rus/base";
import DBContainer from "@packages/db";
import type LibContainer from "@packages/libs";
import type InfraContainer from "@packages/infra";

abstract class CoreBase extends Base {
    constructor(
        protected readonly db: InstanceType<typeof DBContainer>['auth'],
        protected readonly libs: LibContainer,
        protected readonly infra: InfraContainer,
        ...baseArgs: Base.Args
    ) {
        super(...baseArgs);
    }
}

namespace CoreBase {
    export type Args = ConstructorParameters<typeof CoreBase>
}

export default CoreBase