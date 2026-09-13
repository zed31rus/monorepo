<script setup lang="ts">
function beforeLeave(element: Element) {
  const el = element as HTMLElement;
  const parent = el.parentElement!;

  const parentRect = parent.getBoundingClientRect();
  const r = el.getBoundingClientRect();

  el.style.left   = (r.left   - parentRect.left) + 'px';
  el.style.top    = (r.top    - parentRect.top)  + 'px';
  el.style.width  = r.width  + 'px';
  el.style.height = r.height + 'px';
  el.style.margin = '0';

  el.style.position = 'absolute';
}
</script>

<template>
  <div class="notifications-root">
    <TransitionGroup
      name="notification-list"
      tag="ul"
      class="notification-wrapper"
      @before-leave="beforeLeave"
    >
      <slot />
    </TransitionGroup>
  </div>
</template>

<style scoped>
.notification-wrapper {
  position: relative !important;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.75rem;
  inset: 0;
  width: 100%;
  height: 100%;
  list-style: none;
}

.notifications-root {
    position: fixed;
    right: 0;
    top: 0;
    padding: 1rem;
    width: 100%;
    height: 100%;
    z-index: 99999;
    pointer-events: none;
}
</style>

<style>
.notification-list-move {
  transition: transform 0.5s ease !important;
}

.notification-list-enter-active,
.notification-list-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease !important;
}

.notification-list-enter-from,
.notification-list-leave-to {
  opacity: 0;
  transform: translateX(120%);
}
</style>