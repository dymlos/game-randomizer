<script setup lang="ts">
import { useRoom } from '@/store/room'
import PlayerList from './PlayerList.vue'
import SelectionSection from './SelectionSection.vue'

const room = useRoom()
</script>

<template>
  <section class="flex flex-col items-center gap-4">
    <h1 class="text-xl">Room {{ room.id }}</h1>
    <div class="flex gap-10">
      <PlayerList />
      <SelectionSection />
    </div>
  </section>
</template>
