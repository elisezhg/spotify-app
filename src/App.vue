<script setup lang="ts">
import { RouterView, useRouter } from 'vue-router'
import Header from '@/components/Header.vue'
import { onBeforeMount, ref } from 'vue'
import { postToken } from './services/api'

const router = useRouter()
const isLoggedIn = ref(false)

// TODO: improve the logic to only check for the login code on '/'
onBeforeMount(() => {
  const loginCode = new URLSearchParams(window.location.search).get('code')

  if (loginCode) {
    router.push('/')
    postToken(loginCode as string)
      .then((response) => {
        if (!response.ok) {
          throw new Error('HTTP status ' + response.status)
        }
        return response.json()
      })
      .then((data) => {
        localStorage.setItem('access_token', data.access_token)
      })
  } else {
    isLoggedIn.value = localStorage.getItem('access_token') != null

    if (!isLoggedIn) {
      router.push('/login')
    }
  }
})
</script>

<template>
  <Header :is-logged-in="isLoggedIn" />

  <main class="router">
    <RouterView />
  </main>
</template>

<style scoped></style>
