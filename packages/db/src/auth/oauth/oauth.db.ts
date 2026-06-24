import GetOauthAccount from './cases/getOauthAccount.db.case.js';
import CreateOauthAccount from './cases/createOauthAccount.db.case.js';
import UpdateOauthAccount from './cases/updateOauthAccount.db.case.js';
import UpsertOauthAccount from './cases/upsertOauthAccount.db.case.js';

export default class oauthAccount {
	get = new GetOauthAccount();
	create = new CreateOauthAccount();
	update = new UpdateOauthAccount();
	upsert = new UpsertOauthAccount();
}
