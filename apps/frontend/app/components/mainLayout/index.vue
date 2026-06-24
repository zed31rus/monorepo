<script setup lang="ts">

</script>

<template>
  <MainLayoutVariantsMobile v-if="$device.isMobile"/>
  <MainLayoutVariantsDesktop v-else />
  <slot></slot>
</template>