import BaseSlashSubcommand from './base.js';

export default abstract class BaseGuildSlashSubcommand extends BaseSlashSubcommand<'cached'> {}

export type BaseGuildSlashSubcommandArgs = ConstructorParameters<typeof BaseSlashSubcommand>;
