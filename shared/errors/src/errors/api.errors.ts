export class ApiError extends Error {
	constructor(
		public status: number,
		public code: ApiErrorCode,
		public message: string
	) {
		super(message);
		Object.setPrototypeOf(this, ApiError.prototype);
	}
}

export default class ApiErrors {
	unauthorized(message: UnauthorizedMessage) {
		return new ApiError(401, ApiErrorCode.UNAUTHORIZED, message);
	}

	forbidden(message: ForbiddenMessage) {
		return new ApiError(403, ApiErrorCode.FORBIDDEN, message);
	}

	badRequest(message: BadRequestMessage) {
		return new ApiError(400, ApiErrorCode.BAD_REQUEST, message);
	}

	internal(message: InternalErrorMessage) {
		return new ApiError(500, ApiErrorCode.INTERNAL_SERVER_ERROR, message);
	}

	notFound(message: NotFoundMessage) {
		return new ApiError(404, ApiErrorCode.NOT_FOUND, message);
	}

	expired(message: ExpiredMessage) {
		return new ApiError(410, ApiErrorCode.TOKEN_EXPIRED, message);
	}
}

export enum ApiErrorCode {
	BAD_REQUEST = 'BAD_REQUEST',
	UNAUTHORIZED = 'UNAUTHORIZED',
	FORBIDDEN = 'FORBIDDEN',
	NOT_FOUND = 'NOT_FOUND',
	INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
	TOKEN_EXPIRED = 'TOKEN_EXPIRED',
	VALIDATION_ERROR = 'VALIDATION_ERROR',
}

export enum UnauthorizedMessage {
	DEFAULT = 'NOT_AUTHORIZED',
	INVALID_TOKEN = 'INVALID_TOKEN',
	TOKEN_MISSING = 'TOKEN_MISSING',
	SESSION_EXPIRED = 'SESSION_EXPIRED',
	INVALID_CREDENTIALS = 'INVALID_CREDENTIALS',
}

export enum ForbiddenMessage {
	DEFAULT = 'ACCESS_DENIED',
	INSUFFICIENT_PERMISSIONS = 'INSUFFICIENT_PERMISSIONS',
	RESOURCE_RESTRICTED = 'RESOURCE_RESTRICTED',
}

export enum BadRequestMessage {
	DEFAULT = 'BAD_REQUEST',
	INVALID_PAYLOAD = 'INVALID_PAYLOAD',
	MISSING_FIELDS = 'MISSING_FIELDS',
	INVALID_OTP = 'INVALID_OTP',
}

export enum InternalErrorMessage {
	DEFAULT = 'INTERNAL_ERROR',
	UNEXPECTED = 'UNEXPECTED_ERROR',
	DATABASE_ERROR = 'DATABASE_ERROR',
}

export enum NotFoundMessage {
	DEFAULT = 'NOT_FOUND',
	USER_NOT_FOUND = 'USER_NOT_FOUND',
	RESOURCE_NOT_FOUND = 'RESOURCE_NOT_FOUND',
	CHANNEL_NOT_FOUND = 'CHANNEL_NOT_FOUND',
}

export enum ExpiredMessage {
	DEFAULT = 'EXPIRED',
	TOKEN_EXPIRED = 'TOKEN_EXPIRED',
	LINK_EXPIRED = 'LINK_EXPIRED',
}
