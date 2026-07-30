<script setup lang="ts">
const route = useRoute();

const pages = import.meta.glob('~/pages/**/*.vue', {
	eager: true,
	import: 'default',
});

const path = route.path === '/' ? 'index' : route.path.replace(/^\/|\/$/g, '');
console.log(path);
const device = useDevice();

const variant = device.isMobile ? 'mobile' : device.isDesktopOrTablet ? 'desktop' : 'default';

const componentKey = Object.keys(pages).find((key) =>
	key.includes(`/pages/${path}/${variant}.vue`)
);

const component = computed(() => (componentKey ? pages[componentKey] : null));
</script>

<template>
	<component :is="component" v-if="component" />
</template>
