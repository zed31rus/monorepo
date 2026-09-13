import type CommandDeployer from '#core/deployers/command.js';

export default class DeployerContainer {
	constructor(readonly command: CommandDeployer) {}
}
