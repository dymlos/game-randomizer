<script setup lang="ts">
import type { BattleMode, Challenge, Game } from '../data'

defineProps<{
  typeTitle: string
  data?: Game | BattleMode | Challenge
}>()

defineEmits<{
  click: []
}>()
</script>

<template>
  <section class="h-[36rem] w-80">
    <Transition
      mode="out-in"
      enter-active-class="transition-transform duration-500"
      enter-from-class="[transform:rotateY(90deg)]"
      leave-active-class="transition-transform duration-500"
      leave-to-class="[transform:rotateY(90deg)]"
    >
      <div
        v-if="data"
        class="flex flex-col gap-2 items-center justify-center h-full rounded-xl bg-violet-100 border border-violet-200 p-4 shadow-lg overflow-y-auto"
        :class="$style.cardInfo"
      >
        <h2 class="text-xl">{{ data.title }}</h2>
        <p v-if="'description' in data">
          {{ data.description }}
        </p>
        <slot />
      </div>
      <button
        v-else
        type="button"
        class="h-full w-full rounded-xl bg-violet-600 border border-violet-200 shadow-lg"
        @click="$emit('click')"
      >
        <div
          class="flex flex-col gap-2 items-center rounded-xl justify-center h-full p-4"
          :class="$style.cardBack"
        >
          <h2 class="bg-slate-200 px-4 py-3 border border-violet-600 rounded-md text-xl">
            {{ typeTitle }}
          </h2>
        </div>
      </button>
    </Transition>
  </section>
</template>

<style module>
.cardBack {
  background: repeating-linear-gradient(
    45deg,
    transparent,
    transparent 5px,
    #e5e5f7 5px,
    #e5e5f7 25px
  );
}

.cardInfo > * {
  @apply bg-slate-200 p-2 border border-violet-300 rounded-md;
}
</style>
