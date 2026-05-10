import type { Prisma } from "../generated/prisma/client.js";
import CreateServerName from "./cases/create.serverName.db.case.js";
import DeleteServerName from "./cases/delete.serverName.db.case.js";
import GetServerName from "./cases/get.serverName.db.case.js";

class ServerName {
    readonly get = new GetServerName();
    readonly create = new CreateServerName();
    readonly delete = new DeleteServerName();
}

namespace ServerName {
    export type ServerNameModel = Prisma.ServerNameModel;
}

export default ServerName;