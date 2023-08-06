<script lang="ts">
import router from '@/router'
import Login from '../components/Login.vue'
import { postToken, getMe } from '@/services/api'

export default {
  components: {
    Login
  },
  data() {
    return {
      userInfo: null
    }
  },
  mounted() {
    // TODO: manage login state
    const isLoggedIn = this.$route.query.code != null

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
        })
    }

    getMe()
      .then((response) => {
        if (!response.ok) {
          throw new Error('HTTP status ' + response.status)
        }
        return response.json()
      })
      .then((data) => {
        this.userInfo = data
      })
  }
}
</script>

<template>
  <main>
    <h2>Home Page</h2>
    <pre v-if="userInfo">{{ JSON.stringify(userInfo, null, 2) }}</pre>
  </main>
</template>
