import type EventRouterInstance from '#core/instances/eventRouter.js';

export default class InstanceContaner {
	constructor(readonly eventRouter: EventRouterInstance) {}
}
