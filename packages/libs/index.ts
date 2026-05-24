import LibContainer, {
	type JWTExpires as JWTExpiress,
	type RefreshTokenExpires as RefreshTokenExpiress,
} from './src/lib.container.js';

export default LibContainer;
export type JWTExpires = JWTExpiress;
export type RefreshTokenExpires = RefreshTokenExpiress;
