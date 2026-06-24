import DeleteRefreshToken from './cases/deleteRefreshToken.db.case.js';
import CreateRefreshToken from './cases/createRefreshToken.db.case.js';
import GetRefreshToken from './cases/getRefreshToken.db.case.js';

export default class refreshToken {
	get = new GetRefreshToken();
	create = new CreateRefreshToken();
	delete = new DeleteRefreshToken();
}
