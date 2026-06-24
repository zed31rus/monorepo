<script setup lang="ts">
import useTitleStore from '~/stores/title.store';
import useNotificationStore from '~/stores/notifications.store';

const notificationStore = useNotificationStore();
const titleStore = useTitleStore();
</script>

<template>
  <div class="app-root">
    <MainLayout>
      <NuxtLayout>
        <NuxtPage/>
      </NuxtLayout>
    </MainLayout>
  </div>
</template>

<style>
  .app-root {
    position: absolute;
    top: 0;
    left: 0;
    width: 100dvw;
    min-height: 100dvh;
  }
</style>