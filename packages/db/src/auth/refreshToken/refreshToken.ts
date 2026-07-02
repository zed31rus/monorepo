import DeleteRefreshToken from './cases/delete.js';
import CreateRefreshToken from './cases/create.js';
import GetRefreshToken from './cases/get.js';

export default class RefreshToken {
	get = new GetRefreshToken();
	create = new CreateRefreshToken();
	delete = new DeleteRefreshToken();
}
