<script setup lang="ts">
import { ref } from 'vue'
const userInfo = ref(null)
</script>

<template>
  <main>
    <h2>Home Page</h2>
    <pre v-if="userInfo">{{ JSON.stringify(userInfo, null, 2) }}</pre>
  </main>
</template>
