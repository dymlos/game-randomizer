<script setup lang="ts">
import {
  boomerangFuItems,
  boplBattleItems,
  mysticStrifeCharacters,
  rivalsOfAetherCharacters,
  wanbaWarriorsCharacters,
  type Challenge,
  type Game,
} from '@/data'
import { getRandomItemNumber, getRandomItems } from '@/utils'
import { ref, watch, watchEffect } from 'vue'

const props = defineProps<{
  challenge: Challenge
  game?: Game
}>()

const extra = ref<string[]>()

watch(
  () => props.challenge,
  () => {
    extra.value = undefined
  },
)

watch(
  () => props.game,
  () => {
    extra.value = undefined
  },
)

watchEffect(() => {
  if (extra.value || !props.game) return

  setExtra()
})

function setExtra() {
  if (!props.game) return
  extra.value = getChallengeExtra(props.challenge, props.game)
}

function getChallengeExtra(challenge: Challenge, game: Game): string[] {
  switch (challenge.name) {
    case 'unique-item': {
      switch (game.name) {
        case 'boomerang-fu':
          return getRandomItems(boomerangFuItems, getRandomItemNumber(boomerangFuItems.length))
        case 'bopl-battle':
          return getRandomItems(boplBattleItems, 3)
      }
      break
    }
    case 'mirror-war': {
      switch (game.name) {
        case 'mystic-strife':
          return getRandomItems(mysticStrifeCharacters, 1)
        case 'rivals-of-aether':
          return getRandomItems(rivalsOfAetherCharacters, 1)
        case 'wanba-warrior':
          return getRandomItems(wanbaWarriorsCharacters, 2)
        case 'bopl-battle':
          return getRandomItems(boplBattleItems, 3)
      }
    }
  }

  return []
}
</script>

<template>
  <button v-if="extra?.length" type="button" @click="setExtra">{{ extra.join(', ') }}</button>
</template>
