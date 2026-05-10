import Types from "@zed31rus/types";
import authDB from "../../auth.db.js";

export default class CreateOauthAccount {
    async create(
        client: authDB.TransactionClient, 
        user: authDB.User.Raw, 
        account: { provider: Types.Oauth.Providers, providerUserId: authDB.OauthAccount['providerUserId'] }, 
        payload: Omit<authDB.OauthAccountCreateWithoutUserInput, 'provider' | 'providerUserId'>
    ) {
        return await client.oauthAccount.create({
            data: {
                ...account,
                ...payload,
                user: { connect: { uuid: user.uuid } }
            }
        });
    }
}