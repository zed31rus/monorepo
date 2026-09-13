<script setup lang="ts"></script>

<template>
	<SideBarDesktop />
	<NotificationsDesktop />
	<div class="mainRoot">
		<slot></slot>
	</div>
</template>

<style scoped>
.mainRoot {
	margin-inline: auto;
	margin-top: 40px;
	width: calc(100% - 256px);
}
</style>
