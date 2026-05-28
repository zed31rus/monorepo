import tailwindcss from '@tailwindcss/vite';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: '2025-07-15',
	devtools: { enabled: true },
	css: ['./app/main.css'],
	devServer: {
		host: '0.0.0.0',
	},
	vite: {
		plugins: [tailwindcss()],
	},

	app: {
		head: {
			link: [
				{
					rel: 'stylesheet',
					href: 'https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap',
				},
			],
		},
	},
});
