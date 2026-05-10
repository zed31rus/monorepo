import Base from "@zed31rus/base";

abstract class BaseInfra extends Base {
    constructor(

        ...baseArgs: Base.Args
    ) {
        super(...baseArgs)
    }
}

namespace BaseInfra {
    export type Args = ConstructorParameters<typeof BaseInfra>
}

export default BaseInfra;