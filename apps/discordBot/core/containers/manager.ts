import type ActivitySingletonManager from '#core/managers/activity.js';

export default class SingletonManagerContainer {
	constructor(readonly activity: ActivitySingletonManager) {}
}
