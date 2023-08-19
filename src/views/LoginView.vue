<script setup lang="ts">
import { onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
import Login from '@/components/Login.vue'
import { inject } from 'vue'
import type IsLoggedInType from '@/types/is-logged-in'

const { isLoggedIn } = inject('isLoggedIn') as IsLoggedInType
const router = useRouter()

onBeforeMount(() => {
  if (isLoggedIn.value) {
    router.push({ path: '/' })
  }
})
</script>

<template>
  <Login />
</template>
