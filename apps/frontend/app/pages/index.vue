<script setup lang="ts">
import useNotificationStore from '~/stores/notifications.store';
import { NotificationsTypes } from '~/types/notification';

const notificationStore = useNotificationStore();

function al(a: string) {
  alert(a);
}
</script>

<template>
  <div>
    <button class="test-button" v-on:click="notificationStore.createNotification(NotificationsTypes.info, {
      title: 'zed31rus',
      message: 'notification!',
      additional: 'zed31rus.ru'
    })">bom</button>
  </div>
  <div>
    <button class="error-button" v-on:click="notificationStore.createNotification(NotificationsTypes.error, {
      title: 'ERROR',
      message: 'КАМПУТАР БАБАХ',
      additional: 'zed31rus.ru'
    },
    {
      name: 'Е',
      fn: () => {
        al('КАМПУТАР БАБАХ')
      }
    }
    )">
      error
    </button>
  </div>
</template>

<style scoped>
.test-button {
    position: absolute;
    right: 50%;
    top: 50%;
}
.error-button {
  position: absolute;
  right: 40%;
  top: 50%;
}
</style>