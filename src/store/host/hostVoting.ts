import { acceptHMRUpdate, defineStore } from 'pinia'
import { computed, reactive, ref } from 'vue'
import { useRoom } from '../room'
import { getRandomItem } from '@/utils'
import { useActionState } from '../actionState'

export const useHostVoting = defineStore('hostVoting', () => {
  const room = useRoom()
  const actionState = useActionState()

  const options = ref<string[]>()
  const voteMap = reactive(new Map<string, string>())
  const chosen = ref<string>()

  const active = computed(() => Boolean(options.value))

  function start(votingOptions: string[]) {
    voteMap.clear()
    options.value = votingOptions
    actionState.set('voting:start', votingOptions)
  }

  room.watch('voting:vote', (vote, peerId) => {
    if (!active.value) return
    voteMap.set(peerId, vote)
  })

  room.onPeerLeave((peerId) => {
    if (!active.value) return
    voteMap.delete(peerId)
  })

  function end() {
    actionState.delete('voting:start')
    options.value = undefined
    chosen.value = getRandomItem([...voteMap.values()])
    voteMap.clear()
    room.send('voting:end', null)
  }

  return {
    active,
    start,
    end,
    map: voteMap,
    chosen,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useHostVoting, import.meta.hot))
}
