<script setup lang="ts">
import useNotificationStore from '~/stores/notifications.store';
import getTypeColor from '~/composables/typeColors';

  const notificationStore = useNotificationStore();
</script>

<template>    
  <NotificationsAreaMobile v-if="$device.isMobile">
    <NotificationsInstanceMobile
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
  </NotificationsAreaMobile>
</template>