import CookieDto from '#web/dto/cookie.dto.js';
import FileDto from '#web/dto/file.dto.js';

class DtoContainer {
	constructor(
		readonly cookie: CookieDto,
		readonly file: FileDto
	) {}
}

export type DtoContainerArgs = ConstructorParameters<typeof DtoContainer>;

export default DtoContainer;
