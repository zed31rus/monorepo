<script setup>
import { ref } from 'vue';
import useTitleStore from '~/stores/title.store';

const mode = ref("login"); // 'login' или 'register'

const titleStore = useTitleStore();
titleStore.setCurrentPageTitle('Auth')

const container = ref(null);

const onEnter = (el) => {
  const parent = container.value;
  const oldHeight = parent.offsetHeight;
  parent.style.height = 'auto';
  const newHeight = parent.offsetHeight;
  parent.style.height = oldHeight + 'px';
  parent.offsetHeight;
  parent.style.transition = 'height 0.35s cubic-bezier(0.4,0,0.2,1)';
  parent.style.height = newHeight + 'px';
};

</script>

<template>
  <div class="min-h-screen w-full flex items-center justify-center">
    <div ref="container" class="w-full max-w-md bg-neutral-900/50 border border-white/5 backdrop-blur-2xl p-8 rounded-2xl shadow-2xl overflow-hidden relative">
      
      <Transition name="auth" mode="out-in" @enter="onEnter">
        <AuthLogin 
          v-if="mode === 'login'" 
          :key="'login'"
          @switch="mode = 'register'" 
        />
        <AuthRegister 
          v-else
          :key="'register'"
          @switch="mode = 'login'" 
        />
      </Transition>

    </div>
  </div>
</template>

<style>

.auth-enter-active,
.auth-leave-active {
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.auth-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.auth-leave-to {
  opacity: 0;
  transform: translateX(-120%);
}
</style>