<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { battleModes, challenges, games, type BattleMode, type Challenge, type Game } from './data'

const points = reactive({
  a: 0,
  b: 0,
})

const battleMode = ref<BattleMode>()
const challenge = ref<Challenge>()
const game = ref<Game>()

const selections = reactive([
  {
    title: 'Battle Mode',
    ref: battleMode,
    options: battleModes,
  },
  {
    title: 'Challenge',
    ref: challenge,
    options: challenges,
  },
  {
    title: 'Game',
    ref: game,
    options: computed(() =>
      games.filter(
        (g) =>
          (battleMode.value?.games?.includes(g.name) ?? true) &&
          (challenge.value?.games?.includes(g.name) ?? true),
      ),
    ),
  },
])

const selectionIndex = ref(0)

const selection = computed(() => selections[selectionIndex.value])
const canChooseWinner = computed(() => battleMode.value && challenge.value && game.value)

const draw = () => {
  const sel = selection.value
  sel.ref = sel.options[Math.floor(Math.random() * sel.options.length)] as any
  const newIndex = (selectionIndex.value + 1) % selections.length
  selectionIndex.value = newIndex
}

const chooseWinner = (team: keyof typeof points) => {
  points[team] += battleMode.value?.points ?? 0
  battleMode.value = undefined
  challenge.value = undefined
  game.value = undefined
  selectionIndex.value = 0
}
</script>

<template>
  <div>
    <ul>
      <li v-for="point in Object.entries(points)" :key="point[0]">
        {{ point[0] }}: {{ point[1] }}
      </li>
    </ul>
    <ul>
      <li v-for="sel in selections" :key="sel.title">{{ sel.title }}: {{ sel.ref?.title }}</li>
    </ul>
    <div v-if="canChooseWinner">
      <button type="button" @click="chooseWinner('a')">A wins</button>
      <button type="button" @click="chooseWinner('b')">B wins</button>
    </div>
    <button v-else type="button" @click="draw">Draw {{ selection.title.toLowerCase() }}</button>
  </div>
</template>
