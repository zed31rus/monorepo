<script setup lang="ts">
  import { Icon } from '@iconify/vue';

</script>

<template>
  <div class="select-none items-center justify-center flex h-screen w-screen backdrop-blur-sm text-[128px] font-bebas text-neutral-400/70">
    SOON...
  </div>
  <footer class="bg-neutral-800/90 backdrop-blur-sm fixed w-full bottom-0 left-0 h-20 flex items-center justify-between px-[20%]">
    
    <!-- Telegram -->
    <a href="https://t.me/zed31rusTG" class="group flex items-center gap-2 text-neutral-500 hover:text-sky-400 transition-colors duration-200">
      <Icon icon="simple-icons:telegram" height="1.5em"/>
      <span class="text-xs font-mono">zed31rus</span>
    </a>
    
    <!-- Steam -->
    <a href="https://steamcommunity.com/id/zed31rus_/" class="group flex items-center gap-2 text-neutral-500 hover:text-blue-300 transition-colors duration-200">
      <Icon icon="simple-icons:steam" height="1.5em"/>
      <span class="text-xs font-mono">zed31rus_</span>
    </a>

    <!-- Discord -->
    <a href="https://discord.gg/7Ys6HabzfA" class="group flex items-center gap-2 text-neutral-500 hover:text-indigo-400 transition-colors duration-200">
      <Icon icon="simple-icons:discord" height="1.5em"/>
      <span class="text-xs font-mono">Discord</span>
    </a>

    <!-- GitHub -->
    <a href="https://github.com/zed31rus" class="group flex items-center gap-2 text-neutral-500 hover:text-neutral-100 transition-colors duration-200">
      <Icon icon="simple-icons:github" height="1.5em"/>
      <span class="text-xs font-mono">GitHub</span>
    </a>

  </footer>
</template>
