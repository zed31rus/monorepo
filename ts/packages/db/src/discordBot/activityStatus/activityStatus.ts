import createActivityStatus from './cases/create.js';
import DeleteActivityStatus from './cases/delete.js';
import getActivityStatus from './cases/get.js';

class ActivityStatusDiscordBotDb {
	readonly get = new getActivityStatus();
	readonly create = new createActivityStatus();
	readonly delete = new DeleteActivityStatus();
}

export default ActivityStatusDiscordBotDb;
