import DeleteRefreshToken from "./classes/deleteRefreshToken.js";
import CreateRefreshToken from "./classes/createRefreshToken.js";
import GetRefreshToken from "./classes/getRefreshToken.js";

export default class refreshToken {
    get = new GetRefreshToken();
    create = new CreateRefreshToken();
    delete = new DeleteRefreshToken();
}