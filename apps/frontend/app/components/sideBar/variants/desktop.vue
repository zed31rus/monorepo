<script setup lang="ts">
import { ref, computed, watch, nextTick, useTemplateRef } from 'vue';
import { motion, useAnimate, AnimatePresence } from 'motion-v';
import { onClickOutside } from '@vueuse/core';
import { Icon } from '@iconify/vue';
import type { SideBarPages } from '~/types/sideBar';
import SideBarItem from '../item.vue';

const MotionSideBarItem = motion.create(SideBarItem);

defineProps<{ pages: SideBarPages[] }>();

const isOpen = ref(false);
const isVisible = ref(false);

const [scope, animate] = useAnimate();
const menuWrapper = useTemplateRef('menuWrapper');

const toggleIcon = computed(() =>
    isOpen.value
        ? 'line-md:menu-to-close-alt-transition'
        : 'line-md:close-to-menu-alt-transition'
);

function toggle() {
    isOpen.value = !isOpen.value;
}

watch(isOpen, async (val) => {
    if (val) {
        isVisible.value = true;
        await nextTick();

        await animate('.toggle-button', { borderBottomRightRadius: 0, borderBottomLeftRadius: 0 }, { duration: 0.1 });
        animate('.side-bar', { height: 'calc(100vh - 60px)', width: '64px' }, { duration: 0.25 });
        animate('.side-bar', { borderTopRightRadius: '16px' }, { duration: 0.2 });
        animate('.shadow-cube', { borderBottomLeftRadius: '16px' }, { duration: 0.25 });

        await animate('.side-bar', { width: '150px', borderBottomRightRadius: '16px', borderBottomLeftRadius: '16px' }, { duration: 0.35, ease: 'easeOut' });

    } else {
        await nextTick();

        animate('.shadow-cube', { borderBottomLeftRadius: 0 }, { duration: 0.2 });
        animate('.side-bar', { width: '48px' }, { duration: 0.2 });
        await animate('.side-bar', { borderTopRightRadius: 0 }, { duration: 0.2 });
        await animate('.side-bar', { height: 0 }, { duration: 0.2 });
        await animate('.toggle-button', { borderBottomLeftRadius: '16px', borderBottomRightRadius: '16px' }, { duration: 0.15 });

        isVisible.value = false;
    }
});

onClickOutside(menuWrapper, () => {
    if (isVisible.value) isOpen.value = false;
});
</script>

<template>
    <div ref="scope">
        <div ref="menuWrapper" class="menu-wrapper">

            <button @click="toggle" class="toggle-button">
                <Icon
                    :icon="toggleIcon"
                    :key="isOpen ? 'open' : 'closed'"
                    class="toggle-icon"
                />
            </button>

            <div v-if="isVisible" class="shadow-cube-wrapper">
                <div class="shadow-cube"></div>
            </div>

            <div
                v-if="isVisible"
                class="side-bar"
            >
                <ul class="side-bar-list">
                    <AnimatePresence>
                        <MotionSideBarItem
                            v-if="isOpen"
                            v-for="page in pages"
                            :key="page.id"
                            :initial="{ opacity: 0, x: -20 }"
                            :animate="{ opacity: 1, x: 0, transition: { delay: page.id * 0.05, duration: 0.25 } }"
                            :exit="{ opacity: 0, x: -20, transition: { duration: 0.2 } }"
                            :name="page.name"
                            :path="page.path"
                            :icon="page.ico"
                            :position="page.position"
                        />
                    </AnimatePresence>
                </ul>
            </div>

        </div>
    </div>
</template>

<style scoped>
.menu-wrapper {
    position: absolute;
    margin: 0.5rem;
    left: 0;
    top: 0;
    z-index: 99;
}

.toggle-button {
    position: relative;
    width: 3rem;
    height: 3rem;
    border-radius: 1rem;
    background-color: rgb(38 38 38 / 0.5);
    backdrop-filter: blur(8px);
    border: none;
    cursor: pointer;
}

.toggle-icon {
    position: absolute;
    width: 50%;
    height: 50%;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}

.shadow-cube-wrapper {
    position: absolute;
    top: 0.75rem;
    left: 3rem;
    width: 2rem;
    height: 2rem;
    overflow: hidden;
    pointer-events: none;
}

.shadow-cube {
    width: 100%;
    height: 100%;
    background-color: transparent;
    box-shadow: -12px 12px 0 0 #262626;
    opacity: 0.5;
}

.side-bar {
    position: absolute;
    top: 2.75rem;
    left: 0;
    background-color: rgb(38 38 38 / 0.5);
    backdrop-filter: blur(8px);
    overflow: hidden;
    border-bottom-left-radius: 1rem;
    border-bottom-right-radius: 1rem;
    width: 2.5rem;
    height: 0;
    display: flex;
    flex-direction: column;
}

.side-bar-list {
    padding: 0.625rem;
    display: flex;
    flex-direction: column;
    height: 100%;
    gap: 0.25rem;
    list-style: none;
    margin: 0;
}
</style>