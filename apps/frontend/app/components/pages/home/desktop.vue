<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { Icon } from "@iconify/vue";

const track = ref<any>(null);
const loading = ref(true);

onMounted(async () => {
  try {
    loading.value = true;
    track.value = await $fetch("https://spotify.zed31rus.ru/dailyTrack/get");
  } catch (e) {
    return
  } finally {
    loading.value = false;
  }
});

const embedUrl = computed(() => {
  const id = track.value?.track?.id;
  if (!id) return "";
  return `https://open.spotify.com/embed/track/${id}`;
});
</script>

<template>
  <div class="page">
    <div class="container-wrapper">
      <div v-if="!loading && track?.track?.id" class="track-label">
        Track Of The Hour
      </div>

      <div class="container">
        <div class="card">
          <div v-if="loading" class="skeleton">
            <div class="line"></div>
            <div class="line short"></div>
          </div>

          <iframe
            v-else-if="track?.track?.id"
            :src="embedUrl"
            class="player"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  </div>

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
.page {
  height: 100dvh;
  display: flex;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(12px);
}

.container-wrapper {
  width: 100%;
  max-width: 560px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.track-label {
  font-size: 12px;
  letter-spacing: 3px;
  color: rgba(255, 255, 255, 0.5);
  padding-left: 6px;
}

.container {
  width: 100%;
  background: rgba(var(--accent-color), 0.3);
  border-radius: 18px;
  padding: 1px;

}

.card {
  background: rgba(var(--color-back-main), 0.5);
  border-radius: 17px;
  overflow: hidden;
  display: flex;
}

.player {
  width: 100%;
  height: 352px;
  border: none;
  border-radius: 17px;
  display: block;
}

.skeleton {
  padding: 24px;
  width: 100%;
  height: 352px;
  box-sizing: border-box;
  background: rgba(var(--color-back-main), 0.2);
}

.line {
  height: 20px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  margin-bottom: 12px;
  animation: pulse 1.5s infinite;
}

.line.short {
  width: 40%;
}

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

@keyframes pulse {
  0% { opacity: 0.3; }
  50% { opacity: 0.6; }
  100% { opacity: 0.3; }
}
</style>