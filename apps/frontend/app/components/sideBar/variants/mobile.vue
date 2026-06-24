<script setup lang="ts">
import { motion } from 'motion-v';
import type { SideBarPages } from '~/types/sideBar';
import SideBarItem from '../item.vue';

const MotionSideBarItem = motion.create(SideBarItem);

defineProps<{ pages: SideBarPages[] }>();
</script>

<template v-else>
    <div class="mobile-nav-wrapper">
        <div class="mobile-nav-inner">
            <ul class="mobile-nav-list">
                <MotionSideBarItem
                    :initial="{ opacity: 0, y: 100 }"
                    :animate="{ opacity: 1, y: 0, transition: { delay: page.id * 0.1, duration: 0.3 } }"
                    v-for="page in pages"
                    :key="page.id"
                    :path="page.path"
                    :icon="page.ico"
                    :position="page.position"
                />
            </ul>
        </div>
    </div>
</template>

<style scoped>
.mobile-nav-wrapper {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    margin: 0.5rem;
    z-index: 99;
}

.mobile-nav-inner {
    background-color: rgb(38 38 38 / 0.5);
    backdrop-filter: blur(8px);
    border-radius: 1rem;
    overflow: hidden;
}

.mobile-nav-list {
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 4rem;
    padding: 0.5rem;
    list-style: none;
    margin: 0;
}
</style>