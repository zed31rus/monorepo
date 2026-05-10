import Base from '@zed31rus/base';

abstract class BaseLib extends Base {
    constructor(...baseArgs: Base.Args) {
        super(...baseArgs)
    }
}

namespace BaseLib {
    export type Args = ConstructorParameters<typeof BaseLib>
}

export default BaseLib
