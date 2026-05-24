import SessionWebManager from '#root/web/managers/session.manager.js';

class WebManagerContainer {
	constructor(readonly session: SessionWebManager) {}
}

export type WebManagerContainerArgs = ConstructorParameters<typeof WebManagerContainer>;

export default WebManagerContainer;
