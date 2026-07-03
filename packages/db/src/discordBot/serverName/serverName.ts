import CreateServerName from './cases/create.js';
import DeleteServerName from './cases/delete.js';
import GetServerName from './cases/get.js';

class ServerName {
	readonly get = new GetServerName();
	readonly create = new CreateServerName();
	readonly delete = new DeleteServerName();
}

export default ServerName;
