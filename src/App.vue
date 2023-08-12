<script setup lang="ts">
import { RouterView, useRoute, useRouter } from 'vue-router'
import Header from '@/components/Header.vue'
import { onBeforeMount } from 'vue'
import { postToken } from './services/api'

const router = useRouter()

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
    // TODO: manage login state
    const isLoggedIn = localStorage.getItem('access_token')

    if (!isLoggedIn) {
      router.push('/login')
    }
  }
})
</script>

<template>
  <Header />

  <RouterView class="router" />
</template>

<style scoped></style>
