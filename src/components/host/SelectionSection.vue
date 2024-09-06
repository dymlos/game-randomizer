<script setup lang="ts">
import { games } from '@/data'
import { useHostVoting } from '@/store/host/hostVoting'
import { usePeers } from '@/store/host/peers'
import { getRandomItem } from '@/utils'
import AutoComplete from 'primevue/autocomplete'
import Button from 'primevue/button'
import MultiSelect from 'primevue/multiselect'
import Select from 'primevue/select'
import { computed, ref, watch } from 'vue'

const peers = usePeers()
const voting = useHostVoting()

const categories = ['Players', 'Games', 'Challenges', 'Yes/No', 'Custom'] as const
const category = ref<(typeof categories)[number]>('Games')

const gameNames = games.map((game) => game.name)
const challengeGame = ref<string>(games[0].name)

const customOptions = ref<string[]>([])
const options = computed(() => {
  switch (category.value) {
    case 'Games':
      return gameNames
    case 'Players':
      return peers.list.map((peer) => ({ label: peer.name ?? peer.id, value: peer.id }))
    case 'Challenges':
      return []
    case 'Yes/No':
      return ['Yes', 'No']
    case 'Custom':
      return customOptions.value
  }
  return []
})
const selectedOptions = ref<string[]>([])
const possibleOptions = computed(() =>
  category.value === 'Custom' ? customOptions.value : selectedOptions.value,
)

const randomChosen = ref<string>()
const chosen = computed(() => randomChosen.value ?? voting.chosen)

function getOptionLabel(option: string | { label: string; value: string }) {
  return typeof option === 'string' ? option : option.label
}

function getOptionValue(option: string | { label: string; value: string }) {
  return typeof option === 'string' ? option : option.value
}

watch(
  category,
  () => {
    selectedOptions.value = options.value.map(getOptionValue)
  },
  { immediate: true },
)

function handleVoting() {
  if (voting.active) {
    voting.end()
    handleSpecialCategories()
  } else {
    if (!possibleOptions.value.length) return
    randomChosen.value = undefined
    voting.start(possibleOptions.value)
  }
}

function chooseRandom() {
  randomChosen.value = getRandomItem(possibleOptions.value)
  voting.chosen = undefined
  handleSpecialCategories()
}

function handleSpecialCategories() {
  if (category.value === 'Games') {
    challengeGame.value = chosen.value ?? games[0].name
  } else if (category.value === 'Challenges') {
    const game = games.find((game) => game.name === challengeGame.value)
    if (!game) throw new Error(`Game ${challengeGame.value} not found`)
    randomChosen.value = game.challenges
      .map((challenge) => {
        let options = challenge.choose()
        if (typeof options === 'string') options = [options]
        options = options.filter(Boolean)
        if (!options.length) return ''
        return options.map((option) => `${challenge.name}: ${option}`)
      })
      .filter(Boolean)
      .join('; ')
  }
}
</script>

<template>
  <section class="flex flex-col gap-2">
    <h2>Selection</h2>
    <Select v-model="category" :options="categories" :disabled="voting.active" />
    <Select
      v-if="category === 'Challenges'"
      v-model="challengeGame"
      :options="gameNames"
      :disabled="voting.active"
    />
    <AutoComplete
      v-if="category === 'Custom'"
      v-model="customOptions"
      class="max-w-sm sm:max-w-md"
      :disabled="voting.active"
      multiple
      :typeahead="false"
    />
    <MultiSelect
      v-else-if="category !== 'Yes/No' && category !== 'Challenges'"
      v-model="selectedOptions"
      :options="options"
      class="max-w-sm sm:max-w-md"
      :option-label="getOptionLabel"
      :option-value="getOptionValue"
      :disabled="voting.active"
    />
    <div class="flex gap-2">
      <Button @click="handleVoting" v-if="category !== 'Challenges'">
        {{ voting.active ? 'End vote' : 'Start vote' }}
      </Button>
      <Button @click="chooseRandom" v-if="!voting.active">Choose random</Button>
    </div>
    <p v-if="voting.active">Vote count: {{ voting.map.size }}/{{ peers.list.length }}</p>
    <p v-if="chosen">Chosen: {{ chosen }}</p>
  </section>
</template>
