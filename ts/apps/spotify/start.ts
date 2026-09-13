import Servers from '#web/containers/index.js';

Servers.serverContainer.external.configure();
Servers.serverContainer.external.start(3102);
