<script setup lang="ts">
import { usePeers } from '@/store/host/peers'

const peers = usePeers()
</script>

<template>
  <section class="flex flex-col gap-2">
    <h2>Players</h2>
    <ul>
      <li v-for="peer in peers.list" :key="peer.id">
        {{ peer.name ?? peer.id }}
      </li>
    </ul>
  </section>
</template>
