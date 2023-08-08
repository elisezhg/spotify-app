<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter, onBeforeRouteLeave } from 'vue-router'
import Login from '@/components/Login.vue'

const isLoggedIn = ref(false)
const router = useRouter()

onMounted(() => {
  // TODO: manage login state
  isLoggedIn.value = router.currentRoute.value.query.code != null
  console.log(router.currentRoute.value.query.code != null);

  if (isLoggedIn.value) {
    router.push({ path: '/' })
  }
})

onBeforeRouteLeave((to, from, next) => {
  if (from.query.code) {
    to.query.code = from.query.code
  }
  next()
})
</script>

<template>
  <Login />
</template>
