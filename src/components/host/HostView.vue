<script setup lang="ts">
import { useRoom } from '@/store/room'
import PlayerList from './PlayerList.vue'
import SelectionSection from './SelectionSection.vue'

const room = useRoom()
</script>

<template>
  <section class="flex flex-col items-center gap-4">
    <h1 class="text-xl">Room {{ room.id }}</h1>
    <div class="flex gap-4 flex-col sm:gap-10 sm:flex-row">
      <PlayerList class="order-last sm:order-none" />
      <SelectionSection />
    </div>
  </section>
</template>
