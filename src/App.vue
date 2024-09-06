<script setup lang="ts">
import { ref } from 'vue'
import ClientView from './components/client/ClientView.vue'
import HostView from './components/host/HostView.vue'
import RoomForm, { type RoomFormEvent } from './components/RoomForm.vue'
import { useRoom } from './store/room'

const room = useRoom()
const isHost = ref<boolean>()

function submit(event: RoomFormEvent) {
  isHost.value = event.isHost
  room.join(event.roomId)
}
</script>

<template>
  <main class="m-4 flex justify-center">
    <RoomForm v-if="!room.id" @submit="submit" />
    <HostView v-else-if="isHost" />
    <ClientView v-else />
  </main>
</template>
