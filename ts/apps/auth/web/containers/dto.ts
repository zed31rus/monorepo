import CookieWebDto from '#web/dto/cookie.js';
import FileWebDto from '#web/dto/file.js';

class WebDtoContainer {
	constructor(
		readonly cookie: CookieWebDto,
		readonly file: FileWebDto
	) {}
}

export default WebDtoContainer;
