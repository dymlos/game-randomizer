<script setup lang="ts">
import type { Room } from 'trystero'
import { computed, ref } from 'vue'

const props = defineProps<{ room: Room; hostId: string }>()

const emit = defineEmits<{ submit: [name: string] }>()

const peerName = ref('')
const loading = ref(false)

const sendPeerName = computed(() => props.room.makeAction<string>('peerName')[0])

async function submit() {
  loading.value = true
  try {
    await sendPeerName.value(peerName.value, props.hostId)
    emit('submit', peerName.value)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <form @submit.prevent="submit">
    <input type="text" autofocus placeholder="Your name" v-model="peerName" required />
    <button :disabled="loading">Set Name</button>
  </form>
</template>
