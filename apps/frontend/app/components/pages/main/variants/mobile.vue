<script setup lang="ts">
import { Icon } from '@iconify/vue';
</script>

<template>
  <footer class="footer">

    <a href="https://t.me/zed31rusTG" class="social social--tg">
      <Icon icon="simple-icons:telegram" height="1.5em" />
    </a>

    <a href="https://steamcommunity.com/id/zed31rus_/" class="social social--steam">
      <Icon icon="simple-icons:steam" height="1.5em" />
    </a>

    <a href="https://discord.gg/7Ys6HabzfA" class="social social--discord">
      <Icon icon="simple-icons:discord" height="1.5em" />
    </a>

    <a href="https://github.com/zed31rus" class="social social--github">
      <Icon icon="simple-icons:github" height="1.5em" />
    </a>

  </footer>
</template>

<style scoped>
.footer {
  position: fixed;

  bottom: 8px;
  left: 8px;

  width: calc(100% - 16px);
  height: 80px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 0 10%;

  background: rgba(23, 23, 23, 0.9);
  backdrop-filter: blur(10px);

  border-radius: 999px;
  box-sizing: border-box;
}

.social {
  display: flex;
  align-items: center;
  justify-content: center;

  color: rgb(115, 115, 115);

  transition: color 0.2s ease, transform 0.2s ease;
  text-decoration: none;
}

.social:hover {
  transform: translateY(-1px);
}

.social--tg:hover {
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