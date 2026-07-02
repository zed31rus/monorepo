<script setup lang="ts">
import { ref, computed, onMounted } from "vue";

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

  <PagesMain/>
</template>

<style scoped>
.page {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(12px);
}

.container {
  width: 100%;
  max-width: 560px;
  padding: 3px;
  background: rgba(var(--accent-color), 0.5);
  border-radius: 21px;
}

.header {
  text-align: center;
  margin-bottom: 20px;
}

.header h1 {
  font-size: 28px;
  margin: 0;
}

.header p {
  margin: 6px 0 0;
  color: #aaa;
  font-size: 14px;
}

.card {
  background: rgba(var(--color-back-main), 0.5);
  border-radius: 18px;
  overflow: hidden;
  padding: 3px;
}

.player {
  width: 100%;
  height: 300px;
  border: none;
  border-radius: 15px;
}

.skeleton {
  padding: 16px;
}

.line {
  height: 14px;
  border-radius: 8px;
  margin-bottom: 10px;
  animation: pulse 1.5s infinite;
}

.line.short {
  width: 60%;
}

@keyframes pulse {
  0% { opacity: 0.4; }
  50% { opacity: 0.8; }
  100% { opacity: 0.4; }
}
</style>