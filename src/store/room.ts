import { acceptHMRUpdate, defineStore } from 'pinia'
import type {} from 'trystero'
// import { joinRoom, type JsonValue, type Room, type TargetPeers } from 'trystero/supabase'
import { joinRoom, type JsonValue, type Room, type TargetPeers } from 'trystero/firebase'
import { ref, watch } from 'vue'

export type RoomAction = {
  ['peer:name']: string
  ['host:id']: null
  ['voting:start']: string[]
  ['voting:end']: null
  ['voting:vote']: string
}

export const useRoom = defineStore('room', () => {
  const id = ref<undefined | string>()
  const instance = ref<Room>()

  const eventTarget = new EventTarget()

  watch(
    instance,
    (room) => {
      if (!room) return
      room.onPeerJoin((peerId) => {
        eventTarget.dispatchEvent(new CustomEvent('peerJoin', { detail: peerId }))
      })
      room.onPeerLeave((peerId) => {
        eventTarget.dispatchEvent(new CustomEvent('peerLeave', { detail: peerId }))
      })
    },
    { immediate: true },
  )

  function getRoom() {
    const room = instance.value
    if (!room) throw new Error('Room was not created')
    return room
  }

  function join(roomId: string) {
    id.value = roomId
    instance.value = joinRoom(
      {
        appId: 'https://game-randomizer-8b597-default-rtdb.firebaseio.com/',
      },
      roomId,
    )
  }

  function send<T extends keyof RoomAction>(
    name: T,
    payload: RoomAction[T],
    targetPeers?: TargetPeers,
  ) {
    const room = getRoom()
    return room.makeAction(name)[0](payload ?? null, targetPeers)
  }

  function watchAction<T extends keyof RoomAction>(
    name: T,
    receiver: (data: RoomAction[T], peerId: string, metadata?: JsonValue) => void,
  ) {
    watch(
      instance,
      (room) => {
        if (!room) return
        room.makeAction<RoomAction[T]>(name)[1](receiver)
      },
      { immediate: true },
    )
  }

  function onStart(cb: (room: Room) => void) {
    watch(
      instance,
      (room) => {
        if (room) cb(room)
      },
      { immediate: true },
    )
  }

  function onClose(cb: () => void) {
    watch(
      instance,
      (room) => {
        if (!room) cb()
      },
      { immediate: true },
    )
  }

  function onPeerJoin(cb: (peerId: string) => void) {
    eventTarget.addEventListener('peerJoin', (event) => {
      cb((event as CustomEvent).detail)
    })
  }

  function onPeerLeave(cb: (peerId: string) => void) {
    eventTarget.addEventListener('peerLeave', (event) => {
      cb((event as CustomEvent).detail)
    })
  }

  return {
    id,
    join,
    instance,
    send,
    watch: watchAction,
    onStart,
    onClose,
    onPeerJoin,
    onPeerLeave,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useRoom, import.meta.hot))
}
