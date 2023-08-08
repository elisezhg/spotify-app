<script setup lang="ts">
import { RouterView } from 'vue-router'
import Header from '@/components/Header.vue'
</script>

<template>
  <Header />

  <main>
    <RouterView class="router" />
  </main>
</template>

<style scoped></style>
