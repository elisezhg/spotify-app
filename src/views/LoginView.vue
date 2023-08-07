<script lang="ts">
import router from '@/router'
import Login from '../components/Login.vue'

export default {
  components: {
    Login
  },
  data() {
    return {
      isLoggedIn: false
    }
  },
  mounted() {
    // TODO: manage login state
    this.isLoggedIn = this.$route.query.code != null

    if (this.isLoggedIn) {
      router.push({ path: '/' })
    }
  },
  beforeRouteLeave(to, from, next) {
    if (from.query.code) {
      to.query.code = from.query.code
    }
    next()
  }
}
</script>

<template>
  <main>
    <Login v-if="!isLoggedIn" />
  </main>
</template>
