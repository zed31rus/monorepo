<script setup lang="ts">
import { computed, defineAsyncComponent } from 'vue';

import { useDevice, useRoute } from '#imports';

type DeviceComponents = {
	mobile: string;
	desktop: string;
};

const route = useRoute();
const { isMobile } = useDevice();

const deviceComponents = computed<DeviceComponents>(() => {
	const value = route.meta.deviceComponents;

	const components = value as Partial<DeviceComponents>;

	if (!components.mobile || !components.desktop) {
		throw new Error();
	}

	return {
		mobile: components.mobile,
		desktop: components.desktop,
	};
});

const modules = import.meta.glob('/pages/**/*.vue');

const componentLoader = computed(() => {
	const targetPath = isMobile ? deviceComponents.value.mobile : deviceComponents.value.desktop;

	const loader = modules[targetPath];

	if (!loader) {
		const available = Object.keys(modules).sort().join('\n');

		throw new Error(`[deviceRenderer] Component "${targetPath}" not found.`);
	}

	return loader;
});

const AsyncComponent = computed(() =>
	defineAsyncComponent(
		componentLoader.value as () => Promise<{
			default: unknown;
		}>
	)
);
</script>

<template>
	<component :is="AsyncComponent" />
</template>
