import Base from "@zed31rus/base";

abstract class BaseDb extends Base {
    constructor(
        
        ...baseArgs: Base.Args
    ) {
        super(...baseArgs)
    }
}

namespace BaseDb {
    export type Args = ConstructorParameters<typeof BaseDb>
}

export default BaseDb