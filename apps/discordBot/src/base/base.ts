import Base from '@zed31rus/base';
import { EventEmitter } from 'events';
import DBContainer from '@packages/db';

abstract class BotBase extends Base {
    events: EventEmitter

    constructor(
        events: EventEmitter,
        protected readonly db: InstanceType<typeof DBContainer>['discordBot'],
        ...baseArgs: Base.Args
    ) {
        super(...baseArgs)
        this.events = events
    }
}

namespace BotBase {
    export type Args = ConstructorParameters<typeof BotBase>
}

export default  BotBase;