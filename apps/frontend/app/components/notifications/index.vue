<script setup lang="ts">
import useNotificationStore from '@/stores/notifications.store';
import { NotificationsTypes } from '~/types/notification';

const notificationStore = useNotificationStore();

const getTypeColor = (type: NotificationsTypes): string => {
    const colors = {
        [NotificationsTypes.info]: 'bg-info',
        [NotificationsTypes.error]: 'bg-error',
        [NotificationsTypes.warn]: 'bg-warn',
    };
    return colors[type] || 'bg-neutral';
};
</script>

<template>

    <NotificationsAreaVariantsMobile v-if="$device.isMobile">
        <NotificationsInstanceVariantsMobile
            v-for="item in notificationStore.items" 
            :key="item.id"
            :title="item.content.title"
            :message="item.content.message"
            :additional="item.content.additional"
            :color="getTypeColor(item.type)"
            :mouseEnterAction="() => item.pause()" 
            :mouseLeaveAction="() => item.resume()"
            :clickAction="() => item.destroy()"
            :buttonAction="item.action ? { name: item.action.name, fn: () => item.callback() } : null"
        />
    </NotificationsAreaVariantsMobile>

    <NotificationsAreaVariantsDesktop v-else>
        <NotificationsInstanceVariantsDesktop
            v-for="item in notificationStore.items" 
            :key="item.id"
            :title="item.content.title"
            :message="item.content.message"
            :additional="item.content.additional"
            :type="getTypeColor(item.type)"
            :mouseEnterAction="() => item.pause()" 
            :mouseLeaveAction="() => item.resume()"
            :clickAction="() => item.destroy()"
            :buttonAction="item.action ? { name: item.action.name, fn: () => item.callback() } : null"
        />
    </NotificationsAreaVariantsDesktop>

</template>