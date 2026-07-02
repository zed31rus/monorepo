<template>
  <PagesMainVariantsMobile v-if="$device.isMobile"/>
  <PagesMainVariantsDesktop v-else/>
</template>