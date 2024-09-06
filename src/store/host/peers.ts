import { acceptHMRUpdate, defineStore } from 'pinia'
import { computed, reactive } from 'vue'
import { useRoom } from '../room'
import { useActionState } from '../actionState'

interface Peer {
  id: string
  name?: string
}

export const usePeers = defineStore('peers', () => {
  const room = useRoom()
  const actionState = useActionState()

  const peers = reactive(new Map<string, Peer>())

  const peerList = computed(() => [...peers.values()])

  room.onStart(() => {
    peers.clear()
  })

  room.onClose(() => {
    peers.clear()
  })

  room.onPeerJoin((peerId) => {
    console.log('peer joined:', peerId)
    peers.set(peerId, reactive({ id: peerId }))
    room.send('host:id', null, peerId)
    actionState.sendAll(peerId)
  })

  room.onPeerLeave((peerId) => {
    console.log('peer left:', peerId, peers.get(peerId))
    peers.delete(peerId)
  })

  room.watch('peer:name', (name, peerId) => {
    const peer = peers.get(peerId)
    if (peer) {
      peer.name = name
    }
  })

  return { list: peerList }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(usePeers, import.meta.hot))
}
