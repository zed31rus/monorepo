import path from 'node:path';
import { fileURLToPath } from 'node:url';
import Servers from '#web/containers/index.web.container.js';

export const workDir = path.dirname(fileURLToPath(import.meta.url));

Servers.serverContainer.externalServer.configure();
Servers.serverContainer.externalServer.start(3101);
Servers.serverContainer.internalServer.configure();
Servers.serverContainer.internalServer.start(3201);
