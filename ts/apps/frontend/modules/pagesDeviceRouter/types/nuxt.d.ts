import '@nuxt/schema';

declare module '@nuxt/schema' {
	interface NuxtPage {
		deviceLayouts: {
			desktop: {
				name: string;
				path: string;
			};
			mobile: {
				name: string;
				path: string;
			};
		};
	}
}

export {};
