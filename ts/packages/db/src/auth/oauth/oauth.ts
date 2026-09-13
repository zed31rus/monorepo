import GetOauthAccount from './cases/get.js';
import CreateOauthAccount from './cases/create.js';
import UpdateOauthAccount from './cases/update.js';
import UpsertOauthAccount from './cases/upsert.js';

export default class OauthAccount {
	get = new GetOauthAccount();
	create = new CreateOauthAccount();
	update = new UpdateOauthAccount();
	upsert = new UpsertOauthAccount();
}
