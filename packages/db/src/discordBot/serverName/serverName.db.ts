import CreateServerName from './cases/create.serverName.case.db.js';
import DeleteServerName from './cases/delete.serverName.case.db.js';
import GetServerName from './cases/get.serverName.case.db.js';

class ServerName {
	readonly get = new GetServerName();
	readonly create = new CreateServerName();
	readonly delete = new DeleteServerName();
}

export default ServerName;
