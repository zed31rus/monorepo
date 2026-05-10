import baseMiddleware from "#web/base/middleware.base.js";
import { type AvatarEnv } from "#web/types/Env.js";
import DbContainer from "@packages/db";
import { z } from "@hono/zod-openapi";
import path from "node:path";
import { workDir } from "#root/start.js";
import fs from 'fs';

export default class FileMiddleware extends baseMiddleware {

    public withAvatar<T extends AvatarEnv>(user: DbContainer.authDB.User.Public) { 

        const dto = this.dto

        type J = T & {
          out: { form: z.infer<typeof dto.file.avatarSchema> }
        };

        return this.createFactory<J>().createMiddleware<J>( async (c, next) => {
            const { avatar } = c.req.valid('form');
            const { uuid } = user;

            const avatarArrayBuffer = await avatar.arrayBuffer();

            const fileName = `${uuid}${path.extname(avatar.name)}`;
            const publicDirPath = this.config.env.PUBLIC_DIR_PATH;
            const avatarsPublicPathDir = this.config.env.AVATARS_PUBLIC_DIR_PATH;
            const avatarAbsolutePath = path.join(workDir, publicDirPath, avatarsPublicPathDir, fileName);

            await fs.promises.writeFile(avatarAbsolutePath, Buffer.from(avatarArrayBuffer));

            c.set('avatarPath', fileName);
            await next();
        });
    }
};
