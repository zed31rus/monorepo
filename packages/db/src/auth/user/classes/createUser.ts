import authDB from "../../auth.db.js";

export default class CreateUsers {

    async createUser(client: authDB.TransactionClient,
        nickname: authDB.User.Raw['nickname'],
        login: authDB.User.Raw['login'],
        email: authDB.User.Raw['email'],
        passwordHash: authDB.User.Raw['passwordHash'],
        emailConfirmed: authDB.User.Raw['emailConfirmed']
    ) {
        return await client.user.create({
            data: {
                login,
                email,
                nickname, 
                passwordHash,
                emailConfirmed
            }
        });
    }
}