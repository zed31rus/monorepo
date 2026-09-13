<script setup>
import { ref } from 'vue';
import useTitleStore from '~/stores/title';

const mode = ref('login'); // 'login' или 'register'

const titleStore = useTitleStore();
titleStore.setCurrentPageTitle('Auth');
</script>

<template>
	<div>
		<div ref="container">
			<Transition name="auth" mode="out-in" @enter="onEnter">
				<AuthLogin v-if="mode === 'login'" :key="'login'" @switch="mode = 'register'" />
				<AuthRegister v-else :key="'register'" @switch="mode = 'login'" />
			</Transition>
		</div>
	</div>
</template>

<style>
.auth-enter-active,
.auth-leave-active {
	transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.auth-enter-from {
	opacity: 0;
	transform: translateX(100%);
}

.auth-leave-to {
	opacity: 0;
	transform: translateX(-120%);
}
</style>
