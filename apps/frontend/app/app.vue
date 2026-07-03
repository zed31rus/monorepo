<script setup lang="ts">
  import useTitleStore from '~/stores/title';
  import useNotificationStore from '~/stores/notifications';

  const notificationStore = useNotificationStore();
  const titleStore = useTitleStore();
  titleStore.init()
  onMounted(() => {
    firstTimeHook();
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