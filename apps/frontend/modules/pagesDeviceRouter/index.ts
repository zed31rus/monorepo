import { createResolver, defineNuxtModule } from '@nuxt/kit';
import type { NuxtPage } from '@nuxt/schema';

type Variant = 'mobile' | 'desktop';

type DevicePages = {
	mobile?: NuxtPage;
	desktop?: NuxtPage;
};

export default defineNuxtModule({
	meta: {
		name: 'pagesDeviceRouter',
		configKey: 'pagesDeviceRouter',
	},

	moduleDependencies: {
		'@nuxtjs/device': {},
	},

	setup(_options, nuxt) {
		const resolver = createResolver(import.meta.url);
		const rendererPath = resolver.resolve('./runtime/deviceRenderer.vue');

		nuxt.hook('pages:extend', (pages) => {
			transformDevicePages(pages, rendererPath);
		});
	},
});

function getVariant(page: NuxtPage): Variant | null {
	if (!page.file) {
		return null;
	}

	const fileName = page.file.split('/').pop();

	if (fileName === 'mobile.vue') {
		return 'mobile';
	}

	if (fileName === 'desktop.vue') {
		return 'desktop';
	}

	return null;
}

function stripVariantSuffix(
	value: string | undefined,
	separator: string,
	variant: Variant
): string | undefined {
	if (!value) {
		return value;
	}

	if (value === variant) {
		return '';
	}

	const suffix = `${separator}${variant}`;

	if (!value.endsWith(suffix)) {
		return value;
	}

	const result = value.slice(0, -suffix.length);

	return result || separator;
}

function toViteGlobPath(file: string): string {
	const normalized = file.replace(/\\/g, '/');

	const pagesIndex = normalized.lastIndexOf('/pages/');

	if (pagesIndex !== -1) {
		return normalized.slice(pagesIndex);
	}

	if (normalized.startsWith('~/pages/')) {
		return normalized.slice(1);
	}

	if (normalized.startsWith('@pages/')) {
		return `/${normalized.slice('@pages/'.length)}`;
	}

	throw new Error(`[pagesDeviceRouter] Cannot convert page path to Vite glob path: ${file}`);
}

function createDevicePage(mobile: NuxtPage, desktop: NuxtPage, rendererPath: string): NuxtPage {
	return {
		...desktop,

		file: rendererPath,

		path: stripVariantSuffix(desktop.path, '/', 'desktop') ?? desktop.path,

		name: stripVariantSuffix(desktop.name, '-', 'desktop'),

		meta: {
			...desktop.meta,

			deviceComponents: {
				mobile: toViteGlobPath(mobile.file!),
				desktop: toViteGlobPath(desktop.file!),
			},
		},
	};
}

function transformDevicePages(pages: NuxtPage[], rendererPath: string): void {
	const variants = new Map<string, DevicePages>();
	const result: NuxtPage[] = [];

	for (const page of pages) {
		// Сначала обрабатываем children
		if (page.children?.length) {
			transformDevicePages(page.children, rendererPath);
		}

		const variant = getVariant(page);

		// Обычный route оставляем как есть
		if (!variant) {
			result.push(page);
			continue;
		}

		if (!page.file) {
			continue;
		}

		const basePath = page.file.replace(/[/\\](mobile|desktop)\.vue$/, '');

		let group = variants.get(basePath);

		if (!group) {
			group = {};
			variants.set(basePath, group);
		}

		group[variant] = page;
	}

	for (const [basePath, group] of variants) {
		if (!group.mobile || !group.desktop) {
			const missing = group.mobile ? 'desktop' : 'mobile';

			throw new Error(`[pagesDeviceRouter] Page "${basePath}" is missing "${missing}.vue"`);
		}

		result.push(createDevicePage(group.mobile, group.desktop, rendererPath));
	}

	pages.splice(0, pages.length, ...result);
}
