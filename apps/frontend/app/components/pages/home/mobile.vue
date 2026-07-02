<script setup lang="ts">
import { computed, onMounted, ref } from "vue";

const track = ref<any>(null);
const loading = ref(true);

onMounted(async () => {
  try {
    loading.value = true;
    track.value = await $fetch("https://spotify.zed31rus.ru/dailyTrack/get");
  } finally {
    loading.value = false;
  }
});

const embedUrl = computed(() => {
  const id = track.value?.track?.id;

  return id
    ? `https://open.spotify.com/embed/track/${id}?utm_source=generator`
    : "";
});
</script>

<template>
  <main class="page">
    <p
      v-if="!loading && track?.track?.id"
      class="label"
    >
      Track Of The Hour
    </p>

    <section class="frame">
      <div class="card">
        <div
          v-if="loading"
          class="loading"
        >
          <div class="cover" />

          <div class="text">
            <div class="line" />
            <div class="line short" />
          </div>
        </div>

        <iframe
          v-else-if="track?.track?.id"
          :src="embedUrl"
          class="player"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        />

        <div
          v-else
          class="error"
        >
          Не удалось загрузить трек.
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  gap: 10px;

  min-height: 100dvh;
  padding: 24px 16px;
  box-sizing: border-box;

  overflow: hidden;
  backdrop-filter: blur(12px);
}

.label {
  margin: 0;

  font-size: 12px;
  letter-spacing: 3px;
  text-transform: uppercase;
}

.frame {
  padding: 2px;
  border-radius: 18px;
}

.card {
  overflow: hidden;

  border-radius: 16px;
  background: rgba(var(--color-back-main), .55);
}

.player {
  display: block;

  width: 100%;
  height: 152px;

  border: 0;
}

.loading,
.error {
  height: 152px;
}

.loading {
  display: flex;
  align-items: center;
  gap: 16px;

  padding: 16px;
  box-sizing: border-box;
}

.error {
  display: grid;
  place-items: center;

  color: rgba(255, 255, 255, .5);
}

.cover {
  flex-shrink: 0;

  width: 96px;
  aspect-ratio: 1;

  border-radius: 10px;
  background: rgba(255, 255, 255, .08);

  animation: pulse 1.4s infinite;
}

.text {
  flex: 1;
}

.line {
  height: 14px;
  margin-bottom: 10px;

  border-radius: 7px;
  background: rgba(255, 255, 255, .08);

  animation: pulse 1.4s infinite;
}

.short {
  width: 55%;
}

@keyframes pulse {
  0%,
  100% {
    opacity: .35;
  }

  50% {
    opacity: .75;
  }
}
</style>