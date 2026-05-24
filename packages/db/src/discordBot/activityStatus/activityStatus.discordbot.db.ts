import createActivityStatus from './cases/create.activityStatus.db.case.js';
import DeleteActivityStatus from './cases/delete.activityStatus.db.case.js';
import getActivityStatus from './cases/get.activityStatus.db.case.js';

class ActivityStatusDiscordBotDb {
	readonly get = new getActivityStatus();
	readonly create = new createActivityStatus();
	readonly delete = new DeleteActivityStatus();
}

export default ActivityStatusDiscordBotDb;
