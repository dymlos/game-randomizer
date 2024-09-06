<script setup lang="ts">
import { ref } from 'vue'
import ClientNameForm from './ClientNameForm.vue'
import { useRoom } from '@/store/room'
import { useActionState } from '@/store/actionState'
import Button from 'primevue/button'

const room = useRoom()
const actionState = useActionState()

const peerName = ref<string>()

room.watch('host:id', (_, id) => {
  actionState.hostId = id
  actionState.sendAll()
  endVote()
})

room.onPeerLeave((peerId) => {
  if (peerId === actionState.hostId) {
    actionState.hostId = undefined
  }
})

const voteList = ref<string[]>()
const selectedVote = ref<string>()

room.watch('voting:start', (list) => {
  actionState.delete('voting:vote')
  voteList.value = list
  selectedVote.value = undefined
})

function endVote() {
  actionState.delete('voting:vote')
  voteList.value = undefined
  selectedVote.value = undefined
}

room.watch('voting:end', () => {
  endVote()
})

function vote(vote: string) {
  actionState.set('voting:vote', vote)
  selectedVote.value = vote
}
</script>

<template>
  <section class="flex w-full max-w-screen-sm flex-col gap-4">
    <h1 class="text-lg">
      Room {{ room.id }}<span v-if="peerName"> / Player {{ peerName }}</span>
    </h1>
    <p v-if="!actionState.hostId">Establishing connection...</p>
    <ClientNameForm v-else-if="!peerName" @submit="peerName = $event" />
    <ul v-else-if="voteList" class="flex flex-col gap-3">
      <li v-for="item in voteList" :key="item">
        <Button @click="vote(item)" :outlined="selectedVote !== item" class="w-full">{{
          item
        }}</Button>
      </li>
    </ul>
  </section>
</template>
