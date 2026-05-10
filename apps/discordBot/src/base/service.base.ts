import BotBase from "./base";

abstract class BaseService extends BotBase {
    constructor(
        botBaseArgs: BotBase.Args
    ) {
        super(...botBaseArgs)
    }
}

namespace BaseService {
    export type Args = ConstructorParameters<typeof BaseService>
}

export default BaseService;