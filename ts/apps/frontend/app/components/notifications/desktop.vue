<script setup lang="ts">
import useNotificationStore from '~/stores/notifications';
import getTypeColor from '~/composables/typeColors';

  const notificationStore = useNotificationStore();
</script>

<template>
  <NotificationsAreaDesktop>
    <NotificationsInstanceDesktop
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
  </NotificationsAreaDesktop>
</template>