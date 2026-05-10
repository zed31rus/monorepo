export class ApiError extends Error {
    constructor(
        public status: number,
        public message: string,
        public errors: any[] = []
    ) {
        super(message);
        Object.setPrototypeOf(this, ApiError.prototype);
    }

}

export default class ApiErrors {

    Unauthorized(message = "not Authorized") {
        return new ApiError(401, message);
    }

    Forbidden(message = "Access denied") {
        return new ApiError(403, message);
    }

    BadRequest(message: string) {
        return new ApiError(400, message);
    }

    Internal(message = "Internal error") {
        return new ApiError(500, message);
    }

    NotFound(message = "Not found") {
        return new ApiError(404, message)
    }

    Expired(message= "Expired") {
        return new ApiError(410, message)
    }
}