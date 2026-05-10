import z from "zod";

export default class CookieDto {
    required = {
        both: z.object({
            refreshToken: z.string(),
            accessToken: z.string()
        }),
        access: z.object({accessToken: z.string()}),
        refresh: z.object({refreshToken: z.string()})
    };
    optional = {
        both: z.object({
            refreshToken: z.string().optional(),
            accessToken: z.string().optional()
        }),
        access: z.object({accessToken: z.string().optional()}),
        refresh: z.object({refreshToken: z.string().optional()})
    }
}
