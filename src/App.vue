<script setup lang="ts">
import { RouterView, useRouter } from 'vue-router'
import Header from '@/components/Header.vue'
import { onBeforeMount, ref, toRef } from 'vue'
import { postToken } from './services/api'
import { provide } from 'vue'

const router = useRouter()

const isLoggedIn = ref(false)
const reactiveIsLoggedIn = toRef(isLoggedIn)

function setIsLoggedIn(newValue: boolean) {
  reactiveIsLoggedIn.value = newValue
}

provide('isLoggedIn', { isLoggedIn: reactiveIsLoggedIn, setIsLoggedIn })

// TODO: improve the logic to only check for the login code on '/'
onBeforeMount(() => {
  const loginCode = new URLSearchParams(window.location.search).get('code')

  if (loginCode) {
    postToken(loginCode as string)
      .then((response) => {
        if (!response.ok) {
          throw new Error('HTTP status ' + response.status)
        }
        return response.json()
      })
      .then((data) => {
        localStorage.setItem('access_token', data.access_token)
        setIsLoggedIn(true)
        router.push('/')
      })
  } else {
    setIsLoggedIn(localStorage.getItem('access_token') != null)

    if (!isLoggedIn.value) {
      router.push('/login')
    }
  }
})
</script>

<template>
  <Header />
  <main class="router">
    <RouterView />
  </main>
</template>

<style scoped></style>
