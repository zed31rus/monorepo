<script setup lang="ts">
import { Icon } from '@iconify/vue';
</script>

<template>
  <footer class="footer">
    
    <a href="https://t.me/zed31rusTG" class="social social--telegram">
      <Icon icon="simple-icons:telegram" height="1.5em" />
      <span class="label">zed31rus</span>
    </a>

    <a href="https://steamcommunity.com/id/zed31rus_/" class="social social--steam">
      <Icon icon="simple-icons:steam" height="1.5em" />
      <span class="label">zed31rus_</span>
    </a>

    <a href="https://discord.gg/7Ys6HabzfA" class="social social--discord">
      <Icon icon="simple-icons:discord" height="1.5em" />
      <span class="label">Discord</span>
    </a>

    <a href="https://github.com/zed31rus" class="social social--github">
      <Icon icon="simple-icons:github" height="1.5em" />
      <span class="label">GitHub</span>
    </a>

  </footer>
</template>

<style scoped>
.footer {
  position: fixed;
  bottom: 0;
  left: 0;

  width: 100%;
  height: 80px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  padding-right: 10%;
  padding-left: 10%;

  background: rgba(23, 23, 23, 0.75);
  backdrop-filter: blur(8px);
  box-sizing: border-box;
}

.social {
  display: flex;
  align-items: center;
  gap: 8px;

  text-decoration: none;

  color: rgba(115, 115, 115, 1);
  transition: color 0.2s ease;

}

.social:hover {
  color: rgb(248, 248, 255);
}

.social--telegram:hover {
  color: rgb(56, 189, 248);
}

.social--steam:hover {
  color: rgb(147, 197, 253);
}

.social--discord:hover {
  color: rgb(167, 139, 250);
}

.social--github:hover {
  color: rgb(248, 248, 255);
}
</style>