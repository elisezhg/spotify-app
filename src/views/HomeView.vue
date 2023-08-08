<script setup lang="ts">
import router from '@/router'
import { postToken, getMe } from '@/services/api'
import { onMounted, ref } from 'vue'

const userInfo = ref(null)

onMounted(() => {
  // TODO: manage login state
  const isLoggedIn = router.currentRoute.value.query.code != null

  if (!isLoggedIn) {
    router.push({ path: '/login' })
  }

  if (!localStorage.getItem('access_token')) {
    postToken()
      .then((response) => {
        if (!response.ok) {
          throw new Error('HTTP status ' + response.status)
        }
        return response.json()
      })
      .then((data) => {
        localStorage.setItem('access_token', data.access_token)
        getMe()
          .then((response) => {
            if (!response.ok) {
              throw new Error('HTTP status ' + response.status)
            }
            return response.json()
          })
          .then((data) => {
            userInfo.value = data
          })
      })
  }
})
</script>

<template>
  <main>
    <h2>Home Page</h2>
    <pre v-if="userInfo">{{ JSON.stringify(userInfo, null, 2) }}</pre>
  </main>
</template>
