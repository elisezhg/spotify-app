<script setup lang="ts">
import { ref, onMounted, onBeforeMount } from 'vue'
import { useRouter, onBeforeRouteLeave } from 'vue-router'
import Login from '@/components/Login.vue'

const isLoggedIn = ref(false)
const router = useRouter()

onBeforeMount(() => {
  // TODO: manage login state
  if (localStorage.getItem('access_token') != null) {
    router.push({ path: '/' })
  }
})
</script>

<template>
  <Login />
</template>
