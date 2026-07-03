<script setup lang="ts">
    import type { CallbackType } from '~/composables/notifications';

    const { title, message, additional, type, mouseEnterAction, mouseLeaveAction, clickAction, buttonAction } = defineProps<{
        title: string,
        message: string,
        additional: string,
        type: string,
        mouseEnterAction: () => void,
        mouseLeaveAction: () => void,
        clickAction: () => void,
        buttonAction: CallbackType | null;
    }>();
</script>

<template>
    <li
        @mouseenter="mouseEnterAction()"
        @mouseleave="mouseLeaveAction()"
        @click="clickAction()"
        class="notification-item"
    >
        <div class="notification-bar" :class="type"></div>
        
        <div class="notification-content">
            <div class="notification-header">
                <h1 class="notification-title">
                    {{ title }}
                </h1>
            </div>

            <div class="notification-body">
                <p class="notification-message">
                    {{ message }}
                </p>

                <p v-if="additional" class="notification-additional">
                    {{ additional }}
                </p>
            </div>

            <div v-if="buttonAction" class="notification-actions">
                <button 
                    @click.once.stop="buttonAction.fn()" 
                    class="notification-button"
                >
                    {{ buttonAction.name }}
                </button>
            </div>
        </div>
    </li>
</template>

<style scoped>

.notification-item {
    box-sizing: border-box;
    position: relative;
    list-style: none;
    pointer-events: auto;
    cursor: pointer;
    overflow: hidden;
    width: 24rem;
    background-color: var(--notification-color);
    backdrop-filter: blur(24px);
    padding: 1.25rem;
    border-radius: 1.25rem 0.5rem 0.5rem 1.25rem;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    transition: all 0.300s ease;
}

.notification-item:hover {
    background-color: rgba(23, 23, 23, 0.7);
}

.notification-bar {
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    width: 0.6rem;
    opacity: 0.8;
}

.notification-content {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
}

.notification-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.75rem;
}

.notification-title {
    font-size: 15px;
    font-weight: 700;
    color: #ffffff;
    text-transform: uppercase;
    letter-spacing: -0.025em;
    opacity: 0.9;
    margin: 0;
}

.notification-body {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
}

.notification-message {
    font-size: 1rem;
    color: rgba(255, 255, 255, 0.8);
    line-height: 1.625;
    font-weight: 300;
    margin: 0;
}

.notification-additional {
    font-size: 13px;
    color: rgba(255, 255, 255, 0.4);
    vertical-align: middle;
    font-style: italic;
    font-weight: 500;
    letter-spacing: 0.05em;
    margin: 0;
}

.notification-actions {
    margin-top: 0.5rem;
    display: flex;
    justify-content: flex-end;
}

.notification-button {
    position: relative;
    overflow: hidden;
    padding: 0.5rem 1.25rem;
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: #ffffff;
    background-color: rgba(255, 255, 255, 0.05);
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
    transition: all 0.200s ease;
}

.notification-button:hover {
    background-color: rgba(255, 255, 255, 0.15);
}

.bg-info {
    background-color: rgb(var(--color-info));
}
.bg-error {
    background-color: rgb(var(--color-error));
}
.bg-warn {
    background-color: rgb(var(--color-warn));
}

</style>