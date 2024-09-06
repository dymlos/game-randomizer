<script setup lang="ts">
import { useActionState } from '@/store/actionState'
import { useLocalStorage } from '@vueuse/core'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import { ref } from 'vue'

const emit = defineEmits<{ submit: [name: string] }>()

const actionState = useActionState()

const peerName = useLocalStorage<string | undefined>('gameRandomizer.peerName', undefined, {
  writeDefaults: false,
})
const loading = ref(false)

async function submit() {
  if (!peerName.value) return
  loading.value = true
  try {
    await actionState.set('peer:name', peerName.value)
    emit('submit', peerName.value)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <form @submit.prevent="submit" class="flex flex-col gap-4 sm:flex-row">
    <InputText autofocus placeholder="Your name" v-model="peerName" required :disabled="loading" />
    <Button type="submit" :loading>Set Name</Button>
  </form>
</template>
