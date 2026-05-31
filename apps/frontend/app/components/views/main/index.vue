<script setup lang="ts">
  const isMobile = useIsMobile();
  watch(isMobile, (newState) => {
    console.log(newState)
  })
</script>

<template>
  <ViewsMainVariantsMobile v-if="isMobile"/>
  <ViewsMainVariantsDesktop v-else />
</template>