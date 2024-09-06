<script setup lang="ts">
import { useLocalStorage } from '@vueuse/core'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'

export interface RoomFormEvent {
  roomId: string
  isHost: boolean
}

const emit = defineEmits<{
  submit: [event: RoomFormEvent]
}>()

const roomId = useLocalStorage<undefined | string>('gameRandomizer.roomId', undefined, {
  writeDefaults: false,
})

function submit(isHost: boolean) {
  if (!roomId.value) return
  emit('submit', { roomId: roomId.value.toLocaleLowerCase(), isHost })
}

function submitJoin() {
  submit(false)
}

function submitHost() {
  submit(true)
}
</script>

<template>
  <form @submit.prevent="submitJoin" class="flex flex-col gap-4 sm:flex-row">
    <InputText v-model="roomId" placeholder="Room name" required />
    <Button type="submit">Join Room</Button>
    <Button @click="submitHost">Host Room</Button>
  </form>
</template>
