import Base from '@zed31rus/base';
import { EventEmitter } from 'events';
import DBContainer from '@packages/db';
import { type Client } from 'discord.js';

abstract class BotBase extends Base {

    constructor(
        readonly client: Client,
        readonly events: EventEmitter,
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