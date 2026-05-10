import type { Prisma } from "../generated/prisma/client.js";
import createActivityStatus from "./cases/create.activityStatus.db.case.js";
import DeleteActivityStatus from "./cases/delete.activityStatus.db.case.js";
import getActivityStatus from "./cases/get.activityStatus.db.case.js";

class ActivityStatus {
    readonly get = new getActivityStatus();
    readonly create = new createActivityStatus();
    readonly delete = new DeleteActivityStatus();
}

namespace ActivityStatus {
    export type ActivityStatusModel = Prisma.ActivityStatusModel;
}

export default ActivityStatus;