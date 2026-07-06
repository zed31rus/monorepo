import { navigateTo } from 'nuxt/app';

export default defineEventHandler((event) => {
	const accessToken = getCookie(event, 'accessToken');
	if (!accessToken) return navigateTo('/auth');
});
