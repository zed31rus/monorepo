import BaseOpenAPI from "#web/base/openapi.base.js";
import { createRoute, z } from "@hono/zod-openapi";
import { type AccountEnv } from "#web/modules/account.module.js";

export default class AccountOpenAPI extends BaseOpenAPI {


    emailVerificationSend = createRoute({
        method: 'post',
        path: '/emailVerification/Send',
        middleware: [...this.handler.auth.withValidUser<AccountEnv>(),],
        security: [{ authBearer: [] }],
        summary: 'Send verification email',
        description: 'Sends a verification code to the authenticated user\'s email address.',

        responses: {
            200: {
                description: 'Verification code sent',
                    content: {
                        'application/json': { 
                            schema: z.object({
                                user: this.core.db.users.PersonalUserSchema,
                            })
                        }
                    }
            },
            ...this.commonResponses
        },

    });

//-----------------------------------------------------

    emailVerificationConfirm = createRoute({
        method: 'patch',
        path: '/emailVerification/Confirm',
        middleware: [...this.handler.auth.withValidUser<AccountEnv>(),],
        security: [{ authBearer: [] }],
        summary: 'Confirm Email',
        description: 'Verifies the user account using the code received via email.',

        request: {
            body: { 
                content: { 
                    'application/json': { 
                        schema: z.object({
                            submitCode: z.string().length(6),
                        })
                    }
                }
            },
        },
        responses: {
            200: {
                description: 'Email successfully verified',
                content: {
                    'application/json': {
                        schema: z.object({
                            user: this.core.db.users.PersonalUserSchema,
                        })
                    }
                },
            },
            ...this.commonResponses
        },

    });

//-----------------------------------------------------

    changePasswordRequest = createRoute({
        method: 'post',
        path: '/changePassword/request',
        middleware: [...this.handler.auth.withValidUser<AccountEnv>(),],
        security: [{ authBearer: [] }],
        summary: 'Request password change',
        description: 'Sends a password reset/change code to the user\'s email.',

        responses: {
            200: {
                description: 'Change code sent',
                content: {
                    'application/json': { 
                        schema: z.object({
                            user: this.core.db.users.PersonalUserSchema,
                        })
                    }
                },
            },
            ...this.commonResponses
        },
    });

//-----------------------------------------------------

    changePasswordConfirm = createRoute({
        method: 'patch',
        path: '/changePassword/confirm',
        middleware: [...this.handler.auth.withValidUser<AccountEnv>(),],
        security: [{ authBearer: [] }],
        summary: 'Confirm password change',
        description: 'Updates the user password using the verification code.',

        request: {
            body: {
                content: {
                    'application/json': {
                        schema: z.object({
                            submitCode: z.string().length(6),
                            password: z.string().min(8),
                        })
                    }
                }
            },
        },

        responses: {
            200: {
                description: 'Password successfully changed',
                content: {
                    'application/json': {
                        schema: z.object({
                            user: this.core.db.users.PersonalUserSchema,
                        })
                    }
                },
            },
            ...this.commonResponses
        },

    });


}