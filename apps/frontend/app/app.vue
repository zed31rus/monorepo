<script setup lang="ts">
  import useTitleStore from '~/stores/title.store';
  import useNotificationStore from '~/stores/notifications.store';

  const titleStore = useTitleStore();
  onBeforeMount(() => {
    titleStore.init()
  })
</script>

<template>
  <div class="app-root">
    <NuxtLayout>
      <NuxtPage/>
    </NuxtLayout>
  </div>
</template>

<style>
  .app-root {
    position: absolute;
    top: 0;
    left: 0;
    width: 100dvw;
    min-height: 100dvh;
    box-sizing: border-box;
  }
</style>