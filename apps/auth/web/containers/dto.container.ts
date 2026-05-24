import CookieDto from '#web/dto/cookie.dto.js';
import fileDto from '#web/dto/file.dto.js';

class DtoContainer {
	constructor(
		readonly cookie: CookieDto,
		readonly file: fileDto
	) {}
}

export type DtoContainerArgs = ConstructorParameters<typeof DtoContainer>;

export default DtoContainer;
