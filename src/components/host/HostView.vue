<script setup lang="ts">
import { games } from '@/data'
import { getRandomItem } from '@/utils'
import Button from 'primevue/button'
import type { Room } from 'trystero'
import { computed, reactive, ref, watch } from 'vue'

interface Peer {
  id: string
  name?: string
}

const props = defineProps<{
  roomId: string
  room: Room
}>()

const { peerList } = usePeers()

function usePeers() {
  const peers = reactive(new Map<string, Peer>())

  const peerList = computed(() => [...peers.values()])

  watch(
    () => props.room,
    (room) => {
      const sendHostId = room.makeAction<null>('hostId')[0]
      console.log(room.getPeers())
      for (const peerId of Object.keys(room.getPeers())) {
        peers.set(peerId, reactive({ id: peerId }))
        sendHostId(null)
      }
      room.onPeerJoin((peerId) => {
        console.log(room.getPeers())
        console.log('joined', peerId)
        peers.set(peerId, reactive({ id: peerId }))
        sendHostId(null)
      })
      room.onPeerLeave((peerId) => {
        console.log('left', peerId)
        peers.delete(peerId)
      })

      room.makeAction<string>('peerName')[1]((name, peerId) => {
        const peer = peers.get(peerId)
        if (peer) {
          peer.name = name
        }
      })
    },
    { immediate: true },
  )

  return { peers, peerList }
}

const voting = ref(false)
const sendVoting = props.room.makeAction<string[]>('voting')[0]
const sendEndVoting = props.room.makeAction<null>('endVoting')[0]
const getVote = props.room.makeAction<string>('vote')[1]
const voteMap = reactive(new Map<string, string>())
const selectedVote = ref('')

function startGameVoting() {
  voteMap.clear()
  voting.value = true
  sendVoting(games.map((game) => game.name))
}

getVote((vote, peerId) => {
  voteMap.set(peerId, vote)
})

function endGameVoting() {
  voting.value = false
  sendEndVoting(null)
  selectedVote.value = getRandomItem([...voteMap.values()])
}
</script>

<template>
  <section>
    <h1>Room {{ roomId }}</h1>
    <div class="flex gap-4">
      <section>
        <h2>Players</h2>
        <ul>
          <li v-for="peer in peerList" :key="peer.id">
            {{ peer.name ?? peer.id }}
          </li>
        </ul>
      </section>
      <section>
        <h2>Game</h2>
        <Button @click="voting ? endGameVoting() : startGameVoting()">
          {{ voting ? 'End vote' : 'Vote game' }}
        </Button>
        <p v-if="voting">Vote count: {{ voteMap.size }}/{{ peerList.length }}</p>
        <p v-if="selectedVote">Selected: {{ selectedVote }}</p>
      </section>
    </div>
  </section>
</template>
