<script setup lang="ts">
import UserInfo from '@/components/UserInfo.vue'
import { getMe, getUserPlaylists, getUserTracks } from '@/services/api'
import { onBeforeMount, onMounted, ref } from 'vue'
import { RouterView, useRouter } from 'vue-router'
import { inject } from 'vue'
import type IsLoggedInType from '@/types/is-logged-in'

const userInfo = ref(null as any) // TODO: typing
const userPlaylists = ref(null as any)
const userTracks = ref(null as any)

const { isLoggedIn } = inject('isLoggedIn') as IsLoggedInType
const router = useRouter()

onBeforeMount(() => {
  if (!isLoggedIn.value) {
    router.push({ path: '/login' })
  }
})

onMounted(() => {
  if (isLoggedIn.value) {
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

    getUserTracks()
      .then((response) => {
        if (!response.ok) {
          throw new Error('HTTP status ' + response.status)
        }
        return response.json()
      })
      .then((data) => {
        userTracks.value = data
      })
    getUserPlaylists()
      .then((response) => {
        if (!response.ok) {
          throw new Error('HTTP status ' + response.status)
        }
        return response.json()
      })
      .then((data) => {
        userPlaylists.value = data
      })
  }
})
</script>

<template>
  <!-- TODO: skeleton if still loading -->
  <UserInfo
    v-if="userInfo && userPlaylists && userTracks"
    :user-info="userInfo"
    :user-playlists="userPlaylists"
    :user-tracks="userTracks"
  />
  <div class="main-content">
    <RouterView />
  </div>
</template>

<style scoped>
.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.main-content > :last-child {
  flex: 1;
}
</style>
