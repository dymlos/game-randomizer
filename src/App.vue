<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { battleModes, challenges, games, type BattleMode, type Challenge, type Game } from './data'
import GameCard from './components/GameCard.vue'
import ChallengeExtra from './components/ChallengeExtra.vue'

const points = reactive({
  blue: 0,
  red: 0,
})

const chosenCards = reactive({
  battleMode: ref<BattleMode>(),
  game: ref<Game>(),
  challenge: ref<Challenge>(),
})

const decks = reactive({
  battleMode: computed(() =>
    battleModes.filter(
      (bm: BattleMode) => (chosenCards.game && bm.games?.includes(chosenCards.game.name)) ?? true,
    ),
  ),
  game: computed(() =>
    games.filter(
      (g) =>
        (chosenCards.battleMode?.games?.includes(g.name) ?? true) &&
        (chosenCards.challenge?.games?.includes(g.name) ?? true),
    ),
  ),
  challenge: computed(() =>
    challenges.filter(
      (c: Challenge) => (chosenCards.game && c.games?.includes(chosenCards.game.name)) ?? true,
    ),
  ),
})

const winnerChosen = ref(false)
const canChooseWinner = computed(() =>
  Boolean(
    chosenCards.battleMode && chosenCards.challenge && chosenCards.game && !winnerChosen.value,
  ),
)

const draw = (deck: keyof typeof decks) => {
  const cards =
    deck === 'challenge' ? decks.challenge.flatMap((c) => new Array(c.weight).fill(c)) : decks[deck]
  const randomIndex = Math.floor(Math.random() * cards.length)
  chosenCards[deck] = cards[randomIndex] as any
}

const redraw = () => {
  chosenCards.battleMode = undefined
  chosenCards.game = undefined
  chosenCards.challenge = undefined
  winnerChosen.value = false
}

const chooseWinner = (team: keyof typeof points) => {
  points[team] += chosenCards.battleMode?.points ?? 0
  winnerChosen.value = true
}
</script>

<template>
  <main class="flex flex-col gap-4 m-4 items-center">
    <section class="flex gap-4">
      <section class="flex gap-2">
        <input type="number" v-model="points.blue" class="text-blue-600" :class="$style.input" />
        <button
          type="button"
          :disabled="!canChooseWinner"
          @click="chooseWinner('blue')"
          class="bg-blue-600"
          :class="$style.btn"
        >
          +
        </button>
      </section>
      <div>
        <button type="button" @click="redraw" class="bg-stone-400" :class="$style.btn">
          Mezclar nuevamente
        </button>
      </div>
      <section class="flex gap-2">
        <button
          type="button"
          :disabled="!canChooseWinner"
          @click="chooseWinner('red')"
          class="bg-red-600"
          :class="$style.btn"
        >
          +
        </button>
        <input type="number" v-model="points.red" class="text-red-600" :class="$style.input" />
      </section>
    </section>
    <ul>
      <li class="flex gap-4">
        <GameCard
          :typeTitle="'Modo de batalla'"
          :data="chosenCards.battleMode"
          @click="draw('battleMode')"
        >
          <div>Puntos: {{ chosenCards.battleMode?.points }}</div>
        </GameCard>
        <GameCard :typeTitle="'Juego'" :data="chosenCards.game" @click="draw('game')" />
        <GameCard :typeTitle="'Desafío'" :data="chosenCards.challenge" @click="draw('challenge')">
          <ChallengeExtra
            v-if="chosenCards.challenge"
            :challenge="chosenCards.challenge"
            :game="chosenCards.game"
          />
        </GameCard>
      </li>
    </ul>
  </main>
</template>

<style module>
.btn {
  @apply px-4 py-2 rounded-md text-white;

  &:disabled {
    @apply bg-gray-300 cursor-not-allowed;
  }
}

.input {
  @apply border border-gray-300 rounded-md px-4 py-2 w-20;
}
</style>
