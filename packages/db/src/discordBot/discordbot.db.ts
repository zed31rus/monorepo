import { PrismaPg } from "@prisma/adapter-pg";
import * as prisma from './generated/prisma/client.js';
import pg from "pg";
import BaseDb from "../db.base.js";
import ActivityStatusDiscordBotDb from "./activityStatus/activityStatus.discordbot.db.js";
import ServerName from "./serverName/serverName.db.js";
import GuildsDiscordBotDb from "./guilds/guilds.discordbot.db.js";

class DiscordBotDB extends BaseDb {
    client: prisma.PrismaClient
    static prisma = prisma.Prisma
    
    constructor(...baseArgs: BaseDb.Args) {
        super(...baseArgs);
        const pool = new pg.Pool({connectionString: this.config.env.DATABASE_URL})
        const adapter = new PrismaPg(pool, {schema: "auth"})
        this.client = new prisma.PrismaClient({ adapter });
    }

    activityStatus = new ActivityStatusDiscordBotDb();
    serverName = new ServerName();
    guilds = new GuildsDiscordBotDb();
}

namespace DiscordBotDB {
    export namespace Guild {
        export type Model = prisma.Prisma.GuildModel;
    }
    export type PrismaClient = prisma.PrismaClient;
    export type TransactionClient = prisma.Prisma.TransactionClient;
    export type InputJsonValue = prisma.Prisma.InputJsonValue;
    export type JsonObject = prisma.Prisma.JsonObject;
    export import PrismaClientKnownRequestError = prisma.Prisma.PrismaClientKnownRequestError;
    export import PrismaClientValidationError = prisma.Prisma.PrismaClientValidationError;
}

export default DiscordBotDB;