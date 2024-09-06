<script setup lang="ts">
import { useLocalStorage } from '@vueuse/core'
import { joinRoom, type Room } from 'trystero'
import { ref } from 'vue'
import HostView from './components/host/HostView.vue'
import ClientView from './components/client/ClientView.vue'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'

const roomId = useLocalStorage('gameRandomizer.roomId', '', { writeDefaults: false })
const room = ref<Room>()
const isHost = ref<boolean>()

function submit() {
  room.value = joinRoom({ appId: 'dymlos-game-randomizer' }, roomId.value)
}

function submitJoin() {
  submit()
  isHost.value = false
}

function submitHost() {
  submit()
  isHost.value = true
}
</script>

<template>
  <main class="flex flex-col gap-4 m-4 items-center">
    <form @submit.prevent="submitJoin" v-if="!room" class="flex gap-4">
      <InputText v-model="roomId" placeholder="Room name" required />
      <Button type="submit">Join Room</Button>
      <Button type="button" @click="submitHost">Host Room</Button>
    </form>
    <HostView v-else-if="isHost" :room :roomId />
    <ClientView v-else :room :roomId />
  </main>
</template>
