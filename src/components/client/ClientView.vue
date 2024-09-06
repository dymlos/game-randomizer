<script setup lang="ts">
import type { Room } from 'trystero'
import { computed, ref, watchEffect } from 'vue'
import ClientNameForm from './ClientNameForm.vue'

const props = defineProps<{
  roomId: string
  room: Room
}>()

const peerName = ref('')
const hostId = ref('')
const lostHostId = ref<string>()

const getHostId = computed(() => props.room.makeAction<null>('hostId')[1])
const sendPeerName = computed(() => props.room.makeAction<string>('peerName')[0])

watchEffect(() => {
  getHostId.value((_, peerId) => {
    hostId.value = peerId
    if (peerName.value) {
      sendPeerName.value(peerName.value, peerId)
    }
  })
})

watchEffect(() => {
  props.room.onPeerLeave((peerId) => {
    if (peerId === hostId.value) {
      lostHostId.value = peerId
    }
  })
})

const getVoting = props.room.makeAction<string[]>('voting')[1]
const getEndVoting = props.room.makeAction<null>('endVoting')[1]
const sendVote = props.room.makeAction<string>('vote')[0]
const voteList = ref<string[]>()

getVoting((list) => {
  voteList.value = list
})

getEndVoting(() => {
  voteList.value = undefined
})

function vote(vote: string) {
  sendVote(vote, hostId.value)
}
</script>

<template>
  <section>
    <h1>
      Room {{ roomId }}<span v-if="peerName"> / Player {{ peerName }}</span>
    </h1>
    <p v-if="!hostId">Establishing connection...</p>
    <p v-else-if="hostId === lostHostId">Connection lost</p>
    <ClientNameForm v-else-if="!peerName" :room :hostId @submit="peerName = $event" />
    <section v-else-if="voteList">
      <h2>Vote for the game</h2>
      <ul>
        <li v-for="game in voteList" :key="game">
          <button @click="vote(game)">{{ game }}</button>
        </li>
      </ul>
    </section>
  </section>
</template>
