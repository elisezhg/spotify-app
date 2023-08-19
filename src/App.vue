<script setup lang="ts">
import { RouterView } from 'vue-router'
import Header from '@/components/Header.vue'
import { onBeforeMount, ref, toRef } from 'vue'
import { provide } from 'vue'

const isLoggedIn = ref(false)
const reactiveIsLoggedIn = toRef(isLoggedIn)

function setIsLoggedIn(newValue: boolean) {
  reactiveIsLoggedIn.value = newValue
}

provide('isLoggedIn', { isLoggedIn: reactiveIsLoggedIn, setIsLoggedIn })

onBeforeMount(() => {
  setIsLoggedIn(localStorage.getItem('access_token') !== null)
})
</script>

<template>
  <Header />
  <main class="router">
    <RouterView />
  </main>
</template>

<style scoped></style>
