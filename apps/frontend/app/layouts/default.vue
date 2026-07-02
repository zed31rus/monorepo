<template>
  <DefaultLayoutMobile v-if="$device.isMobile"/>
  <DefaultLayoutDesktop v-else/>
  <slot></slot>
</template>