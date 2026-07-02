export class InternalError extends Error {
	constructor(
		public code: InternalErrorCode,
		public message: string
	) {
		super(message);
		Object.setPrototypeOf(this, InternalError.prototype);
	}
}

export default class InternalErrors {
	database(message: DatabaseErrorMessage) {
		return new InternalError(InternalErrorCode.DATABASE_ERROR, message);
	}

	validation(message: ValidationErrorMessage) {
		return new InternalError(InternalErrorCode.VALIDATION_ERROR, message);
	}

	auth(message: AuthErrorMessage) {
		return new InternalError(InternalErrorCode.AUTH_ERROR, message);
	}

	externalApi(message: ExternalApiErrorMessage) {
		return new InternalError(InternalErrorCode.EXTERNAL_API_ERROR, message);
	}

	businessLogic(message: BusinessLogicErrorMessage) {
		return new InternalError(InternalErrorCode.BUSINESS_LOGIC_ERROR, message);
	}

	spotify(message: SpotifyErrorMessage) {
		return new InternalError(InternalErrorCode.SPOTIFY_ERROR, message);
	}
}

export enum InternalErrorCode {
	DATABASE_ERROR = 'DATABASE_ERROR',
	VALIDATION_ERROR = 'VALIDATION_ERROR',
	AUTH_ERROR = 'AUTH_ERROR',
	EXTERNAL_API_ERROR = 'EXTERNAL_API_ERROR',
	BUSINESS_LOGIC_ERROR = 'BUSINESS_LOGIC_ERROR',
	SPOTIFY_ERROR = 'SPOTIFY_ERROR',
}

export enum DatabaseErrorMessage {
	DEFAULT = 'DB_OPERATION_FAILED',
	CONNECTION_TIMEOUT = 'DB_CONNECTION_TIMEOUT',
	RECORD_NOT_FOUND = 'DB_RECORD_NOT_FOUND',
	DUPLICATE_KEY = 'DB_DUPLICATE_KEY',
}

export enum ValidationErrorMessage {
	DEFAULT = 'VALIDATION_FAILED',
	INVALID_SCHEMA = 'INVALID_DATA_SCHEMA',
	TYPE_MISMATCH = 'DATA_TYPE_MISMATCH',
}

export enum AuthErrorMessage {
	DEFAULT = 'INTERNAL_AUTH_FAILED',
	TOKEN_SIGNING_FAILED = 'TOKEN_SIGNING_FAILED',
	CRYPTO_ERROR = 'PASSWORD_HASHING_FAILED',
}

export enum ExternalApiErrorMessage {
	DEFAULT = 'EXTERNAL_SERVICE_ERROR',
	DISCORD_TIMEOUT = 'DISCORD_SERVICE_TIMEOUT',
	SPOTIFY_UNAVAILABLE = 'SPOTIFY_SERVICE_UNAVAILABLE',
}

export enum BusinessLogicErrorMessage {
	DEFAULT = 'BUSINESS_RULE_VIOLATION',
	INSUFFICIENT_FUNDS = 'INSUFFICIENT_FUNDS',
	LIMIT_EXCEEDED = 'LIMIT_EXCEEDED',
}

export enum SpotifyErrorMessage {
	DEFAULT = 'SPOTIFY_ERROR',
	INVALID_PLAYLIST = 'INVALID_PLAYLIST',
	PLAYLIST_NOT_FOUND = 'PLAYLIST_NOT_FOUND',
	PLAYLIST_EMPTY = 'PLAYLIST_EMPTY',
	INVALID_TRACK = 'INVALID_TRACK',
	TRACK_NOT_FOUND = 'TRACK_NOT_FOUND',
	TRACK_WITHOUT_ID = 'TRACK_WITHOUT_ID',
	API_ERROR = 'SPOTIFY_API_ERROR',
	RATE_LIMITED = 'SPOTIFY_RATE_LIMITED',
	TOKEN_EXPIRED = 'SPOTIFY_TOKEN_EXPIRED',
	INVALID_TOKEN = 'SPOTIFY_INVALID_TOKEN',
	INVALID_RESPONSE = 'SPOTIFY_INVALID_RESPONSE',
}
