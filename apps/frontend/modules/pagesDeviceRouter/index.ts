import { createResolver, defineNuxtModule } from '@nuxt/kit';
import type { NuxtPage } from '@nuxt/schema';
import './types/nuxt.d';

export default defineNuxtModule({
	meta: {
		name: 'pagesDeviceRouter',
		configKey: 'pagesDeviceRouter',
	},

	moduleDependencies: {
		'@nuxtjs/device': {},
	},

	async setup(options, nuxt) {
		const resolver = createResolver(import.meta.url);
		const rendererPath = resolver.resolve('./runtime/deviceRenderer.vue');

		nuxt.hook('pages:extend', (pages: NuxtPage[]) => {
			transformDevicePages(pages, rendererPath);
		});
	},
});

function transformDevicePages(pages: NuxtPage[], rendererPath: string) {
	const groups = new Map<string, { mobile?: NuxtPage; desktop?: NuxtPage }>();
	const result: NuxtPage[] = [];

	for (const page of pages) {
		if (page.children?.length) {
			transformDevicePages(page.children, rendererPath);
		}

		const match = page.file?.match(/^(.*)\/(mobile|desktop)\.vue$/);

		if (!match || !match[1]) {
			result.push(page);
			continue;
		}

		const [, basePath] = match;
		const variant = match[2] as 'mobile' | 'desktop';

		if (!groups.has(basePath)) groups.set(basePath, {});
		groups.get(basePath)![variant] = page;
	}

	for (const [basePath, variants] of groups) {
		if (!variants.mobile || !variants.desktop) {
			const missing = !variants.mobile ? 'mobile' : 'desktop';
			throw new Error(`[pagesDeviceRouter] page "${basePath}" missing "${missing}.vue"`);
		}

		const base = variants.desktop;

		result.push({
			...base,
			file: rendererPath,
			path: base.path.replace(/\/(mobile|desktop)$/, '') || '/',
			name: base.name?.replace(/-(mobile|desktop)$/, ''),
			meta: {
				...base.meta,
				deviceLayouts: {
					mobile: {
						name: variants.mobile.name!,
						path: variants.mobile.file!,
					},
					desktop: {
						name: variants.desktop.name!,
						path: variants.desktop.file!,
					},
				},
			},
		});
	}

	pages.length = 0;
	pages.push(...result);
}
