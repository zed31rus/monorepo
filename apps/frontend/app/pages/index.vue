<script setup lang="ts">
import useTitleStore from '~/stores/title';

  const titleStore = useTitleStore();
  titleStore.setCurrentPageTitle('Home')
</script>

<template>
  <PagesHomeMobile v-if="$device.isMobile"/>
  <PagesHomeDesktop v-else/>
</template>