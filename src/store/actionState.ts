import { acceptHMRUpdate, defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import { type RoomAction, useRoom } from './room'
import type { TargetPeers } from 'trystero'

export type RoomActionMap = Map<keyof RoomAction, RoomAction[keyof RoomAction]>

export const useActionState = defineStore('roomState', () => {
  const room = useRoom()

  const actions = reactive<RoomActionMap>(new Map())
  const hostId = ref<string>()

  room.onStart(() => {
    actions.clear()
  })

  async function set<T extends keyof RoomAction>(name: T, payload: RoomAction[T]) {
    const result = await room.send(name, payload, hostId.value)
    actions.set(name, payload)
    return result
  }

  function remove(name: keyof RoomAction) {
    // TODO handle race condition (remove can be called before set is resolved)
    actions.delete(name)
  }

  function sendAll(targetPeers: TargetPeers | undefined = hostId.value) {
    for (const action of actions.entries()) {
      room.send(action[0], action[1], targetPeers)
    }
  }

  return {
    hostId,
    set,
    delete: remove,
    sendAll,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useActionState, import.meta.hot))
}
