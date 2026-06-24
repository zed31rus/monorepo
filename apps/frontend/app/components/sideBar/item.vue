<script setup>
    import { Icon } from '@iconify/vue';

    const { path, icon, name, position } = defineProps({
        path: String,
        icon: String,
        name: String,
        position: String
    })
</script>

<template>
    <li>
        <NuxtLink :to="path" class="sidebar-link">
            <Icon :icon="icon" :ssr="true" class="sidebar-icon" />
            <span>{{ name }}</span>
        </NuxtLink>
    </li>
</template>

<style scoped>
.sidebar-link {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.5rem;
    border-radius: 0.375rem;
    transition: background-color 0.15s ease;
    text-decoration: none;
    color: inherit;
}

.sidebar-link:hover {
    background-color: rgb(38 38 38 / 0.7);
}

.sidebar-icon {
    font-size: 1.25rem;
    flex-shrink: 0;
}
</style>