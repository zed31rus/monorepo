import type { ReactNode } from 'react';
import { render } from 'react-email';

export default class RenderManager {
	async renderMail(node: ReactNode) {
		return await render(node);
	}
}
