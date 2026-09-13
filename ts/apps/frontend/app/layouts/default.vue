<template>
	<DefaultLayoutMobile v-if="$device.isMobile">
		<slot></slot>
	</DefaultLayoutMobile>
	<DefaultLayoutDesktop v-else>
		<slot></slot>
	</DefaultLayoutDesktop>
</template>
