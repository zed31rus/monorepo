import BotBase, { type BotBaseArgs } from "./base.js";

abstract class BaseService extends BotBase {
    constructor(
        botBaseArgs: BotBaseArgs
    ) {
        super(...botBaseArgs)
    }
}

export type BaseServiceArgs = ConstructorParameters<typeof BaseService>

export default BaseService;