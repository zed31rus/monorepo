import path from "node:path";
import { fileURLToPath } from "node:url";
import Servers from '#web/containers/index.web.container.js'

export const workDir = path.dirname(fileURLToPath(import.meta.url));

Servers.serverContainer.mainServer.configureWebServer();
Servers.serverContainer.mainServer.startWebServer(3100);
