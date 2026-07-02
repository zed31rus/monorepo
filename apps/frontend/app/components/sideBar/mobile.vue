<script setup lang="ts">
    import { motion } from 'motion-v';
    import SideBarItem from './item.vue';
    import pages from '~/composables/routes.js';

    const MotionSideBarItem = motion.create(SideBarItem);
</script>

<template>
    <div class="bottom-bar-wrapper">
        <nav class="bottom-bar">
            <ul class="bottom-bar-list">
                <MotionSideBarItem
                    v-for="page in pages"
                    :key="page.id"
                    :initial="{ opacity: 0, y: 15 }"
                    :animate="{ opacity: 1, y: 0, transition: { delay: page.id * 0.04, duration: 0.2 } }"
                    :name="page.name"
                    :path="page.path"
                    :icon="page.ico"
                    :position="page.position"
                    class="bottom-item"
                />
            </ul>
        </nav>
    </div>
</template>

<style scoped>

.bottom-bar-wrapper {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 0.75rem 1rem;
    padding-bottom: calc(0.75rem + env(safe-area-inset-bottom, 0px));
    z-index: 99;
    display: flex;
    justify-content: center;
    pointer-events: none;
}

.bottom-bar {
    pointer-events: auto;
    width: 100%;
    max-width: 480px;
    background-color: rgb(38 38 38 / 0.6);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 1.25rem;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
}

.bottom-bar-list {
    margin: 0;
    padding: 0 0.5rem;
    height: 3.5rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    list-style: none;
}

.bottom-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex: 1;
    height: 100%;
    color: rgba(255, 255, 255, 0.6);
    cursor: pointer;
    transition: color 0.2s ease;
}

.bottom-item:hover,
.bottom-item:active {
    color: #fff;
}
</style>